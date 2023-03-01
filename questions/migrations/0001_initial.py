# Generated by Django 2.2.4 on 2023-02-23 14:40

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=200)),
                ('tech_answer', models.CharField(max_length=100)),
                ('nontech_answer', models.CharField(max_length=100)),
                ('level', models.IntegerField(default=1)),
                ('wait_duration', models.DurationField(default=datetime.timedelta(seconds=13))),
                ('is_level_solved', models.BooleanField(default=False)),
                ('hits', models.IntegerField(default=0)),
            ],
        ),
    ]
