from django.contrib import admin
from django import forms
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.contrib.auth.models import User  
from .models import ExtUser, HostelRoom, RoomImage, Order
from django.core.exceptions import ValidationError


class UserAdmin(UserAdmin):
      list_display = [

                    'email', 'user_firstname', 'user_lastname','is_admin', 'is_active',
      ]
      list_filter = ('is_admin',)

      fieldsets = (
                (None, {'fields':('email','password',)}),
                ('personal info', {'fields':( 'user_firstname', 'user_lastname', 'user_middlename',)}),
                ('Permissions', {'fields' : ('is_admin','groups',)}),
                ('Important dates', {'fields' : ('last_login',)}),
                ('Is active', {'fields': ('is_active',)}),
      )

      add_fields = (
                 (None, {'classes': ('wide',),
                 'fields' :( 
                             

                             'email',
                             'password1'
                             'password2'
                           )}
                 ),
      )
      search_fields = ('email',)
      ordering =('email',)
      filter_horizontal = ()

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
      'room', 'person_firstname', 'person_lastname', 'person_middlename', 'date_in', 'date_out', 'is_booking', 'payment',
  ]

admin.site.register(ExtUser, UserAdmin)
admin.site.unregister(Group)
admin.site.register(HostelRoom, HostelRoomAdmin)
admin.site.register(User)
admin.site.register(RoomImage, ImageRoomAdmin)
admin.site.register(Order, OrderRoom)

