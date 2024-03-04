from rest_framework import serializers

from messe_basse_production.models import EventPhoto
from messe_basse_production.validators import validate_image


class EventPhotoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()

    class Meta:
        model = EventPhoto
        fields = (
            'id',
            'name',
            'photographer',
            'image',
            'url',
        )

    def validate_image(self, image):
        return validate_image(image)
