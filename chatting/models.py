from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

class Message(models.Model):
    id = models.BigAutoField(primary_key=True),
    message = models.CharField(max_length=100, null=False, blank=False,help_text="Sent Message")
    date = models.DateTimeField(auto_now_add=True, blank=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    image = models.FileField(max_length=100, blank=True, help_text="Sent Image")
    enabled = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"{self.user} {self.message} {self.image}"

    class Meta:
        verbose_name = "Mensagem"
        verbose_name_plural = "Mensagens"