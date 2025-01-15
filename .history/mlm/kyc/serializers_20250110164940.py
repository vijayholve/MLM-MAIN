from rest_framework.serializers import ModelSerializer
from base.models import Kyc, MLMUser
from rest_framework import serializers

class KycSerializer(ModelSerializer):
    class Meta:
        model = Kyc
        fields = ['front_aadhar_img', 'back_aadhar_img', 'front_pan_img', 'back_pan_img']

    def validate(self, data):
        user =self.context['request'].user
        if not user.is_authenticated:  # Check if the user is authenticated
            raise serializers.ValidationError("User must be logged in.")
        
        if hasattr(user, 'kyc') and user.kyc:  # Check if the user already has a KYC record
                raise serializers.ValidationError("User already has a KYC record.")
        
        return data

    def create(self, validated_data):
        user = self.context['request'].user  
        return Kyc.objects.create(
            user=user,  
            **validated_data
        )
