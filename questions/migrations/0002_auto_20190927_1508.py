# Generated by Django 2.2.4 on 2019-09-27 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("questions", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="question",
            name="level",
            field=models.IntegerField(default=1),
        ),
    ]
