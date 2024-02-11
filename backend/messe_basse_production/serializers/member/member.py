import base64
import io
import uuid

from PIL import Image
from rest_framework import serializers

from app.serializers.common import ReadOnlyModelSerializer
from messe_basse_production.models import Member
from messe_basse_production.services.image import resize_image, compress_image


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
        b64 = base64.b64decode(image[image.find('base64,') + len('base64,'):])  # Keep only base64 information
        buffer = io.BytesIO(b64)
        image = Image.open(buffer)

        width, height = image.size
        if width != height:
            raise serializers.ValidationError('ERROR_IMG_RATIO')
        if width < 512 or height < 512:
            raise serializers.ValidationError('ERROR_MIN_SIZE')

        return compress_image(resize_image(image), name=f'${uuid.uuid4().hex}.webp')
