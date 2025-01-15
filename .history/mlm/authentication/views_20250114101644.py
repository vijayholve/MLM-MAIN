from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate,login
from .serializers import  UserRegisterSerializer, UserSerializer 
from datetime import datetime, timedelta
from base.models import MLMUser
from rest_framework import generics



class MLMUserCreateAPIView(generics.CreateAPIView):
    queryset = MLMUser.objects.all()
    serializer_class = UserRegisterSerializer 
    permission_classes = [AllowAny]
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            username = request.data.get("username")
            password = request.data.get("password")
            user = authenticate(request, username=username, password=password)

            if not username or not password:
                return Response({'success': False, 'error': 'Username and password are required'}, status=400)

            if user is None:
                return Response({'success': False, 'error': 'Invalid credentials'}, status=400)

            if not user.is_active:
                return Response({'success': False, 'error': 'User account is disabled'}, status=400)

            # Generate tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            login(request, user)
            res = Response({
                'success': True,
                'access': access_token,
                'refresh': refresh_token,
                'user': {
                    'username': user.username,
                    'password': user.password,
                }
            })
            res.set_cookie('access_token', access_token, httponly=True, secure=True, samesite='None', path='/', max_age=3600)
            res.set_cookie('refresh_token', refresh_token, httponly=True, secure=True, samesite='None', path='/', max_age=7*24*3600)
            return res
        except Exception as e:
            print(f"Error in CustomTokenObtainPairView: {e}")
            return Response({'success': False, 'error': 'An error occurred while processing your request'}, status=500)

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
    return Response("")

