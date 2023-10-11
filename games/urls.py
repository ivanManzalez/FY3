from django.urls import path
from . import views

app_name="games"

urlpatterns = [
    path('', views.GamesView.as_view()),
    path('create-game/', views.CreateGameView.as_view()),
    path('game-profile/<str:home_team>+<str:away_team>', views.GameProfileView.as_view()),
  ]
