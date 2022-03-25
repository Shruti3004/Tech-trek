from django.contrib import admin
from .models import Question

class QuestionAdmin(admin.ModelAdmin):
    list_filter = ('level',)
    

admin.site.register(Question)