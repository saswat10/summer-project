import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import sys
import json

import language_tool_python

nltk.tokenize.punkt

A = sys.argv[1]
B = sys.argv[2]

X = A.lower()
Y = B.lower()

X_list = word_tokenize(X)
Y_list = word_tokenize(Y)

sw = stopwords.words('english')
l1 = []
l2 = []

X_set = {w for w in X_list if not w in sw}
Y_set = {w for w in Y_list if not w in sw}

rvector = X_set.union(Y_set)
for w in rvector:
    if w in X_set:
        l1.append(1)
    else:
        l1.append(0)
    if w in Y_set:
        l2.append(1)
    else:
        l2.append(0)
c = 0

for i in range(len(rvector)):
    c += l1[i]*l2[i]
cosine = c / float((sum(l1)*sum(l2))**0.5)


my_tool = language_tool_python.LanguageTool('en-US')
my_text1 = B

my_matches1 = my_tool.check(my_text1)


D = str(my_matches1)
D = D.lower()
D = D.split()


def spelling_count(D):
    count = 0
    for e in D:
        if e == "spelling":
            count = count + 1
    return count


G = str(spelling_count(D))


def grammatical_count(D):
    count = 0
    for e in D:
        if e == "grammatical":
            count = count + 1
    return count


H = str(grammatical_count(D))

F = len(my_matches1)
G = int(G)
H = int(H)
I = F-(G+H)

K = {'similarityIndex': cosine, 'totalErrors': len(
    my_matches1), 'spellingErrors': G, 'grammaticalErrors': H, 'punctuationErrors': I}
print(json.dumps(K))
sys.stdout.flush()
