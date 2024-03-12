import base64
import io
import uuid

from PIL import Image
from rest_framework import serializers

from messe_basse_production.services.image import resize_image, compress_image


def validate_image(image, expected_size=None, expected_ratio=None):
    b64 = base64.b64decode(image[image.find('base64,') + len('base64,'):])  # Keep only base64 information
    buffer = io.BytesIO(b64)
    image = Image.open(buffer)
    width, height = image.size

    if expected_size:
        expected_width, expected_height = expected_size
        if width < expected_width or height < expected_height:
            raise serializers.ValidationError('ERROR_MIN_SIZE')

        image = resize_image(image, expected_size)

    # expected_ratio should be calculated with expected_width / expected_height
    if expected_ratio and width / height != expected_ratio:
        raise serializers.ValidationError('ERROR_IMG_RATIO')

    return compress_image(image, name=f'${uuid.uuid4().hex}.webp')
