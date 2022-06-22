import numpy as np
import pandas as pd
from ContentTFIDF import ContentTFIDF

path = pd.read_csv('./new.csv', encoding = 'utf-8')
ctfidf = ContentTFIDF(path)
tfidf = ctfidf.calculateTFIDF()
print(tfidf.head())