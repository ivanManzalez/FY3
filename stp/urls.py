from django.urls import path
from . import views

app_name="stp"

urlpatterns = [
    path('', views.STPViews.as_view()),
    path('create-stp/', views.CreateSTPView.as_view()),
    path('stp-szn-teams/<int:season_id>/', views.STPSeasonTeams.as_view()),
  ]
