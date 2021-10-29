from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from .models import Employee
from .serializers import EmployeeSerializer

# Create your views here.

    #if request.method == 'POST':,,


class EmployeesView(APIView):
    def get(self, request, *args, **kwargs):
        qs = Employee.objects.all()
        serializer = EmployeeSerializer(qs, many=True)
        return JsonResponse({"answer": serializer.data})


def testing_api(request):
    if request.method == 'GET':
        # return HttpResponse('<h2> API WORKING WELL !!!<?h2>')
        # return JsonResponse({"STATUS": f"{request}"})
        return JsonResponse({"STATUS": "Working!!", "HOSTED-BY": "Dake Daniel", "BACKEND-TECH": "Python/Django", "MESSAGE": "Congrats!! (Eno..) Bless us with your anointing some, especially donald!!"})
