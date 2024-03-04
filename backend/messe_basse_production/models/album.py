from django.db import models

from messe_basse_production.signals import remove_old_image, remove_deleted_image


class Album(models.Model):
    name = models.CharField(max_length=150)
    catalog = models.CharField(max_length=150)
    image = models.ImageField(upload_to='images/album/')
    regular_price = models.CharField(max_length=150)
    signed_price = models.CharField(max_length=150)


models.signals.pre_save.connect(remove_old_image('image'), sender=Album)
models.signals.post_delete.connect(remove_deleted_image('image'), sender=Album)
