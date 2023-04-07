---
title: "Validación cruzada. Dev/hold-out. Optimización de hiperparámetros."
description: "En esta primera práctica de la clase nos enfocaremos en los tres temas
enunciados en el título."
pubDate: "Jul 08 2022"
heroImage: "/placeholder-hero.jpg"
url: "/ensamblers"
---

---

## `1. Validación cruzada`

A la hora de evaluar nuestro modelo, ¿cómo podemos garantizar que su
desempeño es independiente de la separación de los datos que hayamos
realizado?

La validación cruzada es una técnica utilizada para evaluar los
resultados de un análisis estadístico y garantizar que esos resultados
sean independientes de la partición entre datos de entrenamiento y datos
de testeo. Con esta técnica, a su vez, resulta más fácil detectar el
overfitting.

Una de las formas más conocidas de emplear esta técnica es a través de
**k-folds**. K refiere al número de grupos en los cuales se va a dividir
la muestra de datos, convirtiéndose uno de ellos en set de prueba y los
restantes grupos en set de entrenamiento. Luego, se itera.

El performance del modelo será el promedio de las K evaluaciones.
También es importante considerar la desviación estándar.

<img src = "https://upload.wikimedia.org/wikipedia/commons/f/f2/K-fold_cross_validation.jpg" alt="Validacion cruzada">

Por el momento, veníamos utilizando una metodología que se asemejaría a
la iteración 1 del gráfico supra. Del total de datos, dividíamos una
parte en datos de prueba y otra en datos de entrenamiento. Pero esto se
mantenía fijo ya que no iterábamos.

Supongamos que tenemos un dataset con ciertos atributos $X$ y una
variable de salida $y$. Cada instancia puede tener como valor de salida
un 0 o un 1 -es decir, estamos frente a un problema de clasificación
binaria-. Si hacemos un único train-test split, podría pasar que los
subsets de entrenamiento y testeo sean muy heterogéneos entre sí pero
muy homogéneos en su interior, fruto del azar de esa división. Para
evitar esto, recurrimos a ***cross-validation***.

<img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Esquema_castell%C3%A0.jpg" height=400 alt="Validacion cruzada">

Pasemos, ahora sí, a ver la implementación de esta técnica.

``` python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()
```

``` python
# Trabajaremos con un dataset provisto por scikit-learn de diagnóstico de cáncer.

from sklearn.datasets import load_breast_cancer
data = load_breast_cancer()
```

``` python
# Lo convertimos a DataFrame

df = pd.DataFrame(np.c_[data['data'], data['target']],
                  columns= np.append(data['feature_names'], ['target']))
```

``` python
df.head()
```
<div class="max-w-[760px] overflow-auto">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>mean radius</th>
      <th>mean texture</th>
      <th>mean perimeter</th>
      <th>mean area</th>
      <th>mean smoothness</th>
      <th>mean compactness</th>
      <th>mean concavity</th>
      <th>mean concave points</th>
      <th>mean symmetry</th>
      <th>mean fractal dimension</th>
      <th>...</th>
      <th>worst texture</th>
      <th>worst perimeter</th>
      <th>worst area</th>
      <th>worst smoothness</th>
      <th>worst compactness</th>
      <th>worst concavity</th>
      <th>worst concave points</th>
      <th>worst symmetry</th>
      <th>worst fractal dimension</th>
      <th>target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>17.99</td>
      <td>10.38</td>
      <td>122.80</td>
      <td>1001.0</td>
      <td>0.11840</td>
      <td>0.27760</td>
      <td>0.3001</td>
      <td>0.14710</td>
      <td>0.2419</td>
      <td>0.07871</td>
      <td>...</td>
      <td>17.33</td>
      <td>184.60</td>
      <td>2019.0</td>
      <td>0.1622</td>
      <td>0.6656</td>
      <td>0.7119</td>
      <td>0.2654</td>
      <td>0.4601</td>
      <td>0.11890</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>20.57</td>
      <td>17.77</td>
      <td>132.90</td>
      <td>1326.0</td>
      <td>0.08474</td>
      <td>0.07864</td>
      <td>0.0869</td>
      <td>0.07017</td>
      <td>0.1812</td>
      <td>0.05667</td>
      <td>...</td>
      <td>23.41</td>
      <td>158.80</td>
      <td>1956.0</td>
      <td>0.1238</td>
      <td>0.1866</td>
      <td>0.2416</td>
      <td>0.1860</td>
      <td>0.2750</td>
      <td>0.08902</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>19.69</td>
      <td>21.25</td>
      <td>130.00</td>
      <td>1203.0</td>
      <td>0.10960</td>
      <td>0.15990</td>
      <td>0.1974</td>
      <td>0.12790</td>
      <td>0.2069</td>
      <td>0.05999</td>
      <td>...</td>
      <td>25.53</td>
      <td>152.50</td>
      <td>1709.0</td>
      <td>0.1444</td>
      <td>0.4245</td>
      <td>0.4504</td>
      <td>0.2430</td>
      <td>0.3613</td>
      <td>0.08758</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>11.42</td>
      <td>20.38</td>
      <td>77.58</td>
      <td>386.1</td>
      <td>0.14250</td>
      <td>0.28390</td>
      <td>0.2414</td>
      <td>0.10520</td>
      <td>0.2597</td>
      <td>0.09744</td>
      <td>...</td>
      <td>26.50</td>
      <td>98.87</td>
      <td>567.7</td>
      <td>0.2098</td>
      <td>0.8663</td>
      <td>0.6869</td>
      <td>0.2575</td>
      <td>0.6638</td>
      <td>0.17300</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>20.29</td>
      <td>14.34</td>
      <td>135.10</td>
      <td>1297.0</td>
      <td>0.10030</td>
      <td>0.13280</td>
      <td>0.1980</td>
      <td>0.10430</td>
      <td>0.1809</td>
      <td>0.05883</td>
      <td>...</td>
      <td>16.67</td>
      <td>152.20</td>
      <td>1575.0</td>
      <td>0.1374</td>
      <td>0.2050</td>
      <td>0.4000</td>
      <td>0.1625</td>
      <td>0.2364</td>
      <td>0.07678</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 31 columns</p>
