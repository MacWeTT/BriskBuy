from rest_framework import serializers


class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    price = serializers.IntegerField()
    description = serializers.CharField(max_length=100)
    image = serializers.ImageField()
    category = serializers.CharField(max_length=100)
    quantity = serializers.IntegerField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()
