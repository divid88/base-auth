from rest_framework import serializers
from core_apps.profiles.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the Profile model.
    """
    class Meta:
        model = Profile
        fields = ['id', 'user', 'bio', 'profile_picture', 'username']
        read_only_fields = ['id', 'user']
    
    def validate_username(self, value):
        """
        Ensure that the username is unique.
        """
        if Profile.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value