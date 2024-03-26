from shortuuidfield import ShortUUIDField
from users.models import User
from django.db import models


class ChatRoom(models.Model):
    room_id = ShortUUIDField(primary_key=True)
    type = models.CharField(max_length=10, default="DM")
    member = models.ManyToManyField(User)
    name = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self) -> str:
        return self.room_id + "->" + str(self.name)


class OnlineUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.user.username


class Message(models.Model):
    chat = models.ForeignKey(ChatRoom, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.message
