FROM python

WORKDIR /app

RUN pip3 install pandas
RUN pip3 install spotipy

COPY . .

CMD ["python3", "spotify_dataset_crawler.py"]