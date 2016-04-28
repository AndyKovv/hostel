from rest_framework import permissions

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