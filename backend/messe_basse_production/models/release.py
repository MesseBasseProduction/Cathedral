from django.contrib.postgres.fields import ArrayField
from django.db import models

from messe_basse_production.models.artist import Artist
from messe_basse_production.models.common import LinkEnum
from messe_basse_production.signals import remove_old_image, remove_deleted_image


class Release(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='releases')
    artist_names = ArrayField(models.CharField(max_length=100))
    name = models.CharField(max_length=150)
    catalog = models.CharField(max_length=150)
    date = models.DateField()
    image = models.ImageField(upload_to='images/release')
    main_link = models.URLField()

    class Meta:
        ordering = ('-date',)


models.signals.pre_save.connect(remove_old_image('image'), sender=Release)
models.signals.post_delete.connect(remove_deleted_image('image'), sender=Release)


class ReleaseLink(models.Model):
    release = models.ForeignKey(Release, on_delete=models.CASCADE, related_name='links')
    type = models.CharField(max_length=2, choices=LinkEnum)
    url = models.URLField()
