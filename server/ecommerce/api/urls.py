from django.urls import path, include
from . import views
from .views import ProductListView, CategoryListView, OrderView, ShippingAddressView

urlpatterns = [
    # AUTH
    path("users/", include("users.urls")),
    path("accounts/", include("allauth.urls")),
    # API
    path("", views.getRoutes, name="routes"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("category/", CategoryListView.as_view(), name="category-list"),
    path("order/", OrderView.as_view(), name="order"),
    path("shipping/<int:pk>/", ShippingAddressView.as_view(), name="shipping-address"),
]
