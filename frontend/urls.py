from django.urls import path, include
from .views import index

urlpatterns = [
  # home 
  path("", index),
  
  # Administration 
  path("commissioner/", index),
  path("commissioner/players", index),
  path("commissioner/teams", index),
  path("commissioner/seasons", index),
  path("commissioner/events", index),
  path("commissioner/draft", index),
  path("register/", index),

  # Content
  path("schedule/", index),
  path("standings/", index),
  path("stats/", index),
  path("playerprofile/<str:player_id>", index),
  
  # Authentication
  path("login/", index),
  path("signup/", index),
  
  
 ]


