import os

from django.db import models
from django.dispatch import receiver


class Member(models.Model):
    name = models.CharField(max_length=50)
    role = models.CharField(max_length=50)
    leader = models.BooleanField()
    active = models.BooleanField(default=True)
    image = models.ImageField(upload_to='images/member/')


@receiver(models.signals.pre_save, sender=Member)
def pre_save_image(sender, instance, **kwargs):
    try:
        old_image = sender.objects.get(id=instance.id).image
    except sender.DoesNotExist:
        old_image = None
    new_image = instance.image
    if not old_image or not new_image:
        return

    print(old_image.path)
    if old_image.path != new_image.path:
        if os.path.isfile(old_image.path):
            os.remove(old_image.path)


@receiver(models.signals.post_delete, sender=Member)
def post_delete_profile_picture(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(save=False)
