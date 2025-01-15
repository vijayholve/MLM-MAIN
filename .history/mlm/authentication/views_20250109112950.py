from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,LoginSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from base.models import MLMUser 
from rest_framework.views  import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
class CreateUserView(APIView):
    
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user =serializer.validated_data 
            authenticate(request,user)
            return Response({
                 "message": "Login successful",
                "mlm_id": user.mlm_id,
                "username": user.username,
                "rank": user.rank
            },status=status.HTTP_200_OK)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST )
