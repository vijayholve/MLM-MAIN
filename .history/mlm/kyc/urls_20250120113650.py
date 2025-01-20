from django.urls import path 
from . import views 

urlpatterns = [
    path('get-list',views.get_kyc_response,name='get-list'),
path('operate-kyc', views.View_of_kyc.as_view(), name='list'),  # Add () to as_view
    path('update-status/<int:kyc_id>/', views.update_status, name='update-status'),

]

