from django.urls import path
from . import views

app_name="teams"

urlpatterns = [
    path('', views.TeamsView.as_view()),
    path('create-teams/', views.CreateTeamView.as_view()),
    path('teams/<int:team_id>/', views.TeamProfileView.as_view()),
  ]
