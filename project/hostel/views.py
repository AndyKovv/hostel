import requests
import time
#For Privat24
from hashlib import md5, sha1

from io import StringIO, BytesIO

#PDF gen
from rlextra.rml2pdf import rml2pdf

from django.contrib.auth import login, logout, get_user_model
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.utils.translation import ugettext_lazy as _
from django.db.models import Count
#from django.views.generic import TemplateView
from django.views.generic.base import TemplateResponseMixin, View, TemplateView
from django.shortcuts import redirect, render 
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.template.loader import render_to_string, get_template
from django.template import Template, Context


#DjangoRestFramework
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import detail_route, list_route, api_view, parser_classes, permission_classes
from rest_framework.parsers import FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework_xml.parsers import XMLParser

from urllib.parse import urlparse, parse_qsl


from .app_settings import (
	TokenSerializer, UserDetailsSerializer, LoginSerializer,
	PasswordResetSerializer, PasswordResetConfirmSerializer,
	PasswordChangeSerializer, JWTSerializer, create_token, RegisterSerializer
)

from allauth.account.utils import complete_signup
from allauth.account.views import ConfirmEmailView
from allauth.account import app_settings as allauth_settings

from .utils import jwt_encode

from hostel.models import HostelRoom, RoomImage, Order, TokenModel, ExtUser, TransactionPrivat24
from hostel.serializers import (HostelRoomSerializer, OrderSerializer,
									 ChekRoomSerializer, FreeRoomSerializer, VerifyEmailSerializer, OrderKeySerializer, OrderInfoSerializer)




class Privat_24(APIView):
	authentication_classes = (TokenAuthentication,)
	parser_classes = (FormParser,)
	permission_classes = (AllowAny,)


	def build_signature(self, payment):
		password = '94f3qkAmXhjXEsoGPC7iX6KnVm1727Eq'
		test_str = ("%s%s" % (payment, password))
		md = md5(test_str.encode('utf-8')).hexdigest()
		sha = sha1(md.encode('utf-8')).hexdigest()
		return sha

	def post(self, request, format=None):
		
		payment = request.data.get('payment')
		#import pdb
		#pdb.set_trace()
		site = str(get_current_site(request))
		signature = request.data.get('signature')
		local_signature = self.build_signature(payment)
		
		if local_signature == signature:
			params = dict(parse_qsl(payment))
			order_i = params.get('order')
			date_op = params.get('date')
			op_date = time.strptime(date_op, "%d%m%y%H%M%S")
			date = time.strftime('%Y-%m-%d %H:%M:%S', op_date)

			try:

				order = Order.objects.get(pk = order_i)
			except Order.DoesNotExist:
				return Response({'raise': _("Something went wrong please contact our manager")})

			try:
				trans = TransactionPrivat24.objects.get(order = order_i)
				return Response({'raise': _("Payment already exist please contact our manager")})
				
			except TransactionPrivat24.DoesNotExist:
				transaction = TransactionPrivat24.objects.create(
					signature = signature,
					amt = params.get('amt'),
					ccy = params.get('ccy'),
					details = params.get('details'),
					ext_details = params.get('ext_details'),
					pay_way = params.get('pay_way'),
					order = order,
					merchant = params.get('merchant'),
					state = params.get('state'),
					date = date,
					ref = params.get('ref'),
					payCountry = params.get('payCountry')
					)
				order.payment = True
				order.save()
				unique_href = order.unique_href
				mail_link = site + '/orderinfo/' + unique_href + '/' 
				msg_plain = render_to_string('templated_email/confirmpayment.txt', {
					'order_id': order_i,
					'order_link': mail_link,
					'site': site
					})
				send_mail(_("Order information"), msg_plain, 'orders@hostel.te.ua', [order.person_email])
				return HttpResponseRedirect('/orderinfo/'+ unique_href +'/')

		return Response({'ransaction': 'Validattion'})
	


class RoomViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = HostelRoom.objects.filter(active='True', roomimages__image_main='True')
	serializer_class = HostelRoomSerializer

	
	

class OrderView(viewsets.ModelViewSet):
	# Get month!!!!!!
	queryset = Order.objects.all()
	serializer_class = OrderSerializer
	permission_classes = (IsAdminUser,)
	

	@list_route(methods=['post'], permission_classes=[AllowAny])
	def chek_room(self, request):
		serializer = ChekRoomSerializer(data = request.data)
		queryset = self.get_queryset()
		if serializer.is_valid():
			room_id = serializer.data['room_id']
			order_in = serializer.data['order_in']
			order_out = serializer.data['order_out']
			place_in_room = HostelRoom.objects.get(id=room_id).places_in_room
			live_in_interval = queryset.filter(room=room_id, date_in__lt=order_out, date_out__gt=order_in, is_booking=True).count()
			free_place = place_in_room - live_in_interval

			if free_place <=0:
				
				query_room = HostelRoom.objects.all()
				rooms = query_room.filter(
					order__date_in__lt=order_out, 
					order__date_out__gt=order_in, 
					
					).annotate(num_orders=Count('name_room'))
				busy_room = []

				for room in rooms:
					free = room.places_in_room - room.num_orders
					if free <=0: 
						busy_room.append(room.id)

				#import pdb
				#pdb.set_trace()
				interval_free_room = query_room.exclude(id__in=busy_room).filter(roomimages__image_main= True, active='True').order_by('-roomimages__image_main')
				free_serializer = FreeRoomSerializer(interval_free_room, many=True)
				return Response(free_serializer.data, status=status.HTTP_200_OK)			

			return Response({'free_place': free_place}, status=status.HTTP_200_OK) 

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	@list_route(methods=['post'], permission_classes=[AllowAny])
	def order_room(self, request):
		serializer = OrderSerializer(data = request.data)
		queryset = self.get_queryset()
		
		if serializer.is_valid(raise_exception=True):
			try:
				req_room = serializer.data['room']
				#Give only active room
				room = HostelRoom.objects.get(pk=req_room, active=True)
				if request.user.is_authenticated():
					req_user = self.request.user.id
					user = ExtUser.objects.get(pk = req_user)
				else:
					user = None
			except HostelRoom.DoesNotExist:
				return Response({"error": _("Undefined room")}, status=status.HTTP_400_BAD_REQUEST)
			
			pe = serializer.data['person_email']
			pf = serializer.data['person_firstname']
			pm = serializer.data['person_middlename']
			pl = serializer.data['person_lastname']
			pp = serializer.data['person_phonenumber']
			di = serializer.data['date_in']
			do = serializer.data['date_out']
			am = serializer.data['amount']
			
			place_in_room = HostelRoom.objects.get(id=room.id).places_in_room
			live_in_interval = queryset.filter(room=room.id, date_in__lt=do, date_out__gt=di, is_booking=True).count()
			free_place = place_in_room - live_in_interval

			if free_place > 0:
				order = Order.objects.create(
					room = room, user = user, person_email = pe, person_firstname = pf, person_middlename = pm,
					person_lastname = pl, person_phonenumber = pp, date_in = di, date_out = do, amount = am
					)
				response_serializer = OrderSerializer(order)
				return Response(response_serializer.data, status=status.HTTP_201_CREATED)
			return Response({"error": _("Room already occupied")})
	

	
	@list_route(methods=['get'], permission_classes=[IsAuthenticated])
	def order_list(self, request):
		queryset = self.get_queryset()
		user = request.user
		user_orders = queryset.filter(user = user).order_by('-pk')
		if user_orders.exists():
			serializer = OrderInfoSerializer(user_orders, many=True)
			return Response(serializer.data, status=status.HTTP_200_OK)

		return Response({"error": _("Empty")})



	@list_route(methods=['post'], permission_classes=[AllowAny])
	def order_info(self, request):
		serializer = OrderKeySerializer(data = request.data)
		queryset = self.get_queryset()
		if serializer.is_valid():
			unique_href = serializer.data['key']
			try:
				order = queryset.get(unique_href = unique_href)
			except Order.DoesNotExist:
				return Response({"error": "Does Not Exists"})
				
			respond_order_serializer = OrderInfoSerializer(order)
			return Response(respond_order_serializer.data)
		
		return Response({"error": "error request"})

	@list_route(methods=['post'], permission_classes=[AllowAny])
	def pdfcreator(self, request):
		req_unique_href = request.data.get('unique_href')
		try:
			order = Order.objects.get(unique_href = req_unique_href)
		except Order.DoesNotExist:
			return Response({"error": "Order not exists"})

		serializer = OrderInfoSerializer(order)
		if serializer:

			t = get_template('templated_pdf/order.rml')
			c = Context({
				"id" : serializer.data['id'],
				"date": serializer.data['order_date'],
				"date_in": serializer.data['date_in'],
				"date_out": serializer.data['date_out'],
				"phone_number": serializer.data['person_phonenumber'],
				"first_name": serializer.data['person_firstname'],
				"middle_name": serializer.data['person_middlename'],
				"last_name": serializer.data['person_lastname'],
				"address": serializer.data['room_address'],
				"payment": serializer.data['payment'],
				"room_name": serializer.data['room_name'],
				"amount": serializer.data['amount'],
				})
			rml = t.render(c)
			rml_unicode = rml.encode('utf-8')
			#import pdb
			#pdb.set_trace()
			buf = BytesIO()
			a = rml2pdf.go(rml_unicode, outputFileName = buf)
			pdfData = buf.getvalue()
			response = HttpResponse(content_type='application/pdf')
			response.write(pdfData)
			response['Content-Disposition'] = 'attachment; filename="order.pdf"'
			return response



