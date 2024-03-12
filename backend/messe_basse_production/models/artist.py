from django.contrib.postgres.fields import ArrayField
from django.db import models

from messe_basse_production.models.common import LangEnum, LinkEnum
from messe_basse_production.signals import remove_old_image, remove_deleted_image


class Artist(models.Model):
    name = models.CharField(max_length=150)
    image = models.ImageField(upload_to='images/artist')
    genres = ArrayField(models.CharField(max_length=50))
    main_link = models.URLField()


models.signals.pre_save.connect(remove_old_image('image'), sender=Artist)
models.signals.post_delete.connect(remove_deleted_image('image'), sender=Artist)


class ArtistDescription(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='descriptions')
    lang = models.CharField(max_length=2, choices=LangEnum)
    description = models.TextField()


class ArtistLink(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='links')
    type = models.CharField(max_length=2, choices=LinkEnum)
    url = models.URLField()
