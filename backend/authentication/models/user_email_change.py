from django.db import models

from authentication.models import User
from app.utils.date import now_plus_one_week


class UserEmailChange(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)
    new_email = models.EmailField(max_length=100)
    token = models.CharField(max_length=64, primary_key=True)
    expiry_date = models.DateTimeField(editable=False, default=now_plus_one_week)
