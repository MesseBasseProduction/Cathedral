from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from app.pagination import ExtendedPageNumberPagination
from messe_basse_production.models import Event
from messe_basse_production.serializers import EventSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    pagination_class = ExtendedPageNumberPagination
    permission_classes = [IsAuthenticatedOrReadOnly]
