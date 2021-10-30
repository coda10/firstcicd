from django.http.response import Http404
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Employee
from .serializers import EmployeeSerializer

# Create your views here
class EmployeesView(APIView):
    #get all employees
    def get(self, request, *args, **kwargs):
        qs = Employee.objects.all()
        serializer = EmployeeSerializer(qs, many=True)
        return JsonResponse({"All Employees:": serializer.data})

    #create an employee
    def post(self, request, *args, **kwargs):
        try:
            serializer = EmployeeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Employee creation Successful!"})
            else:
                return Response({"error": "Employee Creation Failed!"})
        except:
            raise Http404

class EmployeesDetailsView(APIView):
        
    #get only one employee
    def get(self, request, pk, *args, **kwargs):
        onequer = Employee.objects.get(pk=pk)
        serializer = EmployeeSerializer(onequer)
        return JsonResponse({"message":"Fetch Successful", "data": serializer.data})

    #Update Employee Details
    def put(self, request, pk, *args, **kwargs):
        #if request.data.get('id') is not None:
            # checkIfEmpExist = Employee.objects.get(pk=request.data.get('id'))
            checkIfEmpExist = Employee.objects.get(pk=pk)
            if checkIfEmpExist:
                serializer = EmployeeSerializer(checkIfEmpExist, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return JsonResponse({"message": "Update Successful!"})
                return JsonResponse({"Error": "Update Failed!!"})
            return JsonResponse({"Error": "User does not exist!"})
        #return JsonResponse({"Error": "Invalid 'ID'!"})

    # Delete an employee 
    def delete(self, request, pk):
        #if request.data.get('id') is not None:
            checkIfEmpExist = Employee.objects.get(pk=pk)
            if checkIfEmpExist:
                checkIfEmpExist.delete()
                return JsonResponse({"message": "Deletion Successful!"})
            return JsonResponse({"Error": "User does not exist!"})
        #return JsonResponse({"Error": "Invalid 'ID'!"})


def testing_api(request):
    if request.method == 'GET':
        # return HttpResponse('<h2> API WORKING WELL !!!<?h2>')
        # return JsonResponse({"STATUS": f"{request}"})
        return JsonResponse({"STATUS": "Working!!", "HOSTED-BY": "Dake Daniel", "BACKEND-TECH": "Python/Django", "MESSAGE": "Congrats!! (Eno..) Bless us with your anointing some, especially donald!!"})
