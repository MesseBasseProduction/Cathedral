from rest_framework import serializers

from messe_basse_production.serializers.album import AlbumSerializer
from messe_basse_production.serializers.apparel import ApparelSerializer


class MerchSerializer(serializers.Serializer):
    apparel = ApparelSerializer(many=True)
    albums = AlbumSerializer(many=True)
