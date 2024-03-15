from django.db import models

from messe_basse_production.signals import remove_old_image, remove_deleted_image


class Document(models.Model):
    name = models.CharField(max_length=50)
    file = models.FileField(upload_to='document/')
    date = models.DateField()

    class Meta:
        ordering = ('-date',)


models.signals.pre_save.connect(remove_old_image('file'), sender=Document)
models.signals.post_delete.connect(remove_deleted_image('file'), sender=Document)
