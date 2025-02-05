# from django.contrib.auth.models import User
from rest_framework import serializers
from .models import DriverProfile, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
class DriverProfileSerializer(serializers.ModelSerializer):
    id_card_front_url = serializers.SerializerMethodField()
    id_card_back_url = serializers.SerializerMethodField()

    class Meta:
        model = DriverProfile
        fields = '__all__'
        extra_kwargs = {
            'approval_status': {'read_only': True},
            'rating': {'read_only': True}
        }
    
    def get_id_card_front_url(self, obj):
        return self.context['request'].build_absolute_uri(obj.id_card_front.url) if obj.id_card_front else None

    def get_id_card_back_url(self, obj):
        return self.context['request'].build_absolute_uri(obj.id_card_back.url) if obj.id_card_back else None
    