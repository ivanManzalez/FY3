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
from stp.models.stp import Stp
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
    
    # VALID REQUEST (datatype, required fields, etc.)
    if (not serializer.is_valid()): 
      resp_status = status.HTTP_406_NOT_ACCEPTABLE
      return Response({'message':message, 'status':resp_status}, status=resp_status)

    # create new Event object using data from CreateEventForm 
    # event = createEvent(date data)
    event_id = serializer.data.get('event')
    print("Event ID:", event_id)
    season_id = serializer.data.get('season')
    home_team_id = serializer.data.get('home_team')
    away_team_id = serializer.data.get('away_team')

    # CANT SCHEDULE SAME TEAM AGAINST ITSELF
    if(int(home_team_id) == int(away_team_id)):
      resp_status = status.HTTP_409_CONFLICT
      message = "Home team cannot play itself"
      return Response({'message': message, 'status': resp_status}, status=resp_status) # message = Conflict

    queryset = Game.objects.filter(event__id =event_id, home_team__id=home_team_id, away_team__id=away_team_id, season__id=season_id)

    # SAME GAME CANNOT EXIST FOR SAME EVENT AND SAME SEASON
    print("Existence: ",queryset, home_team_id, away_team_id, season_id)
    if (queryset.exists()):
      resp_status = status.HTTP_409_CONFLICT
      message = "Game already exists"
      return Response({'message': message, 'status': resp_status}, status=resp_status) # message = Conflict

    # 3 db calls - Season, Teams, STP
    season = Season.objects.get(pk=season_id)
    event = Event.objects.get(pk=event_id)
    
    home_team = Team.objects.filter(pk=home_team_id)[0]
    away_team = Team.objects.filter(pk=away_team_id)[0]
    
    home_players = Stp.objects.filter(team__id = home_team_id)
    away_players = Stp.objects.filter(team__id = away_team_id)

    try:
      game = Game(
        season= season,
        event = event,
        home_team = home_team,
        away_team = away_team,
        )
      # Assign players to the game based on the lists
      for i, player in enumerate(home_players):
        print(i, player.player.id)
        index = str(i+1).zfill(2)
        print(f"home_player_{index}")
        setattr(game, f"home_player_{index}", player.player)

      for i, player in enumerate(away_players):
        print(i, player.player.id)
        index = str(i+1).zfill(2)
        print(f"away_player_{index}")
        setattr(game, f"away_player_{index}", player.player)

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

