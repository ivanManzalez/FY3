from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Count, Sum, Avg
from .forms import CreateTeamForm
from .models import Season, Team, Player, STP, GameStat, Game
from .utilities import remove_duplicate_teams, bubble_sort_by_wins


################################################
curr_season = Season.objects.latest('season_name')

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
	if (request.method == 'POST'):
		#take all info from post page and pass to CreateTeamForm() obj
		filled_form = CreateTeamForm(request.POST)
		
		# ensure data is valid
		if (filled_form.is_valid()):
			player = filled_form.cleaned_data['player_id']
			team = filled_form.cleaned_data['team_id']
			season = filled_form.cleaned_data['season_id']

			note = "%s has been added to %s for the %s season"%(player,team,season)
			STP.objects.create(season_id =season.id, team_id= team.id, player_id= player.id)
			
			player.set_part_of_team_true()
			player.save()
			new_form = CreateTeamForm()
			context = {'team_form':new_form, 'note':note, 'player': player}
			print(player)
			return render(request, 'create/teams.html', context)
	else:
		form = CreateTeamForm()
		context = {'team_form':form
	}
		return render(request, 'create/teams.html', context)

################################################







################################################