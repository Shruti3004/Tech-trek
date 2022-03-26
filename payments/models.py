from django.db import models
from accounts.models import Player
from django.utils import timezone


class Order(models.Model):
    player = models.ForeignKey(Player, related_name="player", on_delete=models.CASCADE)
    order_id = models.CharField(unique=True, max_length=32)
    entity = models.CharField(max_length=32)
    amount = models.CharField(max_length=8)
    amount_paid = models.CharField(max_length=8)
    amount_due = models.CharField(max_length=8)
    currency = models.CharField(max_length=8)
    receipt = models.CharField(max_length=32)
    offer_id = models.CharField(max_length=32, null=True)
    status = models.CharField(max_length=32)
    attempts = models.CharField(max_length=4)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.player.username
