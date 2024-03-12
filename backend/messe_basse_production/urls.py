from django.urls import path, include
from rest_framework_nested import routers

from messe_basse_production.views import MemberViewSet, DocumentViewSet, OrganizationViewSet, VideoViewSet, \
    EventViewSet, EventPhotoViewSet, ExpositionViewSet, ExpositionPhotoViewSet, AlbumViewSet, ApparelViewSet, \
    SoftwareViewSet, SoftwareArtistViewSet, ArtistViewSet, ArtistReleaseViewSet, ReleaseViewSet

router = routers.DefaultRouter()
router.register(r'album', AlbumViewSet, basename='album')
router.register(r'apparel', ApparelViewSet, basename='apparel')
router.register(r'document', DocumentViewSet, basename='document')
router.register(r'event', EventViewSet, basename='event')
router.register(r'event-photo', EventPhotoViewSet, basename='event-photo')
router.register(r'member', MemberViewSet, basename='member')
router.register(r'release', ReleaseViewSet, basename='release')
router.register(r'software', SoftwareViewSet, basename='software')
router.register(r'software-artist', SoftwareArtistViewSet, basename='software-artist')
router.register(r'video', VideoViewSet, basename='video')

router.register(r'artist', ArtistViewSet, basename='artist')
artist_router = routers.NestedDefaultRouter(router, r'artist', lookup='artist')
artist_router.register(r'release', ArtistReleaseViewSet, basename='artist-release')

router.register(r'exposition', ExpositionViewSet, basename='exposition')
exposition_router = routers.NestedDefaultRouter(router, r'exposition', lookup='exposition')
exposition_router.register(r'photo', ExpositionPhotoViewSet, basename='exposition-photo')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(exposition_router.urls)),
    path('', include(artist_router.urls)),
    path(r'organization/', OrganizationViewSet.as_view(), name='organization'),
]