</div>


``` python
plt.figure(figsize=(10,5))
sns.countplot(x = 'target' ,label= 'Count', data = df)
plt.title('Diagrama de barras de la variable de salida', fontsize = 15)
plt.show()
```

<img src="/m5/1/abd56082736efc02324e69d15d74503241770d13.png" alt="validacion cruzada" >


``` python
# Nos quedamos solamente con los primeros 10 atributos para simplificar el proceso

features_mean = list(df.columns[0:10])
features_mean
```

    ['mean radius',
     'mean texture',
     'mean perimeter',
     'mean area',
     'mean smoothness',
     'mean compactness',
     'mean concavity',
     'mean concave points',
     'mean symmetry',
     'mean fractal dimension']

``` python
# Agregamos la variable de salida

df = df[features_mean + ['target']]
df.head()
```
<div class="max-w-[760px] overflow-auto">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>mean radius</th>
      <th>mean texture</th>
      <th>mean perimeter</th>
      <th>mean area</th>
      <th>mean smoothness</th>
      <th>mean compactness</th>
      <th>mean concavity</th>
      <th>mean concave points</th>
      <th>mean symmetry</th>
      <th>mean fractal dimension</th>
      <th>target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>17.99</td>
      <td>10.38</td>
      <td>122.80</td>
      <td>1001.0</td>
      <td>0.11840</td>
      <td>0.27760</td>
      <td>0.3001</td>
      <td>0.14710</td>
      <td>0.2419</td>
      <td>0.07871</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>20.57</td>
      <td>17.77</td>
      <td>132.90</td>
      <td>1326.0</td>
      <td>0.08474</td>
      <td>0.07864</td>
      <td>0.0869</td>
      <td>0.07017</td>
      <td>0.1812</td>
      <td>0.05667</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>19.69</td>
      <td>21.25</td>
      <td>130.00</td>
      <td>1203.0</td>
      <td>0.10960</td>
      <td>0.15990</td>
      <td>0.1974</td>
      <td>0.12790</td>
      <td>0.2069</td>
      <td>0.05999</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>11.42</td>
      <td>20.38</td>
      <td>77.58</td>
      <td>386.1</td>
      <td>0.14250</td>
      <td>0.28390</td>
      <td>0.2414</td>
      <td>0.10520</td>
      <td>0.2597</td>
      <td>0.09744</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>20.29</td>
      <td>14.34</td>
      <td>135.10</td>
      <td>1297.0</td>
      <td>0.10030</td>
      <td>0.13280</td>
      <td>0.1980</td>
      <td>0.10430</td>
      <td>0.1809</td>
      <td>0.05883</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>

``` python
# Hacemos un pairplot

sns.pairplot(df, hue = 'target')
plt.show()
```

<img src="/m5/1/32bd13b03af0c5205fdaedee2573000507bb26d8.png" alt="validacion cruzada" >

``` python
# Realizamos el mapa de calor para ver la correlación entre las variables

corr = df.corr()
plt.figure(figsize=(10,10))
sns.heatmap(corr, cbar = True,  square = True, annot=True, fmt= '.2f',annot_kws={'size': 15},
           xticklabels= df.columns, 
           yticklabels= df.columns,
           cmap= 'coolwarm')
plt.show()
```

