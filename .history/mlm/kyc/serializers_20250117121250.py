from rest_framework.serializers import ModelSerializer
from base.models import Kyc, MLMUser
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import TokenAuthentication

class KycSerializer(ModelSerializer):
    class Meta:
        model = Kyc
        fields = ['front_aadhar_img', 'back_aadhar_img', 'front_pan_img', 'back_pan_img']


    def create(self, validated_data):
        request = self.context.get('request')
        token = request.headers.get('Authorization', None)
        if not token:
            raise AuthenticationFailed()
        if username := validated_data.get('username'):
        
            user = MLMUser.objects.get(username=username)

            validated_data.pop('username')
        return Kyc.objects.create( user=user,**validated_data)
        

