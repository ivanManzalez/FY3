from rest_framework import serializers
from .models.event import Event

# in order to map DB values to JSON values
class EventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = (
      'id',
      'name', 
      'date',
      'start_time',
      'end_time',
      'street_number',
      'street_name',
      'city',

    )

# in order to map JSON values to python format
class CreateEventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'name',
      'date',
      'start_time',
      'end_time',
      'street_number',
      'street_name',
      'city',
    )