class LoginView(GenericAPIView):

	"""
	Check the credentials and return the REST Token
	if the credentials are valid and authenticated.
	Calls Django Auth login method to register User ID
	in Django session framework
	Accept the following POST parameters: username, password
	Return the REST Framework Token Object's key.
	"""
	permission_classes = (AllowAny,)
	serializer_class = LoginSerializer
	token_model = TokenModel

	def get_response_serializer(self):
		if getattr(settings, 'REST_USE_JWT', False):
			response_serializer = JWTSerializer
		else:
			response_serializer = TokenSerializer
		return response_serializer

	def login(self):
		self.user = self.serializer.validated_data['user']

		if getattr(settings, 'REST_USE_JWT', False):
			self.token = jwt_encode(self.user)
		else:
			self.token = create_token(self.token_model, self.user, self.serializer)

		if getattr(settings, 'REST_SESSION_LOGIN', True):
			login(self.request, self.user)

	def get_response(self):
		serializer_class = self.get_response_serializer()

		if getattr(settings, 'REST_USE_JWT', False):
			data = {
				'user': self.user,
				'token': self.token
			}
			serializer = serializer_class(instance=data)
		else:
			serializer = serializer_class(instance=self.token)

		return Response(serializer.data, status=status.HTTP_200_OK)

	def post(self, request, *args, **kwargs):
		self.serializer = self.get_serializer(data=self.request.data)
		self.serializer.is_valid(raise_exception=True)
		self.login()
		return self.get_response()


class LogoutView(APIView):

	"""
	Calls Django logout method and delete the Token object
	assigned to the current User object.
	Accepts/Returns nothing.
	"""
	permission_classes = (AllowAny,)

	def get(self, request, *args, **kwargs):
		try:
			if allauth_settings.LOGOUT_ON_GET:
				response = self.logout(request)
			else:
				response = self.http_method_not_allowed(request, *args, **kwargs)
		except Exception as exc:
			response = self.handle_exception(exc)

		return self.finalize_response(request, response, *args, **kwargs)

	def post(self, request):
		return self.logout(request)

	def logout(self, request):
		try:
			request.user.auth_token.delete()
		except (AttributeError, ObjectDoesNotExist):
			pass

		logout(request)

		return Response({"success": _("Successfully logged out.")},
						status=status.HTTP_200_OK)


