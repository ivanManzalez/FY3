from django.urls import path
from . import views

app_name="seasons"

urlpatterns = [
    path('seasons/', views.PlayersView.as_view()),
    path('create-season/', views.CreatePlayerView.as_view()),
    path('season-profile/<int:season_id>/', views.PlayerProfileView.as_view()),
  ]
