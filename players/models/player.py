from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Player(models.Model):
	first_name = models.CharField(max_length = 255)
	last_name = models.CharField(max_length = 255)
	date_of_birth = models.DateField(verbose_name="YYYY-MM-DD", null=True)
	fav_player = models.CharField(max_length = 255, blank=True, null=True)
	experience = models.CharField(max_length = 255, blank=True, null=True)
	profile_pic_loc = models.CharField(max_length = 255, blank=True, null=True)
	
	# Current Height/Weight - Modifiable ########### 
	height_ft = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(8)])
	height_in = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(12)])
	weight = models.IntegerField(default=150, validators=[MinValueValidator(0)], help_text="Weight in lbs")
	# place_of_birth = models.CharField(max_length = 255, null=True)
	
	### Move to User Model #############
	# email = models.EmailField(max_length = 254, null=True) 
	# phone_number = models.CharField(max_length=20, blank=True, null=True) 
	# position = models.CharField(max_length=50, null=True) 
	is_registered = models.BooleanField(default= True) 
	# date_joined = models.DateTimeField(auto_now_add=True) 

	def __str__(self):
		return self.first_name + " " + self.last_name

	def save(self, *args, **kwargs):
		# self.clean_names()
		super().save(*args, **kwargs)
