from rest_framework import serializers

from messe_basse_production.models import EventPhoto
from messe_basse_production.signals import update_order
from messe_basse_production.validators import validate_image


class EventPhotoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()

    class Meta:
        model = EventPhoto
        fields = (
            'id',
            'name',
            'photographer',
            'image',
            'url',
            'order',
        )

    def to_representation(self, instance):
        self.fields['image'] = serializers.ImageField()
        return super().to_representation(instance)

    def create(self, validated_data):
        event_photo = super().create(validated_data)
        update_order.send(sender=EventPhoto, new_order=event_photo.order + 1, exclude_id=event_photo.id)
        return event_photo

    def update(self, instance, validated_data):
        order_changed = False
        if instance.order != validated_data.get('order'):
            order_changed = True
            if instance.order > validated_data.get('order'):
                order_min, order_max, new_order = validated_data.get('order'), instance.order, validated_data.get(
                    'order') + 1
            else:
                order_min, order_max, new_order = instance.order, validated_data.get('order'), instance.order

        instance_updated = super().update(instance, validated_data)

        if order_changed:
            update_order.send(
                sender=EventPhoto,
                new_order=new_order,
                order_min=order_min,
                order_max=order_max,
                exclude_id=instance.id
            )

        return instance_updated

    def validate_image(self, image):
        return validate_image(image)
