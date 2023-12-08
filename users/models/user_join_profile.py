from django.db import models
from players.models.player import Player
from django.contrib.auth.models import User

class UserJoinPlayer(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  player = models.OneToOneField(Player, on_delete=models.CASCADE, null=True, blank=True)
  firebase_id = models.CharField(primary_key=True, max_length=40, default="", unique=True)  # Use CharField for a unique string ID
  
  class Meta:
    unique_together = ('user', 'player')