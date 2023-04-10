#!/bin/bash

source secretkeys.sh \
&& python3 manage.py makemigrations \
&& python3 manage.py migrate \
&& python3 manage.py collectstatic --noinput \
&& /usr/local/bin/gunicorn techtrek.wsgi:application -b :8000