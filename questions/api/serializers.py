from rest_framework import serializers
# from questions.models import Question
from accounts.models import Player
from badges.api.serializers import BadgeSerializer, BadgeToPlayerSerializer
from django.db.models import Count
from badges.models import BadgeToPlayer

class PlayerInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = [
            'username',
            'is_paid',
            'current_question',
            'score',
            'avatar_no',
        ]

class LeaderboardSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        # queryset = obj.badges.annotate(total=Count('badge_type'))
        # badge_serializer = BadgeSerializer(queryset, many=True)
        badge4_count = obj.badges.filter(badge_type="4").count()
        return {
            'player_name': obj.username,
            'score': obj.score,
            'email': obj.email,
            'avatar_no': obj.avatar_no,
            'badge_4': badge4_count
        }
 