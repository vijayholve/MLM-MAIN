from rest_framework.serializers  import ModelSerializer
from base.models import Plan 

class PlanSerializers(ModelSerializer):
    class Meta:
        model = Plan
        fields = ('id','name', 'plan_type', 'price')  # Correct `fields`, not `field`

    def create(self, validated_data):
        return Plan.objects.create(**validated_data)
