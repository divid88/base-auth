from django.core.mail import send_mail
from celery import shared_task
from django.conf import settings

def send_mail_user(subject, message, receiver):
    try:
        # send_mail(subject=subject, message=message,
        #           from_email='godavidiot@gmail.com',
        #           recipient_list=[str(receiver)]
        #           )
        print("send Mail", subject, message, receiver)
    except TimeoutError('Cant send mail'):
        pass


@shared_task(name="send_opt_code")
def send_opt_code(email, code):
    """
    Task to send an OTP code to the user's email.
    """
    receiver = email
    subject = "Your OTP Code"
    message = f"Your OTP code is: {code}"
    send_mail_user(subject, message, receiver)

