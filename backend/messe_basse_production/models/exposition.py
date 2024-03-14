from django.db import models
from django.dispatch import receiver

from messe_basse_production.signals import remove_old_image, remove_deleted_image, update_order


class Exposition(models.Model):
    photographer = models.CharField(max_length=150)
    title = models.CharField(max_length=150)
    url = models.URLField()


def get_exposition_photo_path(instance, filename):
    return f'images/exposition/{instance.exposition.pk}/{filename}'


class ExpositionPhoto(models.Model):
    exposition = models.ForeignKey(Exposition, on_delete=models.CASCADE, related_name='photos')
    title = models.CharField(max_length=150)
    date = models.DateField()
    image = models.ImageField(upload_to=get_exposition_photo_path)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ('order',)


models.signals.pre_save.connect(remove_old_image('image'), sender=ExpositionPhoto)


@receiver(models.signals.post_delete, sender=ExpositionPhoto)
def on_delete(sender, instance, **kwargs):
    remove_deleted_image('image')(sender, instance, **kwargs)
    update_order.send(sender=sender, order_min=instance.order, new_order=instance.order)
