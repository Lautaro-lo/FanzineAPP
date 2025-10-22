from django.urls import path
from .controllers.publication import show_fanzine, list_publications
from .controllers.users import login_user

urlpatterns = [
    path('', show_fanzine, name='show_fanzine'),
    path('publications/', list_publications, name='list_publications'),
    path('/admin/login', login_user, name='login_user')
]
