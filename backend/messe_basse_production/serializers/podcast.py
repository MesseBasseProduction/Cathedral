from rest_framework import serializers

from messe_basse_production.models import PodcastEpisodeLink, PodcastDescription, Podcast, PodcastEpisodeDescription, \
    PodcastEpisode
from messe_basse_production.validators import validate_image


class PodcastDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PodcastDescription
        fields = (
            'lang',
            'description',
        )


class PodcastSerializer(serializers.ModelSerializer):
    descriptions = PodcastDescriptionSerializer(many=True)

    class Meta:
        model = Podcast
        fields = (
            'id',
            'name',
            'descriptions',
        )

    def create(self, validated_data):
        descriptions = validated_data.pop('descriptions')

        podcast = Podcast.objects.create(**validated_data)
        for description in descriptions:
            PodcastDescription.objects.create(podcast=podcast, **description)

        return podcast

    def update(self, instance, validated_data):
        if 'descriptions' in validated_data:
            descriptions = validated_data.pop('descriptions')
            instance.descriptions.all().delete()
            for description in descriptions:
                PodcastDescription.objects.create(podcast=instance, **description)

        return super().update(instance, validated_data)


class PodcastEpisodeDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PodcastEpisodeDescription
        fields = (
            'lang',
            'description',
        )


class PodcastEpisodeLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = PodcastEpisodeLink
        fields = (
            'type',
            'url',
        )


class PodcastEpisodeSerializer(serializers.ModelSerializer):
    descriptions = PodcastEpisodeDescriptionSerializer(many=True)
    links = PodcastEpisodeLinkSerializer(many=True)

    class Meta:
        model = PodcastEpisode
        fields = (
            'id',
            'title',
            'catalog',
            'date',
            'image',
            'link',
            'descriptions',
            'links',
        )

    def to_representation(self, instance):
        self.fields['image'] = serializers.ImageField()
        return super().to_representation(instance)

    def create(self, validated_data):
        descriptions = validated_data.pop('descriptions')
        links = validated_data.pop('links')

        podcast_episode = PodcastEpisode.objects.create(**validated_data)
        for description in descriptions:
            PodcastEpisodeDescription.objects.create(podcast_episode=podcast_episode, **description)

        for link in links:
            PodcastEpisodeLink.objects.create(podcast_episode=podcast_episode, **link)

        podcast_episode.podcasts.add(self.context.get('podcast'))

        return podcast_episode

    def update(self, instance, validated_data):
        if 'descriptions' in validated_data:
            descriptions = validated_data.pop('descriptions')
            instance.descriptions.all().delete()
            for description in descriptions:
                PodcastEpisodeDescription.objects.create(podcast=instance, **description)

        if 'links' in validated_data:
            links = validated_data.pop('links')
            instance.links.all().delete()
            for link in links:
                PodcastEpisodeLink.objects.create(podcast=instance, **link)

        return super().update(instance, validated_data)

    def validate_image(self, image):
        return validate_image(image, (1024, 525), 1024 / 525)
