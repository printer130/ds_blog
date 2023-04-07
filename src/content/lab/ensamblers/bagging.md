---
title: "Bagging"
description: "En esta clase abordaremos modelos con un grado de complejidad mayor a
los que veníamos trabajando. Hasta ahora, entrenamos y evaluamos cada
modelo individualmente. Pero podríamos combinarlos, para así obtener un
modelo aún mejor. Eso hace el método de ensamble."
pubDate: "Jul 22 2022"
heroImage: "/placeholder-hero.jpg"
---

---


La idea es entrenar muchos modelos y hacerlos votar. La clasificación
resultante es la que reciba más votos. Y si los modelos devuelven
*scores*, se puede hacer una votación ponderada.

Sin embargo, si todos los modelos son muy parecidos no van a agregar
mucha información nueva. Necesitamos modelos diferentes entre sí.

La práctica más habitual es aplicar este método sobre árboles de
decisión, ya que es un modelo sencillo, rápido de entrenar y eficiente.

Disponemos de cuatro técnicas para generar modelos de ensamble:

-   Bagging

-   Boosting

-   Stacking

-   Voting

En esta primera práctica hablaremos de **bagging**.

------------------------------------------------------------------------

### **BAGGING**

También denominada *bootstrap aggregation*.

<img src = "https://www.iartificial.net/wp-content/uploads/2019/05/bagging.webp" height = 250 alt="bagging">

Consiste en tomar grupos de muestras al azar de nuestro set de
entrenamiento, **con reemplazo**. Dicho en otros términos, es un
muestreo con reemplazo de las instancias.

Dado un conjunto de datos, se extraen varias muestras. Por cada muestra
obtenida, entrenamos un modelo. Vamos a tener tantos modelos como
muestras hayamos sacado, pero todos entrenados sobre una porción
distinta del dataset. En general, tendrán mucha varianza (overfitting).

La predicción de salida final se combina en las proyecciones de todos
los submodelos (proceso conocido como votación).

Lo que buscamos es un conjunto de árboles con mucha varianza pero poco
sesgo, para que al combinarlos -al momento de votar- obtengamos un
modelo de baja varianza y bajo sesgo.

Veamos cómo se aplica el boosting, en árboles de decisión, para crear
bosques.

------------------------------------------------------------------------

### ***RANDOM FOREST***


<img title="a title" alt="Alt text" src="https://www.freecodecamp.org/news/content/images/2020/08/how-random-forest-classifier-work.PNG">

Consiste en correr varios árboles de manera paralela y que cada uno vaya
votando qué variable de salida le corresponde a cada instancia.

Cuando creamos bosques, puede ocurrir que tengamos pocos predictores
fuertes. Si pocos atributos -features- son atributos fuertes, todos los
árboles se van a parecer entre sí. Estos atributos terminarán cerca de
la raíz para todos los conjuntos generados con bootstrap. Por más de que
los árboles verán distintos subconjuntos de las instancias, se
parecerán.

La solución es parecida a la técnica de bootstrap, pero en lugar de
hacerlo únicamente en las instancias, también lo hacemos sobre los
atributos. Ahora cada árbol verá distintas instancias y distintos
features.

Uno de los hiperparámetros a definir es la cantidad de atributos a
considerar en cada nodo.

Este modelo provee buenos estimadores de error (obb_score) e importancia
de las variables.

------------------------------------------------------------------------

### `Práctica`

