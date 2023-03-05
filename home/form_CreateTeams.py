from django import forms
from .models import Team, Season, Player, STP, GameStat

# can change to different seasons for historical purposes(?)
curr_season = Season.objects.latest('season_name')


class CreateTeamForm(forms.ModelForm):

	class Meta:
		model = STP
		fields = ['season_id','team_id','player_id']
		labels = {'season_id':'Select Season',
							'team_id':'Select Team',
							'player_id':'Select Player'}

	def get_available_players(season):
		# get list of available players based on whether they have been selected to a team for the current season
		# registered players - chosen players = available players
		chosen_players = STP.objects.filter(season_id = season ).values_list('player', flat=True)
		registered_players = Player.objects.filter(is_registered = True)
		available_players = registered_players.exclude(id__in = chosen_players)
		return available_players

	## define the available Season, Team, & Player options
	## TODO: how to change "curr_season" var from UI to backend? 
	available_players = get_available_players(curr_season)
	season_id = forms.ModelChoiceField(queryset= Season.objects.order_by('-id'), empty_label=None) #can include widgets = 
	team_id = forms.ModelChoiceField(queryset= Team.objects, empty_label=None) #can include widgets = 
	player_id = forms.ModelChoiceField(queryset= available_players, empty_label=None) #can include widgets = 

############
