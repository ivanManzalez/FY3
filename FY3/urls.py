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
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    ## Need to map app sub application URLs
    ## and include urls within home app
    ## do not need to add new path() for each URL in home.urls
	path('', include('frontend.urls')),
    path('admin/', admin.site.urls),
    path('players/', include('players.urls')),
    path('teams/', include('teams.urls')),
    path('seasons/', include('seasons.urls')),
    path('stp/', include('stp.urls')),
    path('games/', include('games.urls')),
    path('users/', include('users.urls')),
    path('events/', include('events.urls')),
    # path("auth/", include("django.contrib.auth.urls")),  # needed?

]
