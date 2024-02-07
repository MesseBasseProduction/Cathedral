from rest_framework import viewsets

from app.pagination import ExtendedPageNumberPagination
from messe_basse_production.models.member import Member
from messe_basse_production.serializers.member import MemberPostOrPatchSerializer, MemberSerializer


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    pagination_class = ExtendedPageNumberPagination

    def get_serializer_class(self):
        if self.action in ['create', 'partial_update', 'update']:
            return MemberPostOrPatchSerializer
        else:
            return MemberSerializer