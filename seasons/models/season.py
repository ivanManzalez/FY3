from django.db import models
from django.utils import timezone
from django.forms import ValidationError
from teams.models import Team

class Season(models.Model):
  season_year = models.PositiveIntegerField(default=timezone.now().year)
  start_date = models.DateTimeField(default=timezone.now())
  end_date = models.DateTimeField(default=None, null=True)
  champions = models.ForeignKey(Team, default = None, null=True, on_delete=models.CASCADE)
  
  def clean(self):
      if self.start_date and self.end_date and self.start_date > self.end_date:
          raise ValidationError("End date must be later than start date.")
  
  def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

  def __str__(self):
    return str(self.season_year)
