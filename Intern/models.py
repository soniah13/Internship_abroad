from django.db import models
from cloudinary.models import CloudinaryField

class Major(models.Model):
    major_name = models.CharField(max_length=200)
    sub_major = models.CharField(max_length=200)

class Country(models.Model):
    CONTINENTS = [
        ('Asia', 'ASIA'),
        ('Africa', 'AFRICA'),
        ('australia', 'AUSTRALIA'),
        ('antarctica', 'ANTARCTICA'),
        ('europe', 'EUROPE'),
        ('north_america', 'NORTH_AMERICA'),
        ('south_america', 'SOUTH_AMERICA'),
        
    ]
    name = models.CharField(max_length=100)
    flag = CloudinaryField('flag_image')
    continent = models.CharField(max_length=50, choices=CONTINENTS)

    def __str__(self):
        return self.name

class Internship(models.Model):
    EDUCATION_LEVEL = [
        ("associate certificate", "Associate certificate"),
        ("bachelor's degree", "Bachelor's Degree"),
        ("master's degree", "Master's Degree"),
    ]
    title = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    city = models.CharField(max_length=100)
    duration = models.PositiveIntegerField()
    major_name = models.ForeignKey(Major, on_delete=models.CASCADE, null=True, blank=True)
    education_level = models.CharField(max_length=50, choices=EDUCATION_LEVEL, default="bachelor's degree")
    requirements = models.TextField()
    application_deadline = models.DateTimeField(auto_now_add=True)
    posted_date = models.DateField()
    company_logo = CloudinaryField(default = 'company_logo')
    

    def __str__(self):
        return self.title
    

    


# Create your models here.


# Create your models here.
