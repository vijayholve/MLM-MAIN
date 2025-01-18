from django.shortcuts import render
from .models import Siteconfig
from rest_framework.response import Response
from rest_framework.decorators  import api_view ,permission_classes
from rest_framework.permissions import AllowAny
@api_view(['GET']) 
@permission_classes([AllowAny])
def siteconfigApi(request):
    
    siteconfig=Siteconfig.objects.filter().first()
    return Response(
        {
        "navbar_title":siteconfig.navbar_title or "",
        "navbar_image":siteconfig.navbar_image or "",
        "headers_name":siteconfig.headers_name or ""
         }
    ) 

