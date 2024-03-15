from rest_framework import serializers

from messe_basse_production.serializers.document import DocumentSerializer
from messe_basse_production.serializers.member import ContactMemberSerializer
from messe_basse_production.serializers.organization import OrganizationSerializer


class ContactSerializer(serializers.Serializer):
    organization = OrganizationSerializer()
    leaders = ContactMemberSerializer(many=True)
    members = ContactMemberSerializer(many=True)
    pastMembers = ContactMemberSerializer(many=True)
    documents = DocumentSerializer(many=True)
