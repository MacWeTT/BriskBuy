from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .docs import docs


urlpatterns = [
    path("staffshit/", admin.site.urls),
    path("", docs.with_ui("swagger"), name="API Docs"),
    path("api/", include("ecommerce.api.urls"), name="E-Commerce API"),
    path("users/", include("users.urls"), name="User API"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
