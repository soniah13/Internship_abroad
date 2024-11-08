from typing import Any, Dict
from rest_framework import serializers
from .models import Internship, Country, Application, UserProfile
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = '__all__'

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model: Application
        fields = ['id', 'internship', 'applicant_name', 'applicant_email']


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    role = serializers.ChoiceField(choices=UserProfile.ROLE_CHOICES)
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'password','confirm_password', 'email', 'role']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},  
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password":"Password do not match"})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            role=validated_data['role']
        )  
        return user
    
class LoginTokenObtainPairSerializer(TokenObtainPairSerializer):
    role = serializers.CharField(source='user.role', read_only=True)
    
    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role
        return data