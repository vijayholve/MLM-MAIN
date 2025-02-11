from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics
from .models import MLMUser,Kyc
from .serializers import MLMUserSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny 
from django.db.models import Q
class MLMUserCreateAPIView(generics.CreateAPIView):
    queryset = MLMUser.objects.all()
    serializer_class = MLMUserSerializer 
    
@api_view(['GET'])
@permission_classes([AllowAny]) 
def MLMUserListApisViews(request):
    users = MLMUser.objects.filter(is_active=True)
    serializer = MLMUserSerializer(users, many=True)
    return Response(serializer.data)


def get_mlm_tree(request,mlm_id):
    def build_tree(user):
        if not user:
            return None
        children = []
        if user.left:
            children.append(build_tree(user.left))
        
        if user.right :
            children.append(build_tree(user.right))
        
        # Only return children if they are not empty or null
        children = [child for child in children if child is not None]
        
        return {
            "id":user.id,
            "name": user.username,
            "sponsor": user.custom_sponsor_id,

            "rank": user.rank,
            "total_sales": user.total_sales,
            "children": children
        }

    try:
        root_user = MLMUser.objects.get(id=mlm_id)
        tree_data = build_tree(root_user)
        return JsonResponse(tree_data, safe=False)
    except MLMUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

@api_view(['GET'])
@permission_classes([AllowAny]) 
def Dashboard(request):
    total_user= MLMUser.objects.all().count()
    active_user= MLMUser.objects.filter(is_active=True).count()
    kyc_request = Kyc.objects.filter(user__isnull=False).count()
    pending_kyc = Kyc.objects.filter(Q(status= "Pending") & 
                                     Q(user__isnull=False) ).count()
    aproved_user =Kyc.objects.filter(user__isnull=False ,
                                     status='Approved').count()
    rejected_user = 
    return Response({
        "pending_kyc":pending_kyc,
        'total_user': total_user,
        'active_user':active_user,
        'kyc_request':kyc_request,
        'aproved_user':aproved_user ,
        "rejected_user":rejected_user
    })