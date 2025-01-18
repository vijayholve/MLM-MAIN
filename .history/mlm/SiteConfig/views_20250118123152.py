from django.shortcuts import render
from .models import Siteconfig
from rest_framework.response import Response
from 

@
def siteconfigApi(request):
    siteconfig=Siteconfig.objects.filter().first()
    return Response(
        { "navbar_title":siteconfig.navbar_title,
         "navbar_image":siteconfig.navbar_image ,
         "headers_name":siteconfig.headers_name}
    )