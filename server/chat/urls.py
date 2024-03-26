from .views import ChatRoomView, MessagesView
from django.urls import path

urlpatterns = [
    path("", ChatRoomView.as_view(), name="chatRoom"),
    path("<str:room_id>/messages", MessagesView.as_view(), name="messageList"),
    path("<int:user_id>/chats", ChatRoomView.as_view(), name="chatRoomList"),
]
