from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Player(models.Model):
  player_first = models.CharField(max_length = 255)
  player_last = models.CharField(max_length = 255)
  player_height_in = models.IntegerField(default=5 ,validators=[MinValueValidator(0)])
  player_height_ft = models.IntegerField(default=6, validators=[MaxValueValidator(11), MinValueValidator(0)])
  player_weight_lbs = models.IntegerField(default=150, validators=[MinValueValidator(0)])
  player_weight_kgs = models.IntegerField(default=50, validators=[MinValueValidator(0)])
  origin = models.CharField(max_length = 255)
  age = models.PositiveIntegerField(default=23)