<img src="/m5/1/b7f177235154ab5043fe8ab4bdb7053cea330066.png" alt="validacion cruzada" >

### Entrenamiento de los modelos

Vamos a entrenar un árbol profundidad infinita y un modelo K-NN con un
vecino. Los vamos a entrenar y evaluar haciendo un `train_test_split`,
dejando un 10% de los datos para testeo.

``` python
# Seleccionamos las variables predictoras X y la variable a predecir y

X = df[['mean radius','mean smoothness', 'mean concave points']]
y = df['target']
```

``` python
# Realizamos un escalado de los datos. Esto se debe a que K-NN trabaja con distancias y no puede discernir la diferencia de escala y unidades entre cada una de las variables.

from sklearn.preprocessing import StandardScaler
scl = StandardScaler()
X = scl.fit_transform(X)
```

``` python
y.sum()/y.count()
```

    0.6274165202108963

``` python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.10, random_state=60, stratify=y)
```

``` python
print('Proporción de etiquetas en set de entrenamiento:', y_train.sum()/y_train.count())
print('Proporción de etiquetas en set de testeo:', y_test.sum()/y_test.count())
```

    Proporción de etiquetas en set de entrenamiento: 0.626953125
    Proporción de etiquetas en set de testeo: 0.631578947368421

``` python
# Chequeamos la distribución de los subsets

for i in range(X_train.shape[1]):
    sns.distplot(x = X_train[:,i])
    sns.distplot(x = X_test[:,i])
    titulo = 'Atributo', i
    plt.title(titulo)
    plt.show()
```

<img src="/m5/1/9536939db42f37ad56a1aa261e9c8dda4b01bb17.png" alt="validacion cruzada" >

<img src="/m5/1/67fad8ac009151ce3aaaa7a39607dfa84e43405d.png" alt="validacion cruzada" >


<img src="/m5/1/29c9aedd39fe50f68706c9e005ede04c2b19be15.png" alt="validacion cruzada" >

*Probar qué sucede si no especificamos el argumento **stratify** en
train_test_split*.

``` python
print('Proporción de etiquetas positiva en los datos de Train: ', y_train.sum()/y_train.size)
print('Proporción de etiquetas positiva en los datos de Test: ', y_test.sum()/y_test.size)
```

    Proporción de etiquetas positiva en los datos de Train:  0.626953125
    Proporción de etiquetas positiva en los datos de Test:  0.631578947368421

``` python
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.neighbors import KNeighborsClassifier
```

``` python
# Instanciamos el árbol

tree = DecisionTreeClassifier(max_depth = None)
tree.fit(X_train, y_train)
```

    DecisionTreeClassifier()

``` python
# Predecimos sobre nuestro set de entrenamiento

y_train_pred = tree.predict(X_train)

# Predecimos sobre nuestro set de test

y_test_pred = tree.predict(X_test)

# Comparamos con las etiquetas reales

print('Accuracy sobre conjunto de Train:', accuracy_score(y_train_pred,y_train))
print('Accuracy sobre conjunto de Test:', accuracy_score(y_test_pred,y_test))
```

    Accuracy sobre conjunto de Train: 1.0
    Accuracy sobre conjunto de Test: 0.8771929824561403

``` python
# Instanciamos un modelo de vecinos más cercanos

knn = KNeighborsClassifier(n_neighbors=1)
knn.fit(X_train, y_train)
```

    KNeighborsClassifier(n_neighbors=1)

``` python
# Predecimos sobre nuestro set de entrenamiento

y_train_pred = knn.predict(X_train)

# Predecimos sobre nuestro set de test

y_test_pred = knn.predict(X_test)

# Comparamos con las etiquetas reales
print('Accuracy sobre conjunto de Train:', accuracy_score(y_train_pred,y_train))
print('Accuracy sobre conjunto de Test:', accuracy_score(y_test_pred,y_test))
```

    Accuracy sobre conjunto de Train: 1.0
    Accuracy sobre conjunto de Test: 0.8070175438596491

***Para corroborar la incidencia de la división de los datos, modificar
el valor de random_state a la hora de hacer train_test_split y correr
todo de nuevo.***

``` python
# Importamos cross_val_score 

from sklearn.model_selection import cross_val_score
```

``` python
tree = DecisionTreeClassifier()
tree_scores = cross_val_score(tree, X, y, cv=5)

knn = KNeighborsClassifier(n_neighbors=1)
knn_scores = cross_val_score(knn, X, y, cv=5)
```

