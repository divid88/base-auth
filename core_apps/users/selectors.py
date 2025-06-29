from django.contrib.auth import get_user_model


User = get_user_model()

def get_user_by_email(email: str) -> User | None:
    """
    Retrieve a user by their email address.

    Args:
        email (str): The email address of the user.

    Returns:
        User | None: The user object if found, otherwise None.
    """
    try:
        return User.objects.get(email=email)
    except User.DoesNotExist:
        return None