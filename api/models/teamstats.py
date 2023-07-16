from django.db import models
from . import teams, games

class GameStat(models.Model):
  team = ForeignKey(teams.Player, on_delete=models.CASCADE)
  game = ForeignKey(games.Game, on_delete=models.CASCADE)
  
  
