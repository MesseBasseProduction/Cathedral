import os

from django.db import models
from django.dispatch import receiver


class Document(models.Model):
    name = models.CharField(max_length=50)
    file = models.FileField(upload_to='documents/')
    date = models.DateField()


@receiver(models.signals.pre_save, sender=Document)
def pre_save_image(sender, instance, **kwargs):
    try:
        old_image = sender.objects.get(id=instance.id).file
    except sender.DoesNotExist:
        old_image = None
    new_image = instance.file
    if not old_image or not new_image:
        return

    if old_image.path != new_image.path:
        if os.path.isfile(old_image.path):
            os.remove(old_image.path)


@receiver(models.signals.post_delete, sender=Document)
def post_delete_file(sender, instance, **kwargs):
    instance.file.delete(save=False)
