from rest_framework.serializers import ModelSerializer
from .models import *


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        exclude = [
            "slug",
        ]


class OrderItemSerializer(ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"
