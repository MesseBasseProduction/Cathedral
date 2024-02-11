from django.urls import path, include
from rest_framework import routers

from messe_basse_production.views import MemberViewSet, DocumentViewSet, OrganizationViewSet

router = routers.DefaultRouter()
router.register(r'document', DocumentViewSet, basename='document')
router.register(r'member', MemberViewSet, basename='member')

urlpatterns = [
    path('', include(router.urls)),
    path(r'organization/', OrganizationViewSet.as_view(), name='organization'),
]
