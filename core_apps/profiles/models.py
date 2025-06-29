from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from core_apps.common.models import BaseModel

User = get_user_model()


class Profile(BaseModel):
    """
    Model representing a user profile.
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile',
        verbose_name=_("User")
    )
    bio = models.TextField(_("Bio"), blank=True, null=True)
    profile_picture = models.ImageField(
        _("Profile Picture"),
        upload_to='profile_pictures/',
        blank=True,
        null=True
    )
    username = models.CharField(
        _("Username"),
        max_length=150,
        unique=True,
        blank=True,
        null=True
    )
    level_user = models.IntegerField(default=1, null=True, blank=True)
    score = models.IntegerField(default=0, null=True, blank=True)

    def __str__(self):
        return f"{self.user.email}'s Profile"