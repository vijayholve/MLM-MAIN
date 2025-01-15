from rest_framework.serializers import ModelSerializer 
from base.models  import Kyc ,MLMUser

class KycSerializer(ModelSerializer):
    class Meta :
        model= Kyc 
        fields= '__all__'
        
    def creat(self,validate_data):
        print("Data is done : ",validate_data)
        return Kyc.objects.create(
            **validate_data ,
                                  user= MLMUser.objects.create(id=12))
        

