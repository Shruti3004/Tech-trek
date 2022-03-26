import os
import hmac
import hashlib
import razorpay
from .models import Order
from utils.payments import unique_order_id_generator
from techtrek.settings import FEE_AMOUNT


client = razorpay.Client(auth=(os.environ.get("key_id"), os.environ.get("key_secret")))
client.set_app_details({"title": "Tech Trek", "version": "2.1.0"})


def hmac_sha256(data: str, key: str):
    return hmac.new(key.encode(), data.encode(), hashlib.sha256).hexdigest()


def payment_order(player):
    receipt_id = unique_order_id_generator(Order)
    data = {"amount": FEE_AMOUNT * 100, "currency": "INR", "receipt": receipt_id}
    payment = client.order.create(data=data)
    print(payment)
    Order.objects.create(
        player=player,
        order_id=receipt_id,
        entity=payment["entity"],
        amount=str(payment["amount"]),
        amount_paid=str(payment["amount_paid"]),
        amount_due=str(payment["amount_due"]),
        currency=payment["currency"],
        receipt=payment["receipt"],
        offer_id=payment["offer_id"],
        status=payment["status"],
        attempts=str(payment["attempts"]),
    )
    return payment, receipt_id


def verify_payment(callback):
    razorpay_order_id = callback.get("razorpay_order_id")
    razorpay_payment_id = callback.get("razorpay_payment_id")
    callback_signature = callback.get("razorpay_signature")
    print("callback signature: ", callback_signature)

    generated_signature = hmac_sha256(
        razorpay_order_id + "|" + razorpay_payment_id, os.environ.get("key_secret")
    )
    print("generated signature: ", generated_signature)

    if generated_signature == callback_signature:
        payment_params = {
            "razorpay_order_id": razorpay_order_id,
            "razorpay_payment_id": razorpay_payment_id,
            "razorpay_signature": callback_signature,
        }
        client.utility.verify_payment_signature(payment_params)
        return True
    else:
        return False
