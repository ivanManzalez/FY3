from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator
from teams.models.team import Team
from players.models.player import Player



class Season(models.Model):
  current_date = timezone.now()
  season_year = models.PositiveIntegerField(default=current_date.year, validators=[MaxValueValidator(current_date.year)])
<<<<<<< HEAD
  start_date = models.DateTimeField(default=timezone.now)
  end_date = models.DateTimeField(default=None, validators=[MinValueValidator(start_date)])

  # create awards table?
  champions = models.ForeignKey(Team, default = None, on_delete=models.CASCADE) 

  MVP = models.ForeignKey(Player, related_name='season_MVP',default = None, on_delete=models.CASCADE)
  FourthMOTY = models.ForeignKey(Player, related_name='season_4MOTY',default = None, on_delete=models.CASCADE)
  DPOY = models.ForeignKey(Player, related_name='season_DPOY',default = None, on_delete=models.CASCADE)
  ROTY = models.ForeignKey(Player, related_name='season_ROTY',default = None, on_delete=models.CASCADE)
  MDP = models.ForeignKey(Player, related_name='season_MDP',default = None, on_delete=models.CASCADE)
  AMVP = models.ForeignKey(Player, related_name='season_AMVP',default = None, on_delete=models.CASCADE)
  
  All_Off_First_01 = models.ForeignKey(Player, related_name='season_All_Off_1st_01', default = None, on_delete=models.CASCADE)
  All_Off_First_02 = models.ForeignKey(Player, related_name='season_All_Off_1st_02',default = None, on_delete=models.CASCADE)
  All_Off_First_03 = models.ForeignKey(Player, related_name='season_All_Off_1st_03',default = None, on_delete=models.CASCADE)
  
  All_Off_Second_01 = models.ForeignKey(Player, related_name='season_All_Off_2nd_01',default = None, on_delete=models.CASCADE)
  All_Off_Second_02 = models.ForeignKey(Player, related_name='season_All_Off_2nd_02',default = None, on_delete=models.CASCADE)
  All_Off_Second_03 = models.ForeignKey(Player, related_name='season_All_Off_2nd_03',default = None, on_delete=models.CASCADE)
  
  All_Off_Third_01 = models.ForeignKey(Player, related_name='season_All_Off_3rd_01',default = None, on_delete=models.CASCADE)
  All_Off_Third_02 = models.ForeignKey(Player, related_name='season_All_Off_3rd_02',default = None, on_delete=models.CASCADE)
  All_Off_Third_03 = models.ForeignKey(Player, related_name='season_All_Off_3rd_03',default = None, on_delete=models.CASCADE)

  All_Def_First_01 = models.ForeignKey(Player, related_name='season_All_Def_1st_01',default = None, on_delete=models.CASCADE)
  All_Def_First_02 = models.ForeignKey(Player, related_name='season_All_Def_1st_02',default = None, on_delete=models.CASCADE)
  All_Def_First_03 = models.ForeignKey(Player, related_name='season_All_Def_1st_03',default = None, on_delete=models.CASCADE)

  All_Def_Second_01 = models.ForeignKey(Player, related_name='season_All_Def_2nd_01',default = None, on_delete=models.CASCADE)
  All_Def_Second_02 = models.ForeignKey(Player, related_name='season_All_Def_2nd_02',default = None, on_delete=models.CASCADE)
  All_Def_Second_03 = models.ForeignKey(Player, related_name='season_All_Def_2nd_03',default = None, on_delete=models.CASCADE)

  All_Def_Third_01 = models.ForeignKey(Player, related_name='season_All_Def_3rd_01',default = None, on_delete=models.CASCADE)
  All_Def_Third_02 = models.ForeignKey(Player, related_name='season_All_Def_3rd_02',default = None, on_delete=models.CASCADE)
  All_Def_Third_03 = models.ForeignKey(Player, related_name='season_All_Def_3rd_03',default = None, on_delete=models.CASCADE)
=======
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
>>>>>>> dev

  def clean(self):
      if self.start_date and self.end_date and self.start_date > self.end_date:
          raise ValidationError("End date must be later than start date.")
  
  def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
