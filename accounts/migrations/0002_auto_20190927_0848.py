# Generated by Django 2.2.4 on 2019-09-27 08:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="player",
            old_name="payment_done",
            new_name="is_paid",
        ),
    ]
