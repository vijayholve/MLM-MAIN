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
    print("Validated data received:", validated_data)
    request = self.context.get('request')
    token = request.headers.get('Authorization', None)

    if not token:
        raise AuthenticationFailed("Token is required for authentication.")
    
    # Print token to debug
    print(f"Received token: {token}")

    # Get the user from the token
    user = self.get_user_from_token(token)
    print(f"Authenticated user: {user}")

    validated_data['user'] = user
    kyc = Kyc.objects.create(**validated_data)

    return kyc
