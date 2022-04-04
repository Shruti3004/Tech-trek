from django.contrib import admin
from .models import Badge, BadgeToPlayer


class BadgeAdmin(admin.ModelAdmin):
    list_display = ("badge_type", "description", "one_time_only")
    list_editable = ("description", "one_time_only")


class BadgeToPlayerAdmin(admin.ModelAdmin):
    list_display = ("player", "badge", "awarded_at")


admin.site.register(Badge, BadgeAdmin)
admin.site.register(BadgeToPlayer, BadgeToPlayerAdmin)
