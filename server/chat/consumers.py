from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync
import json


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.accept()

        self.send(
            text_data=json.dumps(
                {
                    "type": "Connection Established",
                    "message": "Websocket is connected successfully",
                }
            )
        )

    @database_sync_to_async
    async def masti(self):
        self.send(json.dumps({"message": "bhai code nhi chlra"}))

    async def disconnect(self, code):
        return await super().disconnect(code)
