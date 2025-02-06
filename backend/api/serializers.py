from rest_framework import serializers
from .models import DriverProfile, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # fields = ["id", "username", "phone", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
        
    
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
    