import os
from flask import Flask, Response, request
import contentBasedRecommenderSystem as cbrs
from contentBasedRecommenderSystem import ContentBasedRecommenderSystem
import pandas as pd
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET']) 
def hello_word() :
    return 'Hello World!'

@app.route('/model/cbr', methods=['post'])
def cbr():
    music = request.json['music']
    mood = request.json['mood']
    speed = request.json['speed']
    emotion = request.json['emotion']
    
    cbrs.download_file_from_s3("./data/track/track_dataset.json", "spotify-recomendation-dataset", "dataset.json")
    track = pd.read_json("./data/track/track_dataset.json", encoding = 'utf-8', orient='records')
    cbrs.download_file_from_s3("./data/tfidf/tfidf_matrix.csv", "spotify-tfidf", "tfidf_matrix.csv")
    ct_tfidf = pd.read_csv("./data/tfidf/tfidf_matrix.csv", encoding = 'utf-8')

    cbr = ContentBasedRecommenderSystem(track, ct_tfidf, music, mood, speed, emotion)
    cbr.preprocess()
    cbr.get_feature_genre_intersection()
    result = cbr.get_total_score()

    return Response(result.to_json(orient="records"), mimetype='application/json')


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)