# Generated by Django 4.1.5 on 2023-10-02 20:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seasons', '0010_alter_season_start_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='season',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 10, 2, 20, 12, 6, 874626, tzinfo=datetime.timezone.utc)),
        ),
    ]
