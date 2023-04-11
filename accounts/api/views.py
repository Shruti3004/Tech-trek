from accounts.models import Player
from rest_framework import generics, views, status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
# from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC
from rest_framework.views import APIView
from accounts.api.serializers import (
    PlayerRegisterSerializer,
    PlayerListSerializer,
    PlayerDashboardSerializer,
)
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator

class PlayerRegisterAPIView(generics.CreateAPIView):
    serializer_class = PlayerRegisterSerializer
    queryset = Player.objects.all()
    permission_classes = [AllowAny]


class PlayerListAPIView(generics.ListAPIView):
    serializer_class = PlayerListSerializer
    queryset = Player.objects.all()
    permission_classes = [IsAdminUser]


class PlayerDashboardAPIView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        player = request.user
        self.check_object_permissions(request, player)
        serializer = PlayerDashboardSerializer(player)
        return Response(serializer.data)

# class VerifyEmailView(APIView):
#     def get(self, request, *args, **kwargs):
#         key = kwargs.get('key')
#         confirmation = EmailConfirmationHMAC.from_key(key)

#         if confirmation:
#             confirmation.confirm(self.request)
#             return Response({'detail': 'Email verified'}, status=status.HTTP_200_OK)
#         else:
#             return Response({'detail': 'Invalid verification key'}, status=status.HTTP_400_BAD_REQUEST)

class VerifyEmailView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = Player.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, Player.DoesNotExist):
            user = None
        if user is not None and default_token_generator.check_token(user, token) and (not user.is_active):
            user.is_active = True
            user.save()
            # return redirect('http://your-domain.com/activate-success')
            return Response({'detail': 'Email verified'}, status=status.HTTP_200_OK)
        else:
            # return Response({'error': 'Activation link is invalid.'})
            return Response({'detail': 'Invalid verification key'}, status=status.HTTP_400_BAD_REQUEST)