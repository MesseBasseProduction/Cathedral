from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from messe_basse_production.models import Organization, Member, Document
from messe_basse_production.serializers.contact import ContactSerializer


class ContactView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        data = {
            'organization': Organization.objects.first(),
            'leaders': Member.objects.filter(active=True, leader=True),
            'members': Member.objects.filter(active=True, leader=False),
            'pastMembers': Member.objects.filter(active=False),
            'documents': Document.objects.all()
        }

        serializer = ContactSerializer(data)

        return Response(serializer.data)
