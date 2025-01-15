from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics
from .models import MLMUser
from .serializers import MLMUserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

class MLMUserCreateAPIView(generics.CreateAPIView):
    queryset = MLMUser.objects.all()
    serializer_class = MLMUserSerializer
    
@api_view(['GET'])
def MLMUserListApisViews(request):
    users=MLMUser.objects.filter(is_active=True)
    serializer = MLMUserSerializer(users, many=True)
    return Response(serializer.data)



def get_mlm_tree(request,mlm_id):
    def build_tree(user):
        if not user:
            return None
        children = []
        if user.left:
            children.append(build_tree(user.left))
        if user.right:
            children.append(build_tree(user.right))
        
        # Only return children if they are not empty or null
        children = [child for child in children if child is not None]
        
        return {
            "id":user.id,
            "name": user.custom_sponsor_id,
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
