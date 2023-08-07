from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Player(models.Model):
	first_name = models.CharField(max_length = 255)
	last_name = models.CharField(max_length = 255)
	date_of_birth = models.DateField(verbose_name="YYYY-MM-DD", null=True)
	height_ft = models.PositiveIntegerField(default=5, validators=[MinValueValidator(0), MaxValueValidator(8)])
	height_in = models.PositiveIntegerField(default=6, validators=[MinValueValidator(0), MaxValueValidator(12)])
	weight_lbs = models.IntegerField(default=150, validators=[MinValueValidator(0)])
	origin = models.CharField(max_length = 255, null=True)
	email = models.EmailField(max_length = 254, null=True)
	phone_number = models.CharField(max_length=20, blank=True, null=True)
	position = models.CharField(max_length=50, null=True)
	is_registered = models.BooleanField(default= False)
	date_joined = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.player_firstname + " " + self.player_lastname

	# @property
	# def get_total_pts(self):
	# 	return GameStat.objects.filter(player=self.id).annotate(total_pts = sum('points'))
