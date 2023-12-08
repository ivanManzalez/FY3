from rest_framework import serializers
from django.contrib.auth.models import User
from .models.user_join_profile import UserJoinPlayer

# in order to map DB values to JSON values
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
      "id",
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
      # 'id',
      'username', 
      'password',
      'email',
      'first_name',
      'last_name',
    )

class UserPermissionsSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'permissions',
    )

class CreateUserJoinPlayerSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserJoinPlayer
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'id',
      'player_id',
      'user_id',
    )

class UserJoinPlayerSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserJoinPlayer
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'player_id',
      'user_id',
    )
