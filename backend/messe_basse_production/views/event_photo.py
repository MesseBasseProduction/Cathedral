from rest_framework import viewsets

from app.pagination import ExtendedPageNumberPagination
from messe_basse_production.models import EventPhoto
from messe_basse_production.serializers import EventPhotoSerializer


class EventPhotoViewSet(viewsets.ModelViewSet):
    queryset = EventPhoto.objects.all()
    serializer_class = EventPhotoSerializer
    pagination_class = ExtendedPageNumberPagination
