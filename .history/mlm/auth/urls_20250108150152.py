from . import views 
from django.urls import path 
from django.contrib  import admin 
from rest_framework_simplejwt.views import TokenObtainPairView ,TokenRefreshView 


urlpatterns = [
    path('user/create',views.CreateUser.as_view(),name="register"),
    path('api/token',TokenObtainPairView.as_view(),name="get_token"),
    path('api/token/refresh',TokenRefreshView.as_view(),name=""refresh"),
]
