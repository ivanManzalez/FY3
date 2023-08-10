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
      'MVP' 
      'FourthMOTY'
      'DPOY' ,
      'ROT',
      'MDP' ,
      'AMVP' ,
      'All_Off_First_01' ,
      'All_Off_First_02' ,
      'All_Off_First_03' ,
      
      'All_Off_Second_01' ,
      'All_Off_Second_02' ,
      'All_Off_Second_03' ,
      
      'All_Off_Third_01' ,
      'All_Off_Third_02' ,
      'All_Off_Third_03' ,
      
      'All_Def_First_01' ,
      'All_Def_First_02' ,
      'All_Def_First_03' ,

      'All_Def_Second_01' ,
      'All_Def_Second_02' ,
      'All_Def_Second_03' ,

      'All_Def_Third_01' ,
      'All_Def_Third_02' ,
      'All_Def_Third_03' ,
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
