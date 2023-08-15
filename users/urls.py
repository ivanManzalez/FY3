from django.urls import path
from . import views

app_name="users"

urlpatterns = [
    path('', views.UsersView.as_view()),
    path('create-user/', views.CreateUserView.as_view()),
    path('user-profile/<int:user_id>/', views.UserProfileView.as_view()),
    path('userperms/', views.UserPermissionsView.as_view()),
  ]