from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Player(models.Model):
	first_name = models.CharField(max_length = 255)
	last_name = models.CharField(max_length = 255)
	date_of_birth = models.DateField(verbose_name="YYYY-MM-DD", null=True)
	
	# Move to STP Model? ########### 
	height_ft = models.PositiveIntegerField(default=5, validators=[MinValueValidator(0), MaxValueValidator(8)])
	height_in = models.PositiveIntegerField(default=6, validators=[MinValueValidator(0), MaxValueValidator(12)])
	weight = models.IntegerField(default=150, validators=[MinValueValidator(0)], help_text="Weight in lbs")
	origin = models.CharField(max_length = 255, null=True)
	
	### Move to User Model ? #############
	email = models.EmailField(max_length = 254, null=True) 
	phone_number = models.CharField(max_length=20, blank=True, null=True) 
	position = models.CharField(max_length=50, null=True) 
	is_registered = models.BooleanField(default= False) 
	date_joined = models.DateTimeField(auto_now_add=True) 

	def __str__(self):
		return self.first_name + " " + self.last_name

	def clean_names(self):
		space_in_first = (" " in self.first_name)
		space_in_last = (" " in self.last_name)

		if space_in_last:
			self.last_name = self.last_name.strip().replace(" ", "_")
		if space_in_first:
			self.first_name = self.first_name.strip().replace(" ", "_")

	def save(self, *args, **kwargs):
		self.clean_names()
		super().save(*args, **kwargs)
