from rest_framework.serializers import ModelSerializer
from base.models import Kyc, MLMUser
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import TokenAuthentication
# from base.serializers import MLMUserSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken

class KycSerializer(ModelSerializer): 
    # user= MLMUserSerializer(read_only=True)
    class Meta:
        model = Kyc
        fields = [
            'id',
            'front_aadhar_img',
            'back_aadhar_img',
            'front_pan_img',
            'back_pan_img',
            'status',
            'blocked',
            'user'
        ]
    def get_user(self, obj):
        from base.serializers import MLMUserSerializer  # Lazy import
        return MLMUserSerializer(obj.user).data
    def create(self, validated_data):
        print("Validated data received:", validated_data)
        
        request = self.context.get('request')
        token = request.headers.get('Authorization', None)

        if not token:
            raise AuthenticationFailed("Token is required for authentication.")
        
        print(f"Received token: {token}")

        # Extract the token (remove 'Bearer ' part)
        try:
            token = token.split(' ')[1]
            access_token = AccessToken(token)
            user_id = access_token['user_id']
            user = MLMUser.objects.get(id=user_id)  # Or MLMUser if you're using a custom user model
            print(f"Authenticated user: {user}")
        except Exception as e:
            print(f"Error extracting user from token: {e}")
            raise AuthenticationFailed("Invalid token or user not found.")
        if user.kyc:
            user.kyc.delete()
        validated_data['user'] = user   # Assign user to validated data
        kyc = Kyc.objects.create(**validated_data)
        return kyc
