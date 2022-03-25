from django.db import models
from accounts.models import Player

from django.utils import timezone

BADGE_CHOICES = (
    ("1", "level1"),
    ("2", "level2"),
    ("3", "level3"),
    ("4", "solved first"),
    ("5", "level5"),
    ("6", "level6"),
)

class Badge(models.Model):
    description = models.CharField(max_length=255)
    badge_type = models.CharField(max_length=1, choices=BADGE_CHOICES)
    player = models.ManyToManyField(Player, related_name="badges", through="BadgeToPlayer")
    one_time_only = models.BooleanField(default=True)

    def __str__(self):
        return self.badge_type

    def get_badge_count(self, player):
        """
        Given a player object instace, returns total number of badges
        of this type that have been awarded to this player.
        """

        kwargs = {'badge': self}
        if player is None:
            pass
        if isinstance(player, Player):
            kwargs.update(dict(player=player))
        
        return BadgeToPlayer.objects.filter(**kwargs).count()

    def has_badge(self, player):
        return self in player.badges.all()
    
    def award_to(self, player):

        if self.one_time_only:
            if self.has_badge(player):
                return False
            else:
                BadgeToPlayer.objects.create(badge=self, player=player)   
        else:
            # print("NOT ONE TIME ONLY")
            BadgeToPlayer.objects.filter(badge=self)\
                .update(is_active=False)
            BadgeToPlayer.objects.create(badge=self, player=player)
            
        return True

class BadgeToPlayer(models.Model):
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)

    awarded_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)

class ActiveBadgeToPlayerManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)