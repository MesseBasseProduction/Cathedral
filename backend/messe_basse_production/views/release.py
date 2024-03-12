from rest_framework import viewsets
from rest_framework.exceptions import NotFound

from app.pagination import ExtendedPageNumberPagination
from messe_basse_production.models import Release, Artist
from messe_basse_production.serializers import ReleaseSerializer, ArtistReleaseSerializer


class ReleaseViewSet(viewsets.ModelViewSet):
    queryset = Release.objects.all()
    serializer_class = ReleaseSerializer
    pagination_class = ExtendedPageNumberPagination


class ArtistReleaseViewSet(viewsets.ModelViewSet):
    serializer_class = ArtistReleaseSerializer
    pagination_class = ExtendedPageNumberPagination

    def get_queryset(self):
        return Release.objects.filter(artist=self.kwargs['artist_pk'])

    def get_serializer_context(self):
        context = super().get_serializer_context()

        try:
            artist = Artist.objects.get(pk=self.kwargs['artist_pk'])
            context['artist'] = artist
        except Artist.DoesNotExist:
            raise NotFound("Artist not found")

        return context
