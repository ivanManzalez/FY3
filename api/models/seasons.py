from django.db import models

class Season(models.Model):
  season_name = models.CharField(max_length = 6, default="")