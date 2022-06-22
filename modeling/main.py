from ContentBasedRecommenderSystem import ContentBasedRecommenderSystem
from ContentTFIDF import ContentTFIDF

def runModel(data, music, mood, speed, emotion, new=True):
    # 신규 사용자일 경우
    if new == True:
        ctfidf = ContentTFIDF(data)
        tfidf = ctfidf.calculateTFIDF()
        cbr = ContentBasedRecommenderSystem.CBRNewUser(data, tfidf, music, mood, speed, emotion)
        total_score_df = cbr.get_total_score()
        result = total_score_df.to_json(orient = 'records')
        return result

