from django.shortcuts import render
from .serializers import KycSerializer 
from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from base.models import Kyc 
from .serializers import KycSerializer
from rest_framework import viewsets 
from rest_framework.generics import CreateAPIView
class Create_kyc(CreateAPIView):
    kycs=Kyc.objects.filter(blocked=False)
    serializer = KycSerializer 
    
    
@api_view(['GET'])
def get_kyc_response(request):
    kycs = Kyc.objects.filter(blocked=False)
    serializer = KycSerializer(kycs,many=True)
    return Response(serializer.data)

