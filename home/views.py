from django.shortcuts import render
from django.http import HttpResponse
import logging

################################################


# Logging configuration
logging.basicConfig(format='[%(asctime)s] - %(message)s', level=logging.INFO)


################################################

def landing(request):
  return render(request, 'index.html')

################################################
