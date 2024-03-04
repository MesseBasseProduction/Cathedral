from rest_framework import viewsets
from rest_framework.exceptions import NotFound

from app.pagination import ExtendedPageNumberPagination
from messe_basse_production.models import Exposition, ExpositionPhoto
from messe_basse_production.serializers import ExpositionSerializer, ExpositionPhotoSerializer


class ExpositionViewSet(viewsets.ModelViewSet):
    queryset = Exposition.objects.all()
    serializer_class = ExpositionSerializer
    pagination_class = ExtendedPageNumberPagination


class ExpositionPhotoViewSet(viewsets.ModelViewSet):
    serializer_class = ExpositionPhotoSerializer

    def get_queryset(self):
        return ExpositionPhoto.objects.filter(exposition=self.kwargs['exposition_pk'])

    def get_serializer_context(self):
        context = super().get_serializer_context()

        try:
            exposition = Exposition.objects.get(pk=self.kwargs['exposition_pk'])
            context['exposition'] = exposition
        except Exposition.DoesNotExist:
            raise NotFound("Exposition not found")

        return context
