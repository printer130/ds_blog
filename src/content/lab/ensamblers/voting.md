---
title: "Voting"
description: "Lorem ipsum dolor sit amet"
pubDate: "Jul 22 2022"
heroImage: "/placeholder-hero.jpg"
---

## **MÉTODOS DE ENSAMBLE**

Continuaremos con la última de las técnicas de ensamble. En esta
práctica veremos **voting**.

------------------------------------------------------------------------

## **VOTING**

Con esta técnica, podemos entrenar varios modelos con los mismos datos.
Cuando tengamos datos nuevos, obtendremos una predicción de cada modelo.
Cada modelo tendrá asociado un voto. De esta forma, propondremos como
predicción final lo que voten la mayoría de los modelos.

Hay otra forma de combinar las votaciones. Cuando los modelos dan una
probabilidad, podemos usar el «voto suave» (soft-voting). En el voto
suave, se le da más importancia a los resultados en los que algún modelo
esté muy seguro. Es decir, cuando la predicción está muy cercana a la
probabilidad 0 o 1, se le da más peso a la predicción de ese modelo.

Cuando usamos modelos diferentes, los errores se compensan y la
predicción combinada generaliza mejor. Por eso, no tiene sentido hacer
un ensamble de votación por mayoría con el mismo tipo de modelo. Por
ejemplo, si entrenamos 3 árboles de decisión con los mismos datos y
combinamos sus resultados con votación por mayoría, vamos a obtener los
mismos resultados que si usáramos un solo árbol. En ese caso, para poder
combinar muchos árboles de decisión deberíamos usar **bagging**.

<img src="https://www.iartificial.net/wp-content/uploads/2019/05/ensemble-votacion.jpg" height=250 alt="Ensemble votation">

## `Práctica`

