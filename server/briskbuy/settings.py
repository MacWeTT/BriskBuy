from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta
import os

# Load environment variables from .env
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.environ.get("SECRET_KEY")
LOCAL_URL = os.environ.get("LOCAL_URL")
DEBUG = os.environ.get("DEBUG")
ALLOWED_HOSTS = ["*"]

# Application definition
INSTALLED_APPS = [
    "daphne",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

PROJECT_APPS = [
    "users.apps.UsersConfig",
    "ecommerce.apps.EcommerceConfig",
    "chat.apps.ChatConfig",
]

EXTERNAL_APPS = [
    "rest_framework",
    "django_filters",
    "corsheaders",
    "drf_yasg",
]

AUTH_APPS = [
    "rest_framework_simplejwt",
]

# Google Auth
GOOGLE_OAUTH2_CLIENT_ID = os.environ.get("GOOGLE_OAUTH2_CLIENT_ID")
GOOGLE_OAUTH2_CLIENT_SECRET = os.environ.get("GOOGLE_OAUTH2_CLIENT_SECRET")


AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 2,
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=10),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=10),
    "SIGNING_KEY": os.environ.get("SECRET_KEY"),
    "AUTH_HEADER_TYPES": ("Bearer",),
    "TOKEN_OBTAIN_SERIALIZER": "users.utils.serializers.TokenObtainPairSerializer",
}

AUTH_USER_MODEL = "users.User"

# MIDDLEWARES
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "briskbuy.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

ASGI_APPLICATION = "briskbuy.asgi.application"
WSGI_APPLICATION = "briskbuy.wsgi.application"

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],
        },
    },
}

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

# Static and media
MEDIA_URL = "/media/"
STATIC_URL = "static/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Project Apps
INSTALLED_APPS += PROJECT_APPS
INSTALLED_APPS += EXTERNAL_APPS
INSTALLED_APPS += AUTH_APPS

# JAZZMIN_SETTINGS = {
#     "site_title": "Briskbuy",
#     "site_header": "Briskbuy Admin Panel",
#     "site_brand": "Briskbuy",
#     "welcome_sign": "Only For Administartors! ",
#     "copyright": "MacWeTT",
#     "search_model": ["auth.User", "auth.Group"],
#     "topmenu_links": [
#         # Url that gets reversed (Permissions can be added)
#         {"name": "Home", "url": "admin:index", "permissions": ["auth.view_user"]},
#         # external url that opens in a new window (Permissions can be added)
#         # model admin to link to (Permissions checked against model)
#         {"model": "auth.User"},
#         # App with dropdown menu to all its models pages (Permissions checked against models)
#         # {"app": "books"},
#     ],
#     "changeform_format": "vertical_tabs",
# }

# JAZZMIN_UI_TWEAKS = {
#     "theme": "darkly",
#     "dark_mode_theme": "darkly",
# }

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql",
#         "NAME": "briskbuy",
#         "USER": os.environ.get("DB_USER"),
#         "PASSWORD": os.environ.get("DB_PASSWORD"),
#         "HOST": "localhost",
#         "PORT": os.environ.get("DB_PORT"),
#     }
# }
