from django.urls import path
from . import views

app_name="players"

urlpatterns = [
    path('players/', views.PlayersView.as_view()),
    path('create-players/', views.CreatePlayerView.as_view()),
    path('player-profile/<int:player_id>/', views.PlayerProfileView.as_view()),
  ]
