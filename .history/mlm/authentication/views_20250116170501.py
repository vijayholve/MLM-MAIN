from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate,login
from .serializers import  UserRegisterSerializer, UserSerializer ,LoginPageSerializer
from datetime import datetime, timedelta
from base.models import MLMUser
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework import status
 

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this endpoint

    def get(self, request):
        # Example response for authenticated users
        return Response({"message": f"{request.user.username}",})
    def post(self, request):
        return Response({"message": "POST method accessed"})
class LoginView(APIView):
    def post(self, request):
        serializer = LoginPageSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user) 
            user=authenticate(request,user)
            login(request,user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username':user.username ,
                'password':user.password
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class MLMUserCreateAPIView(generics.CreateAPIView):
    queryset = MLMUser.objects.all()
    serializer_class = UserRegisterSerializer 
    permission_classes = [AllowAny]


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']
            seriliazer = UserSerializer(request.user, many=False)
            user= MLMUser.objects.get(username=request.user.username)
            if request.user:
                 res = Response() 
            
            res.data = {'success':True}

            res.set_cookie(
                key='access_token',
                value=str(access_token),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.set_cookie(
                key='refresh_token',
                value=str(refresh_token),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            res.data.update(tokens)
            return res
        
        except Exception as e:
            print(e)
            return Response({'success':False})
        
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            access_token = tokens['access']
            res = Response()
            res.data = {'refreshed': True}

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False,
                samesite='None',
                path='/'
            )
            return res

        except Exception as e:
            print(e)
            return Response({'refreshed': False})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:

        res = Response()
        res.data = {'success':True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('response_token', path='/', samesite='None')

        return res

    except Exception as e:
        print(e)
        return Response({'success':False})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_logged_in(request):
    return Response({"authenticated":True})

