# Generated by Django 2.2.4 on 2019-10-12 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("payments", "0003_auto_20191012_1821"),
    ]

    operations = [
        migrations.AddField(
            model_name="paymenthistory",
            name="MID",
            field=models.CharField(default="abc", max_length=40),
            preserve_default=False,
        ),
    ]
