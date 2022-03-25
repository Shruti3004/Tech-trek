from django.contrib import admin
from .models import PaymentHistory, Order

admin.site.register(PaymentHistory)
admin.site.register(Order)