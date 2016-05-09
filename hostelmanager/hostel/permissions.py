from rest_framework import permissions
from rest_framework.throttling import BaseThrottle
from rest_framework.response import Response
from hostel.models  import Blocked_Ip

class IsManagerUser(permissions.BasePermission):
    """
    Allows access only to manager users.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_manager

class IsCustomAdminUser(permissions.BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
       return request.user and request.user.is_admin 
   
class BlackListIp(permissions.BasePermission, BaseThrottle):
	def has_permission(self, request, view):
		req_ip = self.get_ident(request)
		try:
			blacklisted = Blocked_Ip.objects.get(ip=req_ip, block_forever=True)
			return False
		except Blocked_Ip.DoesNotExist:
			return True
		
        