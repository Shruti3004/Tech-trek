import requests
import json

from django.shortcuts import render
from django.conf import settings
from accounts.models import Player
from payments.models import PaymentHistory, Order
from utils.payments import unique_order_id_generator
from . import Checksum

# REST FRAMEWORK IMPORTS
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# TEMPLATING IMPORTS

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
 
@login_required
def home(request):
    print(request.user.username)
    return HttpResponse("<html><a href='"+ settings.HOST_URL +"/paytm/payment'>PayNow</html>")

# Template View
def payment(request):
    print("payment")
    username = request.user.username
    player = Player.objects.get(username=username)
    print(player.username)
    
    MERCHANT_KEY = settings.PAYTM_MERCHANT_KEY
    MERCHANT_ID = settings.PAYTM_MERCHANT_ID
    CALLBACK_URL = settings.HOST_URL + settings.PAYTM_CALLBACK_URL

    order_id = unique_order_id_generator(PaymentHistory)
    Order.objects.create(order_id=order_id, player=player)
    
    cust_id = player.email
    print("OREDER ID", order_id)
    print("CUST ID", cust_id)

    amount = 30

    data_dict = {
        'MID': MERCHANT_ID,
        'ORDER_ID': order_id,
        'CUST_ID': cust_id,
        'TXN_AMOUNT': str(amount),
        'CHANNEL_ID': 'WEB',
        'WEBSITE': settings.PAYTM_WEBSITE,
        'INDUSTRY_TYPE_ID': 'Retail',
        'CALLBACK_URL': CALLBACK_URL
    }

    param_dict = data_dict
    param_dict['CHECKSUMHASH'] = Checksum.generate_checksum(data_dict, MERCHANT_KEY)
    
    return render(request, "payment.html", {'paytmdict': param_dict})

# REST View
class Payment(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        username = request.user.username
        player = Player.objects.get(username=username)
        print(player.username)
        
        MERCHANT_KEY = settings.PAYTM_MERCHANT_KEY
        MERCHANT_ID = settings.PAYTM_MERCHANT_ID
        CALLBACK_URL = settings.HOST_URL + settings.PAYTM_CALLBACK_URL

        order_id = unique_order_id_generator(PaymentHistory)
        Order.objects.create(order_id=order_id, player=player)
        
        cust_id = player.email
        print("OREDER ID", order_id)
        print("CUST ID", cust_id)

        amount = 30

        data_dict = {
            'MID': MERCHANT_ID,
            'ORDER_ID': order_id,
            'CUST_ID': cust_id,
            'TXN_AMOUNT': str(amount),
            'CHANNEL_ID': 'WEB',
            'WEBSITE': settings.PAYTM_WEBSITE,
            'INDUSTRY_TYPE_ID': 'Retail',
            'CALLBACK_URL': CALLBACK_URL
        }

        param_dict = data_dict
        param_dict['CHECKSUMHASH'] = Checksum.generate_checksum(data_dict, MERCHANT_KEY)
        
        return Response(param_dict)
        # return render(request, "payment.html", {'paytmdict': param_dict})
        # return Response({''})

@csrf_exempt
def response(request):
    if request.method == 'POST':
        MERCHANT_KEY = settings.PAYTM_MERCHANT_KEY
        data_dict = {}
        for key in request.POST:
            data_dict[key] = request.POST[key]
        print("DATA", data_dict)
        # Verify checksumhash
        verify = Checksum.verify_checksum(data_dict, MERCHANT_KEY, data_dict['CHECKSUMHASH'])
        if verify:
            oid = request.POST.get('ORDERID')
            print(oid)
            player = Order.objects.get(order_id=oid).player
            assert isinstance(player, Player)
            
            if data_dict['STATUS'] == 'TXN_SUCCESS':
                # Re-verify transaction status from paytm server.

                # initialize a dictionary
                paytmParams = dict()

                # Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
                paytmParams["MID"] = settings.PAYTM_MERCHANT_ID

                # Enter your order id which needs to be check status for
                paytmParams["ORDERID"] = oid

                # Generate checksum by parameters we have in body
                # Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
                checksum = Checksum.generate_checksum(paytmParams, MERCHANT_KEY)

                # put generated checksum value here
                paytmParams["CHECKSUMHASH"] = checksum

                # prepare JSON string for request
                post_data = json.dumps(paytmParams)

                # for Staging
                url = "https://securegw-stage.paytm.in/order/status"

                # for Production
                # url = "https://securegw.paytm.in/order/status"

                verify_res = requests.post(url, data=post_data, headers={"Content-type": "application/json"}).json()
                print("VERIFY RES", verify_res)
                if verify_res["RESPCODE"] == "01":
                    player.is_paid = True
                    player.save()
                    PaymentHistory.objects.create(player=player, **verify_res)
                    return render(request, "response.html", {'status': True, 'msg': data_dict['RESPMSG']})
                else:
                    return render(request, "response.html", {'status': False, 'msg': data_dict['RESPMSG']})                
            else:
                # return HttpResponse("Payment unsuccesful.")
                PaymentHistory.objects.create(player=player, **data_dict)
                return render(request, "response.html", {'status': False, 'msg': data_dict['RESPMSG']})
        else:
            return HttpResponse("Checksum verification failed")
    return HttpResponse(status=200)
