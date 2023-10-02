from django.db import models
from seasons.models import Season
from teams.models import Team
from players.models import Player

class Stp(models.Model):
  season = models.ForeignKey(Season, default = None, null=True, on_delete=models.CASCADE)
  team = models.ForeignKey(Team, default = None, null=True, on_delete=models.CASCADE)
  player = models.ForeignKey(Player, default = None, null=True, on_delete=models.CASCADE)
  weight = models.IntegerField()
  height = models.IntegerField()
  
  class Meta:
    unique_together = ('season', 'team', 'player')