from rest_framework import serializers
from .models.season import Season

# in order to map DB values to JSON values
class SeasonSerializer(serializers.ModelSerializer):
  class Meta:
    model = Season
    fields = (
      'id',
      'season_year',
      'start_date',
      'end_date',
      'champions',
    )
  
class SeasonAwardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Season
    fields = (
      'mvp',
      'fourth_moty',
      'dpoy',
      'roty',
      'mdp',
      'amvp',
      'all_off_first_1',
      'all_off_first_2',
      'all_off_first_3',
      'all_off_second_1',
      'all_off_second_2',
      'all_off_second_3',
      'all_off_third_1',
      'all_off_third_2',
      'all_off_third_3',
      'all_def_first_1',
      'all_def_first_2',
      'all_def_first_3',
      'all_def_second_1',
      'all_def_second_2',
      'all_def_second_3',
      'all_def_third_1',
      'all_def_third_2',
      'all_def_third_3',
    )

# in order to map JSON values to python format
class CreateSeasonSerializer(serializers.ModelSerializer):
  class Meta:
    model = Season
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'season_year',
      'start_date',
    )
