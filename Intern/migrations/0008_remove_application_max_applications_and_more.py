# Generated by Django 5.1.2 on 2024-11-20 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Intern', '0007_alter_internship_employer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='application',
            name='max_applications',
        ),
        migrations.AddField(
            model_name='internship',
            name='max_applications',
            field=models.PositiveIntegerField(default=15),
        ),
    ]