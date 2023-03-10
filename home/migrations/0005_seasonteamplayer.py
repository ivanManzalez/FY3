# Generated by Django 4.1.5 on 2023-02-13 04:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_rename_player_paid_ind_player_player_paid'),
    ]

    operations = [
        migrations.CreateModel(
            name='SeasonTeamPlayer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.player')),
                ('season_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.season')),
                ('team_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.team')),
            ],
        ),
    ]
