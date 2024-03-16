from django.db.models import Max
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from messe_basse_production.models import Artist, Release, Video, Exposition, EventPhoto, Software, SoftwareArtist
from messe_basse_production.serializers import CreationSerializer


class CreationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        data = {
            'music': {
                'artists':
                    Artist.objects
                    .exclude(releases=None)
                    .annotate(most_recent_release=Max('releases__date'))
                    .order_by('-most_recent_release'),
                'releases': Release.objects.all(),
            },
            'video': Video.objects.all(),
            'photo': {
                'exposition': Exposition.objects.all(),
                'event': EventPhoto.objects.all(),
            },
            'software': {
                'creation': Software.objects.all(),
                'artists': SoftwareArtist.objects.all(),
            },
        }

        serializer = CreationSerializer(data)
        return Response(serializer.data)
