from .models import Product, Category, Order, OrderItem, ShippingAddress
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import AbstractBaseUser
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.text import slugify
from rest_framework import status
from django.db.models import Q
from .services.schema import *
from typing import Optional
from .serializers import *


# Create your views here.
@api_view(["GET"])
def getRoutes(request):
    routes = ["api/", "api/products/", "api/category/"]
    return Response(routes)


class CustomPagination(PageNumberPagination):
    page_size = 5


class ProductListView(APIView):
    serializer_class = ProductSerializer
    pagination_class = CustomPagination

    def get(self, request):
        try:
            query: Optional[str] = request.query_params.get("query", None)

            if query == slugify(query):
                try:
                    product = Product.objects.get(slug=slugify(query))
                    serializer = self.serializer_class(product)
                    return Response(serializer.data)
                except Product.DoesNotExist:
                    return Response(
                        {"message": "Product not found"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
            elif query is not None:
                products = Product.objects.filter(
                    Q(name__icontains=query)
                    | Q(description__icontains=query)
                    | Q(slug=slugify(query))
                )
                category_products = Product.objects.filter(
                    category__name__icontains=query
                )
                products = products.union(category_products)
            else:
                products = Product.objects.all()

            paginator = self.pagination_class()
            paginated_products = paginator.paginate_queryset(products, request)
            serializer = self.serializer_class(paginated_products, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Server error : {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class CategoryListView(APIView):
    serializer_class = CategorySerializer

    def get(self, request):
        try:
            category: Optional[str] = request.query_params.get("category", None)

            if category:
                category = Category.objects.filter(name=category)
            else:
                category = Category.objects.all()

                serializer = CategorySerializer(category, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": f"Server error : {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class OrderView(APIView):
    def get(self, request):
        try:
            customer: Optional[AbstractBaseUser] = request.user

            if customer:
                order = Order.objects.filter(customer=customer, complete=False)
            else:
                order = []

            serializer = OrderSerializer(order, many=True)
            cartItems = serializer.data
            total = 0

            for item in cartItems:
                total += item["price"] * item["quantity"]

            return Response(
                {"cartItems": serializer.data, "total": total},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print(e)
            return Response(
                {"message": f"Server error : {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class CartView(APIView):
    def get(self, request):
        try:
            order = Order.objects.filter(customer=request.user, complete=False).first()
            if order:
                order_items = OrderItem.objects.filter(order=order)
                product_data = []
                total = 0
                for order_item in order_items:
                    product_object = get_object_or_404(
                        Product, id=order_item.product.id
                    )
                    product = ProductSerializer(product_object).data
                    product_data.append(
                        {
                            **product,
                            "quantity": order_item.quantity,
                            "order_item": order_item.id,
                        }
                    )
                    total += product["price"] * order_item.quantity

                response = {"cartItems": product_data, "total": total}
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"message": "No open order found"},
                    status=status.HTTP_204_NO_CONTENT,
                )
        except Exception as e:
            return Response(
                {"message": f"Server error : {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request):
        try:
            user: str = request.user
            data: dict = request.data
            product = Product.objects.get(id=data["product_id"])
            order, created = Order.objects.get_or_create(customer=user, complete=False)
            if created:
                orderItem = OrderItem.objects.create(
                    product=product, order=order, quantity=1
                )
                response = {
                    "order": order.id,
                    "order_item": orderItem.id,
                    "quantity": orderItem.quantity,
                    "message": "Item was added to cart",
                }
                return Response(response, status=status.HTTP_201_CREATED)
            else:
                orderItem, _ = OrderItem.objects.get_or_create(
                    product=product, order=order
                )
                orderItem.quantity += 1
                orderItem.save()
                response = {
                    "order": order.id,
                    "order_item": orderItem.id,
                    "quantity": orderItem.quantity,
                    "message": "Item quantity has been increased.",
                }
                return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(
                {"message": f"Server error : {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def patch(self, request):
        try:
            request = PatchCartRequest(**request.data)
            item = OrderItem.objects.get(id=request.product_id)
            method = request.method

            if method == "INCREASE":
                item.quantity += 1
                item.save()
            if method == "DECREASE":
                if item.quantity == 1:
                    item.delete()
                else:
                    item.quantity -= 1
                    item.save()

            return Response(
                {"message": f'Action "{method}" was performed successfully.'},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print(e)
            return Response(
                {"message": f"Server error : {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def delete(self, request):
        try:
            user: AbstractBaseUser = request.user
            order = Order.objects.get(customer=user, complete=False)
            order.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"message": f"Server error : {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class WishlistView(APIView):
    serializer_class = WishlistSerializer

    def get(self, request):
        items = WishlistIem.objects.filter(user=request.user)
        response = [self.serializer_class(item) for item in items]
        return Response(response, status=status.HTTP_200_OK)

    def post(self, request):
        pass


class ShippingAddressView(APIView):
    def get(self, request, pk):
        shipping_address = ShippingAddress.objects.filter(customer=pk)
        serializer = ShippingAddressSerializer(shipping_address, many=True)
        return Response(serializer.data)
