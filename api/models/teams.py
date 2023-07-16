from django.db import models
from django.core.validators import MinValueValidator

class Team(models.Model):
  short_name = models.CharField(max_length = 40)
  long_name = models.CharField(max_length = 255)
  # REGIONS = [('E','East'),('W','West')] ## Use Brampton regions
  year_found = models.IntegerField(default=2019 ,validators=[MinValueValidator(2019)])
  region = models.CharField(max_length = 255)