from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .utils.serlializers import TokenObtainPairSerializer, UserRegistrationSerializer
from .utils.services import jwtLogin, verifyGoogleUser
from django.contrib.auth import get_user_model

# from .utils.mixins import PublicApiMixin, ApiErrorsMixin

User = get_user_model()


class GoogleLoginView(APIView):
    def post(self, request):
        data = request.data
        codeObj = data["code"]
        user = verifyGoogleUser(codeObj)
        if user is not None:
            tokens = jwtLogin(user=user)
        else:
            raise ValidationError("Google user doesn't exist.")

        return Response(tokens, status=200)


class LoginUserView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

class SignUpUserView(CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = jwtLogin(user=user)
            return Response(tokens, status=201)
        else:
            return Response(serializer.errors, status=400)
