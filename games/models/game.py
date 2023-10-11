from django.db import models
from players.models.player import Player
from teams.models.team import Team
from seasons.models.season import Season
from events.models.event import Event

class Game(models.Model):
  season = models.ForeignKey(Season, on_delete = models.PROTECT)
  event = models.ForeignKey(Event, on_delete=models.CASCADE, default = None, null=True, blank=False)
  
  home_team = models.ForeignKey(Team, related_name = 'home_team', default = None, on_delete = models.PROTECT)
  home_player_01 = models.ForeignKey(Player, related_name = 'home_player_01', default = None, null=True, blank=True, on_delete = models.PROTECT)
  home_player_02 = models.ForeignKey(Player, related_name = 'home_player_02', default = None, null=True, blank=True, on_delete = models.PROTECT)
  home_player_03 = models.ForeignKey(Player, related_name = 'home_player_03', default = None, null=True, blank=True, on_delete = models.PROTECT)
  home_player_04 = models.ForeignKey(Player, related_name = 'home_player_04', default = None, null=True, blank=True, on_delete = models.PROTECT)
  home_player_05 = models.ForeignKey(Player, related_name = 'home_player_05', default = None, null=True, blank=True, on_delete = models.PROTECT)

  away_team = models.ForeignKey(Team, related_name = 'away_team', default = None, on_delete = models.PROTECT)
  away_player_01 = models.ForeignKey(Player, related_name = 'away_player_01', default = None, null=True, blank=True, on_delete = models.PROTECT)
  away_player_02 = models.ForeignKey(Player, related_name = 'away_player_02', default = None, null=True, blank=True, on_delete = models.PROTECT)
  away_player_03 = models.ForeignKey(Player, related_name = 'away_player_03', default = None, null=True, blank=True, on_delete = models.PROTECT)
  away_player_04 = models.ForeignKey(Player, related_name = 'away_player_04', default = None, null=True, blank=True, on_delete = models.PROTECT)
  away_player_05 = models.ForeignKey(Player, related_name = 'away_player_05', default = None, null=True, blank=True, on_delete = models.PROTECT)

    
  def __str__(self):
    return str(self.season) +" : "+ str(self.home_team) +" v "+ str(self.away_team)
	