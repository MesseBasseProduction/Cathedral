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
        return super().to_representation(instance)

    def validate_image(self, image):
        return validate_image(image, (500, 349))
