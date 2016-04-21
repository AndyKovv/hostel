import datetime, uuid
import random
import string
import sys, time  
import os
import glob

from hashlib import sha1 

from django.db.models.signals import pre_save
from django.db.models import signals 
from django.db import models
from django.utils import timezone
from django.utils.deconstruct import deconstructible
from django.core.exceptions import ValidationError
from geoposition.fields import GeopositionField

from strgen import StringGenerator as SG

from PIL import Image

from django.conf import settings

from rest_framework.authtoken.models import Token as DefaultTokenModel

from .utils import import_callable

from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

class UserManager(BaseUserManager):
			def create_user(self, email, password=None):
					if not email:
						 raise ValueError('Email Must Be email')
					user = self.model( email = UserManager.normalize_email(email),)
					user.set_password(password)
					user.inner_reg = True
					user.save(using = self._db)
					return user

			def create_superuser(self, email, password):
					user = self.create_user(email, password)
					user.is_admin = True
					user.save(using = self._db)
					return user

class ExtUser(AbstractBaseUser, PermissionsMixin):

			email = models.EmailField('email', max_length=100, unique=True, db_index=True)
			user_firstname = models.CharField('Name', max_length=100, blank=False, null=False)
			user_lastname = models.CharField('Lastname', max_length=100, blank=False, null=False)
			user_middlename = models.CharField('Middlename', max_length=100, blank=False, null=False)
			phone_number = models.CharField( 'Phone Number', null=False, blank=False, max_length=16)
			register_date = models.DateField('Date of register', auto_now_add=True)
			inner_reg = models.BooleanField('Inner Register', default=False)
			is_active = models.BooleanField ('Is Active', default=True)
			is_admin = models.BooleanField('Administrator', default = False)

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

TokenModel = import_callable(
	getattr(settings, 'REST_AUTH_TOKEN_MODEL', DefaultTokenModel))  

class HostelRoom(models.Model):
	name_room = models.CharField(max_length=20, null=False)
	price_room = models.IntegerField()
	description_full = models.CharField(max_length=250)
	description_short = models.CharField(max_length=100)
	location_room = models.CharField(max_length=80)
	places_in_room = models.IntegerField()
	rating = models.IntegerField()
	#thinc about
	free_places = models.BooleanField(default=True)
	active = models.BooleanField(default=True)
	date_create = models.DateTimeField(auto_now_add=True)
	position = GeopositionField()

	def __str__(self):
		return self.name_room


