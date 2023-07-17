from django.urls import path, include
from . import views
from .views import productListView

urlpatterns = [
    path("users/", include("users.urls")),
    path("", views.getRoutes, name="routes"),
    path("products/", productListView.as_view(), name="product-list"),
]
