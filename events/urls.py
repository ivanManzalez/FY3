from django.urls import path
from . import views

app_name="events"

urlpatterns = [
    path('', views.EventsView.as_view()),
    path('create-event/', views.CreateEventView.as_view()),
    path('event-profile/<int:event_id>/', views.CreateEventView.as_view()),
  ]