from django.db import models
from . import players, games

class GameStat(models.Model):
  player = ForeignKey(players.Player, on_delete=models.CASCADE)
  game = ForeignKey(games.Game, on_delete=models.CASCADE)
  pts = models.IntegerField(default=0, validators=[MinValueValidator(0)])
  ast = models.IntegerField(default=0, validators=[MinValueValidator(0)])
  reb = models.IntegerField(default=0, validators=[MinValueValidator(0)])
  stl = models.IntegerField(default=0, validators=[MinValueValidator(0)])
  blk = models.IntegerField(default=0, validators=[MinValueValidator(0)])
  
