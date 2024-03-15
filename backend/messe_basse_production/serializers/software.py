from rest_framework import serializers

from messe_basse_production.models import Software, SoftwareDescription, SoftwareArtist
from messe_basse_production.signals import update_order
from messe_basse_production.validators import validate_image


class SoftwareDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftwareDescription
        fields = (
            'lang',
            'description',
        )


class SoftwareSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()
    descriptions = SoftwareDescriptionSerializer(many=True)

    class Meta:
        model = Software
        fields = (
            'id',
            'name',
            'image',
            'url',
            'descriptions',
            'order',
        )

    def to_representation(self, instance):
        self.fields['image'] = serializers.ImageField()
        return super().to_representation(instance)

    def create(self, validated_data):
        descriptions = validated_data.pop('descriptions')

        software = Software.objects.create(**validated_data)
        for description in descriptions:
            software.descriptions.create(**description)

        update_order.send(sender=Software, new_order=software.order + 1, exclude_id=software.id)

        return software

    def update(self, instance, validated_data):
        if 'descriptions' in validated_data:
            descriptions = validated_data.pop('descriptions')
            instance.descriptions.all().delete()
            for description in descriptions:
                instance.descriptions.create(**description)

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
                sender=Software,
                new_order=new_order,
                order_min=order_min,
                order_max=order_max,
                exclude_id=instance.id,
            )

        return instance_updated

    def validate_image(self, image):
        return validate_image(image)


class SoftwareArtistSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField()

    class Meta:
        model = SoftwareArtist
        fields = (
            'id',
            'name',
            'image',
            'url',
            'order',
        )

    def to_representation(self, instance):
        self.fields['image'] = serializers.ImageField()
        return super().to_representation(instance)

    def create(self, validated_data):
        software_artist = super().create(validated_data)
        update_order.send(sender=SoftwareArtist, new_order=software_artist.order + 1, exclude_id=software_artist.id)
        return software_artist

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
                sender=SoftwareArtist,
                new_order=new_order,
                order_min=order_min,
                order_max=order_max,
                exclude_id=instance.id,
            )

        return instance_updated

    def validate_image(self, image):
        return validate_image(image, expected_size=(1920, 1080), expected_ratio=1920 / 1080)
