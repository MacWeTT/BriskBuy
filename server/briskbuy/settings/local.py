from .base import *
# from datetime import timedelta

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

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
