# Generated by Django 5.0.2 on 2024-02-11 21:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messe_basse_production', '0006_rename_url_document_file'),
    ]

    operations = [
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('type', models.CharField(max_length=150)),
                ('creation', models.DateField()),
            ],
        ),
    ]
