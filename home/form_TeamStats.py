from django import forms
from .models import Team, Game, Season
import datetime

# can change to different seasons for historical purposes(?)
curr_season = Season.objects.latest('season_name')


class TeamStatsForm(forms.ModelForm):

  class Meta:
    model = Game
    
    fields = ['game_date','season','win_team', 'lose_team']
    
    labels = {'game_date':'Game Date',
    'season':'Season',
    'win_team':'Winning Team', 
    'lose_team':'Losing Team'}


  dates = Game.objects.filter(season_id = curr_season ).values_list('game_date', flat=True)
  game_date = forms.DateField(initial=datetime.date.today, widget=forms.widgets.DateInput(attrs={'type': 'date'}))

  season = forms.ModelChoiceField(queryset= Season.objects.order_by('-id'), empty_label=None) #can include widgets = 
  
  teams = Team.objects.all()

