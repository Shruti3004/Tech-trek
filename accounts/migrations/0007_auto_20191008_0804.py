# Generated by Django 2.2.4 on 2019-10-08 08:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_auto_20191007_0521'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='avatar',
            field=models.ImageField(default='1.png', upload_to=''),
        ),
    ]
