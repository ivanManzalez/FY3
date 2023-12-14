from rest_framework import serializers
from .models.team import Team

# in order to map DB values to JSON values
class TeamSerializer(serializers.ModelSerializer):
  class Meta:
    model = Team
    fields = (
      'id',
      'team_name',
      'abbr_name',
      'date_founded',
      'division_ind',
    )

# in order to map JSON values to python format
class CreateTeamSerializer(serializers.ModelSerializer):
  class Meta:
    model = Team
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'team_name', 
      'abbr_name',
      'division_ind',
      'image_url',
    )
