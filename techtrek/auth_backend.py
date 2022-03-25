from accounts.models import Player
from django.db.models import Q

class EmailOrUsernameBackend:
    def authenticate(self, request, username=None, password=None):
        try:
            player = Player.objects.filter(
                Q(username=username) | Q(email=username)
            ).first()
            if player and player.check_password(password):
                return player
        except Player.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return Player.objects.get(pk=user_id)
        except Player.DoesNotExist:
            return None
