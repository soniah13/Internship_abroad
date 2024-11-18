from django.db import models
from cloudinary.models import CloudinaryField
from django.contrib.auth.models import AbstractUser, Group, Permission


class Country(models.Model):
    CONTINENTS = [
        ('Asia', 'ASIA'),
        ('Africa', 'AFRICA'),
        ('Australia', 'AUSTRALIA'),
        ('Antarctica', 'ANTARCTICA'),
        ('Europe', 'EUROPE'),
        ('North-america', 'NORTH_AMERICA'),
        ('South-america', 'SOUTH_AMERICA'),
        
    ]
    name = models.CharField(max_length=100)
    flag = CloudinaryField('flag_image')
    continent = models.CharField(max_length=50, choices=CONTINENTS)

    def __str__(self):
        return self.name
    
class UserProfile(AbstractUser):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('employer', 'Employer'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    groups = models.ManyToManyField(Group, related_name="customuser_set", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="customeruser_permissions_set", blank=True)

    phone_number = models.CharField(max_length=15, blank=True, null=True)
    bio = models.TextField(blank=True)
    location = models.CharField(blank=True)
    education = models.CharField(max_length=150, default='university of')
    profile_picture = CloudinaryField(default='profile picture')

    def __str__(self):
        return f"{self.username} ({self.role})"

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
    employer = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='internships',  blank=True, null=True)
    standard_image = CloudinaryField(default='https://res.cloudinary.com/ddqkfdqy8/image/upload/v1730976302/qjliy417egm4jxavpanl.png')
    

    def __str__(self):
        return self.title
    
class Application(models.Model):
    internship = models.ForeignKey(Internship, on_delete=models.CASCADE, related_name="applications")
    applicant = models.ForeignKey(UserProfile, on_delete=models.CASCADE, limit_choices_to={'role': 'student'}, blank=True, null=True)
    applicant_name = models.CharField(max_length=100)
    applicant_email = models.EmailField()
    max_applications = models.PositiveIntegerField(default=15)

    def reached_application_limit(self):
        return self.application_count >= self.max_applications
    

    def __str__(self):
        return f"{self.applicant_name} - {self.internship.title}"

def increment_application_count(sender, instance, created, **kwargs):
    if created:
        instance.internship.application_count += 1
        instance.internship.save()

def decrement_application_count(sender, instance, created, **kwargs):
    if created:
        instance.internship.application_count -= 1
        instance.internship.save()

class Documents(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='documents')
    resume = CloudinaryField('resume', blank=True, null=True)
    passport = CloudinaryField('passport', blank=True, null=True)
    admission_letter = CloudinaryField('admission_letter', blank=True, null=True)
    visa = CloudinaryField('visa', blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Documents"
    
