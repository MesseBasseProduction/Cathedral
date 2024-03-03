from rest_framework import serializers

from app.serializers.common import ReadOnlyModelSerializer
from messe_basse_production.models import Document


# Todo : merge two serializer
class DocumentSerializer(ReadOnlyModelSerializer):
    class Meta:
        model = Document
        fields = (
            'id',
            'name',
            'date',
            'file',
        )


class DocumentPostOrPatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = (
            'name',
            'date',
            'file',
        )

    def to_representation(self, instance):
        return DocumentSerializer(instance).data
