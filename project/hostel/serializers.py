import re

from django.contrib.auth import get_user_model, authenticate
from django.conf import settings
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode as uid_decoder
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import force_text

from django.utils.six import BytesIO
from rest_framework.parsers import JSONParser


from allauth.account import app_settings as allauth_settings
from allauth.account.adapter import get_adapter
from allauth.utils import email_address_exists
from allauth.account.utils import setup_user_email
from rest_framework.renderers import JSONRenderer

from rest_framework import serializers, exceptions
from rest_framework.exceptions import ValidationError
from hostel.models import HostelRoom, RoomImage, TokenModel, Order, TransactionPrivat24

#Get User Model
UserModel = get_user_model()


class OrderKeySerializer(serializers.Serializer):
	key = serializers.CharField(required=True)

class RoomImage(serializers.ModelSerializer):
	
	image_medium = serializers.SerializerMethodField('get_image_medium_url')
	image_thumb = serializers.SerializerMethodField('get_image_thumb_url')

	class Meta:
		model = RoomImage
		fields = ('image_medium', 'image_thumb', 'image_main')

	
	def get_image_medium_url(self, obj):
		#return '%s%s' % (settings.MEDIA_URL, obj.image_original)
		url = obj.image_medium.url
		abs_url = url.split('/', 7)[-1] # only folder and name of file
		static_url = str('/static/pictures/') + abs_url
		return static_url

	def get_image_thumb_url(self, obj):
		#return '%s%s' % (settings.MEDIA_URL, obj.image_original)
		url = obj.image_thumb.url
		abs_url = url.split('/', 7)[-1] # only folder and name of file
		static_url = str('/static/pictures/') + abs_url
		return static_url


	

class FreeRoomSerializer(serializers.Serializer):
	id = serializers.IntegerField(required=True)
	name_room = serializers.CharField(required=True)
	description_short = serializers.CharField(required=True)
	price_room = serializers.IntegerField(required=True)
	location_room = serializers.CharField(required=True)
	price_room = serializers.CharField(required=True)
	thumb_image  =serializers.SerializerMethodField()

	def get_thumb_image(self, obj):
		ret_url = obj.roomimages.filter(image_main=True)[0].image_thumb.url
		abs_url = ret_url.split('/', 7)[-1] # only folder and name of file
		static_url = str('/static/pictures/') + abs_url
		return static_url
	
	


	
class HostelRoomSerializer(serializers.ModelSerializer):
	roomimages  = RoomImage(many=True, read_only=True) 
	#roomimages = serializers.URLField(read_only=True, source='roomimages.image_original.url
	latitude = serializers.SerializerMethodField('get_position_lat')
	longitude = serializers.SerializerMethodField('get_position_long')



	class Meta:
		model = HostelRoom
		fields = (
			'id', 'name_room', 'price_room', 'description_full', 
			'description_short', 'places_in_room', 'rating', 'free_places', 'roomimages',
			'latitude','longitude', 'location_room', 
			)

	def get_position_lat(self, obj):
		pos_lat = obj.position.latitude
		return pos_lat

	def get_position_long(self, obj):
		pos_long = obj.position.longitude
		return pos_long



class OrderSerializer(serializers.ModelSerializer):
	
	
	class Meta:
		model = Order
		fields = ('id', 'room','person_email', 'person_firstname','person_middlename', 'person_lastname', 
		'person_phonenumber', 'date_in', 'date_out', 'payment','order_time_in', 'amount', )
		write_only_fields = ('room','user', 'person_email', 'person_firstname','person_middlename', 'person_lastname',  'person_phonenumber', 'date_in', 'date_out',)


class DeselectPaymentSerializer(serializers.Serializer):
	id = serializers.IntegerField(required=True)
	deselected_reason = serializers.CharField(required=True)


class ManagerPaymentSerializer(serializers.Serializer):
	id = serializers.IntegerField(required=True)
	amt = serializers.IntegerField(required=True)
	pay_way = serializers.CharField(required=True)

class ManagerOrderSerializer(serializers.ModelSerializer):
	
	is_manager = serializers.SerializerMethodField()
	payment_date = serializers.SerializerMethodField()
	manager_take_order = serializers.SerializerMethodField()
	class Meta:
		model = Order
		fields = ('id', 'room', 'manager_take_order', 'is_manager', 'person_email', 'person_firstname','person_middlename', 'person_lastname', 
		'person_phonenumber', 'date_in', 'date_out', 'payment', 'payment_type', 'payment_date', 'order_time_in', 'amount', 'is_booking',
		 'deselected', 'amount', )

		
	def get_is_manager(self, obj):
		if obj.user is None:
			is_manager = False
			
		else:
			is_manager = obj.user.is_manager
		return is_manager

	def get_payment_date(self, obj):
		if obj.payment:
			try:
				if obj.additionalpayment_set.exists():
					payment_date = obj.additionalpayment_set.get(id = obj.payment_id).date_time.date()
					return payment_date
				elif obj.transactionprivat24_set.exists():
					payment_date = obj.transactionprivat24_set.get(id = obj.payment_id).date.date()
					return payment_date
			except AttributeError:
				payment_date = None
		else:
			payment_date = None

		return payment_date 

	def get_manager_take_order(self, obj):
		if obj.user:
			manager_middle_name = obj.user.user_middlename
		else:
			manager_middle_name = None
		return manager_middle_name

	
