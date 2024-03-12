from rest_framework import viewsets

from app.pagination import ExtendedPageNumberPagination
from messe_basse_production.models import Video
from messe_basse_production.serializers import VideoSerializer


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    pagination_class = ExtendedPageNumberPagination
