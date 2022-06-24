from tabnanny import verbose
import pandas as pd
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os
import boto3
import logging
from botocore.exceptions import ClientError
from dotenv import load_dotenv

load_dotenv(verbose=True)


aws_access_key=os.getenv("AWS_ACCESS_KEY")
aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")

client_id = os.getenv("SPOTIFY_CLIENT_ID") 
client_secret = os.getenv("SPOITFY_CLIENT_SECRET") 


#Authentication - without user
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)

PLAYLIST_LINKS = [
"https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF?si=1333723a6eff4b7f",
"https://open.spotify.com/playlist/37i9dQZEVXbNxXF4SkHj9F",
"https://open.spotify.com/playlist/37i9dQZF1DWV7EzJMK2FUI",
"https://open.spotify.com/playlist/37i9dQZF1DWW46Vfs1oltB", 
"https://open.spotify.com/playlist/37i9dQZF1DXdTb8AG95jne",
"https://open.spotify.com/playlist/37i9dQZF1DXe4qmDjDW0Ug",
"https://open.spotify.com/playlist/37i9dQZF1DWUXxc8Mc6MmJ",
"https://open.spotify.com/playlist/37i9dQZF1DX8j2fTnASZ3f",
"https://open.spotify.com/playlist/37i9dQZF1DWUtMIvjJU4QQ"
]

# 완성본

def get_dataframe_from_playlist(playlist_link) :

  playlist_URI = playlist_link.split("/")[-1].split("?")[0]

  track_uris = [x["track"]["uri"] for x in sp.playlist_tracks(playlist_URI)["items"]]

  # Audio Features
  dance = []
  energy = []
  key = []
  loudness = []
  speech = []
  acoustic = []
  instrument = []
  live = []
  valence = []
  tempo = []
  duration = []
  time = []

  #Track Features
  t_name = []
  t_pop = []
  track_uris = []
  t_ids = []

  #Album features
  album_name = []
  release_date = []
  album_image = []

  #Artist Features
  a_name = []
  a_pop = []
  a_genre = []
  a_follower = []

  for item in sp.playlist_tracks(playlist_URI)["items"]:


    track = item["track"]

    # Track Info

    t_ids.append(track["id"])
    track_uris.append(track["uri"])
    t_name.append(track["name"])
    t_pop.append(track["popularity"])

    # Album Info

    album = track["album"]
    release_date.append(album["release_date"])
    album_name.append(album["name"])
    album_image.append(album["images"][0]["url"])

    # Artist Info
    artist = track["artists"][0]
    artist_info = sp.artist(artist["uri"])

    a_name.append(artist["name"])
    a_pop.append(artist_info["popularity"])
    a_genre.append(artist_info["genres"])
    a_follower.append(artist_info["followers"]["total"])


    # Audio Features

    features = sp.audio_features(track["uri"])[0]
    dance.append(features["danceability"])
    energy.append(features["energy"])
    key.append(features["key"])
    loudness.append(features["loudness"])
    speech.append(features["speechiness"])
    acoustic.append(features["acousticness"])
    instrument.append(features["instrumentalness"])
    live.append(features["liveness"])
    valence.append(features["valence"])
    tempo.append(features["tempo"])
    duration.append(features["duration_ms"])
    time.append(features["time_signature"])
      
  spotify_df = pd.DataFrame({'artist_name' : a_name, 'track_name' : t_name, 'album_name' : album_name,
                              'artist_genre' : a_genre, 'artist_popularity' : a_pop, 'track_popularity' : t_pop,
                              'artist_followers' : a_follower, 'danceability' : dance, 'energy' : energy,
                              'key' : key, 'loudness' : loudness, 'speechiness' : speech, 'acousticness' : acoustic,
                              'instrumentalness' : instrument, 'liveness' : live, 'valence' : valence, 'tempo' : tempo,
                              'duration_ms' : duration, 'time_signature' : time, 'uri' : track_uris, 'release_date' : release_date, 'album_image' : album_image, 'id' : t_ids})
  
  return spotify_df

def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    # Upload the file
    s3_client = boto3.client('s3', 
      aws_access_key_id=aws_access_key,
      aws_secret_access_key=aws_secret_access_key,
      region_name='ap-northeast-2'
    )
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True

def save_dataframe_to_json(df, filename):
  df_json = df.to_json(orient='records')

  with open(f"./data/{filename}.json", "w") as text_file:
    text_file.write(df_json)

  upload_file(f"./data/{filename}.json", "spotify-recomendation-dataset")

def save_playlists(playlist_links):

  final_df = pd.DataFrame()

  for link in playlist_links :
    df = get_dataframe_from_playlist(link)
    final_df = pd.concat([final_df, df])
  
  final_df.drop_duplicates(subset=['uri'], inplace=True)

  save_dataframe_to_json(final_df, "dataset")
  

if __name__ == "__main__":

  save_playlists(PLAYLIST_LINKS)


  

