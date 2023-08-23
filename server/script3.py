import nltk
from nltk import PorterStemmer
from nltk.corpus import stopwords
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
nltk.download('punkt')
nltk.download('stopwords')
import sys
import json



import language_tool_python

A = sys.argv[1]
C = sys.argv[2]
D = sys.argv[3]
B = sys.argv[4]


X=A.lower()
P=C.lower()
Q=D.lower()
Y=B.lower()


X_list = word_tokenize(X)
P_list = word_tokenize(P)
Q_list = word_tokenize(Q)
Y_list = word_tokenize(Y)

sw = stopwords.words('english')
l1 =[];l2 =[];l3=[];l4=[];l5=[];l6=[]

X_set = {w for w in X_list if not w in sw}
Y_set = {w for w in Y_list if not w in sw}
P_set = {w for w in P_list if not w in sw}
Q_set = {w for w in Q_list if not w in sw}

rvector = X_set.union(Y_set)
for w in rvector:
    if w in X_set: l1.append(1)
    else: l1.append(0)
    if w in Y_set: l2.append(1)
    else: l2.append(0)
c = 0

for i in range(len(rvector)):
        c+= l1[i]*l2[i]
cosine = c / float((sum(l1)*sum(l2))**0.5)



cosine

rvector1 = P_set.union(Y_set)
for w in rvector1:
    if w in P_set: l3.append(1)
    else: l3.append(0)
    if w in Y_set: l4.append(1)
    else: l4.append(0)
e = 0

for n in range(len(rvector1)):
        e+= l3[n]*l4[n]
cosine1 = e / float((sum(l3)*sum(l4))**0.5)
cosine1


rvector2 = Q_set.union(Y_set)
for w in rvector2:
    if w in Q_set: l5.append(1)
    else: l5.append(0)
    if w in Y_set: l6.append(1)
    else: l6.append(0)
f = 0

for n in range(len(rvector2)):
        f+= l5[n]*l6[n]
cosine2 = f / float((sum(l5)*sum(l6))**0.5)
cosine2

J= max(cosine,cosine1,cosine2)
J

my_tool = language_tool_python.LanguageTool('en-US')
my_text1 = B

my_matches1 = my_tool.check(my_text1)

from nltk.jsontags import JSONTaggedEncoder
D= str(my_matches1)
D = D.lower()
D = D.split()


def spelling_count(D):
    count = 0
    for e in D:
        if e == "spelling":
            count = count + 1
    return count

G=str(spelling_count(D))


def grammatical_count(D):
    count = 0
    for e in D:
        if e == "grammatical" or "verb":
            count = count + 1
    return count
H=str(grammatical_count(D))

F=len(my_matches1)
G=int(G)
H=int(H)
I=F-(G+H)
J= max(cosine,cosine1,cosine2)

K={'similarityIndex':J , 'totalErrors':len(my_matches1), 'spellingErrors': G ,'grammaticalErrors' : H , 'punctuationErrors': I}
print(json.dumps(K))






