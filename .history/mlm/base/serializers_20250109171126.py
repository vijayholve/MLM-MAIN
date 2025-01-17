from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import MLMUser

class MLMUserSerializer(serializers.ModelSerializer):
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

    def validate(self,data):
        password = data.get('password')
        password_confirmation = data.pop('passwordConfirmation', None)

        if password != password_confirmation:
            raise serializers.ValidationError({'passwordConfirmation': 'Passwords do not match.'}) 
        return data
    
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
