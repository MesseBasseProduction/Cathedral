from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from messe_basse_production.models import Organization
from messe_basse_production.serializers import OrganizationSerializer


class OrganizationViewSet(APIView):
    def get(self, request, *args, **kwargs):
        organization = Organization.objects.first()

        if not organization:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = OrganizationSerializer(organization)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        instance = Organization.objects.first()

        if instance:
            serializer = OrganizationSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            response_status = status.HTTP_200_OK
        else:
            serializer = OrganizationSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            response_status = status.HTTP_201_CREATED

        return Response(serializer.data, status=response_status)
