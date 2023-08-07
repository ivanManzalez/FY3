from django.db import models

class Season(models.Model):
  season_name = models.CharField(max_length = 6, default="")
  is_current = models.BooleanField(default=False)
 	
  def __str__(self):
    return self.season_name
