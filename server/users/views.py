from rest_framework.views import APIView
from rest_framework.response import Response
from .utils.services import googleValidateIDToken, googleObtainAccessToken
from .utils.mixins import PublicApiMixin, ApiErrorsMixin
from .utils.types import CodeRequest


class GoogleInit(APIView, PublicApiMixin, ApiErrorsMixin):
    def post(self, request, *args, **kwargs):
        data = request.data
        codeObj = data["code"]
        code = codeObj["code"]
        # idTokenStatus = googleValidateIDToken(idToken=code)
        AccessToken = googleObtainAccessToken(
            code=code, redirectUri="http://localhost:3000"
        )
        return Response(
            # idTokenStatus,
            AccessToken
        )
