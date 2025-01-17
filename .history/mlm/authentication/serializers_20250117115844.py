from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from base.models import MLMUser
from django.contrib.auth import authenticate
from rest_framework.serializers import ValidationError

from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MLMUser
        fields = ["username"]

    # def create(self, validated_data):
    #     print(validated_data)
    #     user = MLMUser.objects.create(**validated_data) 
    #     print(user)
    #     return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")
        print("username : ",username," " ,password)

        if not username or not password:
            raise serializers.ValidationError("Both username and password are required.")

        # Authenticate user
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid username or password.")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")
      
        return user 

# class LoginView(serializers.ModelSerializer):
#     def post(self,request):
#         data =request.data 
#         username= data.get('username')
#         password= data.get('password')  
#         user=MLMUser.objects.filter(username=username).first()
#         if user and user.check_password(password ):
#             RefreshToken
class UserRegisterSerializer(serializers.ModelSerializer):
    sponsor_code = serializers.CharField(write_only=True, required=False, allow_blank=True)
    passwordConfirmation = serializers.CharField(write_only=True)  

    class Meta:
        model = MLMUser
        fields = [
            'id',
            'username',
            'email', 
            'password',
            'mlm_id',
            'sponsor',
            'left',
            'right',
            'custom_sponsor_id',
            'sponsor_code',
            'passwordConfirmation' ,
            'position',
            'parent'
                  ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate_sponsor_code(self, value):
        print(f"Received sponsor code: {value}")
        if value:
            try:
                sponsor = MLMUser.objects.get(custom_sponsor_id=value)
                print(f"Sponsor found: {sponsor}") 
                return sponsor
            except MLMUser.DoesNotExist:
                print(f"Sponsor with code {value} not found") 
                raise serializers.ValidationError("Sponsor not found.")
        return None

    def validate(self, attrs):
        password = attrs.get('password')
        password_confirmation = attrs.get('passwordConfirmation')
        
        if password != password_confirmation:
            raise serializers.ValidationError("Passwords do not match.")
        return attrs
    
    def create(self, validated_data):
    # Pop out passwordConfirmation as it's not part of the model
        password_confirmation = validated_data.pop('passwordConfirmation', None)
        sponsor_code = validated_data.pop('sponsor_code', None)  # Remove sponsor_code if it's provided
        position = validated_data.get('position')

        print(f"2) Sponsor code received: {sponsor_code}")
        print(f"Validated data: {validated_data}")

        # Validate password confirmation
        if password_confirmation and validated_data['password'] != password_confirmation:
            raise serializers.ValidationError("Passwords do not match.")

        sponsor = None
        if sponsor_code:
            try:
                sponsor = MLMUser.objects.get(username=sponsor_code)
                print(f"Sponsor found: {sponsor}")
            except MLMUser.DoesNotExist:
                print(f"Sponsor with code {sponsor_code} not found")
                raise serializers.ValidationError("Sponsor not found.")

        # Hash the password before saving
        validated_data['password'] = make_password(validated_data['password'])

        print(f"Validated data before creating user: {validated_data}")
        
        # Create the user
        user = MLMUser.objects.create(
            sponsor=sponsor,
            **validated_data
        )
        
        user.set_password(validated_data['password'])
        user.save()

        def assign_to_spot(parent_node, node, new_user):
            if position == 'left' and node.left is None:
                node.left = new_user
                node.parent = parent_node
                node.save()
                print(f"Assigned user {new_user} to left of {node}")  # Debugging line
                return True
            elif position == 'right' and node.right is None:
                node.right = new_user
                node.parent = parent_node
                node.save()
                print(f"Assigned user {new_user} to right of {node}")
                return True
            else:
                print(f"Both spots for sponsor {node} are filled")
                if position == 'left' and assign_to_spot(node, node.left, new_user):
                    return True
                elif position == 'right' and assign_to_spot(node, node.right, new_user):
                    return True
                else:
                    return False

        if sponsor and not assign_to_spot(sponsor.parent, sponsor, user):
            raise serializers.ValidationError("No available space for this user under the sponsor.")

        return user


class LoginPageSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return user