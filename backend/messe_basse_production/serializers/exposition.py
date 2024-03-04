import base64
import io
import uuid

from PIL import Image
from rest_framework import serializers

from messe_basse_production.models import Exposition, ExpositionPhoto
from messe_basse_production.services.image import compress_image


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
        b64 = base64.b64decode(image[image.find('base64,') + len('base64,'):])  # Keep only base64 information
        buffer = io.BytesIO(b64)
        image = Image.open(buffer)

        return compress_image(image, name=f'${uuid.uuid4().hex}.webp')
