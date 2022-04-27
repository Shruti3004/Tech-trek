from django.contrib import admin
from .models import Player
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm


class PlayerChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = Player


class PlayerUserAdmin(UserAdmin):
    form = PlayerChangeForm
    # list_filter = ("is_paid",)
    list_display = (
        "username",
        "email",
        # "is_paid",
        "current_question",
        "score",
        "admission_no",
        "contact_no",
    )
    fieldsets = UserAdmin.fieldsets + (
        (
            None,
            {
                "fields": (
                    # "is_paid",
                    "current_question",
                    "last_solved",
                    "unlock_time",
                    # "avatar_no",
                    "technical_solved",
                    "score",
                )
            },
        ),
    )


admin.site.register(Player, PlayerUserAdmin)
