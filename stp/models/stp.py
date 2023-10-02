from django.db import models
from seasons.models import Season
from teams.models import Team
from players.models import Player
from django.core.validators import MinValueValidator, MaxValueValidator

class Stp(models.Model):
  season = models.ForeignKey(Season, default = None, null=True, on_delete=models.CASCADE)
  team = models.ForeignKey(Team, default = None, null=True, on_delete=models.CASCADE)
  player = models.ForeignKey(Player, default = None, null=True, on_delete=models.CASCADE)
  weight = models.PositiveIntegerField(default=150)
  height_ft = models.PositiveIntegerField(default=5, validators=[MinValueValidator(0), MaxValueValidator(8)])
  height_in = models.PositiveIntegerField(default=7, validators=[MinValueValidator(0), MaxValueValidator(12)])

  class Meta:
    unique_together = ('season', 'team', 'player')
