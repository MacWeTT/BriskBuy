from django.conf.urls.static import static
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from django.urls import path, include
from django.conf import settings
from django.contrib import admin
from drf_yasg import openapi

docs = get_schema_view(
    openapi.Info(
        title="BriskBuy API",
        default_version="v1",
        description="Welcome to BriskBuy's API documentation. This API provides all the necessary ecommerce endpoints required to build a fully functional ecommerce website, as well as the best authentication and authorization system for your website.",
        terms_of_service="https://www.yourapp.com/terms/",
        contact=openapi.Contact(email="manasbajpai18@gmail.com"),
        license=openapi.License(name="Your License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", docs.with_ui("swagger"), name="API Docs"),
    path("api/", include("ecommerce.urls"), name="E-Commerce API"),
    path("users/", include("users.urls"), name="User API"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
