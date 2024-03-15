from rest_framework import serializers

from messe_basse_production.serializers.artist import ArtistSerializer
from messe_basse_production.serializers.event_photo import EventPhotoSerializer
from messe_basse_production.serializers.exposition import ExpositionExtendedSerializer
from messe_basse_production.serializers.release import CreationReleaseSerializer
from messe_basse_production.serializers.software import SoftwareSerializer, SoftwareArtistSerializer
from messe_basse_production.serializers.video import VideoSerializer


class CreationMusicSerializer(serializers.Serializer):
    artists = ArtistSerializer(many=True)
    releases = CreationReleaseSerializer(many=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        releases = representation.pop('releases')
        representation['releases'] = dict([(release.pop('catalog'), release) for release in releases])

        return representation


class CreationPhotoSerializer(serializers.Serializer):
    exposition = ExpositionExtendedSerializer(many=True)
    event = EventPhotoSerializer(many=True)


class CreationSoftware(serializers.Serializer):
    creation = SoftwareSerializer(many=True)
    artists = SoftwareArtistSerializer(many=True)


class CreationSerializer(serializers.Serializer):
    music = CreationMusicSerializer()
    video = VideoSerializer(many=True)
    photo = CreationPhotoSerializer()
    software = CreationSoftware()
