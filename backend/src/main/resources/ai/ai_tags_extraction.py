import sys, json
from keybert import KeyBERT

kw_model = KeyBERT()
title, content = sys.argv[1], sys.argv[2]
text = title + " " + content
keywords = kw_model.extract_keywords(text, top_n=5)
print(json.dumps([kw for kw, _ in keywords]))