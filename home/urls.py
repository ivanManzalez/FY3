"""FY3 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views

urlpatterns = [
    #from view.py, return home() 
    path('', views.home, name='FY3-Home'),
    path('schedule/', views.schedule, name='FY3-Schedule'),
    path('standings/', views.standings, name='FY3-Standings'),
    path('stats/', views.stats, name='FY3-Statistics'),
    path('commissioner/', views.commissioner, name='FY3-Commissioner'),
    path('commissioner/player-stats/', views.create_player_stats, name='FY3-Create-Player-Stats'),
    path('commissioner/create_teams/', views.create_teams, name='FY3-Create-Team'),
    path('dev/load_players/', views.load_players, name='FY3-Load_Players'),
    


 
]
