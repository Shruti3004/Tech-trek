# Generated by Django 2.2.4 on 2019-10-14 01:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("payments", "0006_auto_20191014_0620"),
    ]

    operations = [
        migrations.AlterField(
            model_name="paymenthistory",
            name="BANKTXNID",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name="paymenthistory",
            name="TXNAMOUNT",
            field=models.CharField(max_length=10),
        ),
    ]
