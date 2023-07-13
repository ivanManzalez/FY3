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

class PlayersView(generics.ListAPIView): ## CreateAPIView
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
      return Response({'message':'Invalid request'}, status=status.HTTP_406_NOT_ACCEPTABLE) # message = Bad Request
    
    player_first = serializer.data.get('player_first')
    player_last = serializer.data.get('player_last')
    
      
    queryset = Player.objects.filter(player_first=player_first, player_last=player_last) 
    # print(queryset.__str__())
    if (queryset.exists()):
      return Response({'message':'Player already exists'}, status=status.HTTP_409_CONFLICT) # message = Conflict
    
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
    
    response_data = {
        'message': 'New Player Added',
        'player': PlayerSerializer(player).data
    }

    return Response(response_data, status=status.HTTP_200_OK)

class PlayerProfileView(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, player_id):
      try:
        print("try: ", player_id)
        return Player.objects.get(id=player_id)
      except Player.DoesNotExist:
        print("player does not exist")
        return Response({'Bad Request':'Player does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, player_id, format=None):
        player = self.get_object(player_id)
        serializer = PlayerSerializer(player)
        return Response(serializer.data)

    def put(self, request, player_id, format=None):
        player = self.get_object(player_id)
        serializer = PlayerSerializer(player, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, player_id, format=None):
        player = self.get_object(player_id)
        player.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