class RoomImage(models.Model):
	
	#last created directory
	last_folder = max(glob.iglob('/var/www/hostel.te.ua/project/media/roomimage/*/'), key=os.path.getctime)
	
	#import pdb
	#pdb.set_trace()

	
		
	room = models.ForeignKey(HostelRoom, related_name='roomimages')
	image_main = models.BooleanField()
	image_original = models.ImageField('original file upload', upload_to="/", max_length=255)
	image_medium = models.ImageField(max_length=255, blank=True)
	image_thumb = models.ImageField(max_length=255, blank=True) 
	date_create = models.DateTimeField(auto_now_add=True)

	"""
	class Meta:
		unique_together = ('room', 'image_main',)
	
	"""

		
	def get_thumb(self):
				return "/site_media/%s" % self.image_thumb

	def get_medium(self):
			 return "/site_media/%s" % self.image_medium

	def get_original(self):
				return "/site_media/%s" % self.image_original
	

	def save(self):


				sizes = {'thumbnail': {'height': 200, 'width': 133}, 'medium': {'height': 400, 'width': 300},}
				#import pdb
				#pdb.set_trace()

				if self.image_main:
					try:
						temp = RoomImage.objects.filter(room= self.room, image_main=True).exists()
						if temp is True:
							self.image_main = False
							self.save()
					except RoomImage.DoesNotExist:
						pass

				super(RoomImage, self).save()
				photopath = str(self.image_original.path)  # this returns the full system path to the original file
				im = Image.open(photopath)  # open the image using PIL

				# pull a few variables out of that full path
				extension = photopath.rsplit('.', 1)[1]  # the file extension
				filename = photopath.rsplit('/', 1)[1].rsplit('.', 1)[0]  # the file name only (minus path or extension)
				#filename = id_file
				fullpath = photopath.rsplit('/', 1)[0]  # the path only (minus the filename.extension)

				# use the file extension to determine if the image is valid before proceeding
				if extension not in ['jpg', 'jpeg', 'gif', 'png']: sys.exit()
				
				# create medium image
				im.thumbnail((sizes['medium']['width'], sizes['medium']['height']), Image.ANTIALIAS)
				medname = filename + "_" + str(sizes['medium']['width']) + "x" + str(sizes['medium']['height']) + ".jpg"
				im.save(fullpath + '/' + medname)
				self.image_medium = fullpath + '/' + medname

				# create thumbnail
				im.thumbnail((sizes['thumbnail']['width'], sizes['thumbnail']['height']), Image.ANTIALIAS)
				thumbname = filename + "_" + str(sizes['thumbnail']['width']) + "x" + str(sizes['thumbnail']['height']) + ".jpg"
				im.save(fullpath + '/' + thumbname)
				self.image_thumb = fullpath + '/' +thumbname
				
				super(RoomImage, self).save()

	

	#Method that delete files form storage
	def delete(self, *args, **kwargs):

		 storage_original, path_original = self.image_original.storage, self.image_original.path
		 storage_medium, path_medium = self.image_medium.storage, self.image_medium.path
		 storage_thumb, path_thumb = self.image_thumb.storage, self.image_thumb.path
		 #Prepareing files, before delete models 
		 super(RoomImage, self).delete(*args, **kwargs)
		 #Deleting files
		 storage_original.delete(path_original)
		 storage_medium.delete(path_medium)
		 storage_thumb.delete(path_thumb)			          



class Order(models.Model):
	#Timer!!!!! Delete non payment booking orders
	room = models.ForeignKey(HostelRoom, null=True, related_name='room') 
	user = models.ForeignKey(ExtUser, blank=True, null=True)
	unique_href = models.CharField(max_length=70, null=False)
	deselected = models.BooleanField(default=False)
	person_email = models.EmailField(max_length=100, null=False)
	person_firstname = models.CharField(max_length=25, null=False)
	person_middlename = models.CharField(max_length=25, null=False)
	person_lastname = models.CharField(max_length=25, null=False)
	person_phonenumber = models.CharField(max_length=20, null=False)
	date_in = models.DateField()
	date_out = models.DateField()
	order_time_in = models.DateTimeField(auto_now_add=True)
	order_time_out = models.DateTimeField()
	is_booking = models.BooleanField(default=True)
	payment = models.BooleanField(default=False)

	def __str__(self):
		return str(self.pk) + ' ' + self.person_firstname + ' ' + self.person_lastname
	
	def save(self, *args, **kwargs):
		if len(self.unique_href) == 0:
			salt = uuid.uuid4().hex
			uniq_hash = ("%s%s" % (self.pk, salt))
			unique_href = sha1(uniq_hash.encode('utf8')).hexdigest()[:20]
			self.unique_href = unique_href
			
		if self.order_time_out is None:
			self.order_time_out = timezone.now() + datetime.timedelta(hours=1)
		super(Order, self).save()
	


class TransactionPrivat24(models.Model):
	signature = models.CharField(max_length=100)
	amt = models.FloatField()
	ccy = models.CharField(max_length=4)
	details = models.CharField(max_length=40)
	ext_details = models.CharField(max_length=40)
	pay_way = models.CharField(max_length=10)
	order = models.ForeignKey(Order, related_name='order_id')
	merchant = models.IntegerField()
	state = models.CharField(max_length=6)
	date = models.DateTimeField()
	ref = models.CharField(max_length=50)
	payCountry = models.CharField(max_length=10)


