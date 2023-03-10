from django import forms
from .models import Team, Season, Player, STP, GameStat, Game

# can change to different seasons for historical purposes(?)
curr_season = Season.objects.latest('season_name')

############
class PlayerStatsForm(forms.ModelForm):

    class Meta:
        model = GameStat
        
        fields = ['game','player', 'points','rebounds','assists','steals','blocks']

        labels = {'game':'Game',
        'player':'Player', 
        'points':'Pts',
        'rebounds':'Rebs',
        'assists':'Asts',
        'steals':'Stls',
        'blocks':'Blks'}

    games = Game.objects.filter(season=curr_season)
    game = forms.ModelChoiceField(queryset= games, empty_label="Select Game")

    def __init__(self, *args, **kwargs):
        print(' ---- Form: Initializing PlayerStatsForm ...')

        super().__init__(*args, **kwargs)
        print(' ---- self.data (1)==', self.data)
    #     # override default queryset .all() to .none() instead
        self.fields['player'].queryset = Player.objects.none()

        print(' ---- self.data (2)==', self.fields['player'].queryset)
        if ('game' in self.data): #self.data == request.POST
            try:
                player_id = int(self.data.get('player'))
                print(" ---- Form: Player_id = ",Player.objects.filter(id=player_id))

                self.fields['player'].queryset = Player.objects.filter(id=player_id)

            except (ValueError, TypeError):
                pass  # invalid input from the client; ignore and fallback to empty City queryset
        elif self.instance.pk:
            self.fields['player'].queryset = self.instance.game.player_set#.order_by('name')
# variable = your FormName.cleaned_data.get("field value that u want to get")

############