Trabajaremos con el siguiente
[dataset](https://www.kaggle.com/datasets/itsmesunil/bank-loan-modelling).

``` python
import numpy as np
import pandas as pd

import seaborn as sns
import matplotlib
import matplotlib.pyplot as plt
#import sys
#!{sys.executable} -m pip install openpyxl
```

``` python
# Cargamos los datos

bank_data = pd.read_excel('../Datasets/Clase_08_Bank_Personal_Loan_Modelling.xlsx', sheet_name='Data')
```

``` python
bank_data
```

<p>5000 rows × 14 columns</p>

### Procedemos a hacer un breve EDA

``` python
# Descartamos columnas

bank_data = bank_data.drop(['ID', 'Experience', 'ZIP Code', 'CCAvg', 'Personal Loan'], axis=1)
```

``` python
bank_data.describe()
```

``` python
# Ploteamos un gráfico de dispersión

fig, ax = plt.subplots(figsize=(14, 8))

plt.scatter( bank_data['Income'], bank_data['Age'])

plt.xlabel('Income')
plt.ylabel('Age')
```

    Text(0, 0.5, 'Age')


``` python
# Detectamos outliers

fig, ax = plt.subplots(figsize=(14, 6))

sns.boxplot(x = bank_data['CreditCard'], y = bank_data['Income'])

plt.title('Boxplot')

plt.show()
```

``` python
fig, ax = plt.subplots(figsize=(14, 6))

sns.boxplot(x = bank_data['CreditCard'], y = bank_data['Mortgage'])

plt.title('Boxplot')

plt.show()
```

``` python
plt.figure(figsize=(14, 6))

sns.countplot(x='Family', data = bank_data, hue = 'CreditCard')

plt.show()
```

``` python
plt.figure(figsize=(12, 8))

sns.countplot(x='Education', data = bank_data, hue='CreditCard')

plt.show()
```

``` python
# Correlacionamos

pd.crosstab(bank_data['Securities Account'], bank_data['CreditCard'])
```

``` python
bank_data_corr = bank_data.corr()

bank_data_corr
```

``` python
# Hacemos un mapa de calor para ver la relación entre las variables de una manera más amena

plt.figure(figsize=(10, 8))

sns.heatmap(bank_data_corr, annot=True)
```

    <Axes: >

### **Machine learning**

``` python
# Definimos atributos y variable a predecir

X = bank_data.drop('CreditCard', axis=1)

Y = bank_data['CreditCard']
```

``` python
# Separamos los datos

from sklearn.model_selection import train_test_split

x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.2)
```

``` python
from sklearn.ensemble import VotingClassifier

from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB

from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report, confusion_matrix
```

``` python
# Instanciamos 3 modelos

log_clf = LogisticRegression(C=1, solver='liblinear')

svc_clf = SVC(C=1, kernel='linear', gamma='auto')

naive_clf = GaussianNB()
```

``` python
# Los entrenamos, predecimos y evaluamos
import time

comienzo = time.time()
for clf in (log_clf, svc_clf, naive_clf):
    
    clf.fit(x_train, y_train)
    y_pred = clf.predict(x_test)
    
    print(clf.__class__.__name__, accuracy_score(y_test, y_pred))
    
fin = time.time() - comienzo

print(f'Tardó {round(fin)} segundos')
```

    LogisticRegression 0.746
    SVC 0.746
    GaussianNB 0.746
    Tardó 6 segundos

**Hard voting**

``` python
voting_clf_hard = VotingClassifier(estimators=[('lr', log_clf), 
                                               ('svc', svc_clf), 
                                               ('naive', naive_clf)],
                                   voting='hard')
```

``` python
# Obtenemos los estimadores

voting_clf_hard.estimators
```

    [('lr', LogisticRegression(C=1, solver='liblinear')),
     ('svc', SVC(C=1, gamma='auto', kernel='linear')),
     ('naive', GaussianNB())]

``` python
# Entrenamos

voting_clf_hard.fit(x_train, y_train)
```

``` python
# Predecimos

y_pred = voting_clf_hard.predict(x_test)
```
``` python
# Evaluamos

print('Accuracy en test:', accuracy_score(y_test, y_pred))
```

    Accuracy en test: 0.746

``` python
print(classification_report(y_test, y_pred))
```

                  precision    recall  f1-score   support

               0       0.75      0.98      0.85       718
               1       0.73      0.16      0.26       282

        accuracy                           0.75      1000
       macro avg       0.74      0.57      0.55      1000
    weighted avg       0.74      0.75      0.68      1000

``` python
print(confusion_matrix(y_test, y_pred))
```

    [[701  17]
    [237  45]]

``` python
# Visualizamos cuál de los tres modelos obtuvo el mejor 'voto'

for clf_hard in (log_clf, svc_clf, naive_clf, voting_clf_hard):
    
    clf_hard.fit(x_train, y_train)
    y_pred = clf_hard.predict(x_test)
    
    print(clf_hard.__class__.__name__, accuracy_score(y_test, y_pred))
```

    LogisticRegression 0.746
    SVC 0.746
    GaussianNB 0.746
    VotingClassifier 0.746

**Soft voting**

``` python
# Debemos fijar probability en True para poder hacer posteriormente la predicción
svc_clf = SVC(C=1, kernel='linear', gamma='auto', probability=True)
```

``` python
voting_clf_soft = VotingClassifier(estimators=[('lr', log_clf), 
                                               ('svc', svc_clf), 
                                               ('naive', naive_clf)],
                                   voting='soft')
```

``` python
# Entrenamos

comienzo = time.time()

voting_clf_soft.fit(x_train, y_train)

fin = time.time() - comienzo

print(f'Tardó {round(fin)} segundos')
```

    Tardó 9 segundos

``` python
# Predecimos

y_pred = voting_clf_soft.predict(x_test)
```

``` python
# Evaluamos

print('Accuracy en test:', accuracy_score(y_test, y_pred))
```

    Accuracy en test: 0.746

``` python
# Visualizamos cuál de los tres modelos obtuvo el mejor 'voto'

comienzo = time.time()

for clf_hard in (log_clf, svc_clf, naive_clf, voting_clf_hard):
    
    clf_hard.fit(x_train, y_train)
    y_pred = clf_hard.predict(x_test)
    
    print(clf_hard.__class__.__name__, accuracy_score(y_test, y_pred))

fin = time.time() - comienzo

print(f'Tardó {round(fin)} segundos')
```

    LogisticRegression 0.746
    SVC 0.746
    GaussianNB 0.746
    VotingClassifier 0.746
    Tardó 15 segundos