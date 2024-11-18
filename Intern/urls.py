from django.urls import path
from .views import *

urlpatterns = [
    path('internships/', internships_list, name='internships_list'),
    path('internships/<int:pk>/', internshipRetrieveUpdateDestroy.as_view(), name='internship_change'),
    path('countries/', country_describe, name='countries'),
    path('countries/<int:pk>/', countryRetrieveUpdateDestroy.as_view(), name='country_id'),
    path('profile/student/', student_profile, name='student_profile'),
    path('profile/employer/', employer_profile, name='employer_profile'),
    path('employer/jobs/', employer_job_list, name='employer_jobs'),
    path('employer/jobs/<int:pk>/', JobRetrieveUpdateDestroy.as_view(), name='preview_id'),
    path('students/documents/', DocumentListCreate, name='documents'),
    path('students/documents/<int:pk>/', DocumentDetailView.as_view(), name='document_detail'),
    
    
    
    
]
