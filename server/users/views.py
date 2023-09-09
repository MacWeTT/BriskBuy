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


class LoginUser(APIView):
    def post(self, request):
        username = request.data.username
        password = request.data.password

        user = User.objects.filter(username=username).first()

        if not user:
            raise ValidationError("Invalid credentials.")

        if not user.check_password(password):
            raise ValidationError("Invalid password.")
        else:
            tokens = jwtLogin(user=user)

        return Response(tokens, status=200)


class SignUpUser(APIView):
    def post(self, request):
        data = request.data
        user = User.objects.filter(email=data["email"]).first()

        if user:
            raise ValidationError("User already exists.")
        else:
            user = User.objects.create(
                username=data["username"],
                email=data["email"],
                first_name=data["first_name"],
                last_name=data["last_name"],
            )
            user.set_password(data["password"])
            user.save()
            
        tokens = jwtLogin(user=user)
        return Response(tokens, status=201)


# class GetUserView(APIView):
#     def get(self, request):
#         user = request.headers.get("Authorization")
#         data = {
#             "User": user,
#         }
#         return Response(data, status=200)
