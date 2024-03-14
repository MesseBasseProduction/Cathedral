from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from messe_basse_production.models import Apparel, Album
from messe_basse_production.serializers import MerchSerializer


class MerchView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, **kwargs):
        data = {
            'apparel': Apparel.objects.all(),
            'albums': Album.objects.all(),
        }

        serializer = MerchSerializer(data)
        return Response(serializer.data)
