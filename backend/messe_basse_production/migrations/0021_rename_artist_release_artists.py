# Generated by Django 5.0.3 on 2024-03-15 10:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messe_basse_production', '0020_remove_release_artist_names'),
    ]

    operations = [
        migrations.RenameField(
            model_name='release',
            old_name='artist',
            new_name='artists',
        ),
    ]