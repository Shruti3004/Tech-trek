FROM python:3.9.5-slim

ENV PYTHONUNBUFFERED=1

RUN apt -y update && apt -y install apt-utils && apt -y upgrade

RUN apt -y install python3 python3-pip && apt -y install uuid-runtime

WORKDIR /techtrek

COPY requirements.txt .

RUN pip install pillow && pip install pycrypto && pip install -r requirements.txt

COPY . .

RUN ["chmod", "+x", "/techtrek/container-run.sh"]

ENTRYPOINT [ "/techtrek/container-run.sh" ]
