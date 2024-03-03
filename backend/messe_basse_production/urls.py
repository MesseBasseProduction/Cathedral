from django.urls import path, include
from rest_framework import routers

from messe_basse_production.views import MemberViewSet, DocumentViewSet, OrganizationViewSet, VideoViewSet, \
    EventViewSet, EventPhotoViewSet

router = routers.DefaultRouter()
router.register(r'document', DocumentViewSet, basename='document')
router.register(r'event', EventViewSet, basename='event')
router.register(r'event-photo', EventPhotoViewSet, basename='event-photo')
router.register(r'member', MemberViewSet, basename='member')
router.register(r'video', VideoViewSet, basename='video')

urlpatterns = [
    path('', include(router.urls)),
    path(r'organization/', OrganizationViewSet.as_view(), name='organization'),
]
