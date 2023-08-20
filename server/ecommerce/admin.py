from django.contrib import admin
from . import models

# Register your models here.


@admin.register(models.Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ["name", "email"]


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "stock", "price"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["customer", "complete", "transaction_id", "date_ordered"]


@admin.register(models.OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ["product", "order", "quantity", "date_added"]


@admin.register(models.ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = [
        "customer",
        "order",
        "street_address",
        "city",
        "state",
        "postal_code",
        "date_added",
    ]
