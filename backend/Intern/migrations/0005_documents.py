# Generated by Django 5.1.2 on 2024-11-14 09:55

import cloudinary.models
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Intern', '0004_alter_country_continent'),
    ]

    operations = [
        migrations.CreateModel(
            name='Documents',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resume', cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='resume')),
                ('passport', cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='passport')),
                ('admission_letter', cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='admission_letter')),
                ('visa', cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='visa')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]