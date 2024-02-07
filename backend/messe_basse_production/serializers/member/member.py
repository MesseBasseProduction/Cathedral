from rest_framework import serializers

from app.serializers.common import ReadOnlyModelSerializer
from messe_basse_production.models.member import Member


class MemberSerializer(ReadOnlyModelSerializer):
    class Meta:
        model = Member
        fields = (
            'id',
            'name',
            'role',
            'leader',
            'active',
        )


class MemberPostOrPatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = (
            'name',
            'role',
            'leader',
            'active',
        )

    def to_representation(self, instance):
        return MemberSerializer(instance).data
