from django.db import models

from messe_basse_production.signals import remove_old_image, remove_deleted_image


class EventPhoto(models.Model):
    name = models.CharField(max_length=150)
    photographer = models.CharField(max_length=150)
    image = models.ImageField(upload_to='images/event_photo/')
    url = models.URLField()
    order = models.PositiveIntegerField(default=1)


models.signals.pre_save.connect(remove_old_image('image'), sender=EventPhoto)
models.signals.post_delete.connect(remove_deleted_image('image'), sender=EventPhoto)
