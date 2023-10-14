from django.urls import path
from . import views

app_name="players"

urlpatterns = [
    path('', views.PlayersView.as_view()),
    path('draftees/', views.DrafteesView.as_view()),
    path('create-player/', views.CreatePlayerView.as_view()),
    path('player-profile/<str:first_name>+<str:last_name>', views.PlayerProfileView.as_view()),
  ]
