from rest_framework import viewsets

from app.pagination import ExtendedPageNumberPagination
from messe_basse_production.models import Software, SoftwareArtist
from messe_basse_production.serializers import SoftwareSerializer, SoftwareArtistSerializer


class SoftwareViewSet(viewsets.ModelViewSet):
    queryset = Software.objects.all()
    serializer_class = SoftwareSerializer
    pagination_class = ExtendedPageNumberPagination


class SoftwareArtistViewSet(viewsets.ModelViewSet):
    queryset = SoftwareArtist.objects.all()
    serializer_class = SoftwareArtistSerializer
    pagination_class = ExtendedPageNumberPagination
