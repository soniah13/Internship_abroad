from django.shortcuts import render
from .models import Internship, Country
from .serializers import InternshipSerializer, CountrySerializer, UserSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import  api_view
from rest_framework.response import Response
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
# Create your views here.

@csrf_exempt
@api_view(['GET', 'POST'])
def internships_list(request):
    if request.method == 'GET':
        major = request.GET.get('major', None)
        continent = request.GET.get('continent', None)
        internships = Internship.objects.all()
        if major:
            internships = internships.filter(major_name__major_name__icontains=major)
        if continent:
            internships = internships.filter(country__continent__icontains=continent)
        serializer = InternshipSerializer(internships, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request == 'POST':
        serializer = InternshipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class internshipRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer

@csrf_exempt
@api_view(['GET', 'POST'])
def country_describe(request):
    if request.method == 'GET':
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request == 'POST':
        serializer = CountrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class Create_User(generics.CreateAPIView):
        queryset = User.objects.all()
        serializer_class = UserSerializer
        permission_classes = [AllowAny]

