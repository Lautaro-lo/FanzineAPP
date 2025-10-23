from rest_framework.decorators import api_view
from rest_framework.response import Response
import os
from django.conf import settings

@api_view(['GET'])
def show_fanzine(request):
    return Response({"message": "Fanzine API is working!"})

@api_view(['GET'])
def list_publications(request):
    folder = settings.MEDIA_ROOT
    files = sorted(os.listdir(folder)) 
    
    urls = [
        request.build_absolute_uri(settings.MEDIA_URL + f)
        for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))
    ]

    return Response({"slides": urls})
