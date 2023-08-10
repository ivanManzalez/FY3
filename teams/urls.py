from django.urls import path
from . import views

app_name="teams"

urlpatterns = [
    path('', views.TeamsView.as_view()),
    path('create-team/', views.CreateTeamView.as_view()),
    path('team-profile/<int:team_id>/', views.TeamProfileView.as_view()),
  ]
