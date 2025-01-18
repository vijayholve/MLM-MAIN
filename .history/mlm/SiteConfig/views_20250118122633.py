from django.shortcuts import render
from .models import Siteconfig
from rest_framework.response import Response

def siteconfigApi(request):
    siteconfig=Siteconfig.objects.filter().first()
    return Response(
        {   }
    )