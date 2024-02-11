from rest_framework import viewsets

from app.pagination import ExtendedPageNumberPagination
from messe_basse_production.models import Document
from messe_basse_production.serializers.document import DocumentSerializer, DocumentPostOrPatchSerializer


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    pagination_class = ExtendedPageNumberPagination

    def get_serializer_class(self):
        if self.action in ['create', 'partial_update', 'update']:
            return DocumentPostOrPatchSerializer
        else:
            return DocumentSerializer
