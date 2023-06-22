from django.urls import path, include
from .views import index

urlpatterns = [
  path("", index),
  path("commissioner/", index),
  path("schedule/", index),
  path("standings/", index),
  path("stats/", index),
 ]


