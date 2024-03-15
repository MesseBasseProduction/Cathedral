from django.db.models import Q
from rest_framework import serializers

from messe_basse_production.models import Exposition, ExpositionPhoto
from messe_basse_production.signals import update_order
from messe_basse_production.validators import validate_image


class ExpositionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Exposition
        fields = (
            'id',
            'title',
            'photographer',
            'url'
        )


class ExpositionPhotoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()

    class Meta:
        model = ExpositionPhoto
        fields = (
            'id',
            'title',
            'date',
            'image',
            'order',
        )

    def to_representation(self, instance):
        self.fields['image'] = serializers.ImageField()
        return super().to_representation(instance)

    def create(self, validated_data):
        validated_data['exposition'] = self.context['exposition']
        exposition_photo = super().create(validated_data)
        update_order.send(sender=ExpositionPhoto, new_order=exposition_photo.order + 1, exclude_id=exposition_photo.id,
                          query_filter=Q(exposition=self.context['exposition']))
        return exposition_photo

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
                sender=ExpositionPhoto,
                new_order=new_order,
                order_min=order_min,
                order_max=order_max,
                exclude_id=instance.id,
                query_filter=Q(exposition=self.context['exposition'])
            )

        return instance_updated

    def validate_image(self, image):
        return validate_image(image)


class ExpositionExtendedSerializer(serializers.ModelSerializer):
    photos = ExpositionPhotoSerializer(many=True)

    class Meta:
        model = Exposition
        fields = (
            'id',
            'title',
            'photographer',
            'url',
            'photos',
        )
