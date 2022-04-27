from datetime import timedelta
from django.db import models


class Question(models.Model):
    question = models.CharField(max_length=200)
    upload = models.ImageField(null=True, blank=True, upload_to="img/")
    tech_answer = models.CharField(max_length=100)
    # nontech_answer = models.CharField(max_length=100)
    level = models.IntegerField(default=1)
    # wait_duration = models.DurationField(default=timedelta(seconds=13))
    is_level_solved = models.BooleanField(default=False)
    hits = models.IntegerField(default=0)

    def __str__(self):
        return self.question
