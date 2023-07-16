from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("staffshit/", admin.site.urls),
    # API
    path("api/", include("api.urls")),
]
