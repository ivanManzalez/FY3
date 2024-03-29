from django.shortcuts import render
from django.http import Http404
from rest_framework import generics, status
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response #send custom response from view

from .serializers import PlayerSerializer, CreatePlayerSerializer

from .models.player import Player
######
from rest_framework.permissions import IsAuthenticated
from users.authentication import FirebaseAuthentication
######
class PlayersView(generics.ListAPIView): ## CreateAPIView
  queryset = Player.objects.all()
  serializer_class = PlayerSerializer
  permission_classes = [ IsAuthenticated ]
  authentication_classes = [ FirebaseAuthentication ]
  def get(self, request, format=None):
    print(request)
    queryset = Player.objects.all()
    serialized_data = self.serializer_class(queryset, many=True).data
    message = "Players List received"
    resp_status = status.HTTP_200_OK
    return Response({'message': message, 'status': resp_status, 'data': serialized_data}, status=resp_status)   


class DrafteesView(generics.ListAPIView):
  serializer_class = PlayerSerializer

  def get(self, request, format=None):
    queryset = Player.objects.filter(is_registered=True)
    serialized_data = self.serializer_class(queryset, many=True).data
    message = "Draft List received"
    resp_status = status.HTTP_200_OK
    return Response({'message': message, 'status': resp_status, 'data': serialized_data}, status=resp_status)


# @csrf_exempt # only on method views
class CreatePlayerView(APIView): ## CreateAPIView
  # 
  serializer_class = CreatePlayerSerializer
  resp_status = ''
  permission_classes = [ IsAuthenticated ]
  authentication_classes = [ FirebaseAuthentication ]
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

    first_name = serializer.data.get('first_name')
    last_name = serializer.data.get('last_name')
    
      
    queryset = Player.objects.filter(first_name=first_name, last_name=last_name) 

    if (queryset.exists()):
      resp_status = status.HTTP_409_CONFLICT
      message = first_name+ " "+ last_name +' already exists'
      return Response({'message': message, 'status': resp_status}, status=resp_status) # message = Conflict
    
    height_in = serializer.data.get('height_in')
    height_ft = serializer.data.get('height_ft')
    weight = serializer.data.get('weight')
    date_of_birth = serializer.data.get('date_of_birth')
    is_registered = serializer.data.get('is_registered')
    # profile_pic_loc = serializer.data.get('profile_pic_loc')

    # fav_player = serializer.data.get('fav_player')
    # experience = serializer.data.get('experience')
    
        
    try:
      player = Player(first_name = first_name,
                    last_name = last_name,
                    height_in = height_in,
                    height_ft = height_ft,
                    weight=weight,
                    date_of_birth = date_of_birth,
                    is_registered = is_registered,
                    # profile_pic_loc= profile_pic_loc,
                    # fav_player=fav_player, 
                    # experience=experience,
                  )
      player.save()
      message = first_name+" "+last_name+' Added'
      player = PlayerSerializer(player).data
      resp_status = status.HTTP_200_OK
    
    except Exception as exp:
      message = exp
      player = None
      resp_status = status.HTTP_500_INTERNAL_SERVER_ERROR

    response_data = {
      'message': message,
      'player': player,
      'status': resp_status
    }
    return Response(response_data)

class PlayerProfileView(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, player_id):

      try:
        return Player.objects.get(id = player_id)
      except Player.DoesNotExist:
        message = player_id + " does not exist"
        # return Response({'Bad Request': message}, status=status.HTTP_404_NOT_FOUND)
        raise Http404(message)

    def get(self, request, player_id, format=None):
        player = self.get_object(player_id)
        serializer = PlayerSerializer(player)
        return Response(serializer.data)

    def put(self, request, player_id, format=None):
        print("\nplayer update:", player_id)
        player = self.get_object(player_id)
        print("player got")
        serializer = PlayerSerializer(player, data=request.data)
        print("player serialized:", serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, player_id, format=None):
        print("\nplayer update:", player_id)
        player = self.get_object(player_id)
        player.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
