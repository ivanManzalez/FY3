from django.contrib import admin
from .models.season import Season
from .models.season_award import SeasonAward

# Register your models here.
admin.site.register(Season)
admin.site.register(SeasonAward)
