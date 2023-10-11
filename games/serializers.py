from rest_framework import serializers
from .models.game import Game

# in order to map DB values to JSON values
class GameSerializer(serializers.ModelSerializer):
  class Meta:
    model = Game
    fields = (
      'id',
      'season',
      'event',
      'home_team',
      'home_player_01',
      'home_player_02',
      'home_player_03',
      'home_player_04',
      'home_player_05',
      'away_team',
      'away_player_01',
      'away_player_02',
      'away_player_03',
      'away_player_04',
      'away_player_05',
    )

# in order to map JSON values to python format
class CreateGameSerializer(serializers.ModelSerializer):
  class Meta:
    print('\nCreateGameSerializer\n')
    model = Game
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'season',
      'event',
      'home_team',
      'away_team',
    )
