import os


def remove_old_image(attr_name):
    def perform_action(sender, instance, **kwargs):
        try:
            old_image = getattr(sender.objects.get(id=instance.id), attr_name)
        except sender.DoesNotExist:
            old_image = None
        new_image = getattr(instance, attr_name)

        if not old_image or not new_image:
            return

        if old_image.path != new_image.path:
            if os.path.isfile(old_image.path):
                os.remove(old_image.path)

    return perform_action


def remove_deleted_image(attr_name):
    def perform_action(sender, instance, **kwargs):
        getattr(instance, attr_name).delete(save=False)

    return perform_action
