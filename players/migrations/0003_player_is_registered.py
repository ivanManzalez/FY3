# Generated by Django 4.1.5 on 2023-10-19 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('players', '0002_remove_player_date_joined_remove_player_email_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='is_registered',
            field=models.BooleanField(default=True),
        ),
    ]
