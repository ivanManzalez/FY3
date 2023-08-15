from django.urls import path, include
from .views import index

urlpatterns = [
  # home 
  path("", index),
  # Administration 
  path("commissioner/", index),
  # Content
  path("schedule/", index),
  path("standings/", index),
  path("stats/", index),
  path("playerprofile/<int:player_id>", index),
  # authentication
  path("signin/", index),
  path("signup/", index),
  
 ]


