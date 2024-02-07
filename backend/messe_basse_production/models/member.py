from django.db import models


class Member(models.Model):
    name = models.CharField(max_length=50)
    role = models.CharField(max_length=50)
    leader = models.BooleanField()
    active = models.BooleanField(default=True)
