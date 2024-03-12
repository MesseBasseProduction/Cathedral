# Generated by Django 5.0.3 on 2024-03-04 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messe_basse_production', '0012_exposition_alter_document_file_expositionphoto'),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('catalog', models.CharField(max_length=150)),
                ('image', models.ImageField(upload_to='images/album/')),
                ('regular_price', models.CharField(max_length=150)),
                ('signed_price', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Apparel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('designer', models.CharField(max_length=150)),
                ('type', models.CharField(max_length=150)),
                ('catalog', models.CharField(max_length=150)),
                ('price', models.CharField(max_length=50)),
                ('image', models.ImageField(upload_to='images/apparel/')),
            ],
        ),
    ]