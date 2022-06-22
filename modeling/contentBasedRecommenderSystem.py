import re
import numpy as np
import pandas as pd
import argparse
import mlflow
import mlflow.pyfunc
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity


class ContentBasedRecommenderSystem(mlflow.pyfunc.PythonModel):
    
    def __init__(self, data, tfidf, music, mood, speed, emotion):
        self.data = data
        self.tfidf = tfidf
        self.music = music
        self.mood = mood
        self.speed = speed
        self.emotion = emotion
        self.result = pd.DataFrame()

    def cleanText(self, text_data):
        text = re.sub('[-=+#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》]','', text_data)
        return text

    def preprocess(self):
        genre = []
        for i in self.data['artist_genre']:
            if i == '[]':
                i = 'NA'
                genre.append(i.strip()) #"'[]'"
            else:
                i = self.cleanText(i)
                genre.append(i.strip())
        self.data['genre'] = genre
        self.data = self.data[self.data['genre'] != "NA"]
        self.data = self.data.reset_index()
        self.data['track_popularity'] = self.data['track_popularity'] / 100 

    def euclidean_distance(self, x, y):   
        return np.sqrt(np.sum((x - y) ** 2))
    
    def recommend_features(self, top=200):
        scaler = MinMaxScaler()
        index = self.data[self.data['track_name'] == self.music].index.values
        track_new = self.data[['danceability', 'energy', 'valence', 'tempo', 'acousticness']]
        track_scaled = scaler.fit_transform(track_new)
        target_index = track_scaled[index]

        euclidean = []
        for value in track_scaled:
            eu = self.euclidean_distance(target_index, value)
            euclidean.append(eu)

        self.data['euclidean_distance'] = euclidean
        result_features = self.data.sort_values(by='euclidean_distance', ascending=True)[:top]

        return result_features[['id','artist_name', 'track_name', 'euclidean_distance']]

    
    def recommend_genre(self, top=200):
        # 코사인 유사도
        ts_genre = cosine_similarity(self.tfidf, self.tfidf)

        #특정 장르 정보 뽑아오기
        target_genre_index = self.data[self.data['track_name'] == self.music].index.values

        # 입력한 영화의 유사도 데이터 프레임 추가
        self.data["cos_similarity"] = ts_genre[target_genre_index, :].reshape(-1,1)
        sim_genre = self.data.sort_values(by="cos_similarity", ascending=False)
        final_index = sim_genre.index.values[ : top]
        result_genre = self.data.iloc[final_index]

        return result_genre[['id','artist_name', 'track_name', 'cos_similarity']]

    
    def get_feature_genre_intersection(self):
        recommended_feature = self.recommend_features()
        recommended_genre = self.recommend_genre()
        intersection = pd.merge(recommended_feature, recommended_genre, how='inner')
        similarity = intersection[['euclidean_distance', 'cos_similarity']]
        scaler = MinMaxScaler()
        scale = scaler.fit_transform(similarity)
        scale = pd.DataFrame(scale, columns=['eu_scaled', 'cos_scaled'])
        
        intersection['euclidean_scaled'] = scale['eu_scaled']
        intersection['cosine_scaled'] = scale['cos_scaled']
        intersection['ratio'] = intersection['euclidean_scaled'] + (1 - intersection['cosine_scaled'])
        result_intersection = intersection.sort_values('ratio', ascending=True)
        self.result = pd.merge(self.data, result_intersection, how='inner').sort_values(by='ratio')
        
        return self.result

    
    def get_genre_score(self):
        cosine_sim_score = cosine_similarity(self.tfidf, self.tfidf)
        target_genre_index = self.result[self.result['track_name'] == self.music].index.values
        genre_score = cosine_sim_score[target_genre_index, :].reshape(-1, 1)
        return genre_score

    
    def get_mood_score(self):
        temp = pd.DataFrame(self.result['valence'])
        if self.mood == 1:
            temp['mood_score'] = temp['valence']
        else:
            temp['mood_score'] = temp['valence'].apply(lambda x: 1-x)
        return temp['mood_score']
    
    
    def get_speed_score(self):
        temp = pd.DataFrame(self.result['tempo'])
        temp['tempo_scaled'] = MinMaxScaler().fit_transform(pd.DataFrame(temp['tempo']))
        if self.speed == 1:
            temp['speed_score'] = temp['tempo_scaled']
        else:
            temp['speed_score'] = temp['tempo_scaled'].apply(lambda x: 1-x)
        return temp['speed_score']

    
    def get_emotion_score(self):
        temp = self.result[['danceability', 'energy', 'acousticness']]
        temp['danceability_scaled'] = MinMaxScaler().fit_transform((pd.DataFrame(temp['danceability'])))
        temp['acousticness_reverse'] = temp['acousticness'].apply(lambda x: 1-x)
        if self.emotion == 1:
            temp['emotion_score'] = temp.apply(lambda x: 1/3 * (x['danceability_scaled'] + x['energy'] + x['acousticness_reverse']), axis = 1)
        elif self.emotion == 2:
            temp['emotion_score'] = temp.apply(lambda x: 2/3 * (abs(x['danceability_scaled']-0.5) + abs(x['energy']-0.5) + abs(x['acousticness_reverse']-0.5)), axis = 1)
        else:
            temp['emotion_score'] = temp.apply(lambda x: 1/3 * ((1-x['danceability_scaled']) + (1-x['energy']) + (1-x['acousticness_reverse'])), axis = 1)
        return temp['emotion_score']

    def get_total_score(self, top_n = 20):
        result_df = self.result[['artist_name', 'track_name', 'album_name']]
        result_df['mood_score'] = pd.DataFrame(self.get_mood_score())
        result_df['speed_score'] = pd.DataFrame(self.get_speed_score())
        result_df['emotion_score'] = pd.DataFrame(self.get_emotion_score())
        result_df['genre_score'] = pd.DataFrame(self.get_genre_score())
        result_df['total_score'] = result_df.apply(lambda x: 1/6*(x['mood_score'] + x['speed_score'] + x['emotion_score']) + 0.5*x['genre_score'], axis = 1)
        
        return result_df.iloc[1:].sort_values(by = 'total_score', ascending=False)[:top_n]

if __name__ == "__main__":
    argument_parser = argparse.ArgumentParser()
    argument_parser.add_argument(
        '--data_path', type=str, default="./data/track/track_data.csv"
    )
    argument_parser.add_argument(
        '--tfidf_path', type=str, default="./data/track/track_data.csv"
    )
    argument_parser.add_argument(
        '--music', type=str, default="Electric Shock"
    )
    argument_parser.add_argument(
        '--mood', type=int, default=1
    )
    argument_parser.add_argument(
        '--speed', type=int, default=1
    )
    argument_parser.add_argument(
        '--emotion', type=int, default=1
    )
    args = argument_parser.parse_args()
    reg_model_name = "ContentBasedRecommenderSystem"
    mlflow.set_tracking_uri("sqlite:///mlruns.db")

    track = pd.read_csv(args.data_path, encoding = 'utf-8')
    ct_tfidf = pd.read_csv('./data/tfidf/tfidf_matrix.csv', encoding = 'utf-8')
    
    # Save Model
    with mlflow.start_run(run_name="Save PyFunc") as run:
        cbr = ContentBasedRecommenderSystem(track, ct_tfidf, args.music, args.mood, args.speed, args.emotion)
        cbr.preprocess()
        cbr.get_feature_genre_intersection()
        model_path = f"cbr_model-{run.info.run_uuid}"
        mlflow.pyfunc.save_model(path=model_path, python_model=cbr)

    loaded_model = mlflow.pyfunc.load_model(model_path)

    # log and register the model using MLflow API
    with mlflow.start_run():
        mlflow.pyfunc.log_model(artifact_path=model_path, python_model=cbr, registered_model_name=reg_model_name)

    # load back from the model registry and do the inference
    model_uri = "models:/{}/1".format(reg_model_name)
    loaded_model = mlflow.pyfunc.load_model(model_uri)
