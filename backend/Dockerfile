FROM Python:3.11.4

ENV PYTHONBUFFERED=1

WORKDIR /code

COPY requierements.txt .

RUN pip install -r requierements.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py","runserver"]