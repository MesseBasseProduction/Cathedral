from rest_framework import viewsets
from rest_framework.exceptions import NotFound

from app.pagination import ExtendedPageNumberPagination
from messe_basse_production.models import Podcast, PodcastEpisode
from messe_basse_production.serializers import PodcastSerializer, PodcastEpisodeSerializer


class PodcastViewSet(viewsets.ModelViewSet):
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer
    pagination_class = ExtendedPageNumberPagination


class PodcastEpisodeViewSet(viewsets.ModelViewSet):
    serializer_class = PodcastEpisodeSerializer
    pagination_class = ExtendedPageNumberPagination

    def get_queryset(self):
        return PodcastEpisode.objects.filter(podcasts__id=self.kwargs['podcast_pk'])

    def get_serializer_context(self):
        context = super().get_serializer_context()

        try:
            podcast = Podcast.objects.get(pk=self.kwargs['podcast_pk'])
            context['podcast'] = podcast
        except Podcast.DoesNotExist:
            raise NotFound('Podcast not found')

        return context
