from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()


class InputRegisterSerializer(serializers.Serializer):
    """
    Serializer for user registration input.
    """
    email = serializers.EmailField(required=True, max_length=255)
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    re_password = serializers.CharField(write_only=True, required=True, min_length=8)

    def validate(self, attrs):
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        if attrs['password'] != attrs['re_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return attrs


class OutputRegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration output.
    """
    class Meta:
        model = User
        fields = ('email', 'is_active', 'is_staff')


class ActivateUserSerializer(serializers.Serializer):
    """
    Serializer for user activation input.
    """
    email = serializers.EmailField(required=True, max_length=255)
    otp = serializers.CharField(required=True, max_length=6)


