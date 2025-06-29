from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
import uuid

class BaseModel(models.Model):
    """
    An abstract base model that provides common fields for all models.
    """
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(default=timezone.now, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=timezone.now, verbose_name="Updated At")

    class Meta:
        abstract = True
        ordering = ['-created_at']
        verbose_name = "Base Model"
        verbose_name_plural = "Base Models"