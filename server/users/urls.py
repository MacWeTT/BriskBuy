from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import GoogleLoginView, GoogleSignUpUserView

urlpatterns = [
    # SIMPLE_JWT
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

# Google Auth
urlpatterns += [
    path("google/login", GoogleLoginView.as_view(), name="google_login"),
    path("google/signup", GoogleSignUpUserView.as_view(), name="google_signup"),
]
