FROM python:3.8-slim

WORKDIR /app

COPY . .

RUN pip3 install -r requirements.txt

RUN mkdir -p /app/data/track/
RUN mkdir -p /app/data/tfidf/

CMD [ "python3", "app.py" ] 