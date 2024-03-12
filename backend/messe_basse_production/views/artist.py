from rest_framework import viewsets

from app.pagination import ExtendedPageNumberPagination
from messe_basse_production.models import Artist
from messe_basse_production.serializers import ArtistSerializer


class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    pagination_class = ExtendedPageNumberPagination
