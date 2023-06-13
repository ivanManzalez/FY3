from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Count, Sum, Avg
from .form_CreateTeams import CreateTeamForm
from .form_PlayerStats import PlayerStatsForm
from .form_TeamStats import TeamStatsForm
from .models import Season, Team, Player, STP, GameStat, Game
from .utilities import remove_duplicate_teams, bubble_sort_by_wins
from django.db.models import Q
import logging
################################################
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login

################################################
curr_season = Season.objects.latest('season_name')

# Logging configuration
logging.basicConfig(format='[%(asctime)s] - %(message)s', level=logging.INFO)


################################################

def landing(request):
  return render(request, 'index.html')

################################################
