from django.contrib import admin

from core_apps.users.models import CustomUser

admin.site.register(CustomUser)