class OrderInfoSerializer(serializers.ModelSerializer):
	
	room_name = serializers.SerializerMethodField()
	room_address = serializers.SerializerMethodField()
	order_date = serializers.SerializerMethodField() 
	
	class Meta:
		model = Order
		fields = ('id', 'room', 'room_name', 'room_address', 'user', 'person_email', 'person_firstname', 'unique_href',
		'person_middlename', 'person_lastname',  'person_phonenumber', 'date_in', 'date_out', 'payment', 'order_date', 'amount',)
	

	def get_room_name(self, obj):
		room_name = obj.room.name_room
		return room_name

	def get_room_address(self, obj):
		room_address = obj.room.location_room
		return room_address
	def get_order_date(self, obj):
		date = obj.order_time_in.date()
		return date


class ChekRoomSerializer(serializers.Serializer):
	room_id = serializers.IntegerField(required=True)
	order_in = serializers.DateField( required=True)	
	order_out = serializers.DateField( required=True)	

class ManagerRoomSerializer(serializers.Serializer):
	order_in = serializers.DateField( required=True)	
	order_out = serializers.DateField( required=True)	

class LoginSerializer(serializers.Serializer):
	username = serializers.CharField(required=False, allow_blank=True)
	email = serializers.EmailField(required=False, allow_blank=True)
	password = serializers.CharField(style={'input_type': 'password'})

	def _validate_email(self, email, password):
		user = None

		if email and password:
			user = authenticate(email=email, password=password)
		else:
			msg = _('Must include "email" and "password".')
			raise exceptions.ValidationError(msg)

		return user

	def _validate_username(self, username, password):
		user = None

		if username and password:
			user = authenticate(username=username, password=password)
		else:
			msg = _('Must include "username" and "password".')
			raise exceptions.ValidationError(msg)

		return user

	def _validate_username_email(self, username, email, password):
		user = None

		if email and password:
			user = authenticate(email=email, password=password)
		elif username and password:
			user = authenticate(username=username, password=password)
		else:
			msg = _('Must include either "username" or "email" and "password".')
			raise exceptions.ValidationError(msg)

		return user

	def validate(self, attrs):
		username = attrs.get('username')
		email = attrs.get('email')
		password = attrs.get('password')

		user = None

		if 'allauth' in settings.INSTALLED_APPS:
			from allauth.account import app_settings

			# Authentication through email
			if app_settings.AUTHENTICATION_METHOD == app_settings.AuthenticationMethod.EMAIL:
				user = self._validate_email(email, password)

			# Authentication through username
			if app_settings.AUTHENTICATION_METHOD == app_settings.AuthenticationMethod.USERNAME:
				user = self._validate_username(username, password)

			# Authentication through either username or email
			else:
				user = self._validate_username_email(username, email, password)

		else:
			# Authentication without using allauth
			if email:
				try:
					username = UserModel.objects.get(email__iexact=email).get_username()
				except UserModel.DoesNotExist:
					pass

			if username:
				user = self._validate_username_email(username, '', password)

		# Did we get back an active user?
		if user:
			if not user.is_active:
				msg = _('User account is disabled.')
				raise exceptions.ValidationError(msg)
		else:
			msg = _('Wrong email or password.')
			raise exceptions.ValidationError(msg)

		# If required, is the email verified?
		if 'rest_auth.registration' in settings.INSTALLED_APPS:
			from allauth.account import app_settings
			if app_settings.EMAIL_VERIFICATION == app_settings.EmailVerificationMethod.MANDATORY:
				email_address = user.emailaddress_set.get(email=user.email)
				if not email_address.verified:
					raise serializers.ValidationError(_('E-mail is not verified.'))

		attrs['user'] = user
		return attrs


class TokenSerializer(serializers.ModelSerializer):
	"""
	Serializer for Token model.
	"""

	class Meta:
		model = TokenModel
		fields = ('key',)


class UserDetailsSerializer(serializers.ModelSerializer):
	user_firstname = serializers.CharField(max_length=30, required=True)
	user_middlename = serializers.CharField(max_length=30, required=True)
	user_lastname= serializers.CharField(max_length=30, required=True)
	"""
	User model w/o password
	"""
	class Meta:
		model = UserModel
		fields = ('id', 'email', 'user_firstname', 'user_lastname', 'user_middlename', 'phone_number', 'is_active', 'inner_reg', 'is_manager',)
		read_only_fields = ('id', 'email', 'is_active', 'inner_reg', )

	#Validate input user profile data
	def validate(self, attr):
		reg = re.compile('[a-zA-ZА-яЁе_-]+$')
		
		if reg.match(attr['user_firstname']) is None:
			raise ValidationError({'first_name': ['Invalid value']})

		if reg.match(attr['user_middlename']) is None:
			raise ValidationError({'middlename': ['Invalid value']})

		if reg.match(attr['user_lastname']) is None:
			raise ValidationError({'lastname': ['Invalid value']})
		return attr

