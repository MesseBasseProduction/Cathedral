from django.db import models


class LangEnum(models.TextChoices):
    ENGLISH = 'EN'
    FRENCH = 'FR'


class LinkEnum(models.TextChoices):
    AMAZON = 'AM'
    APPLE = 'AP'
    BANDCAMP = 'BC'
    DEEZER = 'DZ'
    DISCOGS = 'DC'
    FACEBOOK = 'FB'
    FLICKR = 'FL'
    GITHUB = 'GH'
    INSTAGRAM = 'IG'
    LINKEDIN = 'LI'
    MIXCLOUD = 'MC'
    SOUNDCLOUD = 'SC'
    SPOTIFY = 'SP'
    TIDAL = 'TD'
    TWITTER = 'TW'
    YOUTUBE = 'YT'
