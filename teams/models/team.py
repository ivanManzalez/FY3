from django.db import models

DIVISIONS = [('E','East'),('W','West')]

class Team(models.Model):
	team_name = models.CharField(max_length = 40)
	abbr_name = models.CharField(max_length = 5, default = None)
	division_ind = models.CharField(max_length = 1, default = 'E',choices=DIVISIONS)
	
	is_active = models.BooleanField(default=False) #needed?
	date_founded = models.DateTimeField(auto_now_add=True)

	#TODO: Make season dynamic
	# @property
	# def get_team_wins(self):
	# 	return Game.objects.filter(season = 3, win_team= self.id).count()

	# @property
	# def get_team_losses(self):
	# 	return Game.objects.filter(season = 3, lose_team= self.id).count()

	# @property
	# def get_team_game_diff(self):
	# 	return self.get_team_wins - self.get_team_losses

	# @property
	# def get_team_tot_game(self):
	# 	return self.get_team_wins + self.get_team_losses

	def __str__(self):
		return self.team_name
