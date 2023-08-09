# Generated by Django 4.1.5 on 2023-08-07 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teams', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='team',
            old_name='created_on',
            new_name='date_founded',
        ),
        migrations.AddField(
            model_name='team',
            name='abbr_name',
            field=models.CharField(default=None, max_length=5),
        ),
    ]