from django.http.response import Http404
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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
                return Response({"message": "Employee creation Successful!"}, status=status.HTTP_201_CREATED)
        except:
            return Response({"error": "Employee Creation Failed!"}, status=status.HTTP_400_BAD_REQUEST)

class EmployeesDetailsView(APIView):
    #get only one employee
    def get(self, request, pk, *args, **kwargs):
        try:
            onequer = Employee.objects.get(pk=pk)
            print(f"{onequer}")
            if onequer:
                serializer = EmployeeSerializer(onequer)
                return Response({"message":"Fetch Successful", "data": serializer.data}, status=status.HTTP_200_OK)
        except Employee.DoesNotExist:
            return Response({"Error": "User does not exist!"}, status=status.HTTP_400_BAD_REQUEST)

    #Update Employee Details
    def put(self, request, pk, *args, **kwargs):
        #if request.data.get('id') is not None:
            # checkIfEmpExist = Employee.objects.get(pk=request.data.get('id'))
            try:
                checkIfEmpExist = Employee.objects.get(pk=pk)
                if checkIfEmpExist:
                    serializer = EmployeeSerializer(checkIfEmpExist, data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return JsonResponse({"message": "Update Successful!"})
                    else:
                        return JsonResponse({"Error": "Update Failed!!"})
            except Employee.DoesNotExist: 
                return Response({"Error": "User does not exist!"}, status=status.HTTP_400_BAD_REQUEST)
        #return JsonResponse({"Error": "Invalid 'ID'!"})

    # Delete an employee 
    def delete(self, request, pk):
        #if request.data.get('id') is not None:
            try:
                checkIfEmpExist = Employee.objects.get(pk=pk)
                if checkIfEmpExist:
                    checkIfEmpExist.delete()
                    return JsonResponse({"message": "Deletion Successful!"})
            except Employee.DoesNotExist:
                return Response({"Error": "User does not exist!"}, status=status.HTTP_404_NOT_FOUND)
        #return JsonResponse({"Error": "Invalid 'ID'!"})


def testing_api(request):
    if request.method == 'GET':
        # return HttpResponse('<h2> API WORKING WELL !!!<?h2>')
        # return JsonResponse({"STATUS": f"{request}"})
        return JsonResponse({"STATUS": "Working!!", "HOSTED-BY": "Dake Daniel", "BACKEND-TECH": "Python/Django", "MESSAGE": "Congrats!! (Eno..) Bless us with your anointing some, especially donald!!"})
