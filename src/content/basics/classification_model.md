---
title: "Modelo de clasificación"
description: "En esta práctica, veremos cómo evaluar un modelo de clasificación con
las diversas métricas vistas en la parte teórica."
pubDate: "Jul 08 2022"
heroImage: "/placeholder-hero.jpg"
url: "/basics/classification_model"
---

# **Evaluación de modelos de clasificación**

Trabajaremos con uno de los datasets provisto por Scikit-learn referente
a Iris.

``` python
import numpy as np
import matplotlib.pyplot as plt
from sklearn import datasets
```

``` python
iris = datasets.load_iris()
X = iris.data 
y = iris.target
```

``` python
len(y)
```

    150

Ahora que definimos nuestras variables predictoras **X** y la etiqueta a
predecir **y**, vamos a separar nuestros datos en entrenamiento y
testeo. Utilizaremos el 20% del dataset para evaluar.

``` python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 42)
```

Vamos a trabajar con un modelo de vecinos más cercanos. Seguimos el
flujo de trabajo de ML en Scikit-learn.

``` python
from sklearn.neighbors import KNeighborsClassifier

# Instanciamos el modelo clasificador
    
classifier = KNeighborsClassifier(n_neighbors=110)
```

``` python
# Entrenamos el modelo. Para ello, usamos nuestro set de entrenamiento

classifier.fit(X_train, y_train)
```
``` python
# Predecimos sobre nuestro set de entrenamieto

y_train_pred = classifier.predict(X_train)

# Predecimos sobre nuestro set de testeo

y_test_pred = classifier.predict(X_test)
```

## **`Matriz de confusión`**

Veamos la matriz de nuestro modelo

``` python
from sklearn.metrics import confusion_matrix

matrix = confusion_matrix(y_train, y_train_pred)
matrix_2 = confusion_matrix(y_test, y_test_pred)
```

``` python
matrix
```

    array([[ 0, 40,  0],
           [ 0, 41,  0],
           [ 0, 39,  0]], dtype=int64)

*Grafiquemos la matriz*

``` python
from sklearn.metrics import ConfusionMatrixDisplay

cm_display = ConfusionMatrixDisplay(matrix)
cm_display_2 = ConfusionMatrixDisplay(matrix_2)
```

``` python
fig, ax = plt.subplots(figsize=(4,5))

ax.matshow(matrix)
for (i, j), z in np.ndenumerate(matrix):
    ax.text(j, i, '{:0.1f}'.format(z), ha='center', va='center')
plt.show()
```

<img src="/m3/1/710c1a8bd43c8b1a66308342ae5d59aa24c60d25.png" alt="Modelo de clasificacion" />

``` python
# Otra forma más sencilla de realizar la gráfica es la siguiente

cm_display.plot()
plt.show()
```

<img src="/m3/1/d5cea711685186aa697ea78ec0154c038813385a.png" alt="Modelo de clasificacion" />

``` python
cm_display_2.plot()
plt.show()
```

<img src="/m3/1/ee9081168c100a514c54a7283c4f601abb1c686c.png" alt="Modelo de clasificacion" />

### **`Exactitud`**

``` python
from sklearn.metrics import accuracy_score

exactitud = accuracy_score(y_test, y_test_pred)
print(exactitud)
```

    0.3

### **`Precisión`**

``` python
from sklearn.metrics import precision_score

precision = precision_score(y_test, y_test_pred, average= None)
print(precision)
```

    [1.   0.45 0.  ]

### **`Exhaustividad/Recall/Sensibilidad`**

``` python
from sklearn.metrics import recall_score

precision = recall_score(y_test, y_test_pred, average= None)
print(precision)
```

    [1. 1. 0.]

### **`F1-Score`**

``` python
from sklearn.metrics import f1_score

precision = f1_score(y_test, y_test_pred, average= None)
print(precision, type(precision))
```

    [1.         0.62068966 0.        ] <class 'numpy.ndarray'>

### **`Curvas ROC`**

Dejamos
[aquí](https://scikit-learn.org/stable/auto_examples/model_selection/plot_roc.html)
la documentación pertinente.

Debemos trabajar con un método del preprocesamiento de datos -denominado
*label_binarize*- que permita abordar un problema de clasificación
multiclase como si fuese binario. Esto lo hacemos ya que la métrica ROC
se emplea para problemas binarios. Dejamos la
[documentación](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.label_binarize.html)
para que se interioricen un poco más acerca de esta función.

``` python
from sklearn.preprocessing import label_binarize
```

``` python
# Binarizamos y_test

y_test = label_binarize(y_test, classes=[0, 1, 2])
n_classes = y_test.shape[1]
print(y_test[:5])
```

    [[0 1 0]
     [1 0 0]
     [0 0 1]
     [0 1 0]
     [0 1 0]]

Hasta este momento, nosotros veníamos trabajando con el método `predict`
para poder predecir una etiqueta para un registro.

Ahora veremos la funcionalidad de `predict_proba`, que indica la
probabilidad de que una instancia pertenezca a una de las categorías de
la variable de salida.

``` python
y_score = classifier.predict_proba(X_test)
print(y_score[:5])
```

    [[0.     0.5125 0.4875]
     [0.5    0.4625 0.0375]
     [0.     0.5125 0.4875]
     [0.     0.5125 0.4875]
     [0.     0.5125 0.4875]]

``` python
# Computamos los valores de FPR (Tasa de falsos positivos) y TPR (tasa de verdaderos positivos), para luego realizar
# el gráfico de la curva ROC.

from sklearn.metrics import roc_curve, auc

fpr = dict()
tpr = dict()
roc_auc = dict()

for i in range(n_classes):
    fpr[i], tpr[i], _ = roc_curve(y_test[:, i], y_score[:, i])
    roc_auc[i] = auc(fpr[i], tpr[i])
```

Pasamos a graficar

``` python
# Recorremos con un bucle cada una de las clases

for i in range(n_classes):
    plt.figure(figsize=(8,8))
    plt.plot(fpr[i], tpr[i],'o--', label='ROC curve (area = %0.2f)' % roc_auc[i])
    plt.plot([0, 1], [0, 1], 'k--')
    plt.xlim([-0.05, 1.05])
    plt.ylim([-0.05, 1.05])
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('Curva ROC: Clase ' + str(i))
    plt.legend(loc="lower right")
    plt.grid()
    plt.show()
```

<img src="/m3/1/9bd906724560a3413d34445f48dde640b3d1cb07.png" alt="Modelo de clasificacion" />

<img src="/m3/1/cd3b13250ffad1ea47f0187f8014bc8ed34d4460.png" alt="Modelo de clasificacion" />

<img src="/m3/1/ae0d1d6d268b1afac517219f96a871260780ae03.png" alt="Modelo de clasificacion" />

``` python
from sklearn.preprocessing import LabelBinarizer
from sklearn.metrics import roc_auc_score


def multiclass_roc_auc_score(y_test, y_pred, average= 'macro'):
    lb = LabelBinarizer()
    lb.fit(y_test)
    y_test = lb.transform(y_test)
    y_pred = lb.transform(y_pred)
    return roc_auc_score(y_test, y_pred, average=average)
```

``` python
print('El AUC-ROC multiclase:',multiclass_roc_auc_score(y_test, y_test_pred))
```

    El AUC-ROC multiclase: 0.746031746031746
