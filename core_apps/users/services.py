from core_apps.users.models import OTP
from django.contrib.auth import get_user_model
from django.db import transaction
from core_apps.users.tasks import send_opt_code
from core_apps.profiles.models import Profile

User = get_user_model()

def register_user(email, password):
    """
    Register a new user with the given email and password.
    """
    if User.objects.filter(email=email).exists():
        raise ValueError("A user with this email already exists.")
    
    user, opt = create_user_profile(email, password)
    
    send_opt_code.delay(email=email, code=opt.otp)
    return user, opt


@transaction.atomic()
def create_user_profile(email, password):
    user = User.objects.create_user(email=email, password=password)
    opt = generate_and_send_otp(user)
    Profile.objects.create(user=user, username=email.split('@')[0])
    return user, opt

def generate_and_send_otp(user):
    """
    Generate a new OTP for the user and send it via email.
    """
    otp_value = OTP.generate_otp()
    otp = OTP.objects.create(user=user, otp=otp_value)
    
    # Here you would implement the logic to send the OTP via email.
    # For example, using Django's send_mail function.
    
    return otp

def activate_user_email(email, otp):
    """
    Activate a user account using the provided email and OTP.
    """
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return False
    
    try:
        otp_record = OTP.objects.get(user=user, otp=otp)
        if  otp_record.validate_otp:
            user.is_active = True
            user.save()
            return True
        else:
            return False
    except OTP.DoesNotExist:
        return False