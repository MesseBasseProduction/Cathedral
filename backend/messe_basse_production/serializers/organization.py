from rest_framework import serializers

from messe_basse_production.models import Organization


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = (
            'name',
            'type',
            'creation'
        )
