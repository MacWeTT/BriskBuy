from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import GoogleInit

urlpatterns = [
    # SIMPLE_JWT
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

# SOCIALS
urlpatterns += [
    path("google/init", GoogleInit.as_view(), name="google_init"),
]
