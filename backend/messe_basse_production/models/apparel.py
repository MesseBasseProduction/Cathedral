from django.db import models

from messe_basse_production.signals import remove_old_image, remove_deleted_image


class Apparel(models.Model):
    name = models.CharField(max_length=150)
    designer = models.CharField(max_length=150)
    type = models.CharField(max_length=150)
    catalog = models.CharField(max_length=150)
    price = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images/apparel/')


models.signals.pre_save.connect(remove_old_image('image'), sender=Apparel)
models.signals.post_delete.connect(remove_deleted_image('image'), sender=Apparel)
