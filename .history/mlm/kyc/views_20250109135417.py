from django.shortcuts import render
from .serializers import KycSerializer 
from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from base.models import Kyc 
from .serializers import KycSerializer
from rest_framework import viewsets 
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

    
class Create_kyc(CreateAPIView):
    queryset = Kyc.objects.filter(blocked=False) 
    serializer_class = KycSerializer
    def post(self, request):
        serializer = KycSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "KYC created successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def get_kyc_response(request):
    kycs = Kyc.objects.filter(blocked=False)
    serializer = KycSerializer(kycs,many=True)
    return Response(serializer.data)

