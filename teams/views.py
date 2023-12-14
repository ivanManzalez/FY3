from django.shortcuts import render
from rest_framework import generics, status
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response #send custom response from view

from .serializers import TeamSerializer, CreateTeamSerializer

from .models.team import Team

class TeamsView(generics.ListAPIView): ## CreateAPIView
  serializer_class = TeamSerializer

  def get(self, request, format=None):
    queryset = Team.objects.all() #filter by what condition?
    serialized_data = self.serializer_class(queryset, many=True).data
    message = "Teams List received"
    resp_status = status.HTTP_200_OK
    return Response({'message': message, 'status': resp_status, 'data': serialized_data}, status=resp_status)

# @csrf_exempt # only on method views
class CreateTeamView(APIView): ## CreateAPIView
  # 
  serializer_class = CreateTeamSerializer

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
    
    team_name = serializer.data.get('team_name')      
    queryset = Team.objects.filter(team_name=team_name) 

    if (queryset.exists()):
      resp_status = status.HTTP_409_CONFLICT
      message = team_name+" already exists"
      return Response({'message':message, 'status':resp_status}, status=resp_status) # message = Conflict
    
    abbr_name = serializer.data.get('abbr_name')
    division_ind = serializer.data.get('division_ind')   
    try:
      team = Team(team_name = team_name,
                  abbr_name = abbr_name,
                  division_ind = division_ind)
      team.save()
    
      message = 'New Team, '+team_name+', added'
      team = TeamSerializer(team).data
      resp_status = status.HTTP_200_OK
    except Exception as exp:
      message = exp
      team = None
      resp_status = status.HTTP_500_INTERNAL_SERVER_ERROR

    response_data = {
        'message': message ,
        'team': team,
        'status' : resp_status,
    }

    return Response(response_data, status=resp_status)

class TeamProfileView(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, team_id):
      try:
        print("try: ", team_id)
        return Team.objects.get(id=team_id)
      except Team.DoesNotExist:
        print("Team does not exist")
        message = "Bad Request: "+team_id + " does not exist"
        return Response({'message': message}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, team_id, format=None):
        team = self.get_object(team_id)
        serializer = TeamSerializer(team)
        return Response(serializer.data)

    def put(self, request, team_id, format=None):
        team = self.get_object(team_id)
        serializer = TeamSerializer(team, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, team_id, format=None):
        team = self.get_object(team_id)
        team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

