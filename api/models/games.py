from django.db import models
from . import teams, seasons

class Game(models.Model):
  home_team = ForeignKey(teams.Team, on_delete=models.CASCADE)
  away_team = ForeignKey(teams.Team, on_delete=models.CASCADE)
  season = ForeignKey(seasons.Season, on_delete=models.CASCADE)
  game_date = models.DateField(verbose_name="YYYY-MM-DD")
