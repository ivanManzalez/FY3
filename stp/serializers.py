from rest_framework import serializers
from .models.stp import Stp

# in order to map DB values to JSON values
class STPSerializer(serializers.ModelSerializer):
  class Meta:
    model = Stp
    fields = (
      'id',
      'season',
      'team',
      'player',
      'weight',
      'height_ft',
      'height_in',
    )

# in order to map JSON values to python format
class CreateSTPSerializer(serializers.ModelSerializer):
  class Meta:
    print('\nCreateSTPSerializer\n')
    model = Stp
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'season',
      'team',
      'player',
      'weight',
      'height_ft',
      'height_in',
    )
