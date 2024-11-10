from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Internship, Country, UserProfile
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import  api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated


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
    
class RegistrationView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                'user':{
                    'id':user.id,
                    'username': user.username,
                    'role':user.role,
                    'email':user.email,
                }, 'message': 'user registered successfully',
            }, status=status.HTTP_201_CREATED,
            headers=headers
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_profile(request):
    if request.user.role != 'student':
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        student_data = {
            'phone_number':request.user.phone_number,
            'bio':request.user.bio,
            'location':request.user.location,
            'education':request.user.education,
            'profile_picture':request.user.profile_picture.url,
        }
        return Response(student_data)
    elif request.method == 'POST':
        serializer = StudentProfileSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def employer_profile(request):
    if request.user.role != 'employer':
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        employer_data = {
            'username':request.user.username,
            'email':request.user.email,
            'bio':request.user.bio,
            'location':request.user.location,
            'education':request.user.education,
            'profile_picture':request.user.profile_picture.url,
        }
        return Response(employer_data)
    elif request.method == 'POST':
        serializer = EmployerProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        




