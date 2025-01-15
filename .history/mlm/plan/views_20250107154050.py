from .serializers import PlasSerializers 
from base.models import Plan 
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_plan(request):
    plans= Plan.objects.filter(blocked=False)
    serializer = PlasSerializers(plans,many=True)
    return Response(serializer.data)
