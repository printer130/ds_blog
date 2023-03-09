---
title: "stacking"
description: "asd"
pubDate: "Jul 08 2022"
heroImage: "/placeholder-hero.jpg"
url: "/ensamblers"
---

## **MÉTODOS DE ENSAMBLE**

Continuaremos con las técnicas de ensamble. En esta práctica veremos
**stacking**.

------------------------------------------------------------------------

## **`STACKING`**

El método Stacking (Stacked Generalization o Meta Ensamblado) implica
combinar las predicciones de distintos modelos de Machine Learning con
un mismo conjunto de datos, tal como Bagging y Boosting.

Stacking suele utilizar modelos diferentes -pueden no ser todos,
necesariamente, árboles de decisión- y se ajustan al mismo conjunto de
datos. Por otro lado, esta técnica usa solo un modelo para aprender cómo
ensamblar de mejor manera las predicciones de los modelos que
contribuyen.

La arquitectura de este método implica dos o más *modelos base* (nivel
0) y un *metamodelo* (nivel 1) que combina las predicciones de los
modelos base.

Este enfoque puede ser utilizado tanto en escenarios supervisados como
no supervisados y su rendimiento aumentará cuanto más diversos sean los
modelos del nivel 0.

<img src="/_astro/Stacking.hash.png" alt="text aslt" title="a title">

------------------------------------------------------------------------

## `Práctica`

Trabajaremos con el ya conocido (y querido) dataset de Iris provisto por
Scikit-learn.

``` python
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.neighbors import KNeighborsClassifier # Modelo 1
from sklearn.svm import SVC # Modelo 2
from sklearn.tree import DecisionTreeClassifier # Modelo 3

from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression # Metamodelo
```

``` python
# Importamos el dataset de Iris desde Scikit-learn

from sklearn.datasets import load_iris

#Importamos X e Y

X, y = load_iris(return_X_y=True)
X.shape
```
    (150, 4)

***`Recordemos:`***

X = features que describen la flor

y = tipo de flor (setosa, versicolor, virgínica)

Queremos generar una predicción sobre el tipo de flor que corresponde
según sus características.

``` python
# Separamos los datos

X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)
```

Se divide el dataset, usando como test el 20% de los datos. El argumento
**stratify=y** permite que se mantenga el ratio (proporción) entre las
categorías de la variable **y**. Es decir, si por ejemplo en nuestro
dataset original tenemos 50% de flores tipo setosa, 30% tipo versicolor
y 20% tipo virginica, en nuestro test tendremos la misma proporción de
cada tipo.

``` python
X_train.shape, X_test.shape
```

    ((120, 4), (30, 4))

##### **Modelo 1: K-nearest neighbors**

``` python
# Se define el clasificador
knn = KNeighborsClassifier(3)

# Se entrena el modelo
knn.fit(X_train, y_train)

# Predicciones
y_train_pred = knn.predict(X_train)
y_test_pred = knn.predict(X_test)

# Desempeño del modelo en train, calculando la precisión (accuracy)
knn_train_accuracy = accuracy_score(y_train, y_train_pred)

# Desempeño del modelo en test, calculando la precisión (accuracy)
knn_test_accuracy = accuracy_score(y_test, y_test_pred)

print('Desempeño del modelo para el Training set: ',knn_train_accuracy)
print('Desempeño del modelo para el Test set: ',knn_test_accuracy)
```

    Desempeño del modelo para el Training set:  0.9583333333333334
    Desempeño del modelo para el Test set:  1.0

##### **Modelo 2: Support vector machine**

``` python
# Se define el clasificador
svm = SVC(gamma=2, C=1)

# Se entrena el modelo
svm.fit(X_train, y_train)

# Predicciones
y_train_pred = svm.predict(X_train)
y_test_pred = svm.predict(X_test)

# Desempeño del modelo en train, calculando la precisión (accuracy)
svm_train_accuracy = accuracy_score(y_train, y_train_pred) 

# Desempeño del modelo en test, calculando la precisión (accuracy)
svm_test_accuracy = accuracy_score(y_test, y_test_pred)


print('Desempeño del modelo para el Training set: ',svm_train_accuracy)
print('Desempeño del modelo para el Test set: ',svm_test_accuracy)
```

    Desempeño del modelo para el Training set:  0.9916666666666667
    Desempeño del modelo para el Test set:  0.9666666666666667

##### **Modelo 3: Árboles de decisión**

``` python
# Se define el clasificador
dt = DecisionTreeClassifier(max_depth=5)

# Se entrena el modelo
dt.fit(X_train, y_train)

# Predicciones
y_train_pred = dt.predict(X_train)
y_test_pred = dt.predict(X_test)

# Desempeño del modelo entrenado, calculando la precisión (accuracy)
dt_train_accuracy = accuracy_score(y_train, y_train_pred)

# Desempeño del modelo testeado, calculando la precisión (accuracy)
dt_test_accuracy = accuracy_score(y_test, y_test_pred)

print('Desempeño del modelo para el Training set: ',dt_train_accuracy)
print('Desempeño del modelo para el Test set: ',dt_test_accuracy)
```

    Desempeño del modelo para el Training set:  1.0
    Desempeño del modelo para el Test set:  0.9666666666666667

##### **Metamodelo: Regresión logística**

``` python
# Se define la lista de estimadores con los 3 modelos generados
estimator_list = [
    ('knn',knn),
    ('svm_rbf',svm),
    ('dt',dt)]

# Se genera el modelo apilado (stacking)
# Se estima con los 3 modelos generados
# El estimador de la predicción final será una regresión logística (metamodelo).
stack_model = StackingClassifier(
    estimators=estimator_list, final_estimator=LogisticRegression())

# Se entrena el metamodelo
stack_model.fit(X_train, y_train)

# Predicciones
y_train_pred = stack_model.predict(X_train)
y_test_pred = stack_model.predict(X_test)

# Desempeño del metamodelo en train, calculando la precisión (accuracy)
stack_model_train_accuracy = accuracy_score(y_train, y_train_pred)

# Desempeño del metamodelo en test, calculando la precisión (accuracy)
stack_model_test_accuracy = accuracy_score(y_test, y_test_pred)

print('Desempeño del metamodelo para el Training set: ',stack_model_train_accuracy)
print('Desempeño del metamodelo para el Test set: ',stack_model_test_accuracy)
```

    Desempeño del metamodelo para el Training set:  0.9916666666666667
    Desempeño del metamodelo para el Test set:  0.9666666666666667

En resumen, lo que hicimos fue stackear o apilar 3 modelos distintos
generando predicciones, para luego utilizar como predicción final el
metamodelo que, en este caso, fue de regresión logística.

<img src="/_astro/Stacking2.hash.png" alt="text aslt" title="a title">
