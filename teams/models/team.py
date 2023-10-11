from django.db import models

DIVISIONS = [('E','East'),('W','West')]

class Team(models.Model):
	team_name = models.CharField(max_length = 40)
	abbr_name = models.CharField(max_length = 5, default = None)
	division_ind = models.CharField(max_length = 1, default = 'E',choices=DIVISIONS)
	
	is_active = models.BooleanField(default=False)
	date_founded = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.team_name
