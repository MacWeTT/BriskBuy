from .serializers import ChatRoomSerializer, MessageSerializer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ChatRoom, Message
from rest_framework import status


class ChatRoomView(APIView):
    def get(self, request, user_id):
        chatRooms = ChatRoom.objects.filter(member=user_id)
        serializer = ChatRoomSerializer(
            chatRooms, many=True, context={"request": request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ChatRoomSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MessagesView(ListAPIView):
    serializer_class = MessageSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        room_id = self.kwargs["room_id"]
        return Message.objects.filter(chat__room_id=room_id).order_by("-timestamp")
