from django import forms

class MessageForm(forms.Form):
    your_message = forms.CharField(label="Your Message", max_length=100)