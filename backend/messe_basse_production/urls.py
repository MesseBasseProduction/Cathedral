from django.urls import path, include
from rest_framework import routers

from messe_basse_production.views import MemberViewSet

router = routers.DefaultRouter()
router.register(r'member', MemberViewSet, basename='member')

urlpatterns = [
    path('', include(router.urls)),
]
