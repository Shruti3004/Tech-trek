from django.contrib import admin
from .models import Question


class QuestionAdmin(admin.ModelAdmin):
    list_filter = ("level",)
    list_display = ("question", "level", "is_level_solved", "wait_duration")


admin.site.register(Question, QuestionAdmin)
