from os import getenv, path
from dotenv import load_dotenv

from .base import *  # noqa
from .base import BASE_DIR

local_env_file = path.join(BASE_DIR, ".envs", ".env.local")

if path.isfile(local_env_file):
    load_dotenv(local_env_file)

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-uv!5k6lmfdgzkq+m_cep-at$a)sbjss@+2y%&wh$ihs*&fw-t0"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

CSRF_TRUSTED_ORIGINS = ["http://127.0.0.1:8080", 
                        "http://localhost:8080",
                  
                        ]
CSRF_ALLOWED_ORIGINS = ["http://localhost:8080", 
                        "http://127.0.0.1:8080",
                       ]

CORS_ORIGINS_WHITELIST = ["http://127.0.0.1:8080"]

CSRF_COOKIE_SECURE = False

ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0", "nginx"]
CORS_ALLOW_ALL_ORIGINS = True
# SECURITY WARNING: don't run with debug turned on in production!

EMAIL_BACKEND = "djcelery_email.backends.CeleryEmailBackend"
EMAIL_HOST = getenv("EMAIL_HOST")
EMAIL_PORT = getenv("EMAIL_PORT")
DEFAULT_FROM_EMAIL = getenv("DEFAULT_FROM_EMAIL")

CELERY_EMAIL_TASK_CONFIG = {
    'name': 'djcelery_email_send',
    'ignore_result': True,
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(name)-12s %(asctime)s %(module)s %(process)d %(thread)d %(message)s"
        }
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        }
    },
    "root": {"level": "INFO", "handlers": ["console"]},
}