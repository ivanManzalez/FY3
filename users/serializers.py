from rest_framework import serializers
from django.contrib.auth.models import User

# in order to map DB values to JSON values
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
      'id',
      'username', 
      'password',
    )

# in order to map JSON values to python format
class CreateUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'username', 
      'password',
    )

class UserPermissionsSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'permissions',
    )
