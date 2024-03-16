from rest_framework import viewsets, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from app.pagination import ExtendedPageNumberPagination
from messe_basse_production.models import Artist
from messe_basse_production.serializers import ArtistSerializer


class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    pagination_class = ExtendedPageNumberPagination

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.releases.exists():
            raise PermissionDenied('ARTIST_RELEASE_ERROR')

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
