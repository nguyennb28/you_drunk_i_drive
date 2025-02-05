# from django.contrib.auth.models import User
# from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import render
from .models import User, DriverProfile
from rest_framework import generics, viewsets, permissions
from .permissions import IsRoleAdmin, IsRoleDriver, IsRoleUser
from .serializers import UserSerializer, DriverProfileSerializer

# Create your views here.

# class CreateUserView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [permissions.AllowAny]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "create":
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsRoleAdmin]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        role = self.request.query_params.get("role")
        if role:
            return User.objects.filter(role=role)
        return super().get_queryset()


# DriverProfile ViewSet
class DriverProfileViewSet(viewsets.ModelViewSet):
    queryset = DriverProfile.objects.all()
    serializer_class = DriverProfileSerializer
    permission_classes = [IsRoleAdmin]

    def get_queryset(self):
        status = self.request.query_params.get("approval_status")
        if status:
            return DriverProfile.objects.filter(approval_status=status)
        return super().get_queryset()
