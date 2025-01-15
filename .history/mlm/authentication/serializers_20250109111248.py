from django.contrib.auth.models import User
from rest_framework import serializers
from base.models import MLMUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MLMUser
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = MLMUser.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers)

