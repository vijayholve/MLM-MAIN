from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,LoginSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from base.models import MLMUser 



class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = MLMUser 
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid()
