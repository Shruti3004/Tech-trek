# Generated by Django 2.2.4 on 2019-10-12 18:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("payments", "0002_order"),
    ]

    operations = [
        migrations.RenameField(
            model_name="paymenthistory",
            old_name="ORDER_ID",
            new_name="ORDERID",
        ),
    ]
