FROM python

WORKDIR /app

COPY ./contenBasedRecommenderSystem.py .
COPY ./app.py .
COPY .env .

RUN pip install flask
RUN pip install boto3
RUN pip install flask-cors
RUN pip install numpy
RUN pip install pandas
RUN pip install sklearn
RUN pip install python-dotenv

RUN mkdir -p /app/data/track/
RUN mkdir -p /app/data/tfidf/

EXPOSE 5000

ENTRYPOINT [ "python", "app.py" ] 