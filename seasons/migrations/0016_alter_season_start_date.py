# Generated by Django 4.1.5 on 2023-12-06 04:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seasons', '0015_alter_season_start_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='season',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 12, 6, 4, 44, 5, 631013, tzinfo=datetime.timezone.utc)),
        ),
    ]
