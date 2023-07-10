from rest_framework import serializers
from ..models.players import Player

print("This is Player: ",Player)

# in order to map DB values to JSON values
class PlayerSerializer(serializers.ModelSerializer):
  # data about the data
  class Meta:
    model = Player
    fields = (
      'id',
      'player_first', 
      'player_last', 
      'player_height_in',
      'player_height_ft',
      'origin',
      'age')

# in order to map JSON values to python format
class CreatePlayerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Player
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'player_first', 
      'player_last', 
      'player_height_in',
      'player_height_ft',
      'origin',
      'age')

################## 