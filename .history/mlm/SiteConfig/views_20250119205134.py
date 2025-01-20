from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Siteconfig
from .serializers import siteConfigSerializers
import logging

logger = logging.getLogger(__name__)

class siteconfigApi(APIView):
    def put(self, request):
        try:
            # Fetch the first Siteconfig object
            site_config = Siteconfig.objects.first()
            if not site_config:
                return Response(
                    {"error": "SiteConfig not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Validate and update the object with partial data
            serializer = siteConfigSerializers(
                site_config, data=request.data, partial=True
            )
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"message": "SiteConfig updated successfully", "data": serializer.data},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {
                        "error": "Validation failed",
                        "details": serializer.errors,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            logger.error(f"An error occurred during SiteConfig update: {str(e)}")
            return Response(
                {"error": "An unexpected error occurred. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
