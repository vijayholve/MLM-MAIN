from django.contrib.auth.models import User
from rest_framework import serializers 
from base.models import MLMUser

class userSerializer(serializers.ModelSerializer):
    class class Meta:
        db_table = ''
        managed = True
        verbose_name = 'ModelName'
        verbose_name_plural = 'ModelNames'
