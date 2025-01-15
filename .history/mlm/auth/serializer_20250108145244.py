from django.contrib.auth.models import User
from rest_framework import serializers 
from base.models import MLMUser

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model= MLMUser 
        fileds=['id','username','password']
        extra_kwargs={'password' :{'write_only':True}}
    def create(self,validate_data):
        user= MLMUser