from sklearn.feature_extraction.text import TfidfVectorizer
import os
import re
import pandas as pd
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords

class ContentTFIDF:
    
    def __init__(self, data):
        self.data = data
     
 
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


    def calculateTFIDF(self):
        tfidf = TfidfVectorizer(analyzer='word', ngram_range=(1,2) ,stop_words=stopwords.words('english'))
        tfidf_content = tfidf.fit_transform(self.data['genre'])
        tfidf_dict = tfidf.get_feature_names()

        return tfidf_dict, tfidf_content

    def saveTFIDF(self, path = "./data/tfidf"):
        tfidf_dict, tfidf_content = self.calculateTFIDF()
        tfidf_array = tfidf_content.toarray()
        tfidf_matrix = pd.DataFrame(tfidf_array, columns = tfidf_dict)
        tfidf_file = 'tfidf_matrix.csv'
        if path == None:
            tfidf_path = tfidf_file
        else:
            tfidf_path = os.path.join(path, tfidf_file)
        tfidf_matrix.to_csv(tfidf_path, encoding = 'utf-8', index = False)

if __name__ == "__main__":
    data = pd.read_csv('.data/track/track_data.csv', encoding = 'utf-8')
    ctfidf = ContentTFIDF(data)
    ctfidf.preprocess()
    ctfidf.saveTFIDF()