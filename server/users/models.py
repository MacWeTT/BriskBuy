from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    verified = models.BooleanField(default=False)
    # googleProviderConnected = models.BooleanField(default=False)
    # avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
