from django.contrib import admin
from django import forms
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _  
from .models import ExtUser, HostelRoom, RoomImage, Order, TransactionPrivat24, AdditionalPayment
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import (
    AdminPasswordChangeForm, UserChangeForm, UserCreationForm,
)
from django.conf.urls import url


class UserAdmin(admin.ModelAdmin):
    add_form_template = 'admin/auth/user/add_form.html'
    change_user_password_template = None
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('user_firstname', 'user_lastname', 'user_middlename')}),
        (_('Permissions'), {'fields': ('is_active','user_permissions')}),
        
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
        ('Personal info', {
            'classes': ('wide',),
            'fields': ('user_firstname', 'user_middlename', 'user_lastname'),
        }),
        ('Additional Permissions', {
            'classes': ('wide',),
            'fields': ('is_manager', 'is_admin', 'inner_reg'),
        }),
        (_('Permissions'), {'fields': ('is_active', 'is_superuser',
                                        'user_permissions')}),
    )
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
    list_display = ('email', 'user_firstname', 'user_middlename', 'is_manager', 'is_admin',)
    list_filter = ('is_manager', 'is_superuser', 'is_active', 'groups')
    search_fields = ('user_firstname', 'user_middlename', 'email')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)

    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets
        return super(UserAdmin, self).get_fieldsets(request, obj)

    def get_form(self, request, obj=None, **kwargs):
        """
        Use special form during user creation
        """
        defaults = {}
        if obj is None:
            defaults['form'] = self.add_form
        defaults.update(kwargs)
        return super(UserAdmin, self).get_form(request, obj, **defaults)

    def lookup_allowed(self, lookup, value):
        # See #20078: we don't want to allow any lookups involving passwords.
        if lookup.startswith('password'):
            return False
        return super(UserAdmin, self).lookup_allowed(lookup, value)
      

class HostelRoomAdmin(admin.ModelAdmin):
   list_display = [
    'name_room', 'position',
   ]


class ImageRoomAdmin(admin.ModelAdmin):
  list_display = [

          'room','image_main',
  ]

 

class OrderRoom(admin.ModelAdmin):
  list_display = [
      'id','room', 'person_firstname', 'person_lastname', 'person_middlename', 'date_in',
       'date_out', 'is_booking', 'payment', 'order_time_in', 'order_time_out',
  ]

admin.site.register(ExtUser, UserAdmin)
admin.site.unregister(Group)
admin.site.register(HostelRoom, HostelRoomAdmin)
admin.site.register(AdditionalPayment)
admin.site.register(RoomImage, ImageRoomAdmin)
admin.site.register(Order, OrderRoom)
admin.site.register(TransactionPrivat24)

