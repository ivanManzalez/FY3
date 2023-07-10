from django.shortcuts import render
from rest_framework import generics, status
from django.views.decorators.csrf import csrf_exempt

from .serializers.PlayerSerializer import PlayerSerializer, CreatePlayerSerializer
# from .serializers.TeamSerializer import TeamSerializer
# from .serializers.SeasonSerializer import SeasonSerializer
# from .serializers.GameSerializer import GameSerializer
# from .serializers.GameStatSerializer import GameStatSerializer
# from .serializers.TeamStatSerializer import TeamStatSerializer

from .models.players import Player 
# from .models.teams import Team 
# from .models.seasons import Season 
# from .models.games import Game 
# from .models.gamestats import GameStat 

from rest_framework.views import APIView
from rest_framework.response import Response #send custom response from view

## CreateAPIView - for POST calls?
## ListAPIView - for GET calls?

class PlayersView(generics.CreateAPIView): ## CreateAPIView
  queryset = Player.objects.all()
  serializer_class = PlayerSerializer
  

# @csrf_exempt # only on method views
class CreatePlayerView(APIView): ## CreateAPIView
  # 
  serializer_class = CreatePlayerSerializer
  # define GET POST UPDATE DELETE methods
  def post(self, request, format=None):
    # sessions needed? lets try

    #get access to session ID
    if not self.request.session.exists(self.request.session.session_key):
      #create session
      self.request.session.create()

    serializer = self.serializer_class(data=request.data)
    
    if (not serializer.is_valid()): 
      return Response({'Bad Request':'Invalid request'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    
    player_first = serializer.data.get('player_first')
    player_last = serializer.data.get('player_last')
    
      
    queryset = Player.objects.filter(player_first=player_first, player_last=player_last)
    # print(queryset.__str__())
    if (queryset.exists()):
      return Response({'Conflict':'Player already exists'}, status=status.HTTP_409_CONFLICT)
    
    player_height_in = serializer.data.get('player_height_in')
    player_height_ft = serializer.data.get('player_height_ft')
    origin = serializer.data.get('origin')
    age = serializer.data.get('age')
    
    
    player = Player(player_first = player_first,
                    player_last = player_last,
                    player_height_in = player_height_in,
                    player_height_ft = player_height_ft,
                    origin = origin,
                    age = age)
    player.save()
    return Response(PlayerSerializer(player).data, status=status.HTTP_200_OK)

# class TeamsView(generics.ListAPIView): ## CreateAPIView
#   queryset = Team.objects.all()
#   serializer_class = TeamSerializer

# class SeasonsView(generics.ListAPIView): ## CreateAPIView
#   queryset = Season.objects.all()
#   serializer_class = SeasonSerializer

# class GamesView(generics.ListAPIView): ## CreateAPIView
#   queryset = Game.objects.all()
#   serializer_class = GameSerializer

# class GameStatView(generics.ListAPIView): ## CreateAPIView
#   queryset = GameStats.objects.all()
#   serializer_class = GameStatSerializer

# class TeamStatView(generics.ListAPIView): ## CreateAPIView
#   queryset = TeamStats.objects.all()
#   serializer_class = TeamStatSerializer