import os
import re
import logging
import argparse
import numpy as np
import pandas as pd
import boto3
import boto3.s3
from botocore.exceptions import ClientError
from dotenv import load_dotenv
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler

load_dotenv(verbose=True)

aws_access_key=os.getenv("AWS_ACCESS_KEY")
aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")



s3_client = boto3.client('s3', 
    aws_access_key_id=aws_access_key,
    aws_secret_access_key=aws_secret_access_key,
    region_name='ap-northeast-2'
)


def upload_file_to_s3(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True

def download_file_from_s3(file_name, bucket, object_name=None):

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    try:
        s3_client.download_file(bucket, object_name, file_name)

    except ClientError as e:
        print(e)
        logging.error(e)
        return False
    return True


class UnsupervisedRecommenderSystem:
    
    def __init__(self, data, playlist):
        self.data = data
        self.playlist = playlist
        self.data_scaled = pd.DataFrame()
        self.playlist_scaled = pd.DataFrame()
    
    def scale_dataset(self):
        temp_data = self.data[['danceability', 'energy', 'acousticness', 'valence', 'tempo']].values
        temp_playlist = self.playlist[['danceability', 'energy','acousticness', 'valence', 'tempo']].values 
        min_max_scaler = MinMaxScaler()
        temp_data_scaled = min_max_scaler.fit_transform(temp_data)
        temp_playlist_scaled = min_max_scaler.fit_transform(temp_playlist)
        columns_scaled = ['danceability_scaled', 'energy_scaled', 'acousticness_scaled','valence_scaled', 'tempo_scaled']
        self.data_scaled = pd.DataFrame(temp_data_scaled, columns=columns_scaled)
        self.playlist_scaled = pd.DataFrame(temp_playlist_scaled, columns=columns_scaled)

    def cluster_song(self, k = 6):
        model = KMeans(n_clusters = k, max_iter = 300, init = 'k-means++', random_state = 42).fit(self.data_scaled.values)
        data_pred = model.predict(self.data_scaled.values)
        self.data_scaled['cluster'] = data_pred
        self.data_scaled = pd.concat([self.data[['artist_name','track_name']], self.data_scaled], axis=1)
        playlist_pred = model.predict(self.playlist_scaled.values)
        self.playlist_scaled['cluster'] = playlist_pred
        self.playlist_scaled = pd.concat([self.playlist[['artist_name','track_name']], self.playlist_scaled], axis=1)

    def recommend_song(self, song_num = 20):
        cluster_pct = self.playlist_scaled['cluster'].value_counts(normalize=True)*song_num
        if int(cluster_pct.round(0).sum()) < song_num:
            cluster_pct[cluster_pct < 0.5] = cluster_pct[cluster_pct < 0.5] + 1.0
        playlist = pd.DataFrame()
        for n_cluster, pct in cluster_pct.items():
            songs = self.data_scaled[self.data_scaled['cluster'] == n_cluster].sample(n=int(round(pct, 0)))
            playlist = pd.concat([playlist, songs])
            if len(playlist) > song_num:
                flag = song_num - len(playlist)
                playlist = playlist[:flag]
        return playlist[['artist_name', 'track_name', 'album_image']]


if __name__ == "__main__":

    urs = UnsupervisedRecommenderSystem(data, playlist)
    urs.scale_dataset()
    urs.cluster_song()
    urs.recommend_song()