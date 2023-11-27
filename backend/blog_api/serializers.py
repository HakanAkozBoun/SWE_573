from rest_framework import serializers
from .models import blog, category

class blogSerializer(serializers.ModelSerializer):
    class Meta:
        model = blog
        fields = '__all__'

class categorySerializer(serializers.ModelSerializer):
    class Meta:
        model = category
        fields = '__all__'