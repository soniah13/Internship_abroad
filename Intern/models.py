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
    applicant_count = models.PositiveIntegerField(default=0)
    standard_image = CloudinaryField(default='https://res.cloudinary.com/ddqkfdqy8/image/upload/v1730976302/qjliy417egm4jxavpanl.png')
    

    def __str__(self):
        return self.title
    
class Application(models.Model):
    Internship = models.ForeignKey(Internship, on_delete=models.CASCADE, related_name="applications")
    applicant_name = models.CharField(max_length=100)
    applicant_email = models.EmailField()
    max_applications = models.PositiveIntegerField(default=15)

    def reached_application_limit(self):
        return self.application_count >= self.max_applications
    

    def __str__(self):
        return f"{self.applicant_name} - {self.Internship.title}"

def increment_application_count(sender, instance, created, **kwargs):
    if created:
        instance.internship.application_count += 1
        instance.internship.save()

def decrement_application_count(sender, instance, created, **kwargs):
    if created:
        instance.internship.application_count -= 1
        instance.internship.save()
    

    


# Create your models here.


# Create your models here.
