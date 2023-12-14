from rest_framework.permissions import BasePermission

class IsFan(BasePermission):
  def has_permission(self, request, view):
    # Assuming the 'Player' group exists and you want to check if the user is in that group
    return request.user.groups.filter(name='Fan').exists()

class IsPlayer(BasePermission):
  def has_permission(self, request, view):
    # Assuming the 'Player' group exists and you want to check if the user is in that group
    return request.user.groups.filter(name='Player').exists()

class IsCommissioner(BasePermission):
  def has_permission(self, request, view):
    # Assuming the 'Player' group exists and you want to check if the user is in that group
    return request.user.groups.filter(name='Player').exists()

