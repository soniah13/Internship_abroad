from rest_framework import serializers
from .models import Internship, Country, Major
from django.contrib.auth.models import User

class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = '__all__'

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'password','confirm_password', 'email']
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
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )  
        return user