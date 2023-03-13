from django.db import models


#################################################################################
# Player names, physical characteristics, and registration status
# TODO: eligible_voter? Role?

class Player(models.Model):
	# Player ID will be auto generated, no need to define 
	player_firstname = models.CharField(max_length = 40)
	player_lastname = models.CharField(max_length = 40)
	player_height_in = models.PositiveIntegerField(default=5)
	player_height_ft = models.PositiveIntegerField(default=6)
	is_registered = models.BooleanField(default= False)

	def __str__(self):
		return self.player_firstname +" "+self.player_lastname

	@property
	def get_total_pts(self):
		return GameStat.objects.filter(player=self.id).annotate(total_pts = sum('points'))

#################################################################################
# Team Name and division indicator
# TODO: Team Cpt? 

class Team(models.Model):
	curr_season = 3 #S2023
	# Team ID will be auto generated, no need to define 
	DIVISIONS = [('E','East'),('W','West')]
	team_name = models.CharField(max_length = 40)
	division_ind = models.CharField(max_length = 1, default = 'E',choices=DIVISIONS)

	#TODO: Make season dynamic
	@property
	def get_team_wins(self):
		return Game.objects.filter(season = 3, win_team= self.id).count()

	@property
	def get_team_losses(self):
		return Game.objects.filter(season = 3, lose_team= self.id).count()

	@property
	def get_team_game_diff(self):
		return self.get_team_wins - self.get_team_losses

	@property
	def get_team_tot_game(self):
		return self.get_team_wins + self.get_team_losses

	def __str__(self):
		return self.team_name

#################################################################################
# Season Name 
# TODO: Season Awards?

class Season(models.Model):
	# Season ID will be auto generated, no need to define 
 	season_name = models.CharField(max_length = 6, default="")
 	
 	def __str__(self):
 		return self.season_name



#################################################################################
# Season Team and Player combinations 
# TODO: 
class STP(models.Model):
 	season= models.ForeignKey(Season, on_delete=models.CASCADE)
 	team = models.ForeignKey(Team, on_delete=models.CASCADE)
 	player = models.ForeignKey(Player, on_delete=models.CASCADE)
 	
 	def __str__(self):
 		return str(self.season) +" | "+str(self.team)+" | "+str(self.player)
	

#################################################################################
class Game(models.Model):
	game_date = models.DateField(help_text="YYYY-MM-DD")
	season = models.ForeignKey(Season, on_delete = models.PROTECT)
	win_team = models.ForeignKey(Team, related_name = 'winning_team', on_delete = models.PROTECT)
	lose_team = models.ForeignKey(Team, related_name = 'losing_team', on_delete = models.PROTECT)

	def __str__(self):
		return str(self.season) +" | "+ str(self.game_date) +" | "+ str(self.win_team) +" v "+ str(self.lose_team)
	
#################################################################################
class GameStat(models.Model):
	## field/col in db
	game = models.ForeignKey(Game, on_delete = models.PROTECT)
	player = models.ForeignKey(Player, on_delete = models.PROTECT)
	points = models.PositiveIntegerField(default=0)
	rebounds = models.PositiveIntegerField(default=0)
	assists = models.PositiveIntegerField(default=0)
	steals = models.PositiveIntegerField(default=0)
	blocks = models.PositiveIntegerField(default=0)

	def __str__(self):
		return str(self.game) + " - " + str(self.player)

	def player_stats_exists(game_id, player_id):
		exists = (GameStat.objects.filter(game = game_id, player = player_id).count() == 1)
		return exists

#################################################################################



