from .serializers import PlasSerializers 
from base.models import Plan 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics


class planSerializers(generics.CreateAPIView)