``` python
print(tree_scores)
print(knn_scores)
```

    [0.86842105 0.89473684 0.92105263 0.92105263 0.88495575]
    [0.87719298 0.88596491 0.87719298 0.92105263 0.89380531]

``` python
print("Accuracy para Tree: %0.2f (+/- %0.2f)" % (tree_scores.mean(), tree_scores.std() * 2))
print("Accuracy para KNN: %0.2f (+/- %0.2f)" % (knn_scores.mean(), knn_scores.std() * 2))
```

    Accuracy para Tree: 0.90 (+/- 0.04)
    Accuracy para KNN: 0.89 (+/- 0.03)

``` python
# Ahora probamos con cross_validate. Esta función brinda un poco más de información

from sklearn.model_selection import cross_validate
```

``` python
tree_scores = cross_validate(tree, X, y, cv=5, scoring = ['precision','recall'])
knn_scores = cross_validate(knn, X, y, cv=5, scoring = ['precision','recall'])
```

``` python
print(tree_scores)
```

    {'fit_time': array([0.        , 0.        , 0.00799251, 0.        , 0.        ]), 'score_time': array([0., 0., 0., 0., 0.]), 'test_precision': array([0.86486486, 0.88311688, 0.94366197, 0.93243243, 0.96610169]), 'test_recall': array([0.90140845, 0.95774648, 0.93055556, 0.95833333, 0.8028169 ])}

``` python
print(knn_scores)
```

    {'fit_time': array([0., 0., 0., 0., 0.]), 'score_time': array([0.00800157, 0.00799799, 0.        , 0.00816226, 0.        ]), 'test_precision': array([0.89041096, 0.88157895, 0.90277778, 0.94366197, 0.94029851]), 'test_recall': array([0.91549296, 0.94366197, 0.90277778, 0.93055556, 0.88732394])}

``` python
# Observemos todas las métricas que podemos usar para evaluar nuestros modelos

import sklearn
sorted(sklearn.metrics.SCORERS.keys())
```
    ['accuracy',
     'adjusted_mutual_info_score',
     'adjusted_rand_score',
     'average_precision',
     'balanced_accuracy',
     'completeness_score',
     'explained_variance',
     'f1',
     'f1_macro',
     'f1_micro',
     'f1_samples',
     'f1_weighted',
     'fowlkes_mallows_score',
     'homogeneity_score',
     'jaccard',
     'jaccard_macro',
     'jaccard_micro',
     'jaccard_samples',
     'jaccard_weighted',
     'max_error',
     'mutual_info_score',
     'neg_brier_score',
     'neg_log_loss',
     'neg_mean_absolute_error',
     'neg_mean_absolute_percentage_error',
     'neg_mean_gamma_deviance',
     'neg_mean_poisson_deviance',
     'neg_mean_squared_error',
     'neg_mean_squared_log_error',
     'neg_median_absolute_error',
     'neg_root_mean_squared_error',
     'normalized_mutual_info_score',
     'precision',
     'precision_macro',
     'precision_micro',
     'precision_samples',
     'precision_weighted',
     'r2',
     'rand_score',
     'recall',
     'recall_macro',
     'recall_micro',
     'recall_samples',
     'recall_weighted',
     'roc_auc',
     'roc_auc_ovo',
     'roc_auc_ovo_weighted',
     'roc_auc_ovr',
     'roc_auc_ovr_weighted',
     'top_k_accuracy',
     'v_measure_score']

------------------------------------------------------------------------

### `2. Dev/hold-out` {#2-devhold-out}

Para optimizar hiperparámetros, que es el tercer punto que tocaremos en
este notebook, previamente tenemos que incorporar estos conceptos.

