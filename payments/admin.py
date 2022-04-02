from django.contrib import admin
from .models import Order


class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "player",
        "order_id",
        "amount_paid",
        "amount_due",
        "receipt",
        "status",
        "created_at",
    )


admin.site.register(Order, OrderAdmin)
