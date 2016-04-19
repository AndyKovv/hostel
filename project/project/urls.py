"""hostelproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from hostel import views
from rest_framework.routers import DefaultRouter, SimpleRouter 

from django.views.generic import TemplateView, RedirectView


router = DefaultRouter()
router.register(r'rooms', views.RoomViewSet) 
router.register(r'orders', views.OrderView) 

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api/privat24/$', views.Privat_24.as_view(), name='privat24'),
    url(r'^api/login/$', views.LoginView.as_view(), name='rest_login'),
    url(r'^api/logout/$', views.LogoutView.as_view(), name='rest_logout'),
    url(r'^api/user/$', views.UserDetailsView.as_view(), name='rest_user_details'),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^api/registration/$', views.RegisterView.as_view(), name='rest_register'),
    url(r'^api/registration/verify-email/$', views.VerifyEmailView.as_view(), name='rest_verify_email'),
    url(r'^api/password/change/$', views.PasswordChangeView.as_view(), name='rest_password_change'),
    url(r'^.*$', TemplateView.as_view(template_name='index.html'), name='main_page'),
    #url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^verifyEmail/(?P<key>\w+)/$', TemplateView.as_view(), name='account_confirm_email'),
]
