from django.shortcuts import render, get_object_or_404
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import  api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, status, permissions
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
    
    elif request.method == 'POST':
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

@api_view(['GET', 'PATCH'])
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
            'username':request.user.username,
            'email':request.user.email,
        }
        return Response(student_data)
    elif request.method == 'PATCH':
        serializer = StudentProfileSerializer(
            instance = request.user,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
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


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def employer_job_list(request):
    if request.user.role != 'employer':
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        jobs = Internship.objects.filter(employer=request.user)
        job_count = jobs.count()
        job_data = []
    
        for job in jobs: 
            applications = Application.objects.filter(internship=job)
            application_count = applications.count()

            job_data.append({
                'job': InternshipSerializer(job).data,
                'application_count': application_count,
                'applications': ApplicationSerializer(applications, many=True).data
            })
    
        return Response({
            'job_count': job_count,
            'jobs': job_data
        }, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = InternshipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['employer'] = request.user
            internship = serializer.save()

            return Response({
                'message': 'Job posted Successfully!',
                'job': InternshipSerializer(internship).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JobRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])   
def DocumentListCreate(request):
    if request.method == 'GET':
        documents = Documents.objects.filter(user=request.user)
        serializer = DocumentSerializer(documents, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = DocumentSerializer(data=request.data, context={'request':request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    
class DocumentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Documents.objects.all().select_related('user')
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]


class ApplicationCreateView(generics.ListCreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        internship = serializer.validated_data['internship']
        applicant = self.request.user
        if internship.applicant_count >= internship.max_applications:
            raise serializers.ValidationError({"detail": "No more applications accepted for this internship"})
        if Application.objects.filter(internship=internship, applicant=applicant).exists():
            raise serializers.ValidationError({ "detail":"You have already applied for this internship"})
        internship.applicant_count += 1
        internship.save()
        serializer.save(applicant=applicant)

    def get_queryset(self):
        return Application.objects.filter(applicant=self.request.user)

class ApplicationsRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all().select_related('internship', 'applicant')
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_object(self):
        obj = super().get_object()
        if obj.applicant != self.request.user:
            raise permissions.PermissionDenied("You do not have permission to access this application.")
        return obj

class EmployerApplicationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        internship_id = request.GET.get('internship', None)
        if internship_id is None:
            return Response({'detail': "Internship ID is required."}, status=400)
        
        try: 
            internship = Internship.object.get(id=internship_id)
        except Internship.DoesNotExist:
            raise NotFound("Internship not found.")
        
        if internship.employer != request.user:
            return Response({"detail": "You do not have permissionto view these applications."}, status=403)
        applications = Application.objects.filter(internship=internship_id)

        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)

    



