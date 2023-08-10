from django.db import models
import datetime
from django.core.validators import MaxValueValidator
from django.forms import ValidationError
from players.models import Player
from teams.models import Team


current_date = datetime.date.today()

class Season(models.Model):
  season_year = models.PositiveIntegerField(default=current_date.year, validators=[MaxValueValidator(current_date.year)])
  start_date = models.DateTimeField(default=current_date)
  end_date = models.DateTimeField(default=None)
  
  champions = models.ForeignKey(Team, default = None, on_delete=models.CASCADE)
  
  # create awards table? 

  # MVP = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # FourthMOTY = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # DPOY = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # ROTY = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # MDP = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # AMVP = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  
  # All_Off_First_01 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # All_Off_First_02 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # All_Off_First_03 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  
  # All_Off_Second_01 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # All_Off_Second_02 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # All_Off_Second_03 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  
  # All_Off_Third_01 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # All_Off_Third_02 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # All_Off_Third_03 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)

  # All_Def_First_01 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # All_Def_First_02 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # All_Def_First_03 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)

  # All_Def_Second_01 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # All_Def_Second_02 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # All_Def_Second_03 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)

  # All_Def_Third_01 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # All_Def_Third_02 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)
  # All_Def_Third_03 = models.ForeignKey(Player, default = None, on_delete=models.CASCADE)

  def clean(self):
      if self.start_date and self.end_date and self.start_date > self.end_date:
          raise ValidationError("End date must be later than start date.")
  
  def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)