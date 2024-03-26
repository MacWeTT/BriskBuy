from rest_framework.serializers import ModelSerializer, CharField
from .models import *


class SellerSerializer(ModelSerializer):
    class Meta:
        model = Seller
        fields = ["name"]


class ProductSerializer(ModelSerializer):
    seller = SellerSerializer()

    class Meta:
        model = Product
        exclude = ["created_at", "updated_at", "stock"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["seller"] = instance.seller.name
        return representation


class WishlistSerializer(ModelSerializer):
    class Meta:
        model = WishlistItem
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
        exclude = ["created_at", "updated_at", "date_added", "order"]


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
