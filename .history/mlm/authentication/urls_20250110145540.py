from django.urls import path
from .views import  CustomTokenObtainPairView, CustomTokenRefreshView, logout, MLMUserCreateAPIView, is_logged_in

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', logout),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/', MLMUserCreateAPIView.as_view()),
    path('authenticated/', is_logged_in),
    path('login-page-2/',vi)
]