from django.shortcuts import render
from .serializers import KycSerializer 
from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from base.models import Kyc 
from .serializers import KycSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework import viewsets 
# from rest_framework.generics import CreateAPIView
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.decorators import permission_classes ,APIView 
from rest_framework.permissions import AllowAny 
import json 

@permission_classes([AllowAny])
class View_of_kyc(APIView): 
    def get(self,request):
        kycs= Kyc.objects.filter(blocked = False)
        serializers= KycSerializer(kycs,many=True)
        return Response(serializers.data) 
    def post(self, request):
        serializer = KycSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():   
            serializer.save()
            return Response({"message": "KYC created successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def get_kyc_response(request):
    kycs = Kyc.objects.filter(blocked=False,user__isnull=True)
    serializer = KycSerializer(kycs,many=True)
    return Response(serializer.data)



@csrf_exempt
def update_status(request, kyc_id):
    if request.method == 'PATCH':
        try:
            data = json.loads(request.body)
            new_status = data.get('status', None)

            if not new_status or new_status not in ['Pending', 'Approved', 'Rejected']:
                return JsonResponse({'error': 'Invalid status'}, status=400)

            kyc = get_object_or_404(Kyc, id=kyc_id)
            kyc.status = new_status
            kyc.save()

            return JsonResponse({'message': 'Status updated successfully', 'status': kyc.status})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)