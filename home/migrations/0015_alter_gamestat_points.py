# Generated by Django 4.1.5 on 2023-02-16 01:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0014_alter_gamestat_assists_alter_gamestat_blocks_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gamestat',
            name='points',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
