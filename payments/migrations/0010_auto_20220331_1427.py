# Generated by Django 2.2.4 on 2022-03-31 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0009_auto_20220326_2352'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_id',
            field=models.CharField(max_length=32, unique=True),
        ),
    ]
