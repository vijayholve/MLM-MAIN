from rest_framework.serializers import ModelSerializer
from base.models import Kyc, MLMUser
from rest_framework import serializers

class KycSerializer(ModelSerializer):
    class Meta:
        model = Kyc
        fields = ['front_aadhar_img', 'back_aadhar_img', 'front_pan_img', 'back_pan_img']

   

    def create(self, validated_data):
        user = self.context['request'].user 
        print()
        return Kyc.objects.create(
            user=user,  
            **validated_data
        )
