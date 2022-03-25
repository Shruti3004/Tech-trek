from django.contrib import admin
from .models import Badge, BadgeToPlayer

class BadgeToPlayerInline(admin.TabularInline):
    model = BadgeToPlayer
    extra = 1

class BadgeAdmin(admin.ModelAdmin):
    inlines = (BadgeToPlayerInline,)

admin.site.register(Badge, BadgeAdmin)
