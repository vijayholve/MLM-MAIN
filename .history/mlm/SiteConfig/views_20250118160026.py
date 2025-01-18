from django.shortcuts import render
from .models import Siteconfig
from rest_framework.response import Response
from rest_framework.decorators  import api_view ,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from .serializers import siteConfigSerializers
from rest_framework import status
class siteconfigApi(APIView):
    def get(self,request):
        try:
            
            site_config = Siteconfig.objects.first()
            serializers = siteConfigSerializers(site_config)
            return Response(serializers.data,status=status.HTTP_200_OK)
        except(errors):
            return Response({"error":f"error is occur {error}"})
            
    

