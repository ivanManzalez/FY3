from django.shortcuts import render
from django.http import HttpResponse
from .forms import CreateTeamForm
from .models import Team, TeamStat

################################################
""" 
When user wants to go to home page,
this function will determine what 
is returned

where the logic goes for how 
we want to handle certain routes
"""


def home(request):
	return render(request, 'home/home.html')
	# return HttpResponse('<h1> FY3 HOME <h1>')

""" 
need to map URL pattern to url function in
urls.py module in 'home' application

using django.shortcuts.render return template
file in templates 

"""
def schedule(request):
	return render(request, 'schedule/schedule.html')

def standings(request):
	east_teams = TeamStat.objects.select_related('team_id').filter(team_id__division_ind__contains='E').order_by('-wins', 'losses', 'ties')
	west_teams = TeamStat.objects.select_related('team_id').filter(team_id__division_ind__contains='W').order_by('-wins', 'losses', 'ties')
	print(east_teams[0].team_id.team_name)
	context = { "east_teams": east_teams, "west_teams":west_teams}
	return render(request, 'standings/standings.html', context)

def stats(request):
	return render(request, 'stats/stats.html')

def create_teams(request):
	if (request.method == 'POST'):
		filled_form = CreateTeamForm(request.POST)
		if (filled_form.is_valid()):
			
			player = filled_form.cleaned_data['player_id']
			player.set_part_of_team_true()
			player.save()

			note = "%s has been added to %s for the %s season"%(filled_form.cleaned_data['player_id'],
																filled_form.cleaned_data['team_id'],
																filled_form.cleaned_data['season_id'],)
			new_form = CreateTeamForm()
			context = {'team_form':new_form, 'note':note, 'player': player}
			print(player)
			return render(request, 'create/teams.html', context)

	form = CreateTeamForm()
	context = {'team_form':form
	}
	return render(request, 'create/teams.html', context)


################################################