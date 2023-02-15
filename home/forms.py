from django import forms
from .models import Team, Season, Player, SeasonTeamPlayer

# can change to different seasons for historical purposes(?)


# class CreateTeamForm(forms.Form):
# 	####specify fields 
# 	# Season (default to current season)
# 	season = forms.CharField(label='Select a Season', 
# 							 widget=forms.Select(choices=SEASONS_LIST))
	
# 	# Select Team from dropdown
# 	team = forms.CharField(label='Select a Team', 
# 						   widget=forms.Select(choices=TEAMS_LIST))

# 	# Select unteamed player (create 'teamed' indicator in db)
# 	player = forms.CharField(label='Select a Player', 
# 						   widget=forms.Select(choices=PLAYERS_LIST))

class CreateTeamForm(forms.ModelForm):
	players = Player.objects.filter(player_paid = True, part_of_team=False)
	season_id = forms.ModelChoiceField(queryset= Season.objects.order_by('-id'), empty_label=None) #can include widgets = 
	team_id = forms.ModelChoiceField(queryset= Team.objects, empty_label=None) #can include widgets = 
	player_id = forms.ModelChoiceField(queryset= players, empty_label=None) #can include widgets = 

	class Meta:
		model = SeasonTeamPlayer
		fields = ['season_id','team_id','player_id']
		labels = {'season_id':'Select Season',
		'team_id':'Select Team',
		'player_id':'Select Player'}
		



