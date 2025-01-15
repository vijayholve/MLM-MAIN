from django.contrib.auth.models import User
from rest_framework import serializers 
from base.models import MLMUser

class userSerializer(serializers.ModelSerializer):
    class Meta:
        
