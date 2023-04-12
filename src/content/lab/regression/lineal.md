---
title: "Regresion lineal"
description: "..."
pubDate: "Apr 10 2023"
heroImage: "/placeholder-hero.jpg"
slug: 'regression/lineal'
---

# **Primeros modelos de Machine Learning**

En la clase de hoy comenzaremos a desarrollar nuestros dos primeros
modelos de ML. Abordaremos uno para *clasificación* y otro para
*regresión*. A lo largo de la cursada, iremos creando más modelos
basados en otros algoritmos para ambas subdivisiones del **aprendizaje
supervisado**. Después, encararemos el aprendizaje no supervisado.

Veremos una ***regresión lineal*** (para problemas de regresión) en la
Práctica_01 y una ***regresión logística*** (aunque su nombre pueda
generar confusión al principio, este algoritmo es propio de los
problemas de clasificación) en la Práctica_02.

## Flujo de trabajo en Scikit-Learn

Para poder implementar nuestros modelos en ML, utilizaremos
mayoritariamente la librería Scikit-Learn. Es importante que la
descarguen para que puedan ejecutar este notebook. Dejamos
[aquí](https://scikit-learn.org/stable/) la documentación. Recomendamos
que la vayan viendo para familiarizarse con ella.

Para trabajar con ML, lo que estaremos haciendo habitualmente no es otra
cosa que usar clases, objetos y métodos de esos objetos.

<img src="/assets/SC-L.jpg"
style = "width:800px; height:300px">

En una primera etapa, instanciamos una clase -nuestro modelo de ML-.
Luego, entrenamos y predecimos -ambos son métodos de la clase que
instanciamos-.

## **Regresión lineal**

Como vimos en la clase, los problemas de regresión son aquellos que
tienen como etiqueta de salida una variable numérica. Una de las formas
de poder predecir una etiqueta de estas características es con una
regresión lineal. Esta, a su vez, puede ser simple o múltiple,
dependiendo de la cantidad de atributos -***X***- que tengamos en
nuestro dataset.

Comenzaremos trabajando con una regresión lineal de un solo atributo,
partiendo de la conocida ecuación de una recta:

Y = mX + b

m : pendiente

b : ordenada al origen

Ahora bien, para modelar en el mundo real, un mundo predominado por los
fenómenos aleatorios y bastante poco determinístico, vamos a incluir lo
que se llama un término de error epsilon$. Este término le agregará lo
que comunmente se conoce como \"ruido\", el cuál representa información
que está presente pero que no es determinante a la hora de encontrar
relaciones causales. Reescribimos entonces:

Y = mX + b + \\epsilon

donde ahora epsilon$ es un término de error aleatorio que se
distribuye normal con media cero y varianza uno, epsilon\sim N(0;1)$

## 1. Regresión lineal simple

En este punto, abordaremos una regresión lineal de un solo atributo

``` python
# Importamos las librerías necesarias

#import sys
#!{sys.executable} -m pip install numpy pandas matplotlib sklearn seaborn

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
```

A continuación, generaremos un dataset sintético. Este incluirá 500
datos con una relación lineal que seguirá la forma $y = 3x - 2$. Podrán
ver que a esta función le estaremos sumando un poco de *ruido* como
habíamos dicho antes.

``` python
n = 500
X = np.linspace(-2,3,n)
y_real = 3*X - 2

y = y_real + np.random.randn(n) # Aquí le agregamos ruido a la función
```

Procedemos a graficar, ploteando por un lado los valores reales -en
verde- y, por otro, la curva teórica -en rojo-.

``` python
plt.figure(figsize=(14,9))
plt.scatter(X,y, s = 2, label= 'Valores Observados')
plt.plot(X, y_real, '--',label ='Curva Teórica', c = 'r')
plt.xlabel('x')
plt.ylabel('y')
#plt.legend()
plt.show()
```

<img src="/m1/1/b94bc623d2e3eaaad22b41bfdbae5b2fc070560c.png" alt="Regresion lineal" />

Vamos a hacerlo primero, de manera manual

<!-- <img src="/m1/1/Formula_Regresion_Lineal.jpg" width=200>
 -->
``` python
a = (n * (X*y).sum() - X.sum() * y.sum()) / (n * (X**2).sum() - X.sum()**2)
print("La pendiente obtenida manualmente es:", a)
```

La pendiente obtenida manualmente es: -7.202821072265975e-14

``` python
b = (y.sum() - a * X.sum()) / n
print("La ordenada al orígen obtenida manualmente es:", b)
```

La ordenada al orígen obtenida manualmente es: 1.7562023714938917

Y ahora, usando Scikit-Learn:

``` python
from sklearn.linear_model import LinearRegression

# Importamos el módulo que contiene el algorimto de 
  #regresión lineal

linear_model = LinearRegression() # Instanciamos un objeto de la clase LinearRegression. 
                                  #Aquí estamos creando nuestro modelo predictivo 'linear_model'

# Entrenamos el modelo
linear_model.fit(X.reshape(-1,1), y)

# Aquí observamos cómo el modelo ha aprendido de los datos, a partir de la pendiente y 
#la ordenada al origen que calculó
print('La pendiente obtenida con Sklearn es :', linear_model.coef_)
print('La ordenada al origen obtenida con Sklearn es:', linear_model.intercept_)
```

La pendiente obtenida con Sklearn es : [-3.15518728  1.99995189]
La ordenada al origen obtenida con Sklearn es: 4.049886692119578

En la celda de abajo instanciaremos un modelo de regresión lineal. Para
ello, debemos entrenar el modelo y hacer un `train_test_split`.

No te preocupes por no haber visto este concepto todavía, ya lo veremos
más en detalle en la clase 3. Por el momento, basta con que sepas que
este método divide o separa nuestro set de datos en dos subcojuntos -uno
de entrenamiento y el otro de testeo-.

En el primer subset, se le muestra al modelo los datos de entrada de
cada uno de los registros y sus respectivas variables de salida. De esta
manera, irá aprendiendo de los datos asociando los valores de ***x***
con su variable de salida ***y*** para cada registro. Mientras que, en
el subset de testeo, solamente utilizaremos las variables de entrada
para que el modelo vaya realizando sus predicciones. A estas
predicciones las compararemos con los valores reales -las etiquetas de
salida del subset de testeo- para evaluar cuán bien, o no, está
infiriendo nuestro modelo.

``` python
from sklearn.model_selection import train_test_split

X = X.reshape(-1,1)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30, random_state=42) # Separamos nuestros 
                                                                                           #datos, dejando un 30% 
                                                                                           #para testear

print(X_train.shape, y_train.shape, X_test.shape, y_test.shape)
```

(350, 1) (350,) (150, 1) (150,)

De los 500 datos que teníamos en una primera instancia, utilizamos 350
para nuestro subset de entrenamiento y los 150 restantes para testear.

``` python
# Entrenamos el modelo

linear_model.fit(X_train, y_train)

# Predecimos las etiquetas de salida Y en el subset de entrenamiento y en el subset de testeo
#para cada una de las instancias

y_train_pred = linear_model.predict(X_train) # subset de entrenamiento
y_test_pred = linear_model.predict(X_test) #subset de testeo

# Aquí observamos cómo el modelo ha aprendido de los datos, a partir de la pendiente y 
#la ordenada al origen que calculó

print('La pendiente es :', linear_model.coef_)
print('La ordenada al origen es:', linear_model.intercept_)
```

La pendiente es : [0.28541971]
La ordenada al origen es: 1.745813246154787

Los modelos diseñados para problemas de regresión buscan obtener la
curva que mejor aproxime los datos, a través de la minimización de los
errores que se determinan entre los valores predichos (hat{y}) y los
observados (y).

Vamos a ver la curva que calculó este regresor que estamos utilizando.

``` python
plt.figure(figsize = (13,7))

plt.scatter(X,y, s = 2)
plt.plot(X, y_real, '--',label ='Curva Teórica', c = 'r')
plt.plot(X,linear_model.predict(X),label ='Regresion Lineal', c = 'g')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()

plt.show()
```

<img src="/m1/1/675dab748fa62bdd1db799f6810d1251ba634d84.png" alt="Regresion lineal" />

Podemos observar que nuestro modelo de regresión lineal reproduce con
bastante fidelidad la curva teórica de nuestros datos

## **Evaluación del modelo**

En este apartado, avanzaremos en una etapa esencial dentro del flujo de
Machine Learning. Esta consiste en la evaluación de los modelos que
instanciemos y utilicemos para predecir. En la clase 3 profunidizaremos
más sobre este aspecto de evaluación de modelos.

Para esta práctica, enunciaremos brevemente las métricas de evaluación
más empleadas en problemas de regresión.

Evaluar un modelo no es otra cosa que cuantificar su performance. Es
decir, poder determinar la calidad de sus predicciones.

Partimos del error entre la etiqueta real *Y* y la predicción del modelo
*Y\'*. En algunos casos, nuestro regresor sobreestimará el valor de la
predicción, por lo que el error será positivo -por ejemplo, si el valor
de la etiqueta real es 5 y el modelo predijo que era 6, el error será
+1-. En otros casos, el regresor subestimará el valor de la predicción,
por lo que el error será negativo -si el valor de la etiqueta real es 5
y el modelo predijo que era 4, el error será -1-.

El error de nuestro regresor estará relacionado con la suma de los
errores sobre todas las instancias. Habiendo dicho todo lo anterior,
queda claro que podría pasar que los errores se compensen y nos
engañemos (si sumamos un error en una instancia que es negativo con el
error de otra instancia que es positivo, corremos el riesgo de que se
anulen).

Para no caer en este escenario, hay diversas soluciones en la
aplicabilidad de ciertas métricas de evaluación. Aquí veremos: MAE, MSE
y RMSE.

### *MAE (Mean Absolute Error)*

<img src="https://cdn-images-1.medium.com/max/800/1*8DXbECB9pnKxTpIvuVD-vg.png">

Esta métrica suma los valores absolutos de los errores sobre cada
isntancia y luego las promedia para obtener el error promedio.

El problema, en este caso, es que el error va a ser mayor cuantas más
muestras haya.

### *MSE (Mean Squared Error)*

<img src= "https://pbs.twimg.com/media/Etuc3lBXcAEH7wO.png"
style = "width:375px; height:200px">

Aquí, en lugar de tomar el valor absoluto, tomamos el cuadrado del
error.

La desventaja, ahora, es que al estar elevado al cuadrado, el error no
tiene la misma magnitud ni unidad que la variable **Y**.

Por ello, se suele aplicar la raíz.

### *RMSE (Root Mean Squared Error)*

<img src= "https://secureservercdn.net/160.153.137.16/70j.58d.myftpupload.com/wp-content/uploads/2019/03/rmse-2.png"
style = "width:375px; height:150px">

Como vemos, esta métrica consiste en aplicarle la raíz cuadrada al MSE.

Tanto MSE y RMSE son más sensibles a los valores atípicos (ya que elevan
los errores de cada muestra al cuadrado).

Hay que tener presente que todas estas métricas que vimos miden errores.
Con lo cual, a más bajo MAE, MSE o RMSE, mejor regresor. En un caso
hipotético de perfección, los errores serán 0.

### *Coeficiente de determinación (R cuadrado)*

<img src= "https://economipedia.com/wp-content/uploads/R-Cuadrado-expresi%C3%B3n-300x192.jpg"
style = "width:300px; height:200px">

Dejamos para al final esta métrica que, al igual que el RMSE, es de las
más aplicadas en la materia.

El coeficiente de determinación es la proporción de la varianza total de
la variable explicada por la regresión. El coeficiente de determinación,
también llamado R cuadrado, refleja la bondad del ajuste de un modelo a
la variable que pretender explicar.

Su valor, a diferencia de las métricas que estuvimos viendo
anteriormente, oscila entre 0 y 1.

Cuanto más cerca de 1 se sitúe su valor, mayor será el ajuste del modelo
a la variable que estamos intentando explicar. De forma inversa, cuanto
más cerca de cero, menos ajustado estará el modelo y, por tanto, menos
fiable será.

Cabe destacar, que Scikit-Learn aplica una variante denominada R
cuadrado ajustada, en la que los valores obtenidos, sí pueden ser
menores a 0, en caso de que el modelo tenga un ajuste a los datos muy
bajo:

<https://scikit-learn.org/stable/modules/generated/sklearn.metrics.r2_score.html>

``` python
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

from sklearn.metrics import mean_squared_error 

import seaborn as sns

rmse_train = (mean_squared_error(y_train, y_train_pred, squared = False))
rmse_test = (mean_squared_error(y_test, y_test_pred, squared = False))
print(f'Raíz del error cuadrático medio en Train: {rmse_train}')
print(f'Raíz del error cuadrático medio en Test: {rmse_test}')

plt.figure(figsize = (12,5))

# En este subplot, graficamos los histogramas de los errores para el subset de entrenamiento y el de testeo
plt.subplot(1,2,1)
plt.title('Histograma de errores')
sns.distplot(y_train - y_train_pred, bins = 20, label = 'train', color = 'r', kde = True)
sns.distplot(y_test - y_test_pred, bins = 20, label = 'test', kde = True)
plt.xlabel('errores')
plt.legend()

# En este subplot, graficamos los puntos celestes que representan los valores Y reales y la curva en negro que representa la función de regresión lineal que creó nuestro modelo de ML
ax = plt.subplot(1,2,2)
plt.title('Y real vs Y predicho')
ax.scatter(y_test,y_test_pred, s =3, label = 'Y real')
lims = [
np.min([ax.get_xlim(), ax.get_ylim()]),  # min of both axes
np.max([ax.get_xlim(), ax.get_ylim()]),  # max of both axes]
]

ax.plot(lims, lims, 'k-', alpha=0.75, zorder=0, label = 'Curva de la regresión lineal (Y predicho)')
plt.xlabel('y (test)')
plt.ylabel('y_pred (test)')
plt.legend()
plt.tight_layout()
plt.show()
```

Raíz del error cuadrático medio en Train: 0.9969056652844925
Raíz del error cuadrático medio en Test: 1.0320021135087933

<img src="/m1/1/31e0ae2aff099db18895c815acbb470671e8ab14.png" alt="Regresion lineal" />

*Ya calculamos el RMSE. Ahora calcularemos el coeficiente de
determinación de nuestro modelo*

``` python
from sklearn.metrics import r2_score 

r2 = r2_score(y_test, y_test_pred) 
print('El coeficiente de determinación del regresor es:', r2)
```

El coeficiente de determinación del regresor es: 0.9504527812612973

Tenemos un R\^2 muy cercano a uno, lo que es un indicio de un modelo que
predice con bastante fidelidad

## 2. Regresión lineal múltiple

Ahora trabajaremos una regresión lineal con dos atributos.

y = -3x_1 + 2x_2 + 4. Nuevamente, sumaremos algo de ruido epsilon.

``` python
n = 500
x1 = np.random.rand(n)
x2 = np.random.rand(n)
y = -3*x1 + 2*x2 + 4 + np.random.randn(n)
```

No es necesario entender el código de este gráfico tridimensional.
Simplemente es para que puedan visualizar cómo son nuestros datos con
dos atributos y una variable de salida.

``` python
from mpl_toolkits.mplot3d import Axes3D


def plot_3d_scatter(x1, x2, y, ax=None, fig = None):
    if (fig is None) and (ax is None):
        fig = plt.figure(figsize = (15,10))
        ax = fig.add_subplot(111, projection='3d')
    ax.scatter(x1, x2, y)

    ax.set_xlabel('x1')
    ax.set_ylabel('x2')
    ax.set_zlabel('y')

plot_3d_scatter(x1, x2, y, ax=None, fig = None)
```

<img src="/m1/1/4444ae6f3323e3f6ce483522fa80b5429b196cc8.png" alt="Regresion lineal" />

``` python
# Separamos nuestros datos en entrenamiento y test. X se denota con mayúscula ya que incluye dos atributos

X = np.vstack((x1,x2)).T

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30, random_state=42)

print(X_train.shape, y_train.shape, X_test.shape, y_test.shape)
```

(350, 2) (350,) (150, 2) (150,)

``` python
# Instanciamos nuestra regresión lineal y la entrenamos

linear_model = LinearRegression()

linear_model.fit(X_train, y_train)

# Obtenemos los componentes de nuestro regresor. A diferencia del regresor con un solo atributo, aquí tenemos dos pendientes

print('Las pendientes del modelo de regresión lineal son:', linear_model.coef_)
print('La ordenada al origen del modelo de regresión lineal es:', linear_model.intercept_)
```

Las pendientes del modelo de regresión lineal son: [-3.15518728  1.99995189]
La ordenada al origen del modelo de regresión lineal es: 4.049886692119578

En este caso, la curva que aproxima a los datos ya no es una recta sino
una superficie. La función definida abajo nos permite graficarla

``` python
from matplotlib import cm

def plot_3d_regressor(x1_min, x1_max, x2_min,x2_max, N, regressor, ax=None, fig = None):
    x1 = np.linspace(x1_min,x1_max,N) 
    x2 = np.linspace(x2_min,x2_max,N)
    X1, X2 = np.meshgrid(x1,x2)
    
    y = regressor.predict(np.array([X1.ravel(), X2.ravel()]).T)
    Y = y.reshape(X1.shape)
    
    if (fig is None) and (ax is None):
        fig = plt.figure()
        ax = fig.add_subplot(111, projection='3d')
    
    surf = ax.plot_surface(X1, X2, Y, cmap=cm.coolwarm,
                       linewidth=0, antialiased=False, alpha = 0.5)

fig = plt.figure(figsize = (30,15))
ax = fig.add_subplot(131, projection='3d')
plt.title('Regresión Lineal')
plot_3d_regressor(0, 1, 0, 1, 100, linear_model, ax, fig)
plot_3d_scatter(x1, x2, y, ax, fig)
```

<img src="/m1/1/bf7549353436dae228f838276a878ea6e39cb7de.png" alt="Regresion lineal" />

``` python
from sklearn.metrics import mean_squared_error

y_train_pred = linear_model.predict(X_train)
y_test_pred = linear_model.predict(X_test)

rmse_train = np.sqrt(mean_squared_error(y_train, y_train_pred))
rmse_test = np.sqrt(mean_squared_error(y_test, y_test_pred))
print(f'Raíz del error cuadrático medio en Train: {rmse_train}')
print(f'Raíz del error cuadrático medio en Test: {rmse_test}')

plt.figure(figsize = (12,5))

plt.subplot(1,2,1)
plt.title('Histograma de errores')
sns.distplot(y_train - y_train_pred, bins = 20, label = 'train')
sns.distplot(y_test - y_test_pred, bins = 20, label = 'test')
plt.xlabel('errores')
plt.legend()

ax = plt.subplot(1,2,2)
plt.title('Y real vs Y predicho')
ax.scatter(y_test,y_test_pred, s =2, label = 'Y real')
lims = [
np.min([ax.get_xlim(), ax.get_ylim()]),  # min of both axes
np.max([ax.get_xlim(), ax.get_ylim()]),  # max of both axes]
]

ax.plot(lims, lims, 'k-', alpha=0.75, zorder=0, label = 'Y predicho')
plt.xlabel('y (test)')
plt.ylabel('y_pred (test)')

plt.legend()
plt.tight_layout()
plt.show()
```

Raíz del error cuadrático medio en Train: 0.9792708985720463
Raíz del error cuadrático medio en Test: 1.0524643771166953

<img src="/m1/1/08127fc78caf290b5d57438940f48d1b3cf27519.png" alt="Regresion lineal" />

## 3. Regresión lineal con atributos polinómicos

Aquí tocaremos otro tipo de relación lineal que se puede emplear para
problemas de regresión. Ya estamos en presencia de una regresión
avanzada que se utiliza para aplicar una regresión lineal a un problema
que no es lineal.

Para trabajar con un dataset que tengamos, que no sigue una relación
linean, y convertirlo en un problema lineal, debemos hacer un
preprocesamiento de los datos.

Lo que se hace en este punto es agregar más atributos.

Por ejemplo, si tenemos : Y = ax2 + bx + c

Lo podemos covertir a un problema lineal de la siguiente manera: Y = ax 1 + bx2 + c
donde x1 = x y x2 = x

De esta forma, se agregó una nueva dimensión. Debemos decidir hasta qué
grado agregar. Desde el punto de vista computacional, el dataset
obtenido puede ocupar mucho espacio.

``` python
# Procedemos a realizar un ejemplo de aplicación. Le agregamos ruido a Y

n = 300
x = np.linspace(-1,1,n)
y_real = -1.5*x**4+3*x**2+1
y = y_real + np.random.randn(n)

    array([-1.        , -0.99331104, -0.98662207, -0.97993311, -0.97324415,
            -0.96655518, -0.95986622, -0.95317726, -0.94648829, -0.93979933,
            -0.93311037, -0.9264214 , -0.91973244, -0.91304348, -0.90635452,
            -0.89966555, -0.89297659, -0.88628763, -0.87959866, -0.8729097 ,
            -0.86622074, -0.85953177, -0.85284281, -0.84615385, -0.83946488,
            -0.83277592, -0.82608696, -0.81939799, -0.81270903, -0.80602007,
            -0.7993311 , -0.79264214, -0.78595318, -0.77926421, -0.77257525,
            -0.76588629, -0.75919732, -0.75250836, -0.7458194 , -0.73913043,
            -0.73244147, -0.72575251, -0.71906355, -0.71237458, -0.70568562,
            -0.69899666, -0.69230769, -0.68561873, -0.67892977, -0.6722408 ,
            -0.66555184, -0.65886288, -0.65217391, -0.64548495, -0.63879599,
            -0.63210702, -0.62541806, -0.6187291 , -0.61204013, -0.60535117,
            -0.59866221, -0.59197324, -0.58528428, -0.57859532, -0.57190635,
            -0.56521739, -0.55852843, -0.55183946, -0.5451505 , -0.53846154,
            -0.53177258, -0.52508361, -0.51839465, -0.51170569, -0.50501672,
            -0.49832776, -0.4916388 , -0.48494983, -0.47826087, -0.47157191,
            -0.46488294, -0.45819398, -0.45150502, -0.44481605, -0.43812709,
            -0.43143813, -0.42474916, -0.4180602 , -0.41137124, -0.40468227,
            -0.39799331, -0.39130435, -0.38461538, -0.37792642, -0.37123746,
            -0.36454849, -0.35785953, -0.35117057, -0.34448161, -0.33779264,
            -0.33110368, -0.32441472, -0.31772575, -0.31103679, -0.30434783,
            -0.29765886, -0.2909699 , -0.28428094, -0.27759197, -0.27090301,
            -0.26421405, -0.25752508, -0.25083612, -0.24414716, -0.23745819,
            -0.23076923, -0.22408027, -0.2173913 , -0.21070234, -0.20401338,
            -0.19732441, -0.19063545, -0.18394649, -0.17725753, -0.17056856,
            -0.1638796 , -0.15719064, -0.15050167, -0.14381271, -0.13712375,
            -0.13043478, -0.12374582, -0.11705686, -0.11036789, -0.10367893,
            -0.09698997, -0.090301  , -0.08361204, -0.07692308, -0.07023411,
            -0.06354515, -0.05685619, -0.05016722, -0.04347826, -0.0367893 ,
            -0.03010033, -0.02341137, -0.01672241, -0.01003344, -0.00334448,
            0.00334448,  0.01003344,  0.01672241,  0.02341137,  0.03010033,
            0.0367893 ,  0.04347826,  0.05016722,  0.05685619,  0.06354515,
            0.07023411,  0.07692308,  0.08361204,  0.090301  ,  0.09698997,
            0.10367893,  0.11036789,  0.11705686,  0.12374582,  0.13043478,
            0.13712375,  0.14381271,  0.15050167,  0.15719064,  0.1638796 ,
            0.17056856,  0.17725753,  0.18394649,  0.19063545,  0.19732441,
            0.20401338,  0.21070234,  0.2173913 ,  0.22408027,  0.23076923,
            0.23745819,  0.24414716,  0.25083612,  0.25752508,  0.26421405,
            0.27090301,  0.27759197,  0.28428094,  0.2909699 ,  0.29765886,
            0.30434783,  0.31103679,  0.31772575,  0.32441472,  0.33110368,
            0.33779264,  0.34448161,  0.35117057,  0.35785953,  0.36454849,
            0.37123746,  0.37792642,  0.38461538,  0.39130435,  0.39799331,
            0.40468227,  0.41137124,  0.4180602 ,  0.42474916,  0.43143813,
            0.43812709,  0.44481605,  0.45150502,  0.45819398,  0.46488294,
            0.47157191,  0.47826087,  0.48494983,  0.4916388 ,  0.49832776,
            0.50501672,  0.51170569,  0.51839465,  0.52508361,  0.53177258,
            0.53846154,  0.5451505 ,  0.55183946,  0.55852843,  0.56521739,
            0.57190635,  0.57859532,  0.58528428,  0.59197324,  0.59866221,
            0.60535117,  0.61204013,  0.6187291 ,  0.62541806,  0.63210702,
            0.63879599,  0.64548495,  0.65217391,  0.65886288,  0.66555184,
            0.6722408 ,  0.67892977,  0.68561873,  0.69230769,  0.69899666,
            0.70568562,  0.71237458,  0.71906355,  0.72575251,  0.73244147,
            0.73913043,  0.7458194 ,  0.75250836,  0.75919732,  0.76588629,
            0.77257525,  0.77926421,  0.78595318,  0.79264214,  0.7993311 ,
            0.80602007,  0.81270903,  0.81939799,  0.82608696,  0.83277592,
            0.83946488,  0.84615385,  0.85284281,  0.85953177,  0.86622074,
            0.8729097 ,  0.87959866,  0.88628763,  0.89297659,  0.89966555,
            0.90635452,  0.91304348,  0.91973244,  0.9264214 ,  0.93311037,
            0.93979933,  0.94648829,  0.95317726,  0.95986622,  0.96655518,
            0.97324415,  0.97993311,  0.98662207,  0.99331104,  1.        ])

# Graficamos los datos y la curva teórica

plt.figure(figsize= (10,6))
plt.scatter(x,y, s = 2, label = 'Datos')
plt.plot(x, y_real, '--',label ='Curva Teórica', c = 'r')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.show()
```

<img src="/m1/1/41200211048e9d46b04d3eee0f979f1c40f94012.png" alt="Regresion lineal" />

``` python
# Dividimos los datos en subset de entrenamiento y testeo para poder aplicar el flujo de trabajo de Scikit-Learn

from sklearn.model_selection import train_test_split

X = x.reshape(-1,1)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# Primero instanciaremos un modelo básico de relación lineal para poder compararlo, posteriormente, con una regresión lineal con atributos polinómicos

from sklearn.linear_model import LinearRegression
reg_1 = LinearRegression()

# Entrenamos el modelo con los datos de entrenamiento

reg_1.fit(X_train, y_train)

# Predecimos

y_train_pred_1 = reg_1.predict(X_train)
y_test_pred_1 = reg_1.predict(X_test)

plt.figure(figsize = (8,4))
plt.scatter(x,y, s = 2, label = 'Datos')
plt.plot(x, y_real, '--',label ='Curva Teórica', c = 'r')
plt.scatter(X_test,y_test_pred_1,label ='Regresion Lineal (Test)', c = 'g')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
```

    <matplotlib.legend.Legend at 0x7f217d2687c0>

<img src="/m1/1/88cfef12b75e5c427dabaa0c135618bc5a4700d3.png" alt="Regresion lineal" />

Observamos que utilizar un modelo de regresión lineal para un problema o
datos que no responden a esa dinámica, nos da un modelo que no se adapta
bien a los datos.

En este momento es donde entra en juego la posibilidad de utilizar una
regresión lineal con atributos polinómicos.

Debemos importar de Scikit-Learn la clase `Polynomial Features`.

``` python
from sklearn.preprocessing import PolynomialFeatures
```

Creamos un objeto a partir de la clase `PolynomialFeatures`. Con degree
establecemos la cantidad de grados que queremos darle.

``` python
poly = PolynomialFeatures(4, include_bias=False)

#Entrenamos y transformamos los atributos para poder obtener un grado 4

X_train_new = poly.fit_transform(X_train)
X_test_new = poly.fit_transform(X_test)
print(X_train_new.shape, X_test_new.shape)
```

    (225, 4) (75, 4)

``` python
# Instanciamos un nuevo modelo de regresión lineal, pero ahora tendrá los atributos polinómicos que definimos en la celda anterior
reg_2 = LinearRegression()

# Entrenamos la regresión con los atributos X polinómicos
reg_2.fit(X_train_new, y_train)

# Predecimos
y_train_pred_2 = reg_2.predict(X_train_new)
y_test_pred_2 = reg_2.predict(X_test_new)

plt.figure(figsize = (40,8))
plt.subplot(1,3,1)
plt.scatter(x,y, s = 2, label = 'Datos', color = 'black')
plt.plot(x, y_real, '--',label ='Curva Teórica', c = 'r')

list1, list2 = zip(*sorted(zip(X_train_new[:,0], y_train_pred_2)))
plt.plot(list1, list2,label ='Regresión (train)')

list1, list2 = zip(*sorted(zip(X_test_new[:,0], y_test_pred_2)))
plt.plot(list1, list2,label = 'Regresión (test)')
plt.legend()
plt.show()
```

<img src="/m1/1/34a04d42bbe45ccba38883fbaf56bad840ba2732.png" alt="Regresion lineal" />

*Ahora, al agregarle atributos polinómicos a nuestra regresión lineal,
tenemos un modelo que se adapta mucho mejor a nuestros datos.*

<!-- ## Práctica Adicional

La tarea implica cargar el archivo `data_regression.csv` y fittear un
modelo lineal simple usando cada variable $X$ primero, y después un
modelo linear múltiple usando $X1$, $X2$ y $X3$ al mismo tiempo.

1- ¿Qué diferencias existe entre la relación de cada variable de input
con el output ($y$)?

2- ¿Cómo es la correlación entre las variables regresoras y el output?

3- ¿Qué pueden notar cuando realizan la regresión múltiple?¿Los
resultados difieren de lo anterior?

4- Calcule las medidas MSE y Coeficiente R2 para evaluar cada modelo.
 -->