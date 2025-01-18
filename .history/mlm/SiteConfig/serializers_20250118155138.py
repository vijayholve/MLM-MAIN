from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Siteconfig
from .serializers import SiteConfigSerializer

class SiteConfigUpdateView(APIView):
    def get(self, request):
        try:
            site_config = Siteconfig.objects.first()  # Assuming a single SiteConfig object
            serializer = SiteConfigSerializer(site_config)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Siteconfig.DoesNotExist:
            return Response({"error": "SiteConfig not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        try:
            site_config = Siteconfig.objects.first()
            serializer = SiteConfigSerializer(site_config, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Siteconfig.DoesNotExist:
            return Response({"error": "SiteConfig not found"}, status=status.HTTP_404_NOT_FOUND)
