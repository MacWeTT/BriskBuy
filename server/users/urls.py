from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import GoogleLoginAndSignupView
from .views import LoginUserView, SignUpUserView


urlpatterns = [
    path("login/", LoginUserView.as_view(), name="token_login"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("signup/", SignUpUserView.as_view(), name="signup"),
]

# Google Auth
urlpatterns += [
    path("google/", GoogleLoginAndSignupView.as_view(), name="google_login_or_signup"),
]