A la hora de evaluar modelos, debemos hacer un primer train-test split.
De esta forma, nos quedamos con el subconjunto de test que utilizaremos
al final para calcular cuál es el mejor modelo.
`<img src = "https://miro.medium.com/max/601/1*PdwlCactbJf8F8C7sP-3gw.png"> alt="Validacion cruzada"

**Training set** será nuestro conjunto de desarrollo (dev). Aquí es
donde haremos validación cruzada. En este conjunto, hacemos todas las
pruebas que consideremos necesarias. Experimentamos con hiperparámetros.
Evaluamos los modelos haciendo cross-validation.

Luego, elegimos un modelo a partir de este desempeño y lo evaluamos en
**Test set**, que es nuestro conjunto **hold-out**.

------------------------------------------------------------------------

### `3. Optimización de hiperparámetros` {#3-optimización-de-hiperparámetros}

Esta técnica se emplea para obtener el mejor modelo posible. Por
supuesto, antes debemos elegir una métrica para comparar.

Existen tres estrategias para optimizar hiperparámetros -recordemos que
son los parámetros de los modelos que define el datascientist antes de
entrenar los modelos-:

-   Búsqueda manual: elegimos algunos hiperparámetros del modelo según
    nuestro criterio o experiencia previa. Es común probar con algunos
    valores a mano antes de pasar a algo más metódico. Esta estrategia
    resulta tediosa y poco eficiente.

-   Grid search: tomamos todos los hiperparámetros que queremos explorar
    y elegimos posibles valores. Luego, creamos un diccionario de
    hiperparámetros y entrenamos/validamos nuestro modelo en cada una de
    las combinaciones posibles. Posteriormente, elegimos la mejor
    combinación -el modelo con mejor performance según la métrica
    empleada-. Su principal inconveniente reside en que puede
    convertirse en un problema computacionalmente costoso. Cada modelo
    creado por grid search se evalúa con validación cruzada en el
    conjunto de Dev. Una vez elegidos los mejores hiperparámetros,
    debemos entrenar un modelo con esos hiperparámetros con todo el
    conjunto de Dev y evaluarlo en el conjunto de hold-out.

-   Random search: exploramos opciones y combinaciones al azar, a partir
    del diccionario creado. Luego entrenamos/validamos nuestro modelo
    con dichos valores y rescatamos aquel con mejor performance. Aquí se
    prueban menos combinaciones de hiperparámetros, pero más valores de
    cada uno de ellos. Esto se debe a que sampleamos en un rango de
    valores y no sobre una grilla regular.

Recalculando, para optimizar hiperparámetros necesitamos: una métrica,
un modelo, un espacio de hiperparámetros y una estrategia.

Dejamos la documentación de [grid
search](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html)
y de [random
search](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV.html).

``` python
# Continuamos con el dataset que estábamos usando

# Creamos la grilla de hiperparámetros para el modelo de vecinos más cercanos

param_grid = {'n_neighbors':np.arange(1, 20),
              'weights': ['uniform', 'distance'], 
              'leaf_size':[1,3,5,7,10],
              'algorithm':['auto', 'kd_tree']}
```

``` python
type(param_grid)
```

    dict

``` python
# Instanciamos el modelo KNN

knn = KNeighborsClassifier()
```

``` python
# Probamos la estrategia grid search

from sklearn.model_selection import GridSearchCV

# Le pasamos la grilla que creamos
model = GridSearchCV(knn, param_grid=param_grid, cv=5)

# Entrenamos
model.fit(X_train, y_train)
```

    GridSearchCV(cv=5, estimator=KNeighborsClassifier(),
                 param_grid={'algorithm': ['auto', 'kd_tree'],
                             'leaf_size': [1, 3, 5, 7, 10],
                             'n_neighbors': array([ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17,
           18, 19]),
                             'weights': ['uniform', 'distance']})

Existen tres variables que nos informan la mejor combinación, la mejor
performance y los resultados: `best_params_`, `best_score_` y
`cv_results_`.

``` python
print("Mejores hiperparámetros: "+str(model.best_params_))
print("Mejor Score: "+str(model.best_score_)+'\n')

