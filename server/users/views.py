from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from .utils.serlializers import TokenObtainPairSerializer, UserRegistrationSerializer
from .utils.serlializers import ChangePasswordSerializer, EditProfileSerializer
from .utils.services import jwtLogin, verifyGoogleUser
from django.contrib.auth import get_user_model

#TODO: Add mixins to send errors to the client instead of 500 errors
#TODO: Create a custom view which gives error 403 instead of 401 when token is expired and inherit from it

User = get_user_model()


class GoogleLoginSignUpView(APIView):
    def post(self, request):
        data = request.data
        codeObj = data["code"]
        user = verifyGoogleUser(codeObj)
        if user is not None:
            tokens = jwtLogin(user=user)
        else:
            raise ValidationError("Google user doesn't exist.")
        return Response(tokens, status=status.HTTP_200_OK)


class LoginUserView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

class SignUpUserView(CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = jwtLogin(user=user)
            return Response(tokens, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EditProfileSerializer
    
    def put(self,request):
        data: dict = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        
        if serializer.is_valid():
            serializer.save()
            response = {"message": "Profile updated successfully."}
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {"error" : serializer.errors}
            print(response)
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        user = User.objects.get(id=request.user.id)

        if user.check_password(data["old_password"]):
            user.set_password(data["new_password"])
            user.save()
            return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)
        else:
            raise Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class VerifyEmailView(APIView):
#     serializer_class = EmailVerificationSerlializer
    
#     def get(self, request, uidb64=None, token=None):
#         if uidb64 and token:
#             try:
#                 uid = smart_text(urlsafe_base64_decode(uidb64))
#                 user = User.objects.get(id=uid)
#             except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#                 user = None
            
#             if user is not None and default_token_generator.check_token(user, token):
#                 user.verified = True
#                 user.save()
#                 return Response({"message": "Email verified successfully."}, status=status.HTTP_200_OK)
#             else:
#                 return Response({"message": "Email verification failed."}, status=status.HTTP_400_BAD_REQUEST)
#         else:
#             return Response({"message": "Email verification failed."}, status=status.HTTP_400_BAD_REQUEST)

#     def post(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = self.perform_create(serializer)

#         # Create a verification token
#         token = default_token_generator.make_token(user)
#         uid = urlsafe_base64_encode(force_bytes(user.pk))

#         # Build the verification URL
#         current_site = get_current_site(request)
#         verification_url = f'http://{current_site.domain}/api/verify/{uid}/{token}/'

#         # Send verification email
#         subject = 'Activate Your Account'
#         message = render_to_string('email/verification_email.txt', {
#             'user': user,
#             'verification_url': verification_url,
#         })
#         email = EmailMessage(subject, message, to=[user.email])
#         email.send()

#         return Response(serializer.data, status=status.HTTP_201_CREATED)


