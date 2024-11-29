from django.shortcuts import render, get_object_or_404
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from .models import *
from .serializers import *
import logging
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import  api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework import generics, status, permissions, viewsets, mixins
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

class DocumentViewSET(viewsets.ModelViewSet):
    queryset = Documents.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated, IsOwner]

#restrict document to only the authenticated user
    def get_queryset(self):
        return Documents.objects.filter(user=self.request.user).order_by('-id')

#associate new document to the authenticated user   
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

#handle post request to create or update document
    def create(self, request, *args, **kwargs):
        print("request data", request.data)
        document_type = next(
            (key for key in request.data.keys() if key in ['resume', 'passport', 'admission_letter', 'visa']),
            None
        )
        if not document_type:
            return Response(
                {"error": "Invaid document type or file provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if document_type:
            existing_document = Documents.objects.filter(
                user=request.user, **{document_type + '__isnull':False}
            ).first()
            if existing_document:
                serializer = self.get_serializer(
                    existing_document, data=request.data, partial=True
                )
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            response = super().create(request, *args, **kwargs)
            response.data[document_type] = request.build_absolute_uri(response.data[document_type])
            return response
        return super().create(request, *args, **kwargs)
    

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        for document in data:
            for field in ['resume', 'passport', 'admission_letter', 'visa']:
                if document.get(field):
                    document[field] = request.build_absolute_uri(document[field])
        return Response(data)
    
#handle the patch request 
    def partial_updates(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
#handle the put request 
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)



class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        student = self.request.user
        internship = serializer.validated_data['internship']
      
        # Check if an application from the same student for the same internship exists
        if Application.objects.filter(internship=internship, student=student).exists():
            raise ValidationError({"detail": "You have already applied for this internship"})
        # Save the new application if no previous one exists
        serializer.save(student=student)

    def get_queryset(self):
        # Return applications related to the current logged-in user (as applicant)
        return Application.objects.filter(student=self.request.user)

    @action(detail=True, methods=['patch'])
    def update_application(self, request):
        # Get the application object
        application = self.get_object()

        # Ensure the user is the applicant for this application
        if application.student != self.request.user:
            raise permissions.PermissionDenied("You do not have permission to update this application.")
        
        # Update fields here (e.g., applicant_name, contact)
        serializer = self.get_serializer(application, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

# Retrieve, Update, and Destroy application
class ApplicationsRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all().select_related('internship', 'student')
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_object(self):
        obj = super().get_object()
        
        # Ensure only the applicant can access their own applications
        if obj.student != self.request.user:
            raise permissions.PermissionDenied("You do not have permission to access this application.")
        
        return obj


class EmployerApplicationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        internship_id = request.GET.get('internship')
        
        if not internship_id:
            return Response({'detail': "Internship ID is required."}, status=400)
        
        try: 
            internship = Internship.objects.get(id=internship_id, employer=request.user)
        except Internship.DoesNotExist:
            raise NotFound("Internship not found.")
        
        if internship.employer != request.user:
            return Response({"detail": "You do not have permissionto view these applications."}, status=403)
        
        applications = Application.objects.filter(internship=internship_id)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)

    



