from django.urls import path

from core_apps.users.views import RegisterView, activate_user

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('activate/', activate_user, name='activate_user'),
]