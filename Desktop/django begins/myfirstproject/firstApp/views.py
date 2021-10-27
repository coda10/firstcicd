from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.
def testing_api(request):
    if request.method == 'GET':
        # return HttpResponse('<h2> API WORKING WELL !!!<?h2>')
        # return JsonResponse({"STATUS": f"{request}"})
        return JsonResponse({"STATUS": "Working!!"})

    #if request.method == 'POST':,,


