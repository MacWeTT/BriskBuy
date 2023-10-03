from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class TokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        token["name"] = str(user.first_name + " " + user.last_name)
        token["email"] = user.email
        token["verified"] = user.verified

        return token


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password")

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class EditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "first_name", "last_name")

    def is_valid(self, *, raise_exception=False):
        super().is_valid(raise_exception=raise_exception)

class EmailVerificationSerlializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]