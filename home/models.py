from django.db import models

class Player(models.Model):
	## field/col in db
	# player_id = models.IntegerField(primary_key=True)
	# Player ID will be auto generated, no need to define 
	player_firstname = models.CharField(max_length = 40)
	player_lastname = models.CharField(max_length = 40)
	player_height_in = models.IntegerField(default=5)
	player_height_ft = models.IntegerField(default=6)
	player_paid = models.BooleanField(default= False)
	part_of_team = models.BooleanField(default = False)
	
	def __str__(self):
		return self.player_firstname +" "+self.player_lastname
	
	def set_part_of_team_true(self):
		self.part_of_team = True


class Team(models.Model):
	## field/col in db
	# team_id = models.CharField(primary_key=True, max_length = 10)
	# Team ID will be auto generated, no need to define 
	team_name = models.CharField(max_length = 40)
	
	def __str__(self):
		return self.team_name


class Season(models.Model):
# 	## field/col in db
# 	# season_id = models.AutoField(primary_key=True, default = 1)
 	season_name = models.CharField(max_length = 6, default="")
 	
 	def __str__(self):
 		return self.season_name

class SeasonTeamPlayer(models.Model):
 	season_id = models.ForeignKey(Season, on_delete=models.CASCADE)
 	team_id = models.ForeignKey(Team, on_delete=models.CASCADE)
 	player_id = models.ForeignKey(Player, on_delete=models.CASCADE)

	# def __str__(self):
 # 		return self.season_id +" "+self.team_id+" "+self.player_id

# class Games(models.Model):
# 	## field/col in db
# 	game_id = models.BigAutoField(primary_key=True)
# 	games_name = models.CharField(max_length = 120)
# 	game_date = models.DateField(help_text="YYYY-MM-DD EST")
# 	season_id = models.ForeignKey(Seasons, on_delete = models.PROTECT)
# 	win_team_id = models.ForeignKey(Teams, on_delete = models.PROTECT)
# 	lose_team_id = models.ForeignKey(Teams, on_delete = models.PROTECT)

# class GameStats(models.Model):
# 	## field/col in db
# 	game_id = models.IntegerField(primary_key=True)
# 	player_id = models.ForeignKey(Players, on_delete = models.PROTECT)
# 	points = models.IntegerField(default=0)
# 	rebounds = models.IntegerField(default=0)
# 	assists = models.IntegerField(default=0)
# 	steals = models.IntegerField(default=0)
# 	blocks = models.IntegerField(default=0)




