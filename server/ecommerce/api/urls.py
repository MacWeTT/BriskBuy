from django.urls import path, include
from . import views
from .views import ProductListView, CategoryListView, OrderView

urlpatterns = [
    path("users/", include("users.urls")),
    path("", views.getRoutes, name="routes"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("category/", CategoryListView.as_view(), name="category-list"),
    path("order/", OrderView.as_view(), name="order"),
]
