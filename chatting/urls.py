from django.urls import path
from chatting.views import ListAllMessages, MessageDetailView
from django.contrib.auth.decorators import login_required


urlpatterns=[
    path("",ListAllMessages.as_view(), name="messages"),
    path("<slug>", MessageDetailView.as_view(), name="message")
]