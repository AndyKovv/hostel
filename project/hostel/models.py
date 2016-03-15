from django.db import models
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

