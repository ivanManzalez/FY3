from django.db import models
from .season import Season
from players.models import Player

class SeasonAwards(models.Model):
  season = models.ForeignKey(Season, default = None, on_delete=models.CASCADE)

  mvp = models.ForeignKey(Player, default = None, on_delete=models.CASCADE, related_name="mvp_award", help_text="Most Valuable Player")
  fourth_moty = models.ForeignKey(Player, default = None, on_delete=models.CASCADE, related_name="fourth_moty_award", help_text="Fourth Man of the Year")
  dpoy = models.ForeignKey(Player, default = None, on_delete=models.CASCADE, related_name="dpoy_award", help_text="Defensive Player of the Year")
  roty = models.ForeignKey(Player, default = None, on_delete=models.CASCADE, related_name="roty_award", help_text="Rookie of the Year")
  mdp = models.ForeignKey(Player, default = None, on_delete=models.CASCADE, related_name="mdp_award", help_text="Most Disrespected Player")
  amvp = models.ForeignKey(Player, default = None, on_delete=models.CASCADE, related_name="amvp_award", help_text="All-Star MVP")
  
  all_off_first_1 = models.ForeignKey(Player, default = None, related_name="all_off_first_award1", on_delete=models.CASCADE)
  all_off_first_2 = models.ForeignKey(Player, default = None, related_name="all_off_first_award2", on_delete=models.CASCADE)
  all_off_first_3 = models.ForeignKey(Player, default = None, related_name="all_off_first_award3", on_delete=models.CASCADE)
  
  all_off_second_1 = models.ForeignKey(Player, default = None, related_name="all_off_second_award1", on_delete=models.CASCADE)
  all_off_second_2 = models.ForeignKey(Player, default = None, related_name="all_off_second_award2", on_delete=models.CASCADE)
  all_off_second_3 = models.ForeignKey(Player, default = None, related_name="all_off_second_award3",  on_delete=models.CASCADE)
  
  all_off_third_1 = models.ForeignKey(Player, default = None, related_name="all_off_third_award1", on_delete=models.CASCADE)
  all_off_third_2 = models.ForeignKey(Player, default = None, related_name="all_off_third_award2", on_delete=models.CASCADE)
  all_off_third_3 = models.ForeignKey(Player, default = None, related_name="all_off_third_award3", on_delete=models.CASCADE)

  all_def_first_1 = models.ForeignKey(Player, default = None, related_name="all_def_first_award1", on_delete=models.CASCADE)
  all_def_first_2 = models.ForeignKey(Player, default = None, related_name="all_def_first_award2", on_delete=models.CASCADE)
  all_def_first_3 = models.ForeignKey(Player, default = None, related_name="all_def_first_award3", on_delete=models.CASCADE)

  all_def_second_1 = models.ForeignKey(Player, default = None, related_name="all_def_second_award1", on_delete=models.CASCADE)
  all_def_second_2 = models.ForeignKey(Player, default = None, related_name="all_def_second_award2", on_delete=models.CASCADE)
  all_def_second_3 = models.ForeignKey(Player, default = None, related_name="all_def_second_award3", on_delete=models.CASCADE)

  all_def_third_1 = models.ForeignKey(Player, default = None, related_name="all_def_third_award1", on_delete=models.CASCADE)
  all_def_third_2 = models.ForeignKey(Player, default = None, related_name="all_def_third_award2", on_delete=models.CASCADE)
  all_def_third_3 = models.ForeignKey(Player, default = None, related_name="all_def_third_award3", on_delete=models.CASCADE)
