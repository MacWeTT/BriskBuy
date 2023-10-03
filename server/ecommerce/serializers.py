from rest_framework.serializers import ModelSerializer
from .models import *


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        exclude = [
            'created_at','updated_at','stock'
        ]


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        exclude = [
            "slug",
        ]


class OrderItemSerializer(ModelSerializer):
    class Meta:
        model = OrderItem
        exclude = ['created_at','updated_at','date_added','order']


class OrderSerializer(ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"


class CartSerializer(ModelSerializer):
    items = OrderItemSerializer(many=True)    

class ShippingAddressSerializer(ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"