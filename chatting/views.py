from django.shortcuts import redirect
from django.views.generic import ListView, DetailView
from chatting.models import Message
from projeto_chat.forms import MessageForm
# Create your views here.

class ListAllMessages(ListView):
    model = Message
    queryset = Message.objects.filter(enabled=True).all()

    def post(self, request):
        print(request)

class MessageDetailView(DetailView):
    model=Message
    slug_field="id"