from django.contrib import admin
from .models import Badge, BadgeToPlayer


class BadgeToPlayerInline(admin.TabularInline):
    model = BadgeToPlayer
    extra = 1


class BadgeAdmin(admin.ModelAdmin):
    inlines = (BadgeToPlayerInline,)
    list_display = ("badge_type", "description", "one_time_only")
    list_editable = ("description", "one_time_only")


admin.site.register(Badge, BadgeAdmin)
