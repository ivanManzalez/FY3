from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Count, Sum, Avg
from .form_CreateTeams import CreateTeamForm
from .form_PlayerStats import PlayerStatsForm
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

""" 
When user wants to go to home page,
this function will determine what 
is returned

where the logic goes for how 
we want to handle certain routes
"""

################################################
def home(request):
	return render(request, 'home/home.html')
	# return HttpResponse('<h1> FY3 HOME <h1>')

""" 
need to map URL pattern to url function in
urls.py module in 'home' application

using django.shortcuts.render return template
file in templates 
"""
################################################
@login_required(redirect_field_name='next', login_url="/admin/login/")
def commissioner(request):
	return render(request, 'commissioner/commissioner.html')

################################################
def schedule(request):
	return render(request, 'schedule/schedule.html')

################################################
def standings(request):
	#west_teams = TeamStat.objects.select_related('team').filter(season=curr_season, team__division_ind='W').order_by('-wins','losses')
	#east_teams = TeamStat.objects.select_related('team').filter(season=curr_season, team__division_ind='E').order_by('-wins','losses')
	
	west_teams = Team.objects.filter(division_ind='W')#.order_by('-winning_team', 'losing_team')
	west_teams = remove_duplicate_teams(west_teams)
	west_teams = bubble_sort_by_wins(west_teams)
	# print(west_teams)
	
	east_teams = Team.objects.filter(division_ind='E')#.order_by('winning_team', 'losing_team')
	east_teams = remove_duplicate_teams(east_teams)
	east_teams = bubble_sort_by_wins(east_teams)


	context = { "east_teams": east_teams, "west_teams": west_teams}

	return render(request, 'standings/standings.html', context)

################################################
def stats(request):

	players = Player.objects.all()

	gamestats = GameStat.objects.filter(game__season_id=curr_season).values('player')
	gamestats = gamestats.annotate(avg_pts=Avg('points'))
	gamestats = gamestats.annotate(avg_ast=Avg('assists'))
	gamestats = gamestats.annotate(avg_reb=Avg('rebounds'))
	gamestats = gamestats.annotate(avg_blk=Avg('blocks'))
	gamestats = gamestats.annotate(avg_stl=Avg('steals'))
	gamestats = gamestats.annotate(total_games_played=Sum('game'))


	for each in gamestats:
		player = players.get(id=each['player'])
		each['id'] = player

	context = { "stats": gamestats, "current_season": curr_season}
	return render(request, 'stats/stats.html', context)

################################################
def create_teams(request):
	logging.info(" Entering create_teams view ")
	if (request.method == 'POST'):
		logging.info(" - Request type = POST")
		#take all info from post page and pass to CreateTeamForm() obj
		filled_form = CreateTeamForm(request.POST)
		
		# ensure data is valid
		if (filled_form.is_valid()):
			logging.info(" -- Filled form is valid")
			player = filled_form.cleaned_data['player_id']
			team = filled_form.cleaned_data['team_id']
			season = filled_form.cleaned_data['season_id']

			note = "%s has been added to %s for the %s season"%(player,team,season)
			STP.objects.create(season_id =season.id, team_id= team.id, player_id= player.id)
			logging.info(" -- new STP record created")
			new_form = CreateTeamForm()
			context = {'team_form':new_form, 'note':note, 'player': player}
			return render(request, 'commissioner/create_teams.html', context)
	else:
		logging.info(" - Request type != POST")
		form = CreateTeamForm()
		context = {'team_form':form}
		return render(request, 'commissioner/create_teams.html', context)

################################################
def create_player_stats(request):
	logging.info(" Entering create_player_stats view ")
	exists = False
	if (request.method == 'POST'):
		logging.info(" - Request type = POST")
		#take all info from post page and pass to PlayerStatsForm() obj
		form = PlayerStatsForm(request.POST)
		
		# ensure data is valid
		if (form.is_valid()):
			logging.info(" -- Filled form is valid")

			game = form.cleaned_data['game']
			player = form.cleaned_data['player']
			new_form = PlayerStatsForm()

			if (GameStat.player_stats_exists(game.id, player.id)==False):
				logging.info(" --- GameStat record does not exist")
				pts = form.cleaned_data['points']
				rebs = form.cleaned_data['rebounds']
				asts = form.cleaned_data['assists']
				stls = form.cleaned_data['steals']
				blks = form.cleaned_data['blocks']
				GameStat.objects.create(game_id = game.id, player_id = player.id, points = pts, rebounds = rebs, assists = asts, steals = stls ,blocks = blks)
				note =  "%s's stat update: \n %s pts\n %s rebs\n %s asts\n %s stls\n %s blks\n for game on %s"%(player, pts, rebs, asts, stls, blks, game.game_date)

			else:
				exists = True
				logging.info(" --- GameStat record exists")
				note =  "%s stats exists for %s %s v %s"%(player, game.game_date, game.win_team, game.lose_team)

			context = {'player_stats_form':new_form, 'note':note, 'record_exists':exists}
			return render(request, 'commissioner/player_stats.html', context)
	else: #Request = GET
		logging.info(" - Request type != POST")
		print("\nView: Form is invalid..")
		form = PlayerStatsForm()
		context = {'player_stats_form':form}
		return render(request, 'commissioner/player_stats.html', context)

################################################
def load_players(request):
	#load teams - players
	logging.info(" Entering load_players view ")
	game_id = request.GET.get('game_id')
	game = Game.objects.get(id=game_id)
	winning_team = game.win_team
	losing_team = game.lose_team
	teams = Team.objects.filter(team_name =winning_team) | Team.objects.filter(team_name=losing_team)
	players = STP.objects.filter(season_id=curr_season, team__in= teams)
	logging.info(game)
	for player in players:
		print(" - Player: ", player.player)
	
	context = {'players':players}
	return render(request, 'commissioner/load_players.html', context)
################################################
def create_player_stats(request):
	context = { }
	return render(request, 'commissioner/team_stats.html', context)



################################################