from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from random import randint

from core_apps.users.manager import CustomUserManager
from core_apps.common.models import BaseModel


class CustomUser(AbstractBaseUser, PermissionsMixin , BaseModel):
    """
    Custom user model that uses email as the unique identifier.
    """
    email = models.EmailField(unique=True, verbose_name=_("Email Address"))
    is_active = models.BooleanField(default=False, verbose_name=_("Active"))
    is_staff = models.BooleanField(default=False, verbose_name=_("Staff Status"))

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        ordering = ['-created_at']


    def __str__(self):
        return self.email

class OTP(models.Model):
    """
    Model to store OTPs for user verification.
    """
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='otps', verbose_name=_("User"))
    otp = models.CharField(max_length=6, verbose_name=_("OTP"))
    created_at = models.DateTimeField(default=timezone.now, verbose_name=_("Created At"))

    class Meta:
        verbose_name = _("OTP")
        verbose_name_plural = _("OTPs")
        ordering = ['-created_at']

    @staticmethod
    def generate_otp():
        """
        Generate a random 6-digit OTP.
        """
        import random
        return str(random.randint(100000, 999999))

    def validate_otp(self, otp):

        if self.created_at < timezone.now() - timezone.timedelta(minutes=2):
            return True
        
    def __str__(self):
        return f"OTP for {self.user.email} - {self.otp}"