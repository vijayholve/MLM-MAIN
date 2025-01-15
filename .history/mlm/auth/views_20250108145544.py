from django.shortcuts import render
from base.models import MLMUser 
from rest_framework import generics 
from .serializer import userSerializer 
from rest_framework.permissions  import IsAuthenticated,AllowAny


class CreateUser(generics.CreateAPIView):
    queryset