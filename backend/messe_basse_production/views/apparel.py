from rest_framework import viewsets

from app.pagination import ExtendedPageNumberPagination
from messe_basse_production.models import Apparel
from messe_basse_production.serializers import ApparelSerializer


class ApparelViewSet(viewsets.ModelViewSet):
    queryset = Apparel.objects.all()
    serializer_class = ApparelSerializer
    pagination_class = ExtendedPageNumberPagination
