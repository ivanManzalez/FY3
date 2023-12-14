from rest_framework import serializers
from django.contrib.auth.models import User
from players.models.player import Player
from .models.user_join_profile import UserJoinPlayer
from django.contrib.auth.models import Permission

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
  user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
  player_id = serializers.PrimaryKeyRelatedField(queryset=Player.objects.all(), required=False, allow_null=True)
  
  class Meta:
    model = UserJoinPlayer
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'firebase_id',
      'player_id',
      'user',
    )
  # def __init__(self, *args, **kwargs):
  #     player_id = kwargs.pop('player_id', None)
  #     super().__init__(*args, **kwargs)
  #     if player_id is not None:
  #       self.fields['player'].queryset = Player.objects.filter(id=player_id)

class UserJoinPlayerSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserJoinPlayer
    # fields that will be sent in paylod
    # serialize request in python format
    fields = (
      'firebase_id',
      'player',
      'user',
    )

class UserGroupsSerializer(serializers.ModelSerializer):
  groups = serializers.SerializerMethodField()

  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'groups')

  # def get_groups(self, obj):
  #   return list(obj.groups.values_list('name', flat=True))
