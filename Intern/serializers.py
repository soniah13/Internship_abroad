from rest_framework import serializers
from .models import Internship, Country

class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = '__all__'

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        field = '__all__'