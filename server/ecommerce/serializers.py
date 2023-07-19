from rest_framework.serializers import ModelSerializer
from .models import Product, Category


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        exclude = [
            "slug",
        ]


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        exclude = [
            "slug",
        ]
