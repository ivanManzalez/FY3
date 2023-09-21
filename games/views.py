from django.shortcuts import render
from django.http import Http404
from rest_framework import generics, status
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response #send custom response from view

from .serializers import GameSerializer, CreateGameSerializer

from .models.game import Game
from seasons.models.season import Season
from teams.models.team import Team
from players.models.player import Player
from events.models.event import Event

class GamesView(generics.ListAPIView): ## CreateAPIView
  queryset = Game.objects.all()
  serializer_class = GameSerializer

# @csrf_exempt # only on method views
class CreateGameView(APIView): ## CreateAPIView
  # 
  serializer_class = CreateGameSerializer
  resp_status = ''

  # define GET POST UPDATE DELETE methods
  def post(self, request, format=None):
    # sessions needed? lets try
    #get access to session ID
    if not self.request.session.exists(self.request.session.session_key):
      #create session
      self.request.session.create()

    serializer = self.serializer_class(data=request.data)
    message = 'Invalid request'
    
    if (not serializer.is_valid()): 
      resp_status = status.HTTP_406_NOT_ACCEPTABLE
      return Response({'message':message, 'status':resp_status}, status=resp_status)

    season = serializer.data.get('season')
    event = serializer.data.get('event')
    home_team = serializer.data.get('home_team')
    away_team = serializer.data.get('away_team')
    
    queryset = Game.objects.filter(home_team=home_team, away_team=away_team, event=event, season=season)

    if (queryset.exists()):
      resp_status = status.HTTP_409_CONFLICT
      message = "Game already exists"
      return Response({'message': message, 'status': resp_status}, status=resp_status) # message = Conflict

    home_player_01 = serializer.data.get('home_player_01')
    home_player_02 = serializer.data.get('home_player_02')
    home_player_03 = serializer.data.get('home_player_03')
    home_player_04 = serializer.data.get('home_player_04')
    home_player_05 = serializer.data.get('home_player_05')

    away_player_01 = serializer.data.get('away_player_01')
    away_player_02 = serializer.data.get('away_player_02')
    away_player_03 = serializer.data.get('away_player_03')
    away_player_04 = serializer.data.get('away_player_04')
    away_player_05 = serializer.data.get('away_player_05')

        
    try:
      game = Game(
        season= Season.objects.get(pk=season),
        event = Event.objects.get(pk=event),
        home_team = Team.objects.get(pk=home_team),
        away_team = Team.objects.get(pk=away_team),
        home_player_01 = Player.objects.get(pk=home_player_01),
        home_player_02 = Player.objects.get(pk=home_player_02),
        home_player_03 = Player.objects.get(pk=home_player_03),
        home_player_04 = Player.objects.get(pk=home_player_04),
        home_player_05 = Player.objects.get(pk=home_player_05),
        away_player_01 = Player.objects.get(pk=away_player_01),
        away_player_02 = Player.objects.get(pk=away_player_02),
        away_player_03 = Player.objects.get(pk=away_player_03),
        away_player_04 = Player.objects.get(pk=away_player_04),
        away_player_05 = Player.objects.get(pk=away_player_05),
        )
      game.save()
      message = "Game created successfully"
      game = CreateGameSerializer(game).data
      resp_status = status.HTTP_200_OK
    
    except Exception as exp:
      message = str(exp)
      game = None
      resp_status = status.HTTP_500_INTERNAL_SERVER_ERROR

    response_data = {
      'message': message,
      'game': game,
      'status': resp_status
    }
    return Response(response_data)

class GameProfileView(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, home_team, away_team):
      
      try:
        print("try: ", home_team, " v ", away_team)
        return Game.objects.get(home_team=home_team, away_team=away_team)
      except Game.DoesNotExist:
        print("No record of game")
        message = "No record of game"
        # return Response({'Bad Request': message}, status=status.HTTP_404_NOT_FOUND)
        raise Http404(message)

    def get(self, request, home_team, away_team, format=None):
      game = self.get_object(home_team, away_team)
      serializer = GameSerializer(game)
      return Response(serializer.data)

    def put(self, request, home_team, away_team, format=None):
      game = self.get_object(home_team, away_team)
      serializer = GameSerializer(game, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, first_name, last_name, format=None):
      game = self.get_object(home_team, away_team)
      game.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

