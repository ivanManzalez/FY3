from django.contrib import admin
from .models import Player, Team, Season, SeasonTeamPlayer

# Register your models here to be included 
# on admin page
admin.site.register(Player)
admin.site.register(Team)
admin.site.register(Season)
admin.site.register(SeasonTeamPlayer)
# admin.site.register(Game)
# admin.site.register(GameStats)

