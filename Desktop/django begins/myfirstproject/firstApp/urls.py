# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')

from django.urls import path, include
from firstApp import views
from firstApp.views import EmployeesView, EmployeesDetailsView

urlpatterns = [
    path('employees/', EmployeesView.as_view(), name='employees'),
    path('employees/<str:pk>', EmployeesDetailsView.as_view(), name='employees_details'),
    path('', views.testing_api, name='testing_api'),
]
