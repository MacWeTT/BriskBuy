import os
import sys
from briskbuy.settings import base


def main():
    """Run administrative tasks."""
    if base.DEBUG:
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "briskbuy.settings.local")
    else:
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "briskbuy.settings.production")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
