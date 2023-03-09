---
title: "boosting | stacking | voting | pipeline"
description: "asd"
pubDate: "Jul 08 2022"
heroImage: "/placeholder-hero.jpg"
url: "/ensamblers"
---

## **MÉTODOS DE ENSAMBLE**

Continuaremos con las técnicas de ensamble. En esta práctica veremos
**boosting**.

------------------------------------------------------------------------

## **`BOOSTING`**

Al igual que en la técnica *bagging*, aquí la predicción final se hace
votando. La diferencia radica en cómo llegamos a cada modelo que compone
el ensamble.

*Boosting* es una técnica que trabaja entrenando modelos de manera
iterativa en base a los errores del modelo anterior.

Existe una suerte de especialización a medida que avanza el
entrenamiento. La clave está en **pesar** las instancias (darles mayor
importancia), de acuerdo a lo difícil que son de clasificar, y
recompensar a los clasificadores en función del peso de los ejemplos que
aciertan. Es decir, en ese proceso iterativo, se va aumentando el peso
de las instancias mal clasificadas previamente.

En boosting cada árbol es entrenado secuencialmente -uno después del
otro, por lo que están relacionados-, mientras que en bagging son
entrenados de manera independiente -paralela-. Ambas técnicas modifican
el set de entrenamiento, una por muestreo y la otra por asignación de
pesos.

En bagging, cada árbol suele ser profundo -están sobreajustados o tienen
mucha varianza, pero poco sesgo-. El ensamble combina modelos de mucha
varianza para disminuirla.

En boosting, cada árbol suele ser poco profundo -están subajustados o
sesgados, pero tienen poca varianza-. El ensamble combina modelos
sesgados para obtener uno no sesgado.

Boosting tiene tres hiperparámetros principales:

-   Número de árboles

-   Tasa de aprendizaje

-   Profundidad de cada árbol

Veremos la implementación de esta técnica con el algoritmo `XGBoost`.
Aquí, el problema de optimización se resuelve utilizando descenso por
gradiente. Es uno de los modelos más empleados en la materia. Tiene una
buena performance computacional. No viene incorporado con Scikit-learn.

<img src = "https://miro.medium.com/max/910/1*nZIFUJv5zwuVTh1tHaYFkg.png" height = 350>

*Diferencia entre los métodos bagging y boosting*.

------------------------------------------------------------------------

### `Práctica`

Seguiremos trabajando con el
[dataset](https://www.kaggle.com/datasets/jsphyg/weather-dataset-rattle-package)
de la Práctica_01.

``` python
import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
import seaborn as sns
sns.set()

from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import cross_validate

from sklearn.tree import DecisionTreeClassifier

import sklearn.metrics as metrics

from sklearn.model_selection import learning_curve
```

``` python
data = pd.read_csv('../Datasets/Clase_08_weatherAUS.csv')

# Dropeamos columnas con muchos faltantes
columnas_descartables = ['Sunshine','Evaporation','Cloud3pm','Cloud9am','Location','Date']
data = data.drop(columns=columnas_descartables)
data = data.dropna()

# Dropeamos las columnas categóricas para facilitar el análisis
columnas_descartables = ['WindGustDir','WindDir9am','WindDir3pm','RainToday']
data = data.drop(columns=columnas_descartables)

# Variables que dropeamos a partir del mapa de calor
data = data.drop(columns=['Temp3pm', 'Pressure9am'])

# Mapeamos la variable de salida
data['RainTomorrow'] = data['RainTomorrow'].map({'Yes':1,'No':0})
```

``` python
#import sys
#!{sys.executable} -m pip install xgboost
import xgboost as xgb
from sklearn.tree import DecisionTreeClassifier
```

``` python
# Elegimos las columnas predictoras

columnas_entrenamiento = ['MaxTemp', 'Humidity3pm']
X = data[columnas_entrenamiento]
y = data.RainTomorrow

# Separamos los datos en train y test (hold-out)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30, random_state=42, stratify = y)
```

``` python
# Instanciamos el modelo

clf_xgb = xgb.XGBClassifier(n_estimators=150,
                            seed=42, use_label_encoder= False)
                            
# Entrenamos
clf_xgb.fit(X_train, y_train)
```

``` python
# Predecimos

y_train_pred = clf_xgb.predict(X_train)
y_test_pred = clf_xgb.predict(X_test)

# Evaluamos
print('Accuracy en train:', metrics.accuracy_score(y_train, y_train_pred))
print('Accuracy en test:', metrics.accuracy_score(y_test, y_test_pred))
```

    Accuracy en train: 0.8360595595025744
    Accuracy en test: 0.8306275458999941

**Pasemos a plotear las fronteras de decisión**.

``` python
# Fronteras de decisión

N = 20 

plt.figure(figsize = (14,8))

ax = sns.scatterplot(x=X_test[::N].MaxTemp, y=X_test[::N].Humidity3pm, hue=y_test[::N], palette='Set2')
xlim = ax.get_xlim()
ylim = ax.get_ylim()
xx, yy = np.meshgrid(np.linspace(*xlim, num=200),
                      np.linspace(*ylim, num=200))
Z = clf_xgb.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)
contours = ax.contourf(xx, yy, Z, alpha=0.3, cmap = 'Set2')

plt.title('Fronteras de decisión', fontsize = 15)

plt.show()
```

<img src="/boost.png" title="a title" alt="Alt text">

------------------------------------------------------------------------