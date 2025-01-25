from django.db import models

from messe_basse_production.models.common import DescriptionModel, LinkModel
from messe_basse_production.signals import remove_old_image, remove_deleted_image


class Podcast(models.Model):
    name = models.CharField(max_length=50)


class PodcastDescription(DescriptionModel):
    podcast = models.ForeignKey(Podcast, on_delete=models.CASCADE, related_name='descriptions')


class PodcastEpisode(models.Model):
    podcast = models.ManyToManyField(Podcast, related_name='podcasts')
    title = models.CharField(max_length=150)
    catalog = models.CharField(max_length=150)
    date = models.DateField()
    image = models.ImageField(upload_to='images/podcast')
    link = models.URLField()


models.signals.pre_save.connect(remove_old_image('image'), sender=PodcastEpisode)
models.signals.post_delete.connect(remove_deleted_image('image'), sender=PodcastEpisode)


class PodcastEpisodeDescription(DescriptionModel):
    podcast_episode = models.ForeignKey(PodcastEpisode, on_delete=models.CASCADE, related_name='descriptions')


class PodcastEpisodeLink(LinkModel):
    podcast_episode = models.ForeignKey(PodcastEpisode, on_delete=models.CASCADE, related_name='links')
