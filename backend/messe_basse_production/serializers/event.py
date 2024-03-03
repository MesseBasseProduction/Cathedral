import base64
import io
import uuid

from PIL import Image
from rest_framework import serializers

from messe_basse_production.models import Event, EventDescription, EventParticipant
from messe_basse_production.services.image import compress_image, resize_image


class EventDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventDescription
        fields = (
            'lang',
            'description',
        )


class EventParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventParticipant
        fields = (
            'name',
            'url',
        )


class EventSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    descriptions = EventDescriptionSerializer(many=True)
    participants = EventParticipantSerializer(many=True)
    image = serializers.CharField()

    class Meta:
        model = Event
        fields = (
            'id',
            'name',
            'catalog',
            'image',
            'date',
            'place',
            'link',
            'descriptions',
            'participants'
        )

    def create(self, validated_data):
        descriptions = validated_data.pop('descriptions')
        participants = validated_data.pop('participants')

        event = Event.objects.create(**validated_data)
        for description in descriptions:
            EventDescription.objects.create(event=event, **description)

        for participant in participants:
            EventParticipant.objects.create(event=event, **participant)

        return event

    def update(self, instance, validated_data):
        if 'descriptions' in validated_data:
            descriptions = validated_data.pop('descriptions')
            instance.descriptions.all().delete()
            for description in descriptions:
                EventDescription.objects.create(event=instance, **description)

        if 'participants' in validated_data:
            participants = validated_data.pop('participants')
            instance.participants.all().delete()
            for participant in participants:
                EventParticipant.objects.create(event=instance, **participant)

        return super().update(instance, validated_data)

    def validate_image(self, image):
        b64 = base64.b64decode(image[image.find('base64,') + len('base64,'):])  # Keep only base64 information
        buffer = io.BytesIO(b64)
        image = Image.open(buffer)

        width, height = image.size
        if width < 1024 or height < 525:
            raise serializers.ValidationError('ERROR_MIN_SIZE')

        # Todo : add validation on image size
        return compress_image(resize_image(image, (1024, 525)), name=f'${uuid.uuid4().hex}.webp')
