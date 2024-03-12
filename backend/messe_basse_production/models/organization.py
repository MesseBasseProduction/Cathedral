from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=150)
    type = models.CharField(max_length=150)
    creation = models.DateField()
