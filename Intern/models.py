from django.db import models
from cloudinary.models import CloudinaryField


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
        ("Phd degree", "PHD Degree"),
    ]
    title = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    picture = CloudinaryField(default='picture')
    city = models.CharField(max_length=100)
    duration = models.PositiveIntegerField()
    majors = models.TextField(default='list of majors expected')
    education_level = models.CharField(max_length=50, choices=EDUCATION_LEVEL, default="bachelor's degree")
    job_description = models.TextField(default='describe th job details')
    about_company = models.TextField(default='say something about company')
    qualifications = models.TextField(default='minimum qualifications')
    benefits = models.TextField(default='what does the student gain?')
    responsibilities = models.TextField(default='in charge of?')
    application_deadline = models.DateTimeField()
    posted_date = models.DateTimeField(auto_now_add=True)
    company_logo = CloudinaryField(default = 'company_logo')
    

    def __str__(self):
        return self.title
    

    


# Create your models here.


# Create your models here.
