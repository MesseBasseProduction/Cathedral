from django.db import models


class Exposition(models.Model):
    photographer = models.CharField(max_length=150)
    title = models.CharField(max_length=150)
    url = models.URLField()


def get_exposition_photo_path(instance, filename):
    return f'images/expositions/{instance.exposition.pk}/{filename}'


class ExpositionPhoto(models.Model):
    exposition = models.ForeignKey(Exposition, on_delete=models.CASCADE, related_name='photos')
    title = models.CharField(max_length=150)
    date = models.DateField()
    image = models.ImageField(upload_to=get_exposition_photo_path)
    order = models.PositiveIntegerField(default=1)
