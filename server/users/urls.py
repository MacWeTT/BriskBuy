from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import GoogleLoginSignUpView
from .views import LoginUserView, SignUpUserView
from .views import ChangePasswordView, EditProfileView

# JWT Auth
urlpatterns = [
    path("login/", LoginUserView.as_view(), name="token_login"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("signup/", SignUpUserView.as_view(), name="signup"),
]

# Google Auth
urlpatterns += [
    path("google/", GoogleLoginSignUpView.as_view(), name="google_login_or_signup"),
]

# Profile Edits
urlpatterns += [
    path("change-password/", ChangePasswordView.as_view(), name="change_password"),
    path("edit-profile/", EditProfileView.as_view(), name="edit_profile")
]
