from rest_framework import serializers

from messe_basse_production.serializers import OrganizationSerializer, DocumentSerializer
from messe_basse_production.serializers.member import ContactMemberSerializer


class ContactSerializer(serializers.Serializer):
    organization = OrganizationSerializer()
    leaders = ContactMemberSerializer(many=True)
    members = ContactMemberSerializer(many=True)
    pastMembers = ContactMemberSerializer(many=True)
    documents = DocumentSerializer(many=True)
