from rest_framework import serializers

from messe_basse_production.models import Software, SoftwareDescription, SoftwareArtist
from messe_basse_production.validators import validate_image


class SoftwareDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftwareDescription
        fields = (
            'lang',
            'description',
        )


class SoftwareSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()
    descriptions = SoftwareDescriptionSerializer(many=True)

    class Meta:
        model = Software
        fields = (
            'id',
            'name',
            'image',
            'url',
            'descriptions',
        )

    def to_representation(self, instance):
        self.fields['image'] = serializers.ImageField()
        return super().to_representation(instance)

    def create(self, validated_data):
        descriptions = validated_data.pop('descriptions')

        software = Software.objects.create(**validated_data)
        for description in descriptions:
            software.descriptions.create(**description)

        return software

    def update(self, instance, validated_data):
        if 'descriptions' in validated_data:
            descriptions = validated_data.pop('descriptions')
            instance.descriptions.all().delete()
            for description in descriptions:
                instance.descriptions.create(**description)

        return super().update(instance, validated_data)

    def validate_image(self, image):
        return validate_image(image, expected_size=(1920, 1080), expected_ratio=1920 / 1080)


class SoftwareArtistSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()

    class Meta:
        model = SoftwareArtist
        fields = (
            'id',
            'name',
            'image',
            'url',
        )

    def to_representation(self, instance):
        self.fields['image'] = serializers.ImageField()
        return super().to_representation(instance)

    def validate_image(self, image):
        return validate_image(image, expected_size=(1920, 1080), expected_ratio=1920 / 1080)
