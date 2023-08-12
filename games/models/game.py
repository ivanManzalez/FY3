from django.db import models
from teams.models.team import Team
from seasons.models.season import Season

class Game(models.Model):
  played_on = models.DateField(verbose_name="YYYY-MM-DD")
  season = models.ForeignKey(Season, on_delete = models.PROTECT)
  win_team = models.ForeignKey(Team, related_name = 'winning_team', on_delete = models.PROTECT)
  lose_team = models.ForeignKey(Team, related_name = 'losing_team', on_delete = models.PROTECT)

  def __str__(self):
    return str(self.season) +" | "+ str(self.game_date) +" | "+ str(self.win_team) +" v "+ str(self.lose_team)
	