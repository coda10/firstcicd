from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.
def testing_api(request):
    if request.method == 'GET':
        # return HttpResponse('<h2> API WORKING WELL !!!<?h2>')
        # return JsonResponse({"STATUS": f"{request}"})
        return JsonResponse({"STATUS": "Working!!", "HOSTED-BY": "Dake Daniel", "BACKEND-TECH": "Python/Django", "MESSAGE": "Congrats!! (Eno..) Bless us with your anointing some, especially donald!!"})

    #if request.method == 'POST':,,


