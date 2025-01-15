from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken


from datetime import datetime, timedelta
@api_view(['GET'])
def get_plan(request):
    plans= Plan.objects.filter(blocked=False)
    serializer = PlasSerializers(plans,many=True)
    return Response(serializer.data)
