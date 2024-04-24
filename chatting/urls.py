from django.urls import path
from chatting.views import ListAllMessages
from django.contrib.auth.decorators import login_required


urlpatterns=[
    path("",login_required(ListAllMessages.as_view()), name="messages")
]