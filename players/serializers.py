from rest_framework import serializers
from .models.player import Player

# in order to map DB values to JSON values
class PlayerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Player
    fields = (
      'id',
      'first_name', 
      'last_name', 
      'date_of_birth',
      'height_ft',
      'height_in',
      'weight',
      'origin',
      'email',
      'phone_number',
      'position',
      'is_registered',
      'origin',
    )

# in order to map JSON values to python format
class CreatePlayerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Player
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'id',
      'first_name', 
      'last_name', 
      'date_of_birth',
      'height_ft',
      'height_in',
      'weight',
      'origin',
      'email',
      'phone_number',
      'position',
      'is_registered',
      'origin',
    )
