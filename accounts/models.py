from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.utils import timezone
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.validators import RegexValidator
# from utils.badges import award_badge

class Player(AbstractUser):
    is_paid = models.BooleanField(default=False)
    last_solved = models.DateTimeField(default=timezone.now)
    unlock_time = models.DateTimeField(default=timezone.now)
    current_question = models.IntegerField(default=1)
    score = models.IntegerField(default=0)
    avatar_no = models.PositiveIntegerField(default=1)
    admission_no = models.CharField(max_length=10)
    contact_regex = RegexValidator(regex=r'^[1-9]\d{9}$',
        message="Phone number should be of 10 digits.")
    contact_no = models.CharField(validators=[contact_regex], max_length=10)

    def __str__(self):
        return self.username
    @property
    def num_questions_solved(self):
        return self.current_question - 1

    def _award_badge(self, should_award, badge):
        # should_award, badge = should_award_badge(player)
        print("BADGE INFO", should_award, badge)
        if should_award:
            return badge.award_to(self)
