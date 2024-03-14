from rest_framework import serializers

from messe_basse_production.models import Member
from messe_basse_production.validators import validate_image


class MemberSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()

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

    def to_representation(self, instance):
        self.fields['image'] = serializers.ImageField()
        return super().to_representation(instance)

    def validate_image(self, image):
        return validate_image(image, (512, 512), 1)
