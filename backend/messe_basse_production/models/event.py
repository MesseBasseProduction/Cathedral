from django.db import models

from messe_basse_production.models.common import LangEnum
from messe_basse_production.signals import remove_old_image, remove_deleted_image


class Event(models.Model):
    name = models.CharField(max_length=150)
    catalog = models.CharField(max_length=150)
    image = models.ImageField(upload_to='images/event/')
    date = models.DateField()
    place = models.CharField(max_length=150)
    link = models.URLField()

    class Meta:
        ordering = ('-date',)


models.signals.pre_save.connect(remove_old_image('image'), sender=Event)
models.signals.post_delete.connect(remove_deleted_image('image'), sender=Event)


class EventDescription(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='descriptions')
    lang = models.CharField(max_length=2, choices=LangEnum)
    description = models.TextField()


class EventParticipant(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='participants')
    name = models.CharField(max_length=150)
    url = models.URLField()
