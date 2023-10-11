from django.db import models

class Event(models.Model):
  name = models.TextField(null=False)
  date = models.DateField(verbose_name="YYYY-MM-DD", null=False)
  start_time = models.TimeField(verbose_name="HH:MM:SS", null=False)
  end_time = models.TimeField(verbose_name="HH:MM:SS", null=True)
  street_number = models.PositiveIntegerField(default=1295, null=False)
  street_name = models.TextField(default="Williams Pkwy", null=False)
  city = models.TextField(default="Brampton", null=False)
  # weather?

  def __str__(self):
    address = str(self.street_number) + " " + self.street_name 
    date_time = str(self.date) +" " + str(self.start_time) +" EST"
    return address +", "+ self.city +", "+ date_time

