import datetime
import random
import string
import sys, time  
import os
import glob
from uuid import uuid4
from django.db.models.signals import pre_save
from django.db.models import signals 
from django.db import models
from django.utils import timezone

from strgen import StringGenerator as SG

from PIL import Image

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
	
	
	last_folder = max(glob.iglob('/var/www/hostel.te.ua/project/media/roomimage/*/'), key=os.path.getctime)
	
	
			
	def path_and_rename(last_folder):
		def wrapper(instance, filename):
				ext = filename.split('.')[-1] # get filename
				count_dir = next(os.walk(last_folder))[2] # get files in the folder
				filename = '{}.{}'.format(SG(r'[\u\d]{6}').render(), ext) # set filename as random string
				if len(count_dir) > 8:
						path_to_dirs = str('/var/www/hostel.te.ua/project/media/roomimage/')
						new_folder = SG(r'[\u\d]{6}').render()
						new_path = path_to_dirs + new_folder + '/' + filename
						
				elif len(count_dir) < 7 :
						new_path = last_folder + filename	
						
						
				# return the whole path to the file
				return new_path
		return wrapper
		
	#path = path_and_rename(folder_chek)
	

	room = models.ForeignKey(HostelRoom)
	image_main = models.BooleanField()
	image_original = models.ImageField('original file upload', upload_to=path_and_rename(last_folder), max_length=255)
	image_medium = models.ImageField(max_length=255, blank=True)
	image_thumb = models.ImageField(max_length=255, blank=True) 
	date_create = models.DateTimeField(auto_now_add=True)

	"""
	class Meta:
		unique_together = (('room', 'image_main',),)
	
	"""
	
		
	def get_thumb(self):
				return "/site_media/%s" % self.image_thumb

	def get_medium(self):
			 return "/site_media/%s" % self.image_medium

	def get_original(self):
				return "/site_media/%s" % self.image_original


	


	
	def save(self):
				sizes = {'thumbnail': {'height': 200, 'width': 133}, 'medium': {'height': 570, 'width': 380},}
						
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
	room = models.ForeignKey(HostelRoom, null=True) 
	user = models.ForeignKey(ExtUser, null=True)
	person_firstname = models.CharField(max_length=25, null=False)
	person_lastname = models.CharField(max_length=25, null=False)
	person_middlename = models.CharField(max_length=25, null=False)
	date_in = models.DateField()
	date_out = models.DateField()
	order_time_in = models.DateTimeField(auto_now_add=True)
	order_time_out = models.DateTimeField(blank=True)
	is_booking = models.BooleanField(default=True)
	payment = models.BooleanField(default=False)

	

	def save(self):
		
		self.order_time_out = timezone.now() + datetime.timedelta(hours=5)
		super(Order, self).save()  