class JWTSerializer(serializers.Serializer):
	"""
	Serializer for JWT authentication.
	"""
	token = serializers.CharField()
	user = UserDetailsSerializer()


class PasswordResetSerializer(serializers.Serializer):

	"""
	Serializer for requesting a password reset e-mail.
	"""

	email = serializers.EmailField()

	password_reset_form_class = PasswordResetForm

	def get_email_options(self):
		""" Override this method to change default e-mail options
		"""
		return {}

	def validate_email(self, value):
		# Create PasswordResetForm with the serializer
		self.reset_form = self.password_reset_form_class(data=self.initial_data)
		if not self.reset_form.is_valid():
			raise serializers.ValidationError(self.reset_form.errors)

		return value

	def save(self):
		request = self.context.get('request')
		# Set some values to trigger the send_email method.
		opts = {
			'use_https': request.is_secure(),
			'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
			'request': request,
		}

		opts.update(self.get_email_options())
		self.reset_form.save(**opts)


class PasswordResetConfirmSerializer(serializers.Serializer):
	"""
	Serializer for requesting a password reset e-mail.
	"""

	new_password1 = serializers.CharField(max_length=128)
	new_password2 = serializers.CharField(max_length=128)

	uid = serializers.CharField(required=True)
	token = serializers.CharField(required=True)

	set_password_form_class = SetPasswordForm

	def custom_validation(self, attrs):
		pass

	def validate(self, attrs):
		self._errors = {}

		# Decode the uidb64 to uid to get User object
		try:
			uid = force_text(uid_decoder(attrs['uid']))
			self.user = UserModel._default_manager.get(pk=uid)
		except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
			raise ValidationError({'uid': ['Invalid value']})

		self.custom_validation(attrs)
		# Construct SetPasswordForm instance
		self.set_password_form = self.set_password_form_class(
			user=self.user, data=attrs
		)
		if not self.set_password_form.is_valid():
			raise serializers.ValidationError(self.set_password_form.errors)
		if not default_token_generator.check_token(self.user, attrs['token']):
			raise ValidationError({'token': ['Invalid value']})

		return attrs

	def save(self):
		self.set_password_form.save()


class PasswordChangeSerializer(serializers.Serializer):

	old_password = serializers.CharField(max_length=128)
	new_password1 = serializers.CharField(max_length=128)
	new_password2 = serializers.CharField(max_length=128)

	set_password_form_class = SetPasswordForm

	def __init__(self, *args, **kwargs):
		self.old_password_field_enabled = getattr(
			settings, 'OLD_PASSWORD_FIELD_ENABLED', True
		)
		self.logout_on_password_change = getattr(
			settings, 'LOGOUT_ON_PASSWORD_CHANGE', True
		)
		super(PasswordChangeSerializer, self).__init__(*args, **kwargs)

		if not self.old_password_field_enabled:
			self.fields.pop('old_password')

		self.request = self.context.get('request')
		self.user = getattr(self.request, 'user', None)

	def validate_old_password(self, value):
		invalid_password_conditions = (
			self.old_password_field_enabled,
			self.user,
			not self.user.check_password(value)
		)

		if all(invalid_password_conditions):
			raise serializers.ValidationError('Invalid password')
		return value

	def validate(self, attrs):
		self.set_password_form = self.set_password_form_class(
			user=self.user, data=attrs
		)

		if not self.set_password_form.is_valid():
			raise serializers.ValidationError(self.set_password_form.errors)
		return attrs

	def save(self):
		self.set_password_form.save()
		if not self.logout_on_password_change:
			from django.contrib.auth import update_session_auth_hash
			update_session_auth_hash(self.request, self.user)


class RegisterSerializer(serializers.Serializer):
 
	email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
	password1 = serializers.CharField(required=True, write_only=True)
	password2 = serializers.CharField(required=True, write_only=True)

	def validate_username(self, username):
		username = get_adapter().clean_username(username)
		return username

	def validate_email(self, email):
		email = get_adapter().clean_email(email)
		if allauth_settings.UNIQUE_EMAIL:
			if email and email_address_exists(email):
				raise serializers.ValidationError(
					_("A user is already registered with this e-mail address."))
		return email

	def validate_password1(self, password):
		return get_adapter().clean_password(password)

	def validate(self, data):
		if data['password1'] != data['password2']:
			raise serializers.ValidationError(_("The two password fields didn't match."))
		return data

	def custom_signup(self, request, user):
		pass

	def get_cleaned_data(self):
		return {
			'username': self.validated_data.get('username', ''),
			'password1': self.validated_data.get('password1', ''),
			'email': self.validated_data.get('email', '')
		}

	def save(self, request):
		adapter = get_adapter()
		user = adapter.new_user(request)
		user.inner_reg = True
		self.cleaned_data = self.get_cleaned_data()
		adapter.save_user(request, user, self)
		self.custom_signup(request, user)
		setup_user_email(request, user, [])
		return user

class VerifyEmailSerializer(serializers.Serializer):
	key = serializers.CharField()