from rest_framework import serializers

from app.serializers.common import ReadOnlyModelSerializer
from messe_basse_production.models import Member
from messe_basse_production.validators import validate_image


class MemberSerializer(ReadOnlyModelSerializer):
    class Meta:
        model = Member
        fields = (
            'id',
            'name',
            'role',
            'leader',
            'active',
            'image',
        )


class MemberPostOrPatchSerializer(serializers.ModelSerializer):
    image = serializers.CharField()

    class Meta:
        model = Member
        fields = (
            'name',
            'role',
            'leader',
            'active',
            'image',
        )

    def to_representation(self, instance):
        return MemberSerializer(instance).data

    def validate_image(self, image):
        return validate_image(image, (512, 512), 1)
