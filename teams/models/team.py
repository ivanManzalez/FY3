from django.db import models
import re

DIVISIONS = [('E','East'),('W','West')]

def to_camel_case(text):
    # Split the text into words using spaces and underscores
    words = re.split(r'[ _]', text)
    
    # Capitalize the first letter of each word except the first one
    camel_case_words = [words[0].lower()] + [word.capitalize() for word in words[1:]]
    
    # Join the words to create the camelCase string
    return ''.join(camel_case_words)

class Team(models.Model):
    team_name = models.CharField(max_length=40)
    abbr_name = models.CharField(max_length=5, default=None)
    division_ind = models.CharField(max_length=1, default='E', choices=DIVISIONS)
    
    is_active = models.BooleanField(default=False)
    date_founded = models.DateTimeField(auto_now_add=True)

    @property
    def image_url(self):
        return "/static/images/team_logos/" + to_camel_case(self.team_name) + ".png"
    
    def __str__(self):
        return self.team_name

