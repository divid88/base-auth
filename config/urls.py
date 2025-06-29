from django.contrib import admin
from django.urls import path,include
from django.conf import settings

from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    # YOUR PATTERNS
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

     path("admin/", admin.site.urls),

    path("api/users/", include("core_apps.users.urls")),
    path("api/auth/", include("core_apps.authentications.urls")),
    path("api/profiles/", include("core_apps.profiles.urls")),

]