scores = pd.DataFrame(model.cv_results_)
scores
```

    Mejores hiperparámetros: {'algorithm': 'auto', 'leaf_size': 1, 'n_neighbors': 14, 'weights': 'distance'}
    Mejor Score: 0.9315629164287074

<div class="max-w-[760px] overflow-auto">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>mean_fit_time</th>
      <th>std_fit_time</th>
      <th>mean_score_time</th>
      <th>std_score_time</th>
      <th>param_algorithm</th>
      <th>param_leaf_size</th>
      <th>param_n_neighbors</th>
      <th>param_weights</th>
      <th>params</th>
      <th>split0_test_score</th>
      <th>split1_test_score</th>
      <th>split2_test_score</th>
      <th>split3_test_score</th>
      <th>split4_test_score</th>
      <th>mean_test_score</th>
      <th>std_test_score</th>
      <th>rank_test_score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.001600</td>
      <td>0.003201</td>
      <td>0.003198</td>
      <td>0.003917</td>
      <td>auto</td>
      <td>1</td>
      <td>1</td>
      <td>uniform</td>
      <td>{'algorithm': 'auto', 'leaf_size': 1, 'n_neigh...</td>
      <td>0.932039</td>
      <td>0.941748</td>
      <td>0.901961</td>
      <td>0.852941</td>
      <td>0.911765</td>
      <td>0.908091</td>
      <td>0.030980</td>
      <td>341</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.003203</td>
      <td>0.003923</td>
      <td>auto</td>
      <td>1</td>
      <td>1</td>
      <td>distance</td>
      <td>{'algorithm': 'auto', 'leaf_size': 1, 'n_neigh...</td>
      <td>0.932039</td>
      <td>0.941748</td>
      <td>0.901961</td>
      <td>0.852941</td>
      <td>0.911765</td>
      <td>0.908091</td>
      <td>0.030980</td>
      <td>341</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.003203</td>
      <td>0.003923</td>
      <td>auto</td>
      <td>1</td>
      <td>2</td>
      <td>uniform</td>
      <td>'algorithm': 'auto', 'leaf_size': 1, 'n_neigh...</td>
      <td>0.922330</td>
      <td>0.922330</td>
      <td>0.872549</td>
      <td>0.872549</td>
      <td>0.901961</td>
      <td>0.898344</td>
      <td>0.022336</td>
      <td>371</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.001598</td>
      <td>0.003196</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>auto</td>
      <td>1</td>
      <td>2</td>
      <td>distance</td>
      <td>'algorithm': 'auto', 'leaf_size': 1, 'n_neigh...</td>
      <td>0.932039</td>
      <td>0.941748</td>
      <td>0.901961</td>
      <td>0.852941</td>
      <td>0.911765</td>
      <td>0.908091</td>
      <td>0.030980</td>
      <td>341</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.004801</td>
      <td>0.003920</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>auto</td>
      <td>1</td>
      <td>3</td>
      <td>uniform</td>
      <td>'algorithm': 'auto', 'leaf_size': 1, 'n_neigh...</td>
      <td>0.932039</td>
      <td>0.932039</td>
      <td>0.901961</td>
      <td>0.901961</td>
      <td>0.931373</td>
      <td>0.919874</td>
      <td>0.014628</td>
      <td>241</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>375</th>
      <td>0.001057</td>
      <td>0.000039</td>
      <td>0.001117</td>
      <td>0.000734</td>
      <td>kd_tree</td>
      <td>10</td>
      <td>17</td>
      <td>distance</td>
      <td>'algorithm': 'kd_tree', 'leaf_size': 10, 'n_n...</td>
      <td>0.941748</td>
      <td>0.951456</td>
      <td>0.931373</td>
      <td>0.911765</td>
      <td>0.911765</td>
      <td>0.929621</td>
      <td>0.015903</td>
      <td>41</td>
    </tr>
    <tr>
      <th>376</th>
      <td>0.001208</td>
      <td>0.002415</td>
      <td>0.003204</td>
      <td>0.003929</td>
      <td>kd_tree</td>
      <td>10</td>
      <td>18</td>
      <td>uniform</td>
      <td>'algorithm': 'kd_tree', 'leaf_size': 10, 'n_n...</td>
      <td>0.941748</td>
      <td>0.970874</td>
      <td>0.892157</td>
      <td>0.882353</td>
      <td>0.911765</td>
      <td>0.919779</td>
      <td>0.032623</td>
      <td>271</td>
    </tr>
    <tr>
      <th>377</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.003260</td>
      <td>0.003994</td>
      <td>kd_tree</td>
      <td>10</td>
      <td>18</td>
      <td>distance</td>
      <td>'algorithm': 'kd_tree', 'leaf_size': 10, 'n_n...</td>
      <td>0.951456</td>
      <td>0.961165</td>
      <td>0.911765</td>
      <td>0.901961</td>
      <td>0.911765</td>
      <td>0.927622</td>
      <td>0.023894</td>
      <td>121</td>
    </tr>
    <tr>
      <th>378</th>
      <td>0.003086</td>
      <td>0.003780</td>
      <td>0.001658</td>
      <td>0.003317</td>
      <td>kd_tree</td>
      <td>10</td>
      <td>19</td>
      <td>uniform</td>
      <td>'algorithm': 'kd_tree', 'leaf_size': 10, 'n_n...</td>
      <td>0.932039</td>
      <td>0.961165</td>
      <td>0.892157</td>
      <td>0.872549</td>
      <td>0.911765</td>
      <td>0.913935</td>
      <td>0.030823</td>
      <td>331</td>
    </tr>
    <tr>
      <th>379</th>
      <td>0.001598</td>
      <td>0.003196</td>
      <td>0.001600</td>
      <td>0.003199</td>
      <td>kd_tree</td>
      <td>10</td>
      <td>19</td>
      <td>distance</td>
      <td>'algorithm': 'kd_tree', 'leaf_size': 10, 'n_n...</td>
      <td>0.941748</td>
      <td>0.961165</td>
      <td>0.921569</td>
      <td>0.901961</td>
      <td>0.911765</td>
      <td>0.927641</td>
      <td>0.021313</td>
      <td>101</td>
    </tr>
  </tbody>
</table>
<p>380 rows × 17 columns</p>
</div>

``` python
#Predecimos en los datos de test con el mejor modelo obtenido
prediction = model.predict(X_test)
```

``` python
# Matriz de Confusion

