from django.db import models

class Player(models.Model):
	first_name = models.CharField(max_length = 40)
	last_name = models.CharField(max_length = 40)
	date_of_birth = models.DateField(verbose_name="YYYY-MM-DD")
	height_ft = models.PositiveIntegerField(default=6)
	height_in = models.PositiveIntegerField(default=5)
	email = models.EmailField(max_length = 254)
	phone_number = models.CharField(max_length=20, blank=True, null=True)
	position = models.CharField(max_length=50)
	is_registered = models.BooleanField(default= False)
	date_joined = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.player_firstname + " " + self.player_lastname

	# @property
	# def get_total_pts(self):
	# 	return GameStat.objects.filter(player=self.id).annotate(total_pts = sum('points'))
