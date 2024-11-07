from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Internship, Country, Application
from .serializers import InternshipSerializer, CountrySerializer, UserSerializer, ApplicationSerializer
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
        continent = request.GET.get('continent', None)
        internships = Internship.objects.all()
        if continent:
            internships = internships.filter(country__continent__icontains=continent)
        serializer = InternshipSerializer(internships, many=True)
        base_url = "https://res.cloudinary.com/ddqkfdqy8/"
        for internship in serializer.data:
            if internship.get('company_logo'):
                internship['company_logo'] = base_url + internship['company_logo']
                #print(internship['company_logo'])
        for internship in serializer.data:
            if internship.get('picture'):
                internship['picture'] = base_url + internship['picture']
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

def submit_applications(request, internship_id):
    internship = get_object_or_404(Internship, id=internship_id)

    if internship.reached_application_limit():
        return JsonResponse({'error': 'Maximum application limit reached for this internship'}, status=400)
    
    serializer = ApplicationSerializer(data=request.data)
    if serializer.is_valid():

        serializer.save(internship=internship)

        internship.applicant_count += 1
        internship.save()

        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


