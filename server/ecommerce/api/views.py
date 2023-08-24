from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from ..serializers import ProductSerializer, CategorySerializer, OrderSerializer
from ..models import Product, Category, Order
from django.db.models import Q
from django.utils.text import slugify


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
        query = request.GET.get("query", None)

        if query:
            is_slug = query == slugify(query)

            if is_slug:
                try:
                    product = Product.objects.get(slug=slugify(query))
                    serializer = self.serializer_class(product)
                    return Response(serializer.data)
                except Product.DoesNotExist:
                    return Response({"message": "Product not found"}, status=404)

            products = Product.objects.filter(
                Q(name__icontains=query)
                | Q(description__icontains=query)
                | Q(slug=slugify(query))
            )
            category_products = Product.objects.filter(category__name__icontains=query)
            products = products.union(category_products)
        else:
            products = Product.objects.all()

        paginator = self.pagination_class()
        paginated_products = paginator.paginate_queryset(products, request)
        serializer = self.serializer_class(paginated_products, many=True)
        return paginator.get_paginated_response(serializer.data)


class CategoryListView(APIView):
    serializer_class = CategorySerializer

    def get(self, request):
        category = request.GET.get("category", None)
        if category:
            category = Category.objects.filter(name=category)
        else:
            category = Category.objects.all()

        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)


class OrderView(APIView):
    def get(self, request):
        customer = request.user.customer
        if customer:
            order = Order.objects.filter(customer=customer, complete=False)
        else:
            order = []

        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data)
