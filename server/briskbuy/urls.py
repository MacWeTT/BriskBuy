from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Documentation
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
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
    # DOCS
    path(
        "",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="API Documentation",
    ),
    path("staffshit/", admin.site.urls),
    # API
    path("api/", include("ecommerce.api.urls")),
    # Users
    path("users/", include("users.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
