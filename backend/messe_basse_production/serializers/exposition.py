from rest_framework import serializers

from messe_basse_production.models import Exposition, ExpositionPhoto
from messe_basse_production.validators import validate_image


class ExpositionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Exposition
        fields = (
            'id',
            'title',
            'photographer',
            'url'
        )


class ExpositionPhotoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()

    class Meta:
        model = ExpositionPhoto
        fields = (
            'id',
            'title',
            'date',
            'image'
        )

    def create(self, validated_data):
        validated_data['exposition'] = self.context['exposition']
        return super().create(validated_data)

    def validate_image(self, image):
        return validate_image(image)
