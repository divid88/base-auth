from django.urls import path
from .views import UserInfoView, LoginView, LogoutView, CookieTokenRefreshView

urlpatterns = [
    path("user-info/", UserInfoView.as_view(), name="user-info"),
    path("login/", LoginView.as_view(), name="user-login"),
    path("logout/", LogoutView.as_view(), name="user-logout"),
    path("refresh/", CookieTokenRefreshView.as_view(), name="token-refresh"),
    
]