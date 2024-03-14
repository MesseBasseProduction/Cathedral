from rest_framework import serializers

from messe_basse_production.models import Artist, ArtistDescription, ArtistLink
from messe_basse_production.validators import validate_image


class ArtistDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistDescription
        fields = (
            'lang',
            'description',
        )


class ArtistLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistLink
        fields = (
            'type',
            'url',
        )


class ArtistSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()
    mainLink = serializers.URLField(source='main_link')
    descriptions = ArtistDescriptionSerializer(many=True)
    links = ArtistLinkSerializer(many=True)

    class Meta:
        model = Artist
        fields = (
            'id',
            'name',
            'image',
            'genres',
            'mainLink',
            'descriptions',
            'links',
        )

    def to_representation(self, instance):
        self.fields['image'] = serializers.ImageField()
        return super().to_representation(instance)

    def create(self, validated_data):
        descriptions = validated_data.pop('descriptions')
        links = validated_data.pop('links')

        artist = Artist.objects.create(**validated_data)
        for description in descriptions:
            artist.descriptions.create(**description)

        for link in links:
            artist.links.create(**link)

        return artist

    def update(self, instance, validated_data):
        if 'descriptions' in validated_data:
            descriptions = validated_data.pop('descriptions')
            instance.descriptions.all().delete()
            for description in descriptions:
                instance.descriptions.create(**description)

        if 'links' in validated_data:
            links = validated_data.pop('links')
            instance.links.all().delete()
            for link in links:
                instance.links.create(**link)

        return super().update(instance, validated_data)

    def validate_image(self, image):
        return validate_image(image, (910, 512), 910 / 512)
