from rest_framework.serializers  import ModelSerializer
from base.models import Plan 

class PlasSerializers(ModelSerializer):
    class Meta:
        model= Plan
        field=(
               'name',
        'CONDITION_CHOICES',
        'plan_type',
        'price')
    def create(self,validate_data):
        return Plan.objects.create(**validate_data)