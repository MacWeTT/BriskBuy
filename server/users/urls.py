from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import GoogleLogin, GoogleConnect, GitHubLogin, GithubConnect
from dj_rest_auth.registration.views import (
    SocialAccountListView,
    SocialAccountDisconnectView,
)

urlpatterns = [
    # SIMPLE_JWT
    # path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # CUSTOM VIEWS
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
]

# SOCIALS
urlpatterns += [
    path("auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("auth/google/connect/", GoogleConnect.as_view(), name="google_connect"),
    path("auth/github/", GitHubLogin.as_view(), name="github_login"),
    path("auth/github/connect/", GithubConnect.as_view(), name="github_connect"),
    path("auth/social", SocialAccountListView.as_view(), name="social_account_list"),
    path(
        "auth/social/<int:pk>/disconnect/",
        SocialAccountDisconnectView.as_view(),
        name="social_account_disconnect",
    ),
]
