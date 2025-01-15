from rest_framework.serializers import ModelSerializer 
from base.models  import Kyc ,MLMUser

class KycSerializer(ModelSerializer):
    class Meta :
        model= Kyc 
        fields= '__all__'
        
    def validate(self,data):
        password = data.get('password')
        password_confirmation = data.pop('passwordConfirmation', None)

        if password != password_confirmation:
            raise serializers.ValidationError({'passwordConfirmation': 'Passwords do not match.'}) 
        return data
    def creat(self,validate_data):
        print("Data is done : ",validate_data)
        user= MLMUser.objects.create(id=12)
        return Kyc.objects.create(
                                  user= user,
        **validate_data)
        

