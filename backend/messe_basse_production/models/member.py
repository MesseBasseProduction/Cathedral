from django.db import models

from messe_basse_production.signals import remove_old_image, remove_deleted_image


class Member(models.Model):
    name = models.CharField(max_length=50)
    role = models.CharField(max_length=50)
    leader = models.BooleanField()
    active = models.BooleanField(default=True)
    image = models.ImageField(upload_to='images/member/')


models.signals.pre_save.connect(remove_old_image('image'), sender=Member)
models.signals.post_delete.connect(remove_deleted_image('image'), sender=Member)
