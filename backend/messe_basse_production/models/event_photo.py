import os

from django.db import models
from django.dispatch import receiver


class EventPhoto(models.Model):
    name = models.CharField(max_length=150)
    photographer = models.CharField(max_length=150)
    image = models.ImageField(upload_to='images/event_photo/')
    url = models.URLField()
    order = models.PositiveIntegerField(default=1)


@receiver(models.signals.pre_save, sender=EventPhoto)
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


@receiver(models.signals.post_delete, sender=EventPhoto)
def post_delete_image(sender, instance, **kwargs):
    instance.image.delete(save=False)
