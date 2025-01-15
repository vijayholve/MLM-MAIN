from rest_framework.serializers import ModelSerializer 
from base.models  import Kyc

class KycSerializer(ModelSerializer):
    class Meta :
        model= Kyc 
        field= [
            'user',
            'front_aadhar_img',
            'back_aadhar_img',
            'front_pan_img',
            'back_pan_img',
            'status'
        ]
    def creat(self,data):
        print("Data is done : ",data)
        

