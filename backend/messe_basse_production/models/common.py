from django.db import models


class LangEnum(models.TextChoices):
    EN = 'EN'
    FR = 'FR'