from sklearn.metrics import confusion_matrix, accuracy_score

cm = confusion_matrix(y_test,prediction)
print("Matriz de confusión:")
print(cm)
```

    Matriz de confusión:
    [[15  6]
     [ 2 34]]

``` python
print('Exactitud:', accuracy_score(y_test, prediction))
```

    Exactitud: 0.8596491228070176

``` python
# Reporte de Clasificacion

from sklearn.metrics import classification_report

report = classification_report(y_test, prediction)
print("Reporte de Clasificación:")
print(report)
```

    Reporte de Clasificación:
                  precision    recall  f1-score   support

             0.0       0.88      0.71      0.79        21
             1.0       0.85      0.94      0.89        36

        accuracy                           0.86        57
       macro avg       0.87      0.83      0.84        57
    weighted avg       0.86      0.86      0.86        57

Ahora probemos la estrategia `random search`.

``` python
# Grilla para random search

import scipy
from scipy import stats

param_dist = {'n_neighbors':sp.stats.randint(1, 20),
              'weights': ['uniform', 'distance'], 
              'leaf_size':sp.stats.randint(1, 10),
              'algorithm':['auto', 'kd_tree']}
```

``` python
from sklearn.model_selection import RandomizedSearchCV

knn = KNeighborsClassifier()
model = RandomizedSearchCV(knn, param_dist,n_iter=100, random_state=0, cv=5)

# Entrenamos knn con la grilla
model.fit(X_train, y_train)
```

    RandomizedSearchCV(cv=5, estimator=KNeighborsClassifier(), n_iter=100,
                       param_distributions={'algorithm': ['auto', 'kd_tree'],
                                            'leaf_size': <scipy.stats._distn_infrastructure.rv_frozen object at 0x0000015DB6B144C0>,
                                            'n_neighbors': <scipy.stats._distn_infrastructure.rv_frozen object at 0x0000015DB6B431F0>,
                                            'weights': ['uniform', 'distance']},
                       random_state=0)


``` python
print("Mejores hiperparámetros: "+str(model.best_params_))
print("Mejor Score: "+str(model.best_score_)+'\n')

scores = pd.DataFrame(model.cv_results_)
scores
```

    Mejores hiperparámetros: {'algorithm': 'kd_tree', 'leaf_size': 7, 'n_neighbors': 14, 'weights': 'distance'}
    Mejor Score: 0.9315629164287074

<div class="max-w-[760px] overflow-auto">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>mean_fit_time</th>
      <th>std_fit_time</th>
      <th>mean_score_time</th>
      <th>std_score_time</th>
      <th>param_algorithm</th>
      <th>param_leaf_size</th>
      <th>param_n_neighbors</th>
      <th>param_weights</th>
      <th>params</th>
      <th>split0_test_score</th>
      <th>split1_test_score</th>
      <th>split2_test_score</th>
      <th>split3_test_score</th>
      <th>split4_test_score</th>
      <th>mean_test_score</th>
      <th>std_test_score</th>
      <th>rank_test_score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.001599</td>
      <td>0.003198</td>
      <td>0.001600</td>
      <td>0.003200</td>
      <td>auto</td>
      <td>6</td>
      <td>1</td>
      <td>distance</td>
      <td>{'algorithm': 'auto', 'leaf_size': 6, 'n_neigh...</td>
      <td>0.932039</td>
      <td>0.941748</td>
      <td>0.901961</td>
      <td>0.852941</td>
      <td>0.911765</td>
      <td>0.908091</td>
      <td>0.030980</td>
      <td>88</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.001607</td>
      <td>0.003213</td>
      <td>kd_tree</td>
      <td>4</td>
      <td>8</td>
      <td>distance</td>
      <td>{'algorithm': 'kd_tree', 'leaf_size': 4, 'n_ne...</td>
      <td>0.932039</td>
      <td>0.951456</td>
      <td>0.901961</td>
      <td>0.921569</td>
      <td>0.921569</td>
      <td>0.925719</td>
      <td>0.016132</td>
      <td>30</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.004794</td>
      <td>0.003914</td>
      <td>kd_tree</td>
      <td>6</td>
      <td>19</td>
      <td>uniform</td>
      <td>{'algorithm': 'kd_tree', 'leaf_size': 6, 'n_ne...</td>
      <td>0.932039</td>
      <td>0.961165</td>
      <td>0.892157</td>
      <td>0.872549</td>
      <td>0.911765</td>
      <td>0.913935</td>
      <td>0.030823</td>
      <td>85</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.001601</td>
      <td>0.003203</td>
      <td>0.001600</td>
      <td>0.003201</td>
      <td>kd_tree</td>
      <td>7</td>
      <td>13</td>
      <td>uniform</td>
      <td>{'algorithm': 'kd_tree', 'leaf_size': 7, 'n_ne...</td>
      <td>0.932039</td>
      <td>0.961165</td>
      <td>0.911765</td>
      <td>0.901961</td>
      <td>0.921569</td>
      <td>0.925700</td>
      <td>0.020361</td>
      <td>37</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>kd_tree</td>
      <td>7</td>
      <td>8</td>
      <td>distance</td>
      <td>{'algorithm': 'kd_tree', 'leaf_size': 7, 'n_ne...</td>
      <td>0.932039</td>
      <td>0.951456</td>
      <td>0.901961</td>
      <td>0.921569</td>
      <td>0.921569</td>
      <td>0.925719</td>
      <td>0.016132</td>
      <td>30</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>95</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.001607</td>
      <td>0.003214</td>
      <td>auto</td>
      <td>6</td>
      <td>12</td>
      <td>distance</td>
      <td>{'algorithm': 'auto', 'leaf_size': 6, 'n_neigh...</td>
      <td>0.941748</td>
      <td>0.941748</td>
      <td>0.911765</td>
      <td>0.911765</td>
      <td>0.911765</td>
      <td>0.923758</td>
      <td>0.014689</td>
      <td>48</td>
    </tr>
    <tr>
      <th>96</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.001594</td>
      <td>0.003188</td>
      <td>auto</td>
      <td>3</td>
      <td>14</td>
      <td>distance</td>
      <td>{'algorithm': 'auto', 'leaf_size': 3, 'n_neigh...</td>
      <td>0.951456</td>
      <td>0.951456</td>
      <td>0.921569</td>
      <td>0.921569</td>
      <td>0.911765</td>
      <td>0.931563</td>
      <td>0.016633</td>
      <td>1</td>
    </tr>
    <tr>
      <th>97</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.003199</td>
      <td>0.003918</td>
      <td>kd_tree</td>
      <td>7</td>
      <td>11</td>
      <td>distance</td>
      <td>{'algorithm': 'kd_tree', 'leaf_size': 7, 'n_ne...</td>
      <td>0.941748</td>
      <td>0.941748</td>
      <td>0.921569</td>
      <td>0.921569</td>
      <td>0.911765</td>
      <td>0.927679</td>
      <td>0.012032</td>
      <td>11</td>
    </tr>
    <tr>
      <th>98</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.004801</td>
      <td>0.003920</td>
      <td>auto</td>
      <td>1</td>
      <td>4</td>
      <td>uniform</td>
      <td>{'algorithm': 'auto', 'leaf_size': 1, 'n_neigh...</td>
      <td>0.941748</td>
      <td>0.941748</td>
      <td>0.921569</td>
      <td>0.911765</td>
      <td>0.921569</td>
      <td>0.927679</td>
      <td>0.012032</td>
      <td>11</td>
    </tr>
    <tr>
      <th>99</th>
      <td>0.001605</td>
      <td>0.003211</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>kd_tree</td>
      <td>7</td>
      <td>7</td>
      <td>distance</td>
      <td>{'algorithm': 'kd_tree', 'leaf_size': 7, 'n_ne...</td>
      <td>0.932039</td>
      <td>0.951456</td>
      <td>0.901961</td>
      <td>0.921569</td>
      <td>0.921569</td>
      <td>0.925719</td>
      <td>0.016132</td>
      <td>30</td>
    </tr>
  </tbody>
</table>
<p>100 rows × 17 columns</p>
</div>

``` python
#Predecimos en los datos de test

prediction = model.predict(X_test)
```

``` python
# Matriz de Confusion

cm = confusion_matrix(y_test,prediction)
print("Matriz de confusión:")
print(cm)
```

    Matriz de confusión:
    [[15  6]
     [ 2 34]]

``` python
# Reporte de Clasificacion
report = classification_report(y_test, prediction)
print("Reporte de Clasificación:")
print(report)
```

    Reporte de Clasificación:
                  precision    recall  f1-score   support

             0.0       0.88      0.71      0.79        21
             1.0       0.85      0.94      0.89        36

        accuracy                           0.86        57
       macro avg       0.87      0.83      0.84        57
    weighted avg       0.86      0.86      0.86        57
