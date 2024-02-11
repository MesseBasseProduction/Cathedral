from django.db import models


class Video(models.Model):
    name = models.CharField(max_length=150)
    artist = models.CharField(max_length=150)
    date = models.DateField()
    url = models.URLField()
