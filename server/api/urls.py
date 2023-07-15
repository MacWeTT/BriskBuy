from django.urls import path, include
from . import views

urlpatterns = [
    path("users/", include("users.urls")),
    path("/", views.getRoutes, name="routes"),
]
