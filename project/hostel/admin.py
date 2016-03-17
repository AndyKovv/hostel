from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.contrib.auth.models import User  
from .models import ExtUser, HostelRoom, RoomImage, Order

class UserAdmin(UserAdmin):
      list_display = [

                    'email', 'person_firstname', 'person_lastname', 'date_of_birth','is_admin', 
      ]
      list_filter = ('is_admin',)

      fieldsets = (
                (None, {'fields':('email','password',)}),
                ('personal info', {'fields':('date_of_birth', 'person_firstname', 'person_lastname', 'person_middlename',)}),
                ('Permissions', {'fields' : ('is_admin','groups',)}),
                ('Important dates', {'fields' : ('last_login',)}),
      )

      add_fields = (
                 (None, {'classes': ('wide',),
                 'fields' :( 
                             
                             'date_of_birth',
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
   pass


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

