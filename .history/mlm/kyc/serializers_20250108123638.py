from rest_framework.serializers import ModelSerializer
from base.models import Kyc, MLMUser
from rest_framework import serializers

class KycSerializer(ModelSerializer):
    class Meta:
        model = Kyc
        fields = '__all__'

    def validate(self, data):
        print("valid)
        user = self.context['request'].user  # Access the logged-in user
        if user.kyc:  # Check if the user already has a KYC record
            raise serializers.ValidationError("User already has a KYC.")
        return data

    def create(self, validated_data):
        user = self.context['request'].user  # Get the logged-in user
        # You don't need to create the MLMUser instance again; it's already there.
        return Kyc.objects.create(
            user=user,  # Assign the logged-in user to the KYC object
            **validated_data
        )
