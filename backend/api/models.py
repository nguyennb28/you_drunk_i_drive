from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.utils import timezone
# Create your models here.

class User(AbstractUser):
    ROLE_CHOICES = [
        ('customer', 'Khách hàng'),
        ('driver', 'Tài xế'),
        ('admin', 'Quản trị viên'),
    ]

    role = models.CharField(
        max_length=10, 
        choices=ROLE_CHOICES, 
        default='customer', 
        verbose_name="Vai trò"
    )
    phone = models.CharField(
        max_length=10, 
        unique=True, 
        verbose_name='Số điện thoại'
    )
    is_verified = models.BooleanField(
        default=False, 
        verbose_name='Đã xác minh'
    )

    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name="api_user_groups",  # Đặt tên khác với mặc định
        related_query_name="user",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='api_user_permissions',  # Đặt tên khác với mặc định
        related_query_name='user',
    )

    class Meta:
        verbose_name = 'Người dùng'
        verbose_name_plural = 'Người dùng'

    def __str__(self):
        return f"{self.phone} ({self.role})"
    
# Extend for driver
class DriverProfile(models.Model):
    VEHICLE_CHOICES = [
        ('car', 'Ô tô'),
        ('motor', 'Xe máy'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Chờ duyệt'),
        ('approved', 'Đã duyệt'),
        ('rejected', 'Từ chối'),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='driver_profile',
        verbose_name='Người dùng'
    )
    license_number = models.CharField(
        max_length=20,
        verbose_name='Số bằng lái'
    )
    id_card_front = models.ImageField(
        upload_to='drivers/id_cards/',
        verbose_name='CCCD mặt trước'
    )
    id_card_back = models.ImageField(
        upload_to='drivers/id_cards/',
        verbose_name='CCCD mặt sau'
    )
    vehicle_type = models.CharField(
        max_length=10,
        choices=VEHICLE_CHOICES,
        default='car',
        verbose_name='Loại xe'
    )
    approval_status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='Trạng thái phê duyệt'
    )
    rating = models.FloatField(
        default=0.0,
        verbose_name='Đánh giá trung bình'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Ngày tạo'
    )

    class Meta:
        verbose_name = 'Hồ sơ tài xế'
        verbose_name_plural = 'Hồ sơ tài xế'

    def __str__(self):
        return f"{self.user.email} - {self.get_vehicle_type_display()}"