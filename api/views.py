from django.shortcuts import render
from rest_framework import generics
from .serializers import PlayerSerializer
from .models import Players

class PlayersView(generics.CreateAPIView):
  queryset = Players.objects.all()
  serializer_class = PlayerSerializer