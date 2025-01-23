from .serializers import PlanSerializers 
from base.models import Plan 
from rest_framework.decorators import api_view ,APIView,permission_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework import status

@permission_classes([AllowAny])
class planSerializersView(APIView):
    def get(self,request):
        plans= Plan.objects.filter(blocked= False)
        serializer= PlanSerializers(plans,many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = planSerializersView(data=request.data, context={'request': request})
        if serializer.is_valid():   
            serializer.save()
            return Response({"message": "KYC created successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    