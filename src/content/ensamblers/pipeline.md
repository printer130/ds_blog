---
title: "pipeline"
description: "En esta última práctica, veremos cómo realizar la puesta en producción
de un modelo de Machine Learning."
pubDate: "Jul 08 2022"
heroImage: "/placeholder-hero.jpg"
url: "/ensamblers"
---

## **PIPELINE**

El pipeline es una forma de codificar y automatizar el workflow
necesario para producir un modelo de Machine Learning. Los pipelines en
ML constan de varios pasos secuenciales que hacen de todo, desde la
extracción y el preprocesamiento de datos hasta el entrenamiento y la
implementación de modelos.

En definitiva, nos ayuda a automatizar un flujo de trabajo de Machine
Learning.

<img src = "/assets/pipeline_2.jpg" height = 350 alt="Pipeline (production)">

Uno de sus grandes beneficios y aplicabilidad reside en la
escalabilidad. A su vez, destaca entre sus ventajas que simplifica la
aplicación de cross-validation y optimización de hiperparámetros.

Con este enfoque, podemos *empaquetar* todas las acciones que van desde
el preprocesamiento de los datos hasta las predicciones del modelo en un
único objeto.

La librería `Scikit-learn` incluye una clase, denominada precisamente
**pipeline**, que está diseñada para poder manipular y aplicar una serie
de transformaciones de datos seguida de la aplicación de un modelo de
ML. En otras palabras, con esta clase podemos instanciar un objeto que
incluya todo el flujo del preprocesamiento de datos -desde la limpieza,
normalización, escalado, transformación, reducción de dimensionalidad
hasta ingeniería de features- y el modelo predictivo con el cual haremos
las inferencias.

También Scikit-learn nos brinda la posibilidad de hacer nuestro pipeline
con la clase **make_pipeline**. Veamos brevemente en qué se diferencia
una de la otra.

  -----------------------------------------------------------------------
  Pipeline                            Make_pipeline
  ----------------------------------- -----------------------------------
  Hay que especificar todos los pasos No hay que indicar un nombre para
  secuenciales en una lista           cada paso

  Cada paso es una tupla con el       Se pueden encadenar todos los pasos
  nombre del paso y su nombre oficial usando sus nombres oficiales en
  en Scikit-learn                     Scikit-learn

  Ejemplo: `a`                        Ejemplo: `b`
  -----------------------------------------------------------------------

``` python

'a' Pipeline([('imputer', SimpleImputer(strategy='median')),('scaler', StandardScaler())])
```

``` python

'b' make_pipeline(SimpleImputer(strategy='median'), StandardScaler())
```

------------------------------------------------------------------------

## `Práctica`

Para la realización de esta práctica construiremos tres pipelines, cada
uno con un modelo diferente.

Primero haremos algunos pasos del preprocesamiento de datos, luego
adaptaremos nuestros modelos. Para finalizar, compararemos la
performance de los modelos y buscaremos identificar el mejor de ellos.
Una vez obtenido, lo guardamos en un archivo.

``` python
# Cargamos los datos con los que vamos a estar trabajando
from sklearn.datasets import load_iris
iris = load_iris()
```

``` python
# Separamos los datos en train y test
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.2, random_state=42)
```

A continuación, crearemos los tres pipelines. Los modelos que usaremos
serán: regresión logística, support vector machine y árbol de decisión.
Respecto al preprocesamiento, aplicaremos un escalado de datos con
`Standard Scaler` y haremos reducción de dimensionalidad con `PCA`.

``` python
# Importamos las librerías necesarias

from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn import svm
from sklearn import tree
```

``` python
# Creamos el primer pipeline

pipe_lr = Pipeline([('scl', StandardScaler()),
			('pca', PCA(n_components=2)),
			('clf', LogisticRegression(random_state=42))])
```

``` python
# Creamos el segundo pipeline

pipe_svm = Pipeline([('scl', StandardScaler()),
			('pca', PCA(n_components=2)),
			('clf', svm.SVC(random_state=42))])
			
```

``` python
# Creamos el tercer pipeline

pipe_dt = Pipeline([('scl', StandardScaler()),
			('pca', PCA(n_components=2)),
			('clf', tree.DecisionTreeClassifier(random_state=42))])
```

``` python
# Los guardamos en una lista

pipelines = [pipe_lr, pipe_svm, pipe_dt]
```

``` python
# Hacemos un diccionario para fines organizativos

pipe_dict = {0: 'Regresión Logística', 1: 'SVM', 2: 'Árbol de decisión'}
```

``` python
# Entrenamos

for pipe in pipelines:
	pipe.fit(X_train, y_train)
```

``` python
# Evaluamos

for idx, val in enumerate(pipelines):
	print('%s pipeline accuracy en test: %.3f' % (pipe_dict[idx], val.score(X_test, y_test)))
```

    Regresión Logística pipeline accuracy en test: 0.900
    SVM pipeline accuracy en test: 0.900
    Árbol de decisión pipeline accuracy en test: 0.867

``` python
# Identificamos el mejor modelo para el set de testeo

best_acc = 0.0
best_clf = 0
best_pipe = ''
for idx, val in enumerate(pipelines):
	if val.score(X_test, y_test) > best_acc:
		best_acc = val.score(X_test, y_test)
		best_pipe = val
		best_clf = idx
print('Modelo con el mejor accuracy: %s' % pipe_dict[best_clf])
```

    Modelo con el mejor accuracy: Regresión Logística

``` python
# Guardamos el pipeline en un archivo

import joblib #pickle es alternativa

joblib.dump(best_pipe, 'Mejor_pipeline.pkl', compress=1)
print('Pipeline de %s guardado a archivo' % pipe_dict[best_clf])
```

    Pipeline de Regresión Logística guardado a archivo

``` python
best_model = joblib.load('Mejor_pipeline.pkl')

X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.2, random_state=100)
```

------------------------------------------------------------------------
``` python
best_model.fit(X_train,y_train)
```

StandardScaler
StandardScaler()

PCA
PCA(n_components=2)

LogisticRegression
LogisticRegression(random_state=42)

``` python
best_model.score(X_test, y_test)
```
    0.9333333333333333