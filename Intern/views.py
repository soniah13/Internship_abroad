from django.shortcuts import render
from .models import Internship, Country, Major
from .serializers import InternshipSerializer, CountrySerializer, UserSerializer, MajorSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import  api_view
from rest_framework.response import Response
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny


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
        base_url = "https://res.cloudinary.com/ddqkfdqy8/"
        for internship in serializer.data:
            if internship.get('company_logo'):
                internship['company_logo'] = base_url + internship['company_logo']
                #print(internship['company_logo'])
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
        baseUrl = "https://res.cloudinary.com/ddqkfdqy8/"
        for country in serializer.data:
            if country.get('flag'):
                country['flag'] = baseUrl + country['flag']

        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = CountrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class countryRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    
class Create_User(generics.CreateAPIView):
        queryset = User.objects.all()
        serializer_class = UserSerializer
        permission_classes = [AllowAny]

@api_view(['GET', 'POST'])
def Majors_list(request):
    if request.method == 'GET':
        majors = Major.objects.all()
        serializer = MajorSerializer(majors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request == 'POST':
        serializer = MajorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class majorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Major.objects.all()
    serializer_class = MajorSerializer

