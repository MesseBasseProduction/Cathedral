from rest_framework import viewsets

from app.pagination import ExtendedPageNumberPagination
from messe_basse_production.models import Album
from messe_basse_production.serializers import AlbumSerializer


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    pagination_class = ExtendedPageNumberPagination
