from django.shortcuts import render
from django.conf import settings
from accounts.models import Player
from secrets import KEYS
from payments.models import Order
from techtrek.settings import FEE_AMOUNT
from .razorpay_utils import payment_order, verify_payment

# REST FRAMEWORK IMPORTS
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# TEMPLATING IMPORTS

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse


# REST View
class Payment(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        username = request.user.username
        player = Player.objects.get(username=username)

        order_data, order_id = payment_order(player)
        context = {
            "key_id": KEYS["key_id"],
            "order_id": order_data["id"],
            "amount": order_data["amount"],
            "server_order_id": order_id,
        }
        return render(request, "payment.html", context)

    def post(self, request, format=None):
        if verify_payment(request.POST):
            player = Player.objects.get(username=request.user.username)
            player.is_paid = True
            player.save()
            
            order = Order.objects.get(order_id=request.POST.get("server_order_id"))
            order.amount_paid = FEE_AMOUNT
            order.amount_due = 0
            order.attempts = str(int(order.attempts) + 1)
            order.save()

            return HttpResponse("Payment Successful")
        else:
            return HttpResponse("Payment Failed")
