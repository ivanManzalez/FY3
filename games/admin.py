from django.contrib import admin
from games.models.game import Game
from games.models.season import Season
from games.models.game_stats import GameStats

# Register your models here.
admin.site.register(Game)
admin.site.register(Season)
admin.site.register(GameStats)
