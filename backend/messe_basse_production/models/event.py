import os

from django.db import models
from django.dispatch import receiver

from messe_basse_production.models.common import LangEnum


class Event(models.Model):
    name = models.CharField(max_length=150)
    catalog = models.CharField(max_length=150)
    image = models.ImageField(upload_to='images/events/')
    date = models.DateField()
    place = models.CharField(max_length=150)
    link = models.URLField()

    class Meta:
        ordering = ('-date',)


@receiver(models.signals.pre_save, sender=Event)
def pre_save_image(sender, instance, **kwargs):
    try:
        old_image = sender.objects.get(id=instance.id).image
    except sender.DoesNotExist:
        old_image = None
    new_image = instance.image
    if not old_image or not new_image:
        return

    if old_image.path != new_image.path:
        if os.path.isfile(old_image.path):
            os.remove(old_image.path)


@receiver(models.signals.post_delete, sender=Event)
def post_delete_image(sender, instance, **kwargs):
    instance.image.delete(save=False)


class EventDescription(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='descriptions')
    lang = models.CharField(max_length=2, choices=LangEnum)
    description = models.TextField()


class EventParticipant(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='participants')
    name = models.CharField(max_length=150)
    url = models.URLField()
