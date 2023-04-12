---
title: "Regresion logistica"
description: "..."
pubDate: "Apr 10 2023"
heroImage: "/placeholder-hero.jpg"
slug: 'regression/logistica'
---

## **Regresión logística**

En este notebook, profundizaremos en un modelo esencial dentro de los
problemas de ***clasificación*** : la regresión logística.

La regresión logística es un modelo lineal que se utiliza para
clasificación binaria. *No confundirse por su nombre, se trata de un
modelo de clasificación, a diferencia de la regresión lineal que vimos
en la práctica anterior.*

Estos modelos se emplean mucho para test de enfermedades, filtros de
correo spam, test de embarazo, etc. Es un método que aproxima los puntos
por una función logística/sigmoide.

Clasifica separando por una linea. Con ese umbral, determina si una
instancia es 0 o 1 -es decir, si pertenece a una categoría o a la otra-.

### **Función sigmoide**

Es una función que toma valores continuos y devuelve un valor entre 0 y
1

<img src="/assets\sigmoide.jpg"
style = "width:900px; height:300px">

Tiene dos parámetros, w0 y w1. Su rol es parecido al de la pendiente y
ordenada al origen en regresión lineal.

w1 = controla la inclinación de la curva en la zona de cambio w0 = mueve
la curva hacia la derecha o la izquierda, según su valor

Lo que hace la regresión logística es encontrar el w0 y w1 que mejor
aproximen los puntos pertenecientes a cada clase (esto en el caso de una
sola dimensión).

En síntesis, la regresión lineal es el modelo que trata de encontrar la
mejor recta que pasa por nuestros puntos. Mientras que la regresión
logística trata de encontrar la mejor recta que separa nuestros puntos.

Suele usarse mucho en problemas que necesiten estimar la probabilidad de
ocurrencia de algo, ya que cumple con una característica muy importante
de una función de probabilidad. ¿Se acuerdan cuál es?

La ecuación general usada para la regresión logística es la siguiente:

P(Y)=11+e−(b0+b1X1).

y si estamos trabajando en una dimensión se aproxima de la siguiente
forma:

y= \\dfrac{1}{1 +e\^{-(\\beta_0 + \\beta_1x_1)}} 

Pero está función no es lineal. ¿Cómo hacemos entonces para calcular
está regresión? Utilizamos una regresión lineal sobre la función de
probabilidad logit:

g(x)=\ln\dfrac{p(x)}{1-p(x)}= \beta_0 + \beta_1 x_1

Más info de la ecuacion: https://gauss.inf.um.es/feir/45/

## Implementación con un atributo

``` python
import matplotlib.pyplot as plt
import numpy as np
from matplotlib import cm

from sklearn.datasets import make_blobs # Importamos el módulo para crear un dataset sintético

# Creamos una función sigmoide

def sigmoid_function(x,w0, w1):
   
    z = w0 + w1*x # Notar que es una funcion lineal
    y = 1/(1 + np.exp(-z))   # Notar que es una composición
    return y

# Creamos nuestro dataset sintético con la función make_blobs. 
# Este dataset lo haremos con un atributo y dos clases

X, y = make_blobs(n_samples=1000, centers=2, n_features=1,
                  random_state=1, cluster_std= 1.5)

# Graficamos los puntos de nuestro dataset sintético

plt.figure(figsize = (10,5))
plt.scatter(X, y, c = y, alpha = 0.5, lw = 0.5, edgecolor = 'grey', cmap =cm.coolwarm)
plt.xlabel('x')
plt.ylabel('y')
plt.tight_layout()
plt.show()
```

<img src="/m1/2/43009ffff5ec170f3a05ca68915afab64c2d0320.png" alt="Regresion Logistica" />

``` python
# Importamos la clase que contiene el algoritmo de regresíon logística

from sklearn.linear_model import LogisticRegression

# Instanciamos el modelo y lo entrenamos

clf = LogisticRegression()

# Lo entrenamos

clf.fit(X,y)

# Importamos una métrica utilizada para evaluar modelos de clasificación. 
# Ya ahondaremos con mayor especificidad en las métricas de clasificación en la clase 3

from sklearn.metrics import accuracy_score 

# Predecimos

y_pred = clf.predict(X)

# Evaluamos

print('El score del modelo es:', accuracy_score(y, y_pred))

    El score del modelo es: 0.974

# Observamos los parámetros de la función sigmoide

print(clf.coef_, clf.intercept_)

    [[2.44855129]] [-3.39207913]

# Graficamos la curva obtenida por la regresión logística

plt.figure(figsize = (10,5))


plt.scatter(X, y, c = y, alpha = 0.5, lw = 0.5, edgecolor = 'grey', cmap =cm.coolwarm)
x_plot = np.linspace(-7,12,100)
plt.plot(x_plot, sigmoid_function(x_plot,clf.intercept_[0], clf.coef_[0][0]))

plt.xlabel('x')
plt.ylabel('y')
plt.tight_layout()
```
<img src="/m1/2/c8ad545e71ddbfe1dd809de34f913aae2f18f938.png" alt="Regresion Logistica" />
