from django.urls import path
from .views import internships_list, internshipRetrieveUpdateDestroy, country_describe

urlpatterns = [
    path('internships/', internships_list, name='internships_list'),
    path('internships/<int:pk>/', internshipRetrieveUpdateDestroy.as_view, name='internship_change'),
    path('countries/', country_describe, name='countries'),
]
