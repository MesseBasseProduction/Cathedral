# Generated by Django 5.0.3 on 2024-03-14 20:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messe_basse_production', '0017_release_releaselink'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='eventphoto',
            options={'ordering': ('order',)},
        ),
        migrations.AlterModelOptions(
            name='expositionphoto',
            options={'ordering': ('order',)},
        ),
        migrations.AlterModelOptions(
            name='release',
            options={'ordering': ('-date',)},
        ),
        migrations.AlterModelOptions(
            name='software',
            options={'ordering': ('order',)},
        ),
        migrations.AlterModelOptions(
            name='softwareartist',
            options={'ordering': ('order',)},
        ),
    ]
