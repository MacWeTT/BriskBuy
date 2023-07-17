from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import ProductSerializer
from ..models import Product


# Create your views here.
@api_view(["GET"])
def getRoutes(request):
    routes = [
        "api/",
        "api/products/",
    ]
    return Response(routes)


class productListView(APIView):
    serializer_class = ProductSerializer

    def get(self, request):
        category = request.GET.get("category", None)
        if category:
            products = Product.objects.filter(category=category)
        else:
            products = Product.objects.all()

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
