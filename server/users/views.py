from django.shortcuts import render

# Create your views here.


def login(request):
    return render(request, "login.html")


def signup(request):
    return render(request, "signup.html")


def logout(request):
    return render(request, "logout.html")


def forgot_password(request):
    return render(request, "forgot_password.html")
    