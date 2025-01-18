from django.shortcuts import render
from .models import Siteconfig
from rest_framework.response import Response
from rest_framework.decorators  import api_view ,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from .serializers import siteConfigSerializers
from rest_framework import status

@permission_classes([AllowAny])
class siteconfigApi(APIView):
    def get(self,request):
        try:
            site_config = Siteconfig.objects.first()
            serializers = siteConfigSerializers(site_config)
            return Response(serializers.data,status=status.HTTP_200_OK)
        except Siteconfig.DoesNotExist:
            return Response({"error":f"error is occur "},status=status.HTTP_400_BAD_REQUEST)
    def put(self,request):
        try:
            site_config = Siteconfig.objects.first() 
            serializers = siteConfigSerializers(site_config,data= request.data,
                                                 partial=True)
            if serializers.is_valid():
                serializers.save()
                return Response(serializers.data, status=status.HTTP_200_OK)
            return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)
        except Siteconfig.DoesNotExist:
                        return Response({"error": "SiteConfig not found"}, status=status.HTTP_404_NOT_FOUND)
