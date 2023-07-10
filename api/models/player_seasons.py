from django.db import models
from . import players, seasons, teams

class PlayerSeason(models.Model):
  player = ForeignKey(players.Player, on_delete=models.CASCADE)
  season = ForeignKey(seasons.Season, on_delete=models.CASCADE)
  team = ForeignKey(teams.Team, on_delete=models.CASCADE)
  