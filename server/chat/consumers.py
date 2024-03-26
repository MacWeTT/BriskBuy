from channels.generic.websocket import AsyncWebsocketConsumer
from .models import ChatRoom, OnlineUser, Message
from channels.db import database_sync_to_async
from users.models import User
import json


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope["url_route"]["kwargs"]["user_id"]
        self.user_rooms = await self.getRooms(self.user_id)
        # await database_sync_to_async(list)(ChatRoom.objects.filter(member=self.userId))

        for room in self.user_rooms:
            await self.channel_layer.group_add(room.room_id, self.channel_name)

        await self.channel_layer.group_add("online_user", self.channel_name)
        self.user = await self.getUser(self.user_id)
        await self.addOnlineUser(self.user)
        await self.sendOnlineUserList()
        await self.accept()
        await self.send(text_data=json.dumps({"message": "Connection Successful!"}))

    async def sendOnlineUserList(self):
        online_user_list = await self.getOnlineUsers()
        chat_message = {
            "type": "chat_message",
            "message": {"action": "online_user", "user_list": online_user_list},
        }
        await self.channel_layer.group_send("online_user", chat_message)

    async def disconnect(self, close_code):
        await self.deleteOnlineUser(self.user)
        await self.sendOnlineUserList()
        for room in self.user_rooms:
            await self.channel_layer.group_discard(room.room_id, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        action = text_data_json["action"]
        room_id = text_data_json["room_id"]

        chat_message = {}
        if action == "message":
            message = text_data_json["message"]
            user_id = text_data_json["user"]
            chat_message = await self.saveMessage(message, room_id, user_id)
        elif action == "typing":
            chat_message = text_data_json

        await self.channel_layer.group_send(
            room_id, {"type": "chat_message", "message": chat_message}
        )

    async def chat_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps(message))

    @database_sync_to_async
    def saveMessage(self, message, room_id, user_id):
        user = User.objects.get(id=user_id)
        chat = ChatRoom.objects.get(room_id=room_id)
        chat_message = Message(chat=chat, user=user, message=message)

        return {
            "action": "message",
            "user": user_id,
            "room": room_id,
            "message": message,
            "timestamp": str(chat_message.timestamp),
        }

    # DB Functions
    @database_sync_to_async
    def getUser(self, user_id):
        return User.objects.get(id=user_id)

    @database_sync_to_async
    def getOnlineUsers(self):
        onlineUsers = OnlineUser.objects.all()
        return [onlineUser.user.id for onlineUser in onlineUsers]

    @database_sync_to_async
    def getRooms(self, user_id):
        return list(ChatRoom.objects.filter(member=user_id))

    @database_sync_to_async
    def addOnlineUser(self, user):
        try:
            OnlineUser.objects.create(user=user)
        except:
            pass

    @database_sync_to_async
    def deleteOnlineUser(self, user):
        try:
            OnlineUser.objects.get(user=user).delete()
        except:
            pass
