# Generated by Django 2.2.4 on 2023-04-11 05:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_player_tezos_wallet_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='tezos_wallet_id',
            field=models.CharField(blank=True, default=None, max_length=255, null=True),
        ),
    ]
