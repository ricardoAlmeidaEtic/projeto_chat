import datetime
from django.shortcuts import redirect
from django.views.generic import ListView
from chatting.models import Message
from chatting.consumers import ChatConsumer
from projeto_chat.forms import MessageForm
from asgiref.sync import async_to_sync
from projeto_chat.settings import BASE_DIR, STATIC_URL


class ListAllMessages(ListView):
    model = Message
    queryset = Message.objects.filter(enabled=True).all()
    template_name = 'message_list.html'

    def post(self, request, *args, **kwargs):
            return redirect('/chatting')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = MessageForm()
        return context
        