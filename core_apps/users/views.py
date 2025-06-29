from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

from core_apps.users.serilaizers import (InputRegisterSerializer, 
                                         OutputRegisterSerializer,
                                         ActivateUserSerializer )
from core_apps.users.services import register_user, activate_user_email
from core_apps.users.selectors import get_user_by_email

class RegisterView(APIView):
    """
    API view for user registration.
    """
    permission_classes = [AllowAny]

    @extend_schema(
        summary="User Registration",
        description="Endpoint for user registration. Requires email and password.",
        request=InputRegisterSerializer,
        responses={201: OutputRegisterSerializer, 400: 'Bad Request'}
    )
    def post(self, request):
        serializer = InputRegisterSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user, otp = register_user(email, password)
            print(f"OTP for user {user.email}: {otp}")  # Debugging line to check OTP generation
            output_serializer = OutputRegisterSerializer(user)
            return Response(output_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@extend_schema(
    methods=['POST'],
    summary="Activate User",
    description="Endpoint to activate a user account using email and OTP.",
    request=ActivateUserSerializer,
    responses={200: 'User activated successfully', 400: 'Invalid email or OTP'}
)
@api_view(['POST'])
def activate_user(request):
    """
    API view to activate a user account.
    """
    serializer = ActivateUserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    email = serializer.validated_data.get('email')
    otp = serializer.validated_data.get('otp')
    
    if not email or not otp:
        return Response({"error": "Email and OTP are required."}, status=status.HTTP_400_BAD_REQUEST)
       
    success = activate_user_email(email, otp)
    
    if success:
        user = get_user_by_email(email)
        if user:
              refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Set tokens in HTTP-only cookies
        response = Response({'detail': 'User verified and logged in successfully'}, status=status.HTTP_200_OK)
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=True,  # Set to False for localhost (not recommended in production)
            samesite='None',
            max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()
        )
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite='None',
            max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()
        )
        return response
       
    else:
        return Response({"error": "Invalid email or OTP."}, status=status.HTTP_400_BAD_REQUEST)