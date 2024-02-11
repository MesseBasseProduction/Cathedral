from rest_framework import serializers

from messe_basse_production.models import Video


class VideoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Video
        fields = (
            'id',
            'name',
            'artist',
            'date',
            'url'
        )
