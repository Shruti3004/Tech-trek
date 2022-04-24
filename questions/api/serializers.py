from rest_framework import serializers

# from questions.models import Question
from accounts.models import Player
from badges.api.serializers import BadgeSerializer, BadgeToPlayerSerializer
from django.db.models import Count
from badges.models import BadgeToPlayer, Badge


class PlayerInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = [
            "username",
            # "is_paid",
            "current_question",
            "score",
            # "avatar_no",
        ]


class LeaderboardSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        # badge_serializer = BadgeSerializer(badges, many=True)
        # badge4_count = obj.badges.filter(badge_type="4").count()
        badges = Badge.objects.filter(player=obj)
        special_badge = Badge.objects.get(badge_type="0")
        if special_badge in badges:
            best_badge = special_badge.badge_type
        else:
            best_badge = badges.order_by("-badge_type")
            if best_badge.count() > 0:
                best_badge = best_badge[0].badge_type
            else:
                best_badge = None
        return {
            "player_name": obj.username,
            "score": obj.score,
            "email": obj.email,
            # "avatar_no": obj.avatar_no,
            "best_badge": best_badge,
        }
