from django.urls import path
from . import views

urlpatterns = [
    path('players/', views.PlayersView.as_view()),
    path('create-players/', views.CreatePlayerView.as_view()),
    # path('teams', views.TeamsView.as_view()),
    # path('games', views.GamesView.as_view()),
    # path('seasons', views.SeasonsView.as_view()),
    # path('gamestats', views.GameStatsView.as_view()),
    # path('teamstats', views.TeamStatsView.as_view()),
    ]