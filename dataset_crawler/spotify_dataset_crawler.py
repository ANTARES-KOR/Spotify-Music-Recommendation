import pandas as pd
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os

client_id = os.getenv("SPOTIFY_CLIENT_ID") 
client_secret = os.getenv("SPOTIFY_CLIENT_SECRET") 

#Authentication - without user
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)

# 완성본

def generate_dataset_from_playlist(playlist_link) :

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
  album_name = []
  t_pop = []
  release_date = []
  track_uris = []

  #Artist Features
  a_name = []
  a_pop = []
  a_genre = []
  a_follower = []

  for track in sp.playlist_tracks(playlist_URI)["items"]:

      #URI
      track_uri = track["track"]["uri"]

      track_uris.append(track_uri)
      release_date.append(track["track"]['album']["release_date"])

      features = sp.audio_features(track_uri)[0]
      d = features["danceability"]
      e = features["energy"]
      k = features["key"]
      l = features["loudness"]
      s = features["speechiness"]
      a = features["acousticness"]
      i = features["instrumentalness"]
      li = features["liveness"]
      v = features["valence"]
      t = features["tempo"]
      d = features["duration_ms"]
      tm = features["time_signature"]
      
      dance.append(d)
      energy.append(e)
      key.append(k)
      loudness.append(l)
      speech.append(s)
      acoustic.append(a)
      instrument.append(i)
      live.append(li)
      valence.append(v)
      tempo.append(t)
      duration.append(d)
      time.append(tm)
      
      #Track name
      track_name = track["track"]["name"]
      t_name.append(track_name)
      
      #Album
      album = track["track"]["album"]["name"]
      album_name.append(album)
      
      #Popularity of the track
      track_pop = track["track"]["popularity"]
      t_pop.append(track_pop)
      
      #Main Artist
      artist_uri = track["track"]["artists"][0]["uri"]
      artist_info = sp.artist(artist_uri)
      
      
      #Name, popularity, genre, followers
      artist_name = track["track"]["artists"][0]["name"]
      a_name.append(artist_name)
      
      artist_pop = artist_info["popularity"]
      a_pop.append(artist_pop)
      
      artist_genres = artist_info["genres"]
      a_genre.append(artist_genres)
      
      artist_followers = artist_info["followers"]["total"]
      a_follower.append(artist_followers)

  spotify_df = pd.DataFrame({'artist_name' : a_name, 'track_name' : t_name, 'album_name' : album_name,
                          'artist_genre' : a_genre, 'artist_popularity' : a_pop, 'track_popularity' : t_pop,
                          'artist_followers' : a_follower, 'danceability' : dance, 'energy' : energy,
                          'key' : key, 'loudness' : loudness, 'speechiness' : speech, 'acousticness' : acoustic,
                          'instrumentalness' : instrument, 'liveness' : live, 'valence' : valence, 'tempo' : tempo,
                          'duration_ms' : duration, 'time_signature' : time, 'uri' : track_uris, 'release_date' : release_date})

  spotify_df_json =spotify_df.to_json(orient='records')
  with open("./data/output.json", "w") as text_file:
    text_file.write(spotify_df_json)

generate_dataset_from_playlist("https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF?si=1333723a6eff4b7f")