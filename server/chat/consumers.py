from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
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

    async def disconnect(self, code):
        return await super().disconnect(code)
