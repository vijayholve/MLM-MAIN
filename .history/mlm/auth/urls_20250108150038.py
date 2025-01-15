from . import views 
from django.urls import path 
from django.contrib  import admin 
from rest_framework_simplejwt.views import TokenObtainPairView ,TokenRefreshView 


urlpatterns = [
    path('user/create',views.CreateUser.as_view()),
    path('api/token',TokenObtainPairView.as_view())
]
