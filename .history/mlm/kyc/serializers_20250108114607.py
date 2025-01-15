from rest_framework.serializers import ModelSerializer 
from base.models  import Kyc ,MLMUser
from rest_framework import serializers
class KycSerializer(ModelSerializer):
    class Meta :
        model= Kyc 
        fields= '__all__'
        
    def validate(self,data):
        print(data)
        return data
def creat(self,validate_data):
        print("Data is done : ",validate_data)
        user= MLMUser.objects.create(id=12)
        return Kyc.objects.create(
                                  user= user,
        **validate_data)
        

