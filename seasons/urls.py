from django.urls import path
from . import views

app_name="seasons"

urlpatterns = [
    path('', views.SeasonsView.as_view()),
    path('create-season/', views.CreateSeasonView.as_view()),
    path('season-profile/<int:season_id>/', views.SeasonProfileView.as_view()),
  ]
