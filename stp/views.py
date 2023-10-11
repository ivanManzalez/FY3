from django.shortcuts import render
from rest_framework import generics, status
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response #send custom response from view

from .serializers import STPSerializer, CreateSTPSerializer

from .models.stp import Stp
from seasons.models.season import Season
from teams.models.team import Team
from players.models.player import Player

class STPViews(generics.ListAPIView): ## CreateAPIView
  queryset = Stp.objects.all()
  serializer_class = STPSerializer



# @csrf_exempt # only on method views
class CreateSTPView(APIView): ## CreateAPIView
  # 
  serializer_class = CreateSTPSerializer

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
      return Response({'message':message, 'status':resp_status}, status=resp_status) # message = Bad Request
    
    season_id = serializer.data.get('season') 
    team_id = serializer.data.get('team')
    player_id = serializer.data.get('player')

    try:
      season = Season.objects.get(pk=season_id)
      team = Team.objects.get(pk=team_id)
      player = Player.objects.get(pk=player_id)
      print("Individual season, team, and player exist")
    except Exception as exp:
      response_message = "One of the season, team, or player does not exist"
      print(response_message)
      return Response(response_message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

    season_player_qs = Stp.objects.filter(season__id=season_id, player__id=player_id)

    print("check if player exists for current season: ", season_player_qs)
    
    if (season_player_qs.exists()):
      resp_status = status.HTTP_409_CONFLICT
      message = str(player)+" has already been assigned to "+str(team)+" for the "+str(season)+" season"
      return Response({'message':message, 'status':resp_status}, status=resp_status) # message = Conflict
    
    print("STP does not already exists")
    weight = serializer.data.get('weight')
    height_ft = serializer.data.get('height_ft') 
    height_in = serializer.data.get('height_in') 

    print(season_id, team_id, player_id, weight, height_ft, height_in)  
    
    try:
      print("try stp:", season_id, team_id, player_id)
      stp = Stp(season = season,
                team = team,
                player = player,
                weight = weight,
                height_ft = height_ft,
                height_in = height_in)
      print("created")
      stp.save()
      
      message = str(player)+" has been assigned to "+str(team)+" for the "+str(season)+" season"
      stp = STPSerializer(stp).data
      print("serialized")
      resp_status = status.HTTP_200_OK
    except Exception as exp:
      print(exp)
      message = exp
      stp = None
      resp_status = status.HTTP_500_INTERNAL_SERVER_ERROR

    response_data = {
        'message': message ,
        'stp': stp,
        'status' : resp_status,
    }
    print("return response")
    return Response(response_data, status=resp_status)

class STPSeasonTeams(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, season_id):
      try:
        print("try: ", season_id)
        return Season.objects.get(season_id=season_id)
      except Season.DoesNotExist:
        print("Season ID does not exist")
        message = "Bad Request: "+season_id + " does not exist"
        return Response({'message': message}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, season_id, format=None):
        stp = self.get_object(season_id)
        serializer = STPSerializer(stp)
        return Response(serializer.data)

    def put(self, request, season_id, format=None):
        stp = self.get_object(season_id)
        serializer = STPSerializer(stp, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, season_id, format=None):
        stp = self.get_object(season_id)
        stp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

