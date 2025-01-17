from rest_framework.serializers import ModelSerializer
from base.models import Kyc, MLMUser
from rest_framework import serializers

class KycSerializer(ModelSerializer):
    class Meta:
        model = Kyc
        fields = ['front_aadhar_img', 'back_aadhar_img', 'front_pan_img', 'back_pan_img']


    def create(self, validated_data):
        username = validated_data.get('username')
        user = MLMUser.objects.get(username=username)

        # Remove username from validated data so that we don't try to save it to the KYC model
        validated_data.pop('username')
        
        
        return Kyc.objects.create( **validated_data)