class UserDetailsView(RetrieveUpdateAPIView):
	"""
	Returns User's details in JSON format.
	Accepts the following GET parameters: token
	Accepts the following POST parameters:
		Required: token
		Optional: email, first_name, last_name and UserProfile fields
	Returns the updated UserProfile and/or User object.
	"""
	serializer_class = UserDetailsSerializer
	permission_classes = (IsAuthenticated,)

	def get_object(self):
		return self.request.user


class PasswordResetView(GenericAPIView):

	"""
	Calls Django Auth PasswordResetForm save method.
	Accepts the following POST parameters: email
	Returns the success/fail message.
	"""

	serializer_class = PasswordResetSerializer
	permission_classes = (AllowAny,)

	def post(self, request, *args, **kwargs):
		# Create a serializer with request.data
		serializer = self.get_serializer(data=request.data)
		if serializer.is_valid(raise_exception=True):
			try:
				email = serializer.data['email']
				ExtUser.objects.get(email = email)
			except ExtUser.DoesNotExist:
				return Response(
					{"error": _("Email does not exist")})

			serializer.save()
			# Return the success message with OK HTTP status
			return Response(
				{"success": _("Password reset e-mail has been sent.")},
				status=status.HTTP_200_OK
			)


class PasswordResetConfirmView(GenericAPIView):
	"""
	Password reset e-mail link is confirmed, therefore this resets the user's password.
	Accepts the following POST parameters: new_password1, new_password2
	Accepts the following Django URL arguments: token, uid
	Returns the success/fail message.
	"""

	serializer_class = PasswordResetConfirmSerializer
	permission_classes = (AllowAny,)

	def post(self, request):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response({"success": _("Password has been reset with the new password.")})


class PasswordChangeView(GenericAPIView):
	"""
	Calls Django Auth SetPasswordForm save method.
	Accepts the following POST parameters: new_password1, new_password2
	Returns the success/fail message.
	"""

	serializer_class = PasswordChangeSerializer
	permission_classes = (IsAuthenticated,)

	def post(self, request):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response({"success": _("New password has been saved.")})

class VerifyEmailView(APIView, ConfirmEmailView):

	permission_classes = (AllowAny,)
	allowed_methods = ('POST', 'OPTIONS', 'HEAD')

	def get(self, *args, **kwargs):
		raise MethodNotAllowed('GET')

	def post(self, request, *args, **kwargs):
		serializer = VerifyEmailSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.kwargs['key'] = serializer.validated_data['key']
		confirmation = self.get_object()
		confirmation.confirm(self.request)
		user = confirmation.email_address.user
		user.is_active = True
		user.save()
		return Response({'message': _('ok')}, status=status.HTTP_200_OK)


class RegisterView(CreateAPIView):
	serializer_class = RegisterSerializer
	permission_classes = (AllowAny, )
	token_model = TokenModel

	def get_response_data(self, user):
		if allauth_settings.EMAIL_VERIFICATION == \
				allauth_settings.EmailVerificationMethod.MANDATORY:
			return {}

		if getattr(settings, 'REST_USE_JWT', False):
			data = {
				'user': user,
				'token': self.token
			}
			return JWTSerializer(data).data
		else:
			return TokenSerializer(user.auth_token).data

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = self.perform_create(serializer)
		headers = self.get_success_headers(serializer.data)

		return Response(self.get_response_data(user), status=status.HTTP_201_CREATED, headers=headers)

	def perform_create(self, serializer):
		user = serializer.save(self.request)
		if getattr(settings, 'REST_USE_JWT', False):
			self.token = jwt_encode(user)
		else:
			create_token(self.token_model, user, serializer)
		complete_signup(self.request._request, user,
						allauth_settings.EMAIL_VERIFICATION,
						None)
		return user