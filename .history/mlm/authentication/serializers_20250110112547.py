from django.contrib.auth.models import User
from rest_framework import serializers
from base.models import MLMUser
from django.contrib.auth import authenticate
from rest_framework.serializers import ValidationError
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MLMUser
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = MLMUser.objects.create(**validated_data)
        return user

from rest_framework import serializers
from django.contrib.auth import authenticate
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if not username or not password:
            raise serializers.ValidationError("Both username and password are required.")

        # Authenticate user
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid username or password.")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")

        return {"user": user}

from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken



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

<<<<<<< Tabnine <<<<<<<
   def validate(self, attrs):
        password = attrs.get('password')#-
        password_confirmation = attrs.get('passwordConfirmation')#-
       """#+
       Validates the password and password confirmation fields.#+

        if password != password_confirmation:#-
            raise serializers.ValidationError("Passwords do not match.")#-
        return attrs#-
       Parameters:#+
       attrs (dict): A dictionary containing the attributes to be validated.#+
#+
       Returns:#+
       dict: The validated attributes. Raises a ValidationError if the passwords do not match.#+
#+
       Raises:#+
       serializers.ValidationError: If the passwords do not match.#+
       """#+
       password = attrs.get('password')#+
       password_confirmation = attrs.get('passwordConfirmation')#+
#+
       if password != password_confirmation:#+
           raise serializers.ValidationError("Passwords do not match.")#+
       return attrs#+
>>>>>>> Tabnine >>>>>>># {"conversationId":"694f5695-5843-471b-90f8-2e7b75f59b5a","source":"instruct"}
    
    def create(self, validated_data):
        sponsor_code = validated_data.pop('sponsor_code', None) 
        position = validated_data['position']
        print(position)
        print(f"2) Sponsor code received: {sponsor_code}")   
        print(f"Validated data: {validated_data}")  

        sponsor = None
        if sponsor_code:
            sponsor = MLMUser.objects.get(username=sponsor_code)  
            print(f"Sponsor found: {sponsor}")
        else:
            print("Sponsor code is missing!")
        validated_data['password'] = make_password(validated_data['password'])
        print(f"Validated data before creating user: {validated_data}")
        user = MLMUser.objects.create(
            sponsor=sponsor,
            **validated_data
        )
        
        user.set_password(validated_data['password'])
        user.save()

        def assign_to_spot(parent_node,node, new_user):
            if position == 'left' and  node.left is None:
                node.left = new_user 
                node.parent = parent_node 
                node.save() 
                print(f"Assigned user {new_user} to left of {node}")  # Debugging line
                return True
            elif  position == 'right' and node.right is None:
                node.right = new_user 
                node.parent = parent_node
                node.save()
                print(f"Assigned user {new_user} to right of {node}")  
                return True 
            else:
                print(f"Both spots for sponsor {node} are filled")  
                if position == 'left' and  assign_to_spot(node,node.left, new_user):
                    return True
                elif  position == 'right' and  assign_to_spot(node,node.right, new_user):
                    return True
                else:
                    return False
                
        if sponsor and not assign_to_spot(sponsor.parent,sponsor, user):
            raise serializers.ValidationError("No available space for this user under the sponsor.")
        
        return user
