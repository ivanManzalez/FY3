from django.shortcuts import render
from rest_framework import generics, status
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response #send custom response from view

from .serializers import SeasonSerializer, CreateSeasonSerializer

from .models.season import Season

class SeasonsView(generics.ListAPIView): ## CreateAPIView
  queryset = Season.objects.all()
  serializer_class = SeasonSerializer



# @csrf_exempt # only on method views
class CreateSeasonView(APIView): ## CreateAPIView
  # 
  serializer_class = CreateSeasonSerializer

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
    
    season_year = serializer.data.get('season_year')
    start_date = serializer.data.get('start_date')
    
      
    queryset = Season.objects.filter(season_year=season_year) 
    # print(queryset.__str__())
    if (queryset.exists()):
      return Response({'message':'Season already exists'}, status=status.HTTP_409_CONFLICT) # message = Conflict
      
    
    season = Season(season_year = season_year,
                    start_date = start_date)
    season.save()

    response_data = {
        'message': 'New Season Added',
        'season': SeasonSerializer(season).data
    }

    return Response(response_data, status=status.HTTP_200_OK)

class SeasonProfileView(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, season_id):
      try:
        print("try: ", season_id)
        return Season.objects.get(id=season_id)
      except Season.DoesNotExist:
        print("season does not exist")
        return Response({'Bad Request':'Season does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, season_id, format=None):
        season = self.get_object(season_id)
        serializer = SeasonSerializer(season)
        return Response(serializer.data)

    def put(self, request, season_id, format=None):
        season = self.get_object(season_id)
        serializer = SeasonSerializer(season, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, season_id, format=None):
        season = self.get_object(season_id)
        season.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
