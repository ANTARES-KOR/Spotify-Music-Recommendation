from flask import Flask, Response, jsonify, make_response, render_template, request
import contentBasedRecommenderSystem as cbrs
from contentBasedRecommenderSystem import ContentBasedRecommenderSystem
import unsupervisedRecommenderSystem as urs
from unsupervisedRecommenderSystem import UnsupervisedRecommenderSystem
import os
import pandas as pd
import boto3
from dotenv import load_dotenv

load_dotenv(verbose=True)

aws_access_key=os.getenv("S3_ACCESS_KEY")
aws_secret_access_key=os.getenv("S3_ACCESS_KEY")

s3_client = boto3.client('s3', 
    aws_access_key_id=aws_access_key,
    aws_secret_access_key=aws_secret_access_key,
    region_name='ap-northeast-2'
)

app = Flask(__name__)

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

@app.route('/model/ur', methods=['post'])
def ur():
    playlist = request.json
    playlist = pd.json_normalize(playlist)


    urs.download_file_from_s3("./data/track/track_dataset.json", "spotify-recomendation-dataset", "dataset.json")
    track = pd.read_json("./data/track/track_dataset.json", encoding = 'utf-8', orient='records') 

    ur = UnsupervisedRecommenderSystem(track, playlist)
    ur.scale_dataset()
    ur.cluster_song()
    result = ur.recommend_song()

    return Response(result.to_json(orient="records"), mimetype='application/json')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)

