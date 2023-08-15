from django.shortcuts import render
from rest_framework import generics, status
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response #send custom response from view
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer, CreateUserSerializer,UserPermissionsSerializer

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

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
    
    if (not serializer.is_valid()): 
      return Response({'message':'Invalid request'}, status=status.HTTP_406_NOT_ACCEPTABLE) # message = Bad Request
    
    username = serializer.data.get('username')      
    queryset = User.objects.filter(username=username) 

    if (queryset.exists()):
      message = username+" already exists"
      return Response({'message': message}, status=status.HTTP_409_CONFLICT) # message = Conflict
    
    password = serializer.data.get('password')  
    
    # Create a User instance
    user = User(username = username, password = password)
    user.save()
    
    message = username+' created'
    response_data = {
        'message': message ,
        'user': UserSerializer(user).data
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


