from django.contrib.auth.models import AbstractUser
from shortuuidfield import ShortUUIDField
from django.db import models


class User(AbstractUser):
    user_id = ShortUUIDField()
    verified = models.BooleanField(default=False)
