# Generated by Django 5.0.2 on 2024-02-11 21:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messe_basse_production', '0005_rename_path_document_url'),
    ]

    operations = [
        migrations.RenameField(
            model_name='document',
            old_name='url',
            new_name='file',
        ),
    ]
