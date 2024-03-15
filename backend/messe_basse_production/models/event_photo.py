from django.db import models
from django.dispatch import receiver

from messe_basse_production.signals import remove_old_image, remove_deleted_image, update_order


class EventPhoto(models.Model):
    name = models.CharField(max_length=150)
    photographer = models.CharField(max_length=150)
    image = models.ImageField(upload_to='images/event_photo/')
    url = models.URLField()
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ('order',)


models.signals.pre_save.connect(remove_old_image('image'), sender=EventPhoto)


@receiver(models.signals.post_delete, sender=EventPhoto)
def on_delete(sender, instance, **kwargs):
    remove_deleted_image('image')(sender, instance, **kwargs)
    update_order.send(sender=sender, order_min=instance.order, new_order=instance.order)