Vamos a trabajar con el siguiente
[dataset](https://www.kaggle.com/datasets/jsphyg/weather-dataset-rattle-package).

### ***Análisis exploratorio y preprocesamiento de datos***

``` python
### Importamos todas las librerías necesarias

import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
import seaborn as sns
sns.set()

from sklearn.preprocessing import StandardScaler

from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import cross_validate

from sklearn.tree import DecisionTreeClassifier

import sklearn.metrics as metrics
from sklearn.model_selection import learning_curve
```

``` python
# Cargamos el dataset

data = pd.read_csv("..\Datasets\Clase_08_weatherAUS.csv")
```

``` python
data.head()
```

``` python
# Valores no nulos

data.count().sort_values()
```

    Sunshine          75625
    Evaporation       82670
    Cloud3pm          86102
    Cloud9am          89572
    Pressure9am      130395
    Pressure3pm      130432
    WindDir9am       134894
    WindGustDir      135134
    WindGustSpeed    135197
    Humidity3pm      140953
    WindDir3pm       141232
    Temp3pm          141851
    RainTomorrow     142193
    RainToday        142199
    Rainfall         142199
    WindSpeed3pm     142398
    Humidity9am      142806
    Temp9am          143693
    WindSpeed9am     143693
    MinTemp          143975
    MaxTemp          144199
    Location         145460
    Date             145460
    dtype: int64

``` python
# Descartamos columnas que aportan poca información
columnas_descartables = ['Sunshine','Evaporation','Cloud3pm','Cloud9am','Location','Date']
data = data.drop(columns=columnas_descartables)
data.shape
```
    (145460, 17)

``` python
# Dropeamos valores faltantes

data = data.dropna()
print(data.shape)
data.head()
```
  (112925, 17)

``` python
# Observamos cuántos casos hay de lluvia y cuántos no

sns.countplot(x = 'RainTomorrow', data = data)
plt.show()
```

``` python
# Hacemos un pairplot para ver la correlación entre las variables
sns.pairplot(data.sample(frac = 0.1), hue = 'RainTomorrow')
plt.show()
```

``` python
# Hacemos un mapa de calor
corr = data.drop(columns = ['RainTomorrow']).corr(method='pearson')
plt.figure(figsize=(14,10))
sns.heatmap(corr, cbar = True,  square = True, annot=True, fmt= '.2f',annot_kws={'size': 15},
           xticklabels= data.drop(columns = ['RainTomorrow']).columns, 
           yticklabels= data.drop(columns = ['RainTomorrow']).columns,
           cmap= 'coolwarm')

plt.show()
```

``` python
# En base a la información obtenida, podríamos descartar algunas columnas redundantes

data = data.drop(columns=['Temp3pm', 'Pressure9am'])
```

``` python
# Convertimos la variable de salida en numérica

data['RainTomorrow'] = data['RainTomorrow'].map({'Yes':1,'No':0})
data.head()
```

### ***Datos de entrenamiento y casos benchmark***

Generaremos un modelo benchmark contra el cual comparar nuestros
resultados.

``` python
# Elegimos variables de entrenamiento (empezamos con dos) y separamos las etiquetas

columnas_entrenamiento = ['MaxTemp', 'Humidity3pm']
X = data[columnas_entrenamiento]
# X = data.drop(columns = 'RainTomorrow')
y = data.RainTomorrow
```

``` python
# Generamos un modelo que diga siempre que NO va a llover y medimos su exactitud

y_pred = np.zeros(y.shape)
accuracy_ceros = metrics.accuracy_score(y,y_pred)
print(accuracy_ceros)
```
    0.7784458711534205

``` python
# Generamos otro modelo que diga siempre que SÍ va a llover y medimos su exactitud

y_pred = np.ones(y.shape)
accuracy_unos = metrics.accuracy_score(y,y_pred)
print(accuracy_unos)
```

    0.2215541288465796

``` python
# Separamos nuestros datos

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30, random_state=42, stratify = y)
```
**Vamos a entrenar distintos árboles y mostrarles distintas porciones
del dataset**

``` python
lista_de_modelos = []
N_modelos = 10
```

``` python
for i in range(N_modelos):
    X_train_boostrap, _, y_train_boostrap, _ = train_test_split(X_train, y_train, test_size=0.5, stratify = y_train)
    clf = DecisionTreeClassifier(max_depth = None) # Lo dejamos sobreajustar
    clf.fit(X_train_boostrap, y_train_boostrap)
    lista_de_modelos.append(clf)
```
:::

``` python
# Evaluamos cada modelo en hold-out

for idx, modelo in enumerate(lista_de_modelos):
    y_test_pred = modelo.predict(X_test)
    print('Accuracy Modelo ', idx, ' es ', metrics.accuracy_score(y_test, y_test_pred))
```

    Accuracy Modelo  0  es  0.7925202196115473
    Accuracy Modelo  1  es  0.7893913454159042
    Accuracy Modelo  2  es  0.7908672294704528
    Accuracy Modelo  3  es  0.7920774543951827
    Accuracy Modelo  4  es  0.7874136607828089
    Accuracy Modelo  5  es  0.789450380778086
    Accuracy Modelo  6  es  0.7901588051242694
    Accuracy Modelo  7  es  0.7935828561308224
    Accuracy Modelo  8  es  0.7920774543951827
    Accuracy Modelo  9  es  0.791782277584273

**Evaluemos, ahora, el accuracy de todo el ensamble usando el conjunto
de hold-out. Lo haremos con el promedio de las probabilidades que
devuelve cada árbol. Si la probabilidad promedio es mayor a 0.5,
clasificamos como positivo**.

``` python
probs_test_pred = np.zeros(y_test.size)
```

``` python
# Recorremos la lista y predecimos las probabilidades

for modelo in lista_de_modelos:
    probs_test_pred_modelo = modelo.predict_proba(X_test)
    #print(probs_test_pred_modelo.shape)
    probs_test_pred +=probs_test_pred_modelo[:,1]
```

``` python
probs_test_pred = probs_test_pred/N_modelos
```

``` python
y_test_pred = probs_test_pred>0.5
y_test_pred = y_test_pred.astype(int)
```

``` python
print('Accuracy del ensamble: ', metrics.accuracy_score(y_test, y_test_pred))
```

    Accuracy del ensamble:  0.8022315366904776

### `Usemos Bagging Classifier`

Podrán acceder a la documentación haciendo click
[aquí](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.BaggingClassifier.html).


``` python
from sklearn.ensemble import BaggingClassifier
```

``` python
clf = BaggingClassifier(base_estimator=DecisionTreeClassifier(), bootstrap_features=False, n_estimators= 100, n_jobs = -1)
clf.fit(X_train, y_train)
y_train_pred = clf.predict(X_train)
y_test_pred = clf.predict(X_test)
print(metrics.accuracy_score(y_train, y_train_pred))
print(metrics.accuracy_score(y_test, y_test_pred))
```
    0.8631700127772085
    0.8033532085719346

``` python
N = 20 # Con esto evitamos plotear todos los puntos y saturar el gráfico

plt.figure(figsize = (16,9))

ax = sns.scatterplot(x = X_test[::N].MaxTemp, y = X_test[::N].Humidity3pm, hue=y_test[::N], palette='Set2')
xlim = ax.get_xlim()
ylim = ax.get_ylim()
xx, yy = np.meshgrid(np.linspace(*xlim, num=200),
                      np.linspace(*ylim, num=200))
Z = clf.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)
contours = ax.contourf(xx, yy, Z, alpha=0.3, cmap = 'Set2')

plt.show()
```

### ***Random Forest*** {#random-forest}
:::

Random Forest aplica bagging y, además, selecciona features al azar.

Podrán acceder a la documentación haciendo click
[aquí](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html?highlight=random+forest).


``` python
from sklearn.ensemble import RandomForestClassifier
```

``` python
# Instanciamos el modelo

clf = RandomForestClassifier(n_estimators=100, max_features='sqrt', n_jobs=-1, oob_score = True, random_state = 42)
clf.fit(X_train,y_train)
```


``` python
# Evaluamos

y_train_pred = clf.predict(X_train)
y_test_pred = clf.predict(X_test)
print(metrics.accuracy_score(y_train, y_train_pred))
print(metrics.accuracy_score(y_test, y_test_pred))
```

    0.8631447113742458
    0.8035303146584805

``` python
clf.oob_score_
```

    0.8037243665161233

``` python
clf.feature_importances_
```

    array([0.42866631, 0.57133369])

``` python
# Diagrama de barras de la importancia de los atributos

importances = clf.feature_importances_
columns = X_train.columns
indices = np.argsort(importances)[::-1]

plt.figure(figsize = (10,7))
sns.barplot(x = columns[indices], y = importances[indices])
plt.show()
```

``` python
clf.estimators_
```

``` python
# Elegimos, aleatoriamente, uno de los árboles del bosque

clf_tree = clf.estimators_[50]
clf_tree.get_params()
```
    {'ccp_alpha': 0.0,
     'class_weight': None,
     'criterion': 'gini',
     'max_depth': None,
     'max_features': 'sqrt',
     'max_leaf_nodes': None,
     'min_impurity_decrease': 0.0,
     'min_samples_leaf': 1,
     'min_samples_split': 2,
     'min_weight_fraction_leaf': 0.0,
     'random_state': 1224821422,
     'splitter': 'best'}

``` python
# Predecimos y evaluamos en train y test

y_train_pred = clf_tree.predict(X_train)
y_test_pred = clf_tree.predict(X_test)
print(metrics.accuracy_score(y_train, y_train_pred))
print(metrics.accuracy_score(y_test, y_test_pred))
```

    0.8411324907966147
    0.7881811204911742

``` python
train_accuracy = []
test_accuracy = []
oob_scores = []

N_estimadores = [1,2,3,4,5,10,25,50,100,250,500,1000]
for estimadores in N_estimadores:
    print(estimadores)
    clf = RandomForestClassifier(n_estimators=estimadores, n_jobs=-1, oob_score= True, random_state = 42)
    clf.fit(X_train,y_train)
    
    y_train_pred = clf.predict(X_train)
    y_test_pred = clf.predict(X_test)
    
    train_accuracy.append(metrics.accuracy_score(y_train, y_train_pred))
    test_accuracy.append(metrics.accuracy_score(y_test, y_test_pred))
    oob_scores.append(clf.oob_score_)
    
train_accuracy = np.array(train_accuracy)
test_accuracy = np.array(test_accuracy)
oob_scores = np.array(oob_scores)
```

    2
    3
    4
    5
    10
    25
    50
    100
    250
    500
    1000

``` python
plt.figure(figsize = (14,8))
plt.plot(N_estimadores, train_accuracy, label = 'Train')
plt.plot(N_estimadores, test_accuracy, label = 'Test')
plt.plot(N_estimadores, oob_scores, label = 'OOB')
plt.xlabel('Numero de estimadores')
plt.ylabel('Accuracy')
plt.legend()
plt.title('Curvas de validación/complejidad', fontsize = 15)
# plt.xlim(0,50)
plt.show()
```

### Probemos un modelo Random Forest con 250 árboles

``` python
# Tengan paciencia que esto lleva su tiempo :)
import time

comienzo = time.time()
clf = RandomForestClassifier(n_estimators=250, n_jobs=-1, oob_score= True, random_state = 42)

train_sizes, train_scores, valid_scores = learning_curve(clf, X_train, y_train, 
                                                         train_sizes = np.linspace(0.0001,1,10),
                                                         scoring = 'accuracy', cv=5)
fin = time.time() - comienzo

print(f'Tardó {round(fin)} segundos')
```

    Tardó 356 segundos

A continuación, utilizaremos la llamada curva de aprendizaje. Esta es
una herramienta que nos muestra el *trade-off* entre varianza y sesgo de
nuestro modelo. Mientras el score del random forest este más cerca de
uno, el modelo ajusta mejor la función que esta representando. Muestra
el score de la cross-validation y el del entrenamiento de un estimador
variando la cantidad de muestras de set de entrenamiento.

``` python
# Graficamos la curva de aprendizaje

plt.figure(figsize = (14,8))
plt.plot(train_sizes, train_scores.mean(axis = 1), color = 'r')
plt.plot(train_sizes, valid_scores.mean(axis = 1), color = 'g')

plt.fill_between(train_sizes, train_scores.mean(axis = 1)- train_scores.std(axis = 1),
                     train_scores.mean(axis = 1)+ train_scores.std(axis = 1), alpha=0.25,
                     color="r")
plt.fill_between(train_sizes, valid_scores.mean(axis = 1) - valid_scores.std(axis = 1),
                     valid_scores.mean(axis = 1) + valid_scores.std(axis = 1), alpha=0.25, color="g")

plt.ylim(0.5,1.1)
plt.legend(['Training Score','Cross-validation'])
plt.xlabel('Training examples')
plt.ylabel('Score')
plt.show()
```
------------------------------------------------------------------------