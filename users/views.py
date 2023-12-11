from django.shortcuts import render
from rest_framework import generics, status
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response #send custom response from view
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer, CreateUserSerializer,UserPermissionsSerializer,CreateUserJoinPlayerSerializer, UserJoinPlayerSerializer

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .models.user_join_profile import UserJoinPlayer

from .models.user_utils import check_user_field, check_userjoinplayer_field, MissingFieldError


class UsersView(generics.ListAPIView): ## CreateAPIView
  queryset = User.objects.all()
  serializer_class = UserSerializer

# @csrf_exempt # only on method views
class CreateUserView(APIView): ## CreateAPIView
  # 
  serializer_class = CreateUserSerializer

  # define GET POST UPDATE DELETE methods
  def post(self, request, format=None):
    # sessions needed? lets try

    #get access to session ID
    if not self.request.session.exists(self.request.session.session_key):
      #create session
      self.request.session.create()

    serializer = self.serializer_class(data=request.data)
    print("serializer:", serializer)
    if (not serializer.is_valid()): 
      
      username_error = serializer.errors.get('username')[0]
      print("serializer errors:", username_error)
      error_message = username_error if username_error else ''

      return Response({'message':f'Invalid request:{error_message}', 'success':False}, status=status.HTTP_406_NOT_ACCEPTABLE) # message = Bad Request
    
    try:
      username = serializer.data.get('username')   
    except Exception as e:   
      return Response({'message':'Username required'}, status=status.HTTP_406_NOT_ACCEPTABLE) # message = Bad Request
    
    print("unique?")
    queryset = User.objects.filter(username=username) 

    if (queryset.exists()):
      message = username+" already exists"
      return Response({'message': message}, status=status.HTTP_409_CONFLICT) # message = Conflict
    
    try:
      password, email, first_name, last_name, is_player = check_user_field(serializer.data)
    except MissingFieldError as exp:
      return Response({'message':'Username, password, email, first_name, or last_name is missing'}, status=status.HTTP_406_NOT_ACCEPTABLE) # message = Bad Request 
    
    # Create a User instance
    user = User.objects.create_user(
      username = username, 
      password = password,
      email = email,
      first_name = first_name,
      last_name = last_name,
      )
    user.save()

    message = username+' created'
    response_data = {
        'message': message ,
        'user': UserSerializer(user).data,
        'success':True
    }
    return Response(response_data, status=status.HTTP_200_OK)

class UserProfileView(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, user_id):
      try:
        print("try: ", user_id)
        return User.objects.get(id=user_id)
      except User.DoesNotExist:
        print("User does not exist")
        return Response({'Bad Request':'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, user_id, format=None):
        user = self.get_object(user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, user_id, format=None):
        user = self.get_object(user_id)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id, format=None):
        user = self.get_object(user_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AuthenticateUserView(APIView): ## CreateAPIView
  """
  Authenticate a user and return an authentication token.
  """
  def post(self, request, format=None):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserPermissionsView(APIView):

  serializer_class = UserPermissionsSerializer

  def get_object(self, user_id):
      try:
        print("try: ", user_id)
        return User.objects.get(id=user_id)
      except User.DoesNotExist:
        print("User does not exist")
        return Response({'Bad Request':'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
  
  def get(self, request, user_id, format=None):
    serializer_class = self.serializer_class(data=request.data)
    user_permissions = self.get_object().get_all_permissions()
    message = ""
    response_data = {
        'message': message ,
        'permissions': serializer_class(user).data
    }
    return Response(response_data, status=status.HTTP_200_OK)

class UserJoinPlayerView(generics.ListAPIView): ## CreateAPIView
  queryset = UserJoinPlayer.objects.all()
  serializer_class = UserJoinPlayerSerializer


class CreateUserJoinPlayerView(APIView):
  serializer_class = CreateUserJoinPlayerSerializer

  def post(self, request, format=None):
    # sessions needed? lets try

    #get access to session ID
    if not self.request.session.exists(self.request.session.session_key):
      #create session
      self.request.session.create()

    serializer = self.serializer_class(data=request.data)
    print("----Test----")
    print("serializer:\n", serializer)
    print("valid?")
    if (not serializer.is_valid()): 
      print("no")
      print("Error:",serializer.errors)
      return Response({'message':f'Invalid request:{serializer.errors}'}, status=status.HTTP_406_NOT_ACCEPTABLE) # message = Bad Request

    try:
      print("Data:",serializer.data)
      uid, player_id, user_id = check_userjoinplayer_field(serializer.data)
    except MissingFieldError as exp:
      return Response({'message':'Firebase Id or User Id is missing'}, status=status.HTTP_406_NOT_ACCEPTABLE) # message = Bad Request 
    
    print("unique?")
    queryset = UserJoinPlayer.objects.filter(player__id = player_id, user__id = user_id) 

    if(queryset.exists()):
      message = "User/Player already exists"
      return Response({'message': message}, status=status.HTTP_409_CONFLICT) # message = Conflict
    

    user = User.objects.filter(id=user_id)
    if(player_id):
      player = Player.objects.filter(id=player_id)
    
    # Create a User instance
    user_player = UserJoinPlayer.objects.create(
      firebase_id = uid,
      player = player,
      user = user
      )
    user_player.save()

    message = user_player.user.first_name+" "+user_player.user.last_name+' created'
    response_data = {
        'message': message ,
        'user': UserJoinPlayerSerializer(user_player).data
    }
    return Response(response_data, status=status.HTTP_200_OK)
 
