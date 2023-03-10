# Generated by Django 4.1.5 on 2023-02-10 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_alter_player_player_height_ft_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Season',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('season_name', models.CharField(default='', max_length=6)),
            ],
        ),
        migrations.AddField(
            model_name='player',
            name='part_of_team',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='player',
            name='player_paid_ind',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='player',
            name='player_height_ft',
            field=models.IntegerField(default=6),
        ),
    ]
