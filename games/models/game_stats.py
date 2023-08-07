from django.db import models
from players.models.player import Player
from .game import Game

class GameStats(models.Model):
  game = models.ForeignKey(Game, on_delete = models.PROTECT)
  player = models.ForeignKey(Player, on_delete = models.PROTECT)
  points = models.PositiveIntegerField(default=0)
  rebounds = models.PositiveIntegerField(default=0)
  assists = models.PositiveIntegerField(default=0)
  steals = models.PositiveIntegerField(default=0)
  blocks = models.PositiveIntegerField(default=0)

  def __str__(self):
    return str(self.game) + " - " + str(self.player)

  def player_stats_exists(game_id, player_id):
    exists = (GameStats.objects.filter(game = game_id, player = player_id).count() == 1)
    return exists
