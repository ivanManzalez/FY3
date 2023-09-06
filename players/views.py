from django.shortcuts import render
from django.http import Http404
from rest_framework import generics, status
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response #send custom response from view

from .serializers import PlayerSerializer, CreatePlayerSerializer

from .models.player import Player

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
    message = 'Invalid request'
    if (not serializer.is_valid()): 
      return Response({'message':message, 'status':status.HTTP_406_NOT_ACCEPTABLE}, status=status.HTTP_406_NOT_ACCEPTABLE)
    
    first_name = serializer.data.get('first_name')
    last_name = serializer.data.get('last_name')
    
      
    queryset = Player.objects.filter(first_name=first_name, last_name=last_name) 
    message = first_name+ " "+ last_name +' already exists'
    # print(queryset.__str__())
    if (queryset.exists()):
      return Response({'message': message, 'status': status.HTTP_409_CONFLICT}, status=status.HTTP_409_CONFLICT) # message = Conflict
    
    height_in = serializer.data.get('height_in')
    height_ft = serializer.data.get('height_ft')
    origin = serializer.data.get('origin')    
    
    player = Player(first_name = first_name,
                    last_name = last_name,
                    height_in = height_in,
                    height_ft = height_ft,
                    origin = origin,
                  )
    player.save()

    response_data = {
      'message': 'New Player Added',
      'player': PlayerSerializer(player).data,
      'status': status.HTTP_200_OK,
    }

    return Response(response_data, status=status.HTTP_200_OK)

class PlayerProfileView(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, first_name, last_name):
      # first_name = first_name.title()
      # last_name = last_name.title()
      fullname = first_name +" "+ last_name
      try:
        print("try: ", fullname)
        return Player.objects.get(first_name = first_name, last_name = last_name)
      except Player.DoesNotExist:
        print(fullname+" does not exist")
        message = fullname + " does not exist"
        # return Response({'Bad Request': message}, status=status.HTTP_404_NOT_FOUND)
        raise Http404(message)

    def get(self, request, first_name, last_name, format=None):
        player = self.get_object(first_name, last_name)
        serializer = PlayerSerializer(player)
        return Response(serializer.data)

    def put(self, request, first_name, last_name, format=None):
        player = self.get_object(first_name, last_name)
        serializer = PlayerSerializer(player, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, first_name, last_name, format=None):
        player = self.get_object(first_name, last_name)
        player.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
