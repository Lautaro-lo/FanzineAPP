from django.urls import path
from .controllers.publication import show_fanzine
from .controllers.users import login_user

urlpatterns = [
    path('', show_fanzine, name='show_fanzine'),
    path('/admin/login', login_user, name='login_user')
]
