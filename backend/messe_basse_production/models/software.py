from django.db import models
from django.dispatch import receiver

from messe_basse_production.models.common import LangEnum
from messe_basse_production.signals import remove_old_image, remove_deleted_image, update_order


class Software(models.Model):
    name = models.CharField(max_length=150)
    image = models.ImageField(upload_to='images/software')
    url = models.URLField()
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ('order',)


models.signals.pre_save.connect(remove_old_image('image'), sender=Software)


@receiver(models.signals.post_delete, sender=Software)
def on_delete(sender, instance, **kwargs):
    remove_deleted_image('image')(sender, instance, **kwargs)
    update_order.send(sender=sender, order_min=instance.order, new_order=instance.order)


class SoftwareDescription(models.Model):
    software = models.ForeignKey(Software, on_delete=models.CASCADE, related_name='descriptions')
    lang = models.CharField(max_length=2, choices=LangEnum)
    description = models.TextField()


class SoftwareArtist(models.Model):
    name = models.CharField(max_length=150)
    image = models.ImageField(upload_to='images/software_artist')
    url = models.URLField()
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ('order',)


models.signals.pre_save.connect(remove_old_image('image'), sender=SoftwareArtist)


@receiver(models.signals.post_delete, sender=SoftwareArtist)
def on_delete(sender, instance, **kwargs):
    remove_deleted_image('image')(sender, instance, **kwargs)
    update_order.send(sender=sender, order_min=instance.order, new_order=instance.order)
