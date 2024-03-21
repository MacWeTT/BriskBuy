from django.contrib import admin
from . import models

@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["id","name", "slug", "stock", "price"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id","customer", "complete", "date_ordered"]


@admin.register(models.OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ["product", "order", "quantity", "date_added"]


admin.site.register(models.ShippingAddress)
