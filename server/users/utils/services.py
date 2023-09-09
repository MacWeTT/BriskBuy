from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.conf import settings
import requests

User = get_user_model()

GOOGLE_ID_TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo"
GOOGLE_ACCESS_TOKEN_OBTAIN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"


def googleValidateIDToken(*, idToken: str) -> bool:
    response = requests.get(GOOGLE_ID_TOKEN_INFO_URL, params={"id_token": idToken})
    print(response)

    if not response.ok:
        raise ValidationError("Invalid Google ID Token")

    audience = response.json()["aud"]

    if audience != settings.GOOGLE_OAUTH2_CLIENT_ID:
        raise ValidationError("Invalid Audience")

    return True


def googleObtainToken(*, code: str, redirectUri: str) -> str:
    data = {
        "code": code,
        "client_id": settings.GOOGLE_OAUTH2_CLIENT_ID,
        "client_secret": settings.GOOGLE_OAUTH2_CLIENT_SECRET,
        "redirect_uri": redirectUri,
        "grant_type": "authorization_code",
    }
    response = requests.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)
    print(response)

    if not response.ok:
        raise ValidationError("Failed to obtain access token from Google.")

    accessToken = response.json()["access_token"]
    return accessToken


def googleObtainUserInfo(*, accessToken: str) -> dict:
    response = requests.get(GOOGLE_USER_INFO_URL, params={"access_token": accessToken})

    if not response.ok:
        raise ValidationError("Invalid Google Access Token")

    userInfo: dict = response.json()
    return userInfo


def jwtLogin(user) -> dict:
    tokenURL = f"{settings.LOCAL_URL}/api/token/"
    # refresh = RefreshToken.for_user(user)
    # access = refresh.access_token

    # # Custom Claims
    # access["name"] = str(user.first_name + " " + user.last_name)
    # access["email"] = user.email
    # access["isVerified"] = user.verified

    # tokens = {"refresh": str(refresh), "access": str(access)}
    # return tokens


# def jwtRefresh(tokens) -> dict:
#     refresh = tokens["refresh"]
#     access = tokens["access"]

#     refresh = RefreshToken(refresh)
#     access = refresh.access_token

#     tokens = {"refresh": str(refresh), "access": str(access)}
#     return tokens


def jwtSignUp():
    pass


def createGoogleUser(UserInfo: dict) -> User:
    email = UserInfo["email"]
    username = email.split("@")[0]
    verifiedEmail = UserInfo["email_verified"]
    user, created = User.objects.get_or_create(
        email=email,
        defaults={
            "username": username,
            "first_name": UserInfo["given_name"],
            "last_name": UserInfo["family_name"],
            "verified": verifiedEmail,
        },
    )
    return user
