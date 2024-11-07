from django.urls import path
from .views import *

urlpatterns = [
    path('internships/', internships_list, name='internships_list'),
    path('internships/<int:pk>/', internshipRetrieveUpdateDestroy.as_view(), name='internship_change'),
    path('countries/', country_describe, name='countries'),
    path('countries/<int:pk>/', countryRetrieveUpdateDestroy.as_view(), name='country_id'),
    
    
]
