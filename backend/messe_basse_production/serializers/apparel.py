from rest_framework import serializers

from messe_basse_production.models import Apparel
from messe_basse_production.validators import validate_image


class ApparelSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()

    class Meta:
        model = Apparel
        fields = (
            'id',
            'name',
            'designer',
            'type',
            'catalog',
            'price',
            'image',
        )

    def to_representation(self, instance):
        self.fields['image'] = serializers.ImageField()
        return super().to_representation(instance)

    def validate_image(self, image):
        return validate_image(image, (500, 349))
