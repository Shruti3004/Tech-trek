from rest_framework import permissions
from rest_framework.exceptions import APIException
from rest_framework import status
from datetime import datetime
from django.conf import settings

class IsPaid(permissions.BasePermission):
    """
    Allow access to only paid users.
    """
    message = "Only paid users can access this."
    
    def has_object_permission(self, request, view, obj):
        if obj.is_paid:
            return True
        raise RequirePayment()

class RequirePayment(APIException):
    status_code = status.HTTP_403_FORBIDDEN
    default_detail = {
        'player_info': {
            'is_paid': False,
        },
        'message': "Only paid users can access this."
    }
    
class GameStarted(permissions.BasePermission):
    message = "The game is yet to start"
    def has_permission(self, request, view):
        if datetime.now() < settings.START_TIME:
            return False
        elif datetime.now() > settings.END_TIME:
            return False
        else:
            return True


# class IsTimeOver(permissions.BasePermission):
#     """
#     Allow access only to the players whose wait time is over.
#     """

#     def has_object_permission(self, request, view, obj):
#         tz_info = obj.unlock_time.tzinfo
#         time_left = (obj.unlock_time - datetime.now(tz_info)).total_seconds()

#         if time_left >= 0:
#             return False
#         return True
