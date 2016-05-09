from django.db.models import Count
from rest_framework.throttling import BaseThrottle, AnonRateThrottle, SimpleRateThrottle
from rest_framework.exceptions import Throttled
from hostel.models import Blocked_Ip, ExtUser


class InspectionThrottle(SimpleRateThrottle):
	rate ='5/min'
	
	def get_cache_key(self, request, view):
		if request.user.is_authenticated():
			 ident = request.user.pk
		else:
			ident = self.get_ident(request)
		
		return self.cache_format % {
            'scope': self.scope,
            'ident': self.get_ident(request)
        }

	def allow_request(self, request, view):
        
		if self.rate is None:
			return True

		self.key = self.get_cache_key(request, view)
		if self.key is None:
			return True

		self.history = self.cache.get(self.key, [])
		self.now = self.timer()

        # Drop any requests from the history which have now passed the
        # throttle duration
		while self.history and self.history[-1] <= self.now - self.duration:
			self.history.pop()
		if len(self.history) >= self.num_requests:
			u_id = request.user.pk
			try:
				is_manager = ExtUser.objects.get(pk=u_id, is_manager=True)
				return True
			except ExtUser.DoesNotExist:
				return self.catch_user(request)
		return self.throttle_success()
	
	def catch_user(self, request):
		get_ident = self.get_ident(request)
		
		try:
			blocked_ip = Blocked_Ip.objects.get(ip=get_ident)
			if blocked_ip.catch_times == 3:
				blocked_ip.block_forever = True
				blocked_ip.save()
				return False
			
			blocked_ip.catch_times = blocked_ip.catch_times + 1
			blocked_ip.save()
			return False
			
		except Blocked_Ip.DoesNotExist:
			Blocked_Ip.objects.create(ip = get_ident)
			return False
		 