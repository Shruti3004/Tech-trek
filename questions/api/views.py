from rest_framework import views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from utils.permissions import IsPaid
from utils.badges import should_award_badge
from utils.questions import get_next_question
from questions.models import Question
from accounts.models import Player
from badges.models import Badge, BadgeToPlayer
from datetime import datetime
from django.db.models import Count
from django.conf import settings

from questions.api.serializers import (
    PlayerInfoSerializer,
    LeaderboardSerializer,
)

from badges.api.serializers import BadgeToPlayerSerializer

class GetQuestion(views.APIView):
    permission_classes = [IsAuthenticated, IsPaid]

    def get(self, request, format=None):
        player = request.user
        self.check_object_permissions(request, player)
        
        tz_info = player.unlock_time.tzinfo
        time_left = (player.unlock_time - datetime.now(tz_info)).total_seconds()
        has_started = True
        q_text = ""
        if datetime.now() < settings.START_TIME:
            has_started = False
        if time_left < 0:
            time_left = 0

            q = get_next_question(player)
            q_text = q.question
        
        player_info_serializer = PlayerInfoSerializer(player)
        # queryset = player.badges.annotate(total=Count('badge_type'))
        queryset = BadgeToPlayer.objects.filter(player=player, is_active=True)
        badge_serializer = BadgeToPlayerSerializer(queryset, many=True)

        return Response({
            "player_info": player_info_serializer.data,
            "isTimeLeft": bool(time_left),
            "badges": badge_serializer.data,
            "detail": {
                "question": q_text if has_started else "",
                "time_left": time_left,
            }
        })

    def post(self, request, format=None):
        player = request.user
        self.check_object_permissions(request, player)

        tz_info = player.unlock_time.tzinfo
        time_left = (player.unlock_time - datetime.now(tz_info)).total_seconds()

        if datetime.now() < settings.START_TIME:
            return Response({
                "detail": "Game is not started yet."
            })

        if time_left >= 0:
            return Response({
                "isTimeLeft": True,
                "detail": {
                    "question": "",
                    "time_left": time_left,
                }
            })

        # question = Question.objects.get(level=player.current_question)
        question = get_next_question(player)
        if request.data.get('answer').lower() == question.tech_answer:
            if question.is_level_solved is False:
                # Update questions to mark that the level is solved.
                Question.objects.filter(level=player.current_question)\
                    .update(is_level_solved=True)
                badge = Badge.objects.get(badge_type="4")
                # print("AWARDING...")
                badge.award_to(player)

            player.current_question = player.current_question + 1
            player.score = player.score + 10
            player.unlock_time = datetime.now(tz_info) + question.wait_duration
            player.last_solved = datetime.now(tz_info)

            # Award badges
            should_award, badge_type = should_award_badge(player)
            if should_award:
                badge = Badge.objects.get(badge_type=badge_type)
                badge.award_to(player)
            player.save()

            is_correct = True

        elif request.data.get('answer').lower() == question.nontech_answer:
            if question.is_level_solved is False:
                # Update questions to mark that the level is solved.
                Question.objects.filter(level=player.current_question)\
                    .update(is_level_solved=True)
                badge = Badge.objects.get(badge_type="4")
                print("AWARDING...")
                badge.award_to(player)
            
            player.current_question = player.current_question + 1
            player.score = player.score + 5
            player.unlock_time = datetime.now(tz_info) + question.wait_duration
            player.last_solved = datetime.now(tz_info)
            
            # Award badges
            should_award, badge_type = should_award_badge(player)
            if should_award:
                badge = Badge.objects.get(badge_type=badge_type)
                badge.award_to(player)
            player.save()

            is_correct = True
        else:
            is_correct = False

        return Response({"success": is_correct})

@api_view(['GET'])
def leaderboard(request):
    """
        Returns a list of players with highest score. The tie is broken
        by the player who has solved first.
    """

    queryset = Player.objects.order_by("-score", "last_solved")\
        .filter(is_superuser=False, is_paid=True)
    serializer = LeaderboardSerializer(queryset, many=True)

    return Response(serializer.data)
