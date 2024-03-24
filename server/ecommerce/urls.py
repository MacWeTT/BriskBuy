from django.urls import path
from .views import (
    getRoutes,
    ProductListView,
    CategoryListView,
    OrderView,
    CartView,
    ShippingAddressView,
)

urlpatterns = [
    path("", getRoutes, name="routes"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("category/", CategoryListView.as_view(), name="category-list"),
    path("order/", OrderView.as_view(), name="order"),
    path("shipping/<int:pk>/", ShippingAddressView.as_view(), name="shipping-address"),
    path("cart/", CartView.as_view(), name="cart"),
]
