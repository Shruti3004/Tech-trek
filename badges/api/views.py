from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.models import Player
from django.db.models import Count
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
# from badges.api.serializers import BadgesSerializer

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_badge_count(request):
#     player = Player.objects.get(username=request.user.username)
#     queryset = player.badges.annotate(total=Count('badge_type'))
#     serializer = BadgesSerializer(queryset, many=True)

#     # if serializer.is_valid():
#     #     return Response(serializer.data, HTTP_200_OK)
#     # else:    
#     return Response(serializer.data, HTTP_200_OK)
