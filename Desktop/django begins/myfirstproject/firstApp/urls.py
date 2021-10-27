# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')

from django.urls import path
from firstApp import views

urlpatterns = [
    path('', views.testing_api, name='testing_api'),
]