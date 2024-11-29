from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('documents', DocumentViewSET, basename='documents')
router.register('applications', ApplicationViewSet, basename='applications')

urlpatterns = [
    path('internships/', internships_list, name='internships_list'),
    path('internships/<int:pk>/', internshipRetrieveUpdateDestroy.as_view(), name='internship_change'),
    path('countries/', country_describe, name='countries'),
    path('countries/<int:pk>/', countryRetrieveUpdateDestroy.as_view(), name='country_id'),
    path('profile/student/', student_profile, name='student_profile'),
    path('profile/employer/', employer_profile, name='employer_profile'),
    path('employer/jobs/', employer_job_list, name='employer_jobs'),
    path('employer/jobs/<int:pk>/', JobRetrieveUpdateDestroy.as_view(), name='preview_id'),
    path('applications/details/<int:pk>/', ApplicationsRetrieveUpdateDestroy.as_view(), name='single_applications'),
    path('employer/applications/', EmployerApplicationView.as_view(), name='employer_applications'),
    path('students/', include(router.urls)), 
    
]
