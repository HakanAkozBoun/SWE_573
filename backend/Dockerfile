FROM python:3.11.4
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /usr/src/app
COPY requirements.txt .
RUN pip install --upgrade pip 
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8000