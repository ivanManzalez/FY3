# Generated by Django 4.1.5 on 2023-06-25 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0020_delete_teamstat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='game_date',
            field=models.DateField(verbose_name='YYYY-MM-DD'),
        ),
    ]
