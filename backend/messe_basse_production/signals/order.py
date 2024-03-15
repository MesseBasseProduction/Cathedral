from django.dispatch import Signal


def perform_order_update(
        sender,
        new_order,
        exclude_id=None,
        order_min=None,
        order_max=None,
        query_filter=None,
        **kwargs):
    queryset = sender.objects.all()

    if exclude_id:
        queryset = queryset.exclude(id=exclude_id)

    if query_filter:
        queryset = queryset.filter(query_filter)

    if order_min:
        queryset = queryset.exclude(order__lt=order_min)

    if order_max:
        queryset = queryset.exclude(order__gt=order_max)

    items_to_update = queryset.in_bulk().values()
    for item in items_to_update:
        item.order = new_order
        new_order += 1

    sender.objects.bulk_update(items_to_update, fields=['order'], batch_size=100)


update_order = Signal()
update_order.connect(perform_order_update)
