from rest_framework import serializers

from messe_basse_production.models import Album
from messe_basse_production.validators import validate_image


class AlbumSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()

    class Meta:
        model = Album
        fields = (
            'id',
            'name',
            'catalog',
            'image',
            'regular_price',
            'signed_price',
        )

    def to_representation(self, instance):
        self.fields['image'] = serializers.ImageField()
        representation = super().to_representation(instance)
        representation['price'] = {
            'regular': representation.pop('regular_price'),
            'signed': representation.pop('signed_price'),
        }
        return representation

    def validate_image(self, image):
        return validate_image(image, (500, 349), 500 / 349)
