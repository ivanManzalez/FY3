from django.db import models
import datetime

current_date = datetime.date.today()

class PlayerSeason(models.Model):
  player = models.ForeignKey('Player', null=False, on_delete=models.CASCADE)
  team = models.ForeignKey('Team', null=False, on_delete=models.CASCADE)
  # height_ft = models.PositiveIntegerField(default=5, validators=[MinValueValidator(0), MaxValueValidator(8)])
  # height_in = models.PositiveIntegerField(default=6, validators=[MinValueValidator(0), MaxValueValidator(12)])
  # weight = models.IntegerField(default=150, validators=[MinValueValidator(0)], help_text="Weight in lbs")
   
  season_year = models.PositiveIntegerField(default=current_date.year)
  date_start = models.DateTimeField(default=current_date)

  
  
