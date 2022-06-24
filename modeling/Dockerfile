FROM python:3.8-slim

WORKDIR /app

COPY ./requirement.txt ./
COPY ./contentBasedRecommenderSystem.py .
COPY ./app.py .
COPY .env .


RUN pip3 install -r requirement.txt

RUN mkdir -p /app/data/track/
RUN mkdir -p /app/data/tfidf/

EXPOSE 5000

ENTRYPOINT [ "python3", "app.py" ] 