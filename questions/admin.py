from django.contrib import admin
from .models import Question


class QuestionAdmin(admin.ModelAdmin):
    list_filter = ("level",)
    list_display = ("question","upload","level", "hits", "is_level_solved")
    # list_editable = ("level", "wait_duration")


admin.site.register(Question, QuestionAdmin)
