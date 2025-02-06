# from django.contrib.auth.models import User
# from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import render
from .models import User, DriverProfile
from rest_framework import generics, viewsets, permissions
from .permissions import IsRoleAdmin, IsRoleDriver, IsRoleUser
from .serializers import (UserSerializer, DriverProfileSerializer)
import json

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAdminUser]

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsRoleAdmin]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        qs = super().get_queryset()
        filter_param = self.request.query_params.get('filter')
        if filter_param:
            try:
                filter_data = json.loads(filter_param)
                qs = qs.filter(**filter_data)
            except Exception as e:
                print(f"Lỗi giải mã filter: {e}")
        return qs
        # return super().get_queryset()
    
# DriverProfile ViewSet
class DriverProfileViewSet(viewsets.ModelViewSet):
    queryset = DriverProfile.objects.all()
    serializer_class = DriverProfileSerializer
    permission_classes = [IsRoleAdmin]

    def get_queryset(self):
        status = self.request.query_params.get('approval_status')
        if status:
            return DriverProfile.objects.filter(approval_status=status)
        return super().get_queryset()
    