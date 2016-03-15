import datetime

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

class UserManager(BaseUserManager):
      def create_user(self, email, password=None):
          if not email:
             raise ValueError('Email Must Be email')
          user = self.model( email = UserManager.normalize_email(email),)
          user.set_password(password)
          user.save(using = self._db)
          return user

      def create_superuser(self, email, password):
          user = self.create_user(email, password)
          user.is_admin = True
          user.save(using = self._db)
          return user

class ExtUser(AbstractBaseUser, PermissionsMixin):

      email = models.EmailField(
            'email',
            max_length = 20,
            unique = True,
            db_index = True
      )

      person_firstname = models.CharField(
                'Name',
                max_length = 100,
                blank = False,
                null  = False
      )

      person_lastname = models.CharField(
               'Lastname',
               max_length = 100,
               blank = False,
               null  = False
      )

      person_middlename = models.CharField(
                 'Middlename',
                 max_length = 100,
                 blank = False,
                 null = False
      )

      date_of_birth = models.DateField(
                    'Birth date',
                    blank = True,
                    null =  True
      )

      register_date = models.DateField(
                    'Date of register',
                    auto_now_add = True
      )

      is_active = models.BooleanField (
                'Is Active',
                default = True
      )

      is_admin = models.BooleanField(
               'Administrator',
               default = False
      )

      # Этот метод обязательно должен быть определён
      def get_full_name(self):
           return self.email

      # Требуеться для Админки
      @property
      def is_staff (self):
          return self.is_admin

      def get_short_name(self):
          return self.email

      def __str__(self):
          return self.email

      def has_perm(self, perm, obj=None):
          return True

      def has_module_perms(self, app_label):
          return True

      USERNAME_FIELD = 'email'
      REQUIRED_FIELDS = []

      objects = UserManager()

      class Meta:
            verbose_name = 'User'
            verbose_name_plural = 'Users'

class HostelRoom(models.Model):
  name_room = models.CharField(max_length=20, null=False)
  price_room = models.IntegerField()
  description_full = models.CharField(max_length=250)
  description_short = models.CharField(max_length=100)
  places_in_room = models.IntegerField()
  rating = models.IntegerField()
  free_places = models.BooleanField(default=True)
  date_create = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name_room

class RoomImage(models.Model):
  room = models.ForeignKey(HostelRoom)
  image_main = models.IntegerField()
  image_standard = models.ImageField(upload_to='/static/media/roomimage/', height_field=570, width_field=380)
  date_create = models.DateTimeField(auto_now_add=True)


class Order(models.Model):
  room = models.ForeignKey(HostelRoom, null=True) 
  user = models.ForeignKey(ExtUser, null=True)
  person_firstname = models.CharField(max_length=25, null=False)
  person_lastname = models.CharField(max_length=25, null=False)
  person_middlename = models.CharField(max_length=25, null=False)
  date_in = models.DateField()
  date_out = models.DateField()
  order_time_in = models.DateTimeField(auto_now_add=True)
  order_time_out = models.DateTimeField(default='Ordered')
  is_booking = models.BooleanField(default=True)
  pament = models.BooleanField(default=False)

  def booking_time(self):
    order_time_in = self.order_time_in
    return order_time_in + datetime.timedelta(hours=3)




