from django.urls import path
from .views import  CustomTokenObtainPairView, CustomTokenRefreshView, logout, MLMUserCreateAPIView, is_logged_in
from .import views 
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', logout),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/', MLMUserCreateAPIView.as_view()),
    path('authenticated/', is_logged_in),
    path('login-page/',views.LoginView.as_view()      ),
    path('protected-endpoint/', views.ProtectedView.as_view(), name='protected-endpoint'),
 path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # for login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # for refreshing token
    # path('api/login-user', views, name='token_refresh'),  # for refreshing token

]