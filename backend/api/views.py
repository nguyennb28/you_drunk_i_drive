# from django.contrib.auth.models import User
# from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import render
from .models import User, DriverProfile
from rest_framework import generics, viewsets, permissions, status
from .permissions import IsRoleAdmin, IsRoleDriver, IsRoleUser
from .serializers import UserSerializer, DriverProfileSerializer
import json
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q


class ReactAdminPageNumberPagination(PageNumberPagination):
    page_query_param = "_page"
    page_size_query_param = "_limit"
    page_size = 10
    max_page_size = 100

    def get_paginated_response(self, data):
        total = self.page.paginator.count

        # Tính toán thông tin trang
        page_info = {
            "hasNextPage": self.page.has_next(),
            "hasPreviousPage": self.page.has_previous(),
        }

        # Bạn có thể thêm meta nếu cần, ví dụ như thông tin về trang hiện tại, kích thước trang, …
        meta = {
            "currentPage": self.page.number,
            "pageSize": self.get_page_size(self.request),
        }

        response_data = {
            "data": data,
            "total": total,
            "pageInfo": page_info,
            "meta": meta,
        }
        return Response(response_data)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = ReactAdminPageNumberPagination
    # permission_classes = [permissions.IsAdminUser]

    def get_permissions(self):
        if self.action == "create":
            permission_classes = [IsRoleAdmin]
            # permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsRoleAdmin]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        qs = super().get_queryset()
        sort_field = self.request.query_params.get("_sort")
        sort_order = self.request.query_params.get("_order", "ASC").upper()
        query = self.request.query_params.get("q")
        role = self.request.query_params.get("role")
        if query:
            qs = qs.filter(
                Q(username__icontains=query)
                | Q(phone__icontains=query)
                | Q(role__icontains=query)
                | Q(first_name__icontains=query)
                | Q(last_name__icontains=query)
            )
        if role:
            qs = qs.filter(role=role)
        if sort_field:
            qs = qs.order_by(sort_field if sort_order == "ASC" else f"-{sort_field}")
        return qs

    # GET MANY
    @action(detail=False, methods=["get"])
    def get_many(self, request, *args, **kwargs):
        ids = request.query_params.get("ids")
        if ids:
            id_list = ids.split(",")
            queryset = self.get_queryset().filter(id__in=id_list)
            serializer = self.get_serializer(queryset, many=True)
            return Response({"data": serializer.data, "total": len(serializer.data)})
        return Response({"data": [], "total": 0})
        # return Response(
        #     {"detail": "Chưa cung cấp ids"}, status=status.HTTP_400_BAD_REQUEST
        # )

    # DELETE MANY
    @action(detail=False, methods=["post"])
    def delete_many(self, request, *args, **kwargs):
        ids = request.data.get("ids", [])
        if not ids:
            return Response(
                {"detail": "No ids provided"}, status=status.HTTP_400_BAD_REQUEST
            )
        queryset = self.get_queryset().filter(id__in=ids)
        deleted_count, _ = queryset.delete()
        return Response({"data": ids})


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
