# Generated by Django 2.2.4 on 2019-10-10 06:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Badge",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("description", models.CharField(max_length=255)),
                (
                    "badge_type",
                    models.CharField(
                        choices=[
                            ("1", "level1"),
                            ("2", "level2"),
                            ("3", "level3"),
                            ("4", "solved first"),
                        ],
                        max_length=1,
                    ),
                ),
                ("icon", models.ImageField(upload_to="img/badges")),
                ("one_player_only", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="BadgeToPlayer",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("awarded_at", models.DateTimeField(default=django.utils.timezone.now)),
                (
                    "badge",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="badges.Badge"
                    ),
                ),
                (
                    "player",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="badge",
            name="player",
            field=models.ManyToManyField(
                related_name="badges",
                through="badges.BadgeToPlayer",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
