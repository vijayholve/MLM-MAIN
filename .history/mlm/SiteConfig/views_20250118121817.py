from django.shortcuts import render
from .models import Siteconfig


def siteconfigApi(request):
    # siteconfig=Siteconfig.objects.