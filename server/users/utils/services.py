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


def googleObtainAccessToken(*, code: str, redirectUri: str) -> str:
    data = {
        "code": code,
        "client_id": settings.GOOGLE_OAUTH2_CLIENT_ID,
        "client_secret": settings.GOOGLE_OAUTH2_CLIENT_SECRET,
        "redirect_uri": redirectUri,
        "grant_type": "authorization_code",
    }
    print(data)
    response = requests.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)
    print(response)

    if not response.ok:
        raise ValidationError("Failed to obtain access token from Google.")

    accessToken = response.json()["access_token"]
    return accessToken


def googleObtainUserInfo(*, accessToken: str) -> dict:
    response = requests.get(GOOGLE_USER_INFO_URL, params={"access_token": accessToken})
    print(response)

    if not response.ok:
        raise ValidationError("Invalid Google Access Token")

    return response.json()


def jwtLogin():
    pass


def getFirstMatchingAttr(obj, *attrs, default=None):
    for attr in attrs:
        if hasattr(obj, attr):
            return getattr(obj, attr)

    return default


def getErrorMessage(exc) -> str:
    if hasattr(exc, "message_dict"):
        return exc.message_dict
    error_msg = getFirstMatchingAttr(exc, "message", "messages")

    if isinstance(error_msg, list):
        error_msg = ", ".join(error_msg)

    if error_msg is None:
        error_msg = str(exc)

    return error_msg
