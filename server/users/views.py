from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .utils.services import googleObtainToken, googleObtainUserInfo, createGoogleUser
from .utils.services import jwtLogin, jwtSignUp
from django.contrib.auth import get_user_model

# from .utils.mixins import PublicApiMixin, ApiErrorsMixin

User = get_user_model()


class GoogleLoginView(APIView):
    redirectUri = "http://localhost:3000"

    def post(self, request):
        data = request.data
        codeObj = data["code"]
        code = codeObj["code"]
        AccessToken = googleObtainToken(code=code, redirectUri=self.redirectUri)

        if AccessToken:
            googleUser = googleObtainUserInfo(accessToken=AccessToken)
            user = User.objects.get(email=googleUser["email"])
            if not user.verified:
                user.verified = True
                user.save()
            if not user:
                raise ValidationError("User Does Not Exist.")

            tokens = jwtLogin(user=user)

        return Response(tokens)


class GoogleSignUpUserView(APIView):
    redirectUri = "http://localhost:3000"

    def post(self, request):
        codeObj = request.data["code"]
        code = codeObj["code"]
        print(code)
        googleUserExists = googleObtainToken(code=code, redirectUri=self.redirectUri)

        user = None
        if googleUserExists:
            UserInfo = googleObtainUserInfo(accessToken=googleUserExists)
            user = createGoogleUser(userInfo=UserInfo)
        else:
            raise ValidationError("Google User Does Not Exist")

        data = {
            "User": user,
        }

        return Response(data, status=200)


# class GetUserView(APIView):
#     def get(self, request):
#         user = request.headers.get("Authorization")
#         data = {
#             "User": user,
#         }
#         return Response(data, status=200)
