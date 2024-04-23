from django.contrib import admin

from chatting.models import Message

# Register your models here.

@admin.register(Message)
class ProductAdmin(admin.ModelAdmin):
    list_display=("id","message","date","user","enabled")
    list_editable=("enabled",)