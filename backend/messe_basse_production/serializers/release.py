from rest_framework import serializers

from messe_basse_production.models import ReleaseLink, Release, Artist
from messe_basse_production.serializers import ArtistSerializer
from messe_basse_production.validators import validate_image


class ReleaseLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleaseLink
        fields = (
            'type',
            'url',
        )


class BaseReleaseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()
    artistNames = serializers.ListSerializer(child=serializers.CharField(max_length=100), source='artist_names')
    mainLink = serializers.URLField(source='main_link')
    links = ReleaseLinkSerializer(many=True)

    def create(self, validated_data):
        links = validated_data.pop('links')
        release = Release.objects.create(**validated_data)
        for link in links:
            release.links.create(**link)

        return release

    def update(self, instance, validated_data):
        if 'links' in validated_data:
            links = validated_data.pop('links')
            instance.links.all().delete()
            for link in links:
                instance.links.create(**link)

        return super().update(instance, validated_data)

    def to_representation(self, instance):
        self.fields['image'] = serializers.ImageField()
        return super().to_representation(instance)

    def validate_image(self, image):
        return validate_image(image, (512, 512), 1)


class ArtistReleaseSerializer(BaseReleaseSerializer):
    class Meta:
        model = Release
        fields = (
            'id',
            'name',
            'catalog',
            'image',
            'date',
            'mainLink',
            'artistNames',
            'links',
        )

    def create(self, validated_data):
        validated_data['artist'] = self.context.get('artist')
        return super().create(validated_data)


class ReleaseSerializer(BaseReleaseSerializer):
    artist = ArtistSerializer(read_only=True)
    artistId = serializers.PrimaryKeyRelatedField(
        source='artist',
        queryset=Artist.objects.all(),
        write_only=True
    )

    class Meta:
        model = Release
        fields = (
            'id',
            'name',
            'catalog',
            'image',
            'date',
            'mainLink',
            'artistNames',
            'links',
            'artist',
            'artistId',
        )
