from django.db import models

from messe_basse_production.models.common import LangEnum
from messe_basse_production.signals import remove_old_image, remove_deleted_image


class Software(models.Model):
    name = models.CharField(max_length=150)
    image = models.ImageField(upload_to='images/software')
    url = models.URLField()
    order = models.PositiveIntegerField(default=1)


models.signals.pre_save.connect(remove_old_image('image'), sender=Software)
models.signals.post_delete.connect(remove_deleted_image('image'), sender=Software)


class SoftwareDescription(models.Model):
    event = models.ForeignKey(Software, on_delete=models.CASCADE, related_name='descriptions')
    lang = models.CharField(max_length=2, choices=LangEnum)
    description = models.TextField()


class SoftwareArtist(models.Model):
    name = models.CharField(max_length=150)
    image = models.ImageField(upload_to='images/software_artist')
    url = models.URLField()
    order = models.PositiveIntegerField(default=1)


models.signals.pre_save.connect(remove_old_image('image'), sender=SoftwareArtist)
models.signals.post_delete.connect(remove_deleted_image('image'), sender=SoftwareArtist)
