---
title: "Reducción de dimensionalidad (Aprendisaje no supervisado)"
description: "En este notebook veremos, dentro de la técnica de
`reducción de dimensionalidad`, los dos algoritmos estudiados en la
parte teórica: SVD y PCA."
pubDate: "Jul 08 2022"
heroImage: "/placeholder-hero.jpg"
url: "/clustering/reduccion_dimensionalidad"
---

---

### SVD

**Compresión de imagen**

SVD puede ser usado en el contexto de imágenes para la compresión.

Si en lugar de guardar la foto entera -Matriz M-, guardamos una
representación reducida de esta matriz -B- y la manera de pasar de un
espacio a otro -V\*-, entonces se podría ahorrar mucho espacio a la hora
de guardar la imagen.

El formalismo de SVD nos asegura que dado el rango que eligamos (r), la
foto que podamos reconstruir a partir de B y V\* (M virgulilla) será la
*más parecida* posible a la imagen original (M).

``` python
# Cargamos la imagen

from PIL import Image
import matplotlib.pyplot as plt
import numpy as np
%matplotlib inline
plt.style.use('classic')
img = Image.open('../datasets/bosque.jpg')

imggray = img.convert('LA')

imgmat = np.array(list(imggray.getdata(band=0)), float)

imgmat.shape = (imggray.size[1], imggray.size[0])

plt.figure(figsize=(9, 6))
plt.imshow(imgmat, cmap='gray')
plt.show()
```

<img src="/m6/3/197457187111bcb71c1f395d0a459a8bfda6534a.png" alt="dimensionalidad" />

``` python
imgmat.shape
```

    (400, 800)

``` python
import numpy as np
import pandas as pd

U, D, V = np.linalg.svd(imgmat)

# Si multiplicamos los 3 elementos, obtendríamos la imagen original
```

``` python
v = 30
reconstimg = np.matrix(U[:, :v]) * np.diag(D[:v]) * np.matrix(V[:v, :])
plt.imshow(reconstimg, cmap='gray')
plt.show()
```

<img src="/m6/3/7f52c81c001dc33ab607b17c86332b3897d1900a.png" alt="dimensionalidad" />

``` python
#Ejemplo SVD con una matriz de 7 filas por 4 columnas.

matriz = ([     [10,  9, 2, 0],
                [ 9,  8, 1, 1],
                [ 1,  2, 3, 2],
                [ 0,  2, 0, 1],
                [ 5,  6, 5, 5],
                [ 5,  4, 9, 9],
                [ 4,  6, 8,10]])
```

``` python
mU, mD, mV = np.linalg.svd(matriz)
```

``` python
for i in [1, 2, 3, 4]:
    matizresultante = np.matrix(mU[:, :i]) * np.diag(mD[:i])# * np.matrix(mV[:i, :])
    print("Matriz ", i, ":\n",matizresultante)
```

    Matriz  1 :
     [[-11.16011545]
     [-10.0839765 ]
     [ -3.90807933]
     [ -1.55292459]
     [-10.51191096]
     [-13.06994253]
     [-13.63559774]]
    Matriz  2 :
     [[-11.16011545   7.74862982]
     [-10.0839765    6.69340669]
     [ -3.90807933  -1.30111364]
     [ -1.55292459   0.169343  ]
     [-10.51191096  -0.42400061]
     [-13.06994253  -5.47536013]
     [-13.63559774  -5.36318123]]
    Matriz  3 :
     [[-1.11601154e+01  7.74862982e+00  4.40714361e-01]
     [-1.00839765e+01  6.69340669e+00 -1.85446502e-01]
     [-3.90807933e+00 -1.30111364e+00 -1.29073558e-02]
     [-1.55292459e+00  1.69342996e-01 -1.59474143e+00]
     [-1.05119110e+01 -4.24000606e-01 -4.40128473e-01]
     [-1.30699425e+01 -5.47536013e+00  1.47121795e+00]
     [-1.36355977e+01 -5.36318123e+00 -1.10912421e+00]]
    Matriz  4 :
     [[-1.11601154e+01  7.74862982e+00  4.40714361e-01  4.65112824e-01]
     [-1.00839765e+01  6.69340669e+00 -1.85446502e-01 -6.90893959e-01]
     [-3.90807933e+00 -1.30111364e+00 -1.29073558e-02  1.01678546e+00]
     [-1.55292459e+00  1.69342996e-01 -1.59474143e+00  1.28638849e-01]
     [-1.05119110e+01 -4.24000606e-01 -4.40128473e-01  3.55300339e-01]
     [-1.30699425e+01 -5.47536013e+00  1.47121795e+00 -1.80420010e-01]
     [-1.36355977e+01 -5.36318123e+00 -1.10912421e+00 -2.76775941e-01]]

``` python
i = 4
matizresultante = np.matrix(mU[:, :i]) * np.diag(mD[:i]) * np.matrix(mV[:i, :])
print("Matriz ", i, ":\n",matizresultante)
```

    Matriz  4 :
     [[ 1.00000000e+01  9.00000000e+00  2.00000000e+00 -4.67123690e-15]
     [ 9.00000000e+00  8.00000000e+00  1.00000000e+00  1.00000000e+00]
     [ 1.00000000e+00  2.00000000e+00  3.00000000e+00  2.00000000e+00]
     [-2.76286755e-17  2.00000000e+00  9.34623207e-16  1.00000000e+00]
     [ 5.00000000e+00  6.00000000e+00  5.00000000e+00  5.00000000e+00]
     [ 5.00000000e+00  4.00000000e+00  9.00000000e+00  9.00000000e+00]
     [ 4.00000000e+00  6.00000000e+00  8.00000000e+00  1.00000000e+01]]

``` python
reconstimg.reshape(reconstimg.size)
```

    matrix([[97.89910925, 93.87590473, 93.61202797, ..., 75.52943273,
             72.50081527, 64.85350929]])

``` python
i = 15
reconstimg = np.matrix(U[:, :i]) * np.diag(D[:i]) * np.matrix(V[:i, :])
plt.imshow(reconstimg, cmap='gray')
plt.show()
```

<img src="/m6/3/8226b5eff63f9b5a3ccae261ad0b6603c1a3bfac.png" alt="dimensionalidad" />

No es muy óptimo el resultado obtenido, pero ya se logra vislumbrar al
menos la idea de la imagen. Tengamos en cuenta que contamos con poca
información.

Probemos, ahora, una cantidad más razonable de valores singulares y
comprobemos los resultados.

``` python
A = reconstimg.reshape((reconstimg.size,))
A.shape
```

    (1, 320000)

``` python
for i in [5, 10, 15, 20, 30, 50,100]:
    reconstimg = np.matrix(U[:, :i]) * np.diag(D[:i]) * np.matrix(V[:i, :])
    plt.imshow(reconstimg, cmap='gray')
    title = "n = %s" % i
    plt.title(title)
    plt.show()
```

<img src="/m6/3/09bf76a3f0a41bc420e8adfa8db3cef80d581651.png" alt="dimensionalidad" />

<img src="/m6/3/7a85719e5959d45f95b167e126cde97bf0db2f83.png" alt="dimensionalidad" />

<img src="/m6/3/670245c6f5e1481208c954019173f9be815317c4.png" alt="dimensionalidad" />

<img src="/m6/3/b99d0638b017f946f8f2e33dd338de3e078e9704.png" alt="dimensionalidad" />

<img src="/m6/3/8d6bc9d5a3e78dcb6c7469b2c82ff8fbf00f0934.png" alt="dimensionalidad" />

<img src="/m6/3/415f277bcf45c0dd6a9a15aebf638fb94ce5512d.png" alt="dimensionalidad" />

<img src="/m6/3/585145bd626199fb267434a4d8fc61841e0327d6.png" alt="dimensionalidad" />

------------------------------------------------------------------------

### **PCA**

La reducción de dimensionalidad puede pensarse como una parte del
preprocesamiento de datos, es decir, de mejora de los features que
utilizará un modelo predictivo.

A continuación, mostraremos un ejemplo donde selecionamos a mano una
combinación de features que mejoran el rendimiento de un modelo.

``` python
import seaborn as sns
sns.set()
```

``` python
# Cargamos el dataset que usaremos

data = pd.read_csv('../datasets/Clase_05_PCA.csv', index_col = 0)
```

``` python
plt.scatter(data['x1'], data['x2'], c = data['y'])
plt.show()
```

<img src="/m6/3/f8393a58c9da1c47920d889bc1565688d3cded59.png" alt="dimensionalidad" />

``` python
# Hacemos un mapa de calor

corr = data.corr(method='pearson')
plt.figure(figsize=(7,7))
sns.heatmap(corr, cbar = True,  square = True, annot=True, fmt= '.2f',annot_kws={'size': 15},
           xticklabels= data.columns, 
           yticklabels= data.columns,
           cmap= 'coolwarm')

plt.show()
```

<img src="/m6/3/fc2985099abab6a060ce896b75dce4b9d9cfcd76.png" alt="dimensionalidad" />

Podemos ver que los atributos están muy correlacionados entre sí pero
poco correlacionados con la etiqueta *y* que queremos predecir.

Entrenemos un árbol de decisión para apredecir el valor de y.

``` python
X = data[['x1', 'x2']].values
y = data['y'].values
```

``` python
from sklearn.model_selection import train_test_split

# Separamos los datos

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)
```

``` python
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_squared_error

# Instanciamos y entrenamos

regresor = DecisionTreeRegressor(max_depth=1)
regresor.fit(X_train,y_train)

# Predecimos

y_train_pred = regresor.predict(X_train)
y_test_pred = regresor.predict(X_test)

# Evaluamos

print('MSE en train:', mean_squared_error(y_train,y_train_pred))
print('MSE en test:', mean_squared_error(y_test,y_test_pred))
```

    MSE en train: 0.3187732833599862
    MSE en test: 0.30794908845942776

**El modelo no predice muy bien. Eso se debe a que no hemos hecho una
ingeniería de features**

``` python
# Probamos agregar un nuevo atributo con la información que nos brindan los dos que ya tenemos

data['x_nuevo'] = data['x2'] - data['x1']
X_new = data['x_nuevo'].values
```

``` python
# Separamos los datos
X_train, X_test, y_train, y_test = train_test_split(X_new, y, test_size=0.33, random_state=42)

# Instanciamos el modelo y entramos
regresor = DecisionTreeRegressor(max_depth=1)
regresor.fit(X_train.reshape(-1,1),y_train)

# Predecimos
y_train_pred = regresor.predict(X_train.reshape(-1,1))
y_test_pred = regresor.predict(X_test.reshape(-1,1))

# Evaluamos
print('MSE en train:', mean_squared_error(y_train,y_train_pred))
print('MSE en test:', mean_squared_error(y_test,y_test_pred))
```

    MSE en train: 0.0805587181170301
    MSE en test: 0.09314442905377453

**Fíjense cómo mejoró, ahora, sustancialmente nuestro modelo**.

``` python
# Ploteamos un gráfico de dispersión con el atributo nuevo y la variable de salida

plt.scatter(data['x_nuevo'], data['y'])
plt.show()
```

<img src="/m6/3/cea34c09506be47a01e8ffeb004b50b9e03ebe30.png" alt="dimensionalidad" />

``` python
# Volvemos a hacer el mapa de calor. Recordá que ahora tenemos 3 atributos

corr = data.corr(method='pearson') # .corr is used for find corelation
plt.figure(figsize=(7,7))
sns.heatmap(corr, cbar = True,  square = True, annot=True, fmt= '.2f',annot_kws={'size': 15},
           xticklabels= data.columns, 
           yticklabels= data.columns,
           cmap= 'coolwarm')

plt.show()
```

<img src="/m6/3/9b72c6bd510e754998aec10b97b33ddba952a0af.png" alt="dimensionalidad" />

**`Por supuesto que la idea no es hacer esto a mano, sino de manera automática. Aquí es donde entra en juego el algoritmo PCA`**

``` python
from sklearn.decomposition import PCA

pca = PCA(n_components=1)
X_nuevo = pca.fit_transform(X) 
```

``` python
plt.scatter(X_nuevo[:,0], X[:,1], c = y)
plt.show()
```

<img src="/m6/3/1799383c08164bfb3650f11c66264599784e7e46.png" alt="dimensionalidad" />

``` python
# Separamos los datos
X_train, X_test, y_train, y_test = train_test_split(X_nuevo, y, test_size=0.33, random_state=42)

# Instanciamos el modelo y lo entrenamos
regresor2 = DecisionTreeRegressor(max_depth=1)
regresor2.fit(X_train,y_train)

# Predecimos
y_train_pred = regresor.predict(X_train.reshape(-1,1))
y_test_pred = regresor.predict(X_test.reshape(-1,1))

# Evaluamos
print('MSE en train:', mean_squared_error(y_train,y_train_pred))
print('MSE en test:', mean_squared_error(y_test,y_test_pred))
```

    MSE en train: 0.5940713347330022
    MSE en test: 0.6988341165412667

``` python
# Nos fijamos qué feature fue el más importante a la hora de predecir

regresor2.feature_importances_
```

    array([1.])

Una aplicación notoria de la aplicación de PCA tiene que ver con la
llama *yield curve*. Esta curva representa la estructura que tienen las
tasas de interés de una entidad.

La forma más común de realizar pricing de un bono es utilizando su yield
to maturity. La YTM es la tasa de interés que deja el valor de los
flujos de fondos descontados, incluyendo la inversión inicial, en cero.
Conociendo el flujo de caja, la fecha de liquidación y el precio de un
bono, se puede conseguir la YTM. Inversamente, teniendo el flujo de
caja, fecha de liquidación y YTM, podemos calcular el precio de este. Es
muy importante saber que la relación entre precio y YTM o TIR es una
relación inversa. A mayor precio menor la TIR, ya que estamos pagando
más por un mismo flujo de caja.

``` python
rates = pd.read_csv('../Datasets/Clase_05_Yield_Curve.csv')
rates
```

``` python
rates.Date = pd.to_datetime(rates.Date)

rates.index = rates.Date

rates.drop(['Date'], axis =1, inplace =True)
```

``` python
rates.sort_values('Date', inplace = True)
```

``` python
rates
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>1 Mo</th>
      <th>2 Mo</th>
      <th>3 Mo</th>
      <th>6 Mo</th>
      <th>1 Yr</th>
      <th>2 Yr</th>
      <th>3 Yr</th>
      <th>5 Yr</th>
      <th>7 Yr</th>
      <th>10 Yr</th>
      <th>20 Yr</th>
      <th>30 Yr</th>
    </tr>
    <tr>
      <th>Date</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2022-01-03</th>
      <td>0.05</td>
      <td>0.06</td>
      <td>0.08</td>
      <td>0.22</td>
      <td>0.40</td>
      <td>0.78</td>
      <td>1.04</td>
      <td>1.37</td>
      <td>1.55</td>
      <td>1.63</td>
      <td>2.05</td>
      <td>2.01</td>
    </tr>
    <tr>
      <th>2022-01-04</th>
      <td>0.06</td>
      <td>0.05</td>
      <td>0.08</td>
      <td>0.22</td>
      <td>0.38</td>
      <td>0.77</td>
      <td>1.02</td>
      <td>1.37</td>
      <td>1.57</td>
      <td>1.66</td>
      <td>2.10</td>
      <td>2.07</td>
    </tr>
    <tr>
      <th>2022-01-05</th>
      <td>0.05</td>
      <td>0.06</td>
      <td>0.09</td>
      <td>0.22</td>
      <td>0.41</td>
      <td>0.83</td>
      <td>1.10</td>
      <td>1.43</td>
      <td>1.62</td>
      <td>1.71</td>
      <td>2.12</td>
      <td>2.09</td>
    </tr>
    <tr>
      <th>2022-01-06</th>
      <td>0.04</td>
      <td>0.05</td>
      <td>0.10</td>
      <td>0.23</td>
      <td>0.45</td>
      <td>0.88</td>
      <td>1.15</td>
      <td>1.47</td>
      <td>1.66</td>
      <td>1.73</td>
      <td>2.12</td>
      <td>2.09</td>
    </tr>
    <tr>
      <th>2022-01-07</th>
      <td>0.05</td>
      <td>0.05</td>
      <td>0.10</td>
      <td>0.24</td>
      <td>0.43</td>
      <td>0.87</td>
      <td>1.17</td>
      <td>1.50</td>
      <td>1.69</td>
      <td>1.76</td>
      <td>2.15</td>
      <td>2.11</td>
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
    </tr>
    <tr>
      <th>2022-08-26</th>
      <td>2.39</td>
      <td>2.69</td>
      <td>2.89</td>
      <td>3.26</td>
      <td>3.36</td>
      <td>3.37</td>
      <td>3.40</td>
      <td>3.20</td>
      <td>3.14</td>
      <td>3.04</td>
      <td>3.44</td>
      <td>3.21</td>
    </tr>
    <tr>
      <th>2022-08-29</th>
      <td>2.45</td>
      <td>2.75</td>
      <td>2.97</td>
      <td>3.32</td>
      <td>3.43</td>
      <td>3.42</td>
      <td>3.45</td>
      <td>3.27</td>
      <td>3.21</td>
      <td>3.12</td>
      <td>3.50</td>
      <td>3.25</td>
    </tr>
    <tr>
      <th>2022-08-30</th>
      <td>2.43</td>
      <td>2.73</td>
      <td>2.97</td>
      <td>3.31</td>
      <td>3.48</td>
      <td>3.46</td>
      <td>3.47</td>
      <td>3.27</td>
      <td>3.22</td>
      <td>3.11</td>
      <td>3.49</td>
      <td>3.23</td>
    </tr>
    <tr>
      <th>2022-08-31</th>
      <td>2.40</td>
      <td>2.72</td>
      <td>2.96</td>
      <td>3.32</td>
      <td>3.50</td>
      <td>3.45</td>
      <td>3.46</td>
      <td>3.30</td>
      <td>3.25</td>
      <td>3.15</td>
      <td>3.53</td>
      <td>3.27</td>
    </tr>
    <tr>
      <th>2022-09-01</th>
      <td>2.53</td>
      <td>2.80</td>
      <td>2.97</td>
      <td>3.34</td>
      <td>3.51</td>
      <td>3.51</td>
      <td>3.54</td>
      <td>3.39</td>
      <td>3.36</td>
      <td>3.26</td>
      <td>3.64</td>
      <td>3.37</td>
    </tr>
  </tbody>
</table>
<p>168 rows × 12 columns</p>
</div>

``` python
# Estandarizamos los datos
from sklearn.preprocessing import StandardScaler
rates_std = StandardScaler().fit_transform(rates)
```

``` python
rates_std
```

    array([[-0.92806373, -1.07760745, -1.20526665, ..., -1.83321512,
            -1.76658316, -1.77265573],
           [-0.91605366, -1.08878954, -1.20526665, ..., -1.77428284,
            -1.66721064, -1.63362391],
           [-0.92806373, -1.07760745, -1.19436279, ..., -1.67606235,
            -1.62746163, -1.58727997],
           ...,
           [ 1.93033252,  1.90801082,  1.94595072, ...,  1.07411112,
             1.09534544,  1.05432465],
           [ 1.89430232,  1.89682873,  1.93504685, ...,  1.1526875 ,
             1.17484346,  1.14701253],
           [ 2.05043321,  1.98628545,  1.94595072, ...,  1.36877256,
             1.39346301,  1.37873223]])

``` python
pca = PCA(n_components = 5)
bondpca = pca.fit_transform(rates_std)
dfpca = pd.DataFrame(data = bondpca, columns = ['Componente 1','Componente 2','Componente 3','Componente 4',
                                               'Componente 5'])
dfpca.head()
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Componente 1</th>
      <th>Componente 2</th>
      <th>Componente 3</th>
      <th>Componente 4</th>
      <th>Componente 5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5.713217</td>
      <td>1.029414</td>
      <td>-0.409497</td>
      <td>-0.108208</td>
      <td>0.034213</td>
    </tr>
    <tr>
      <th>1</th>
      <td>5.634335</td>
      <td>0.953587</td>
      <td>-0.551892</td>
      <td>-0.068793</td>
      <td>0.002894</td>
    </tr>
    <tr>
      <th>2</th>
      <td>5.456753</td>
      <td>0.831444</td>
      <td>-0.501972</td>
      <td>-0.111132</td>
      <td>0.002245</td>
    </tr>
    <tr>
      <th>3</th>
      <td>5.352647</td>
      <td>0.764019</td>
      <td>-0.425846</td>
      <td>-0.137486</td>
      <td>0.018702</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5.270257</td>
      <td>0.695711</td>
      <td>-0.478873</td>
      <td>-0.166068</td>
      <td>0.022541</td>
    </tr>
  </tbody>
</table>
</div>
```

Recordemos que el análisis de componentes principales busca reducir la
dimensionalidad de los datos. Por este motivo, podemos elegir el número
de componentes que expliquen el mayor porcentaje de la varianza
acumulado. Esto puede verse también a través de un scree plot donde se
grafica el porcentaje de la varianza explicada contra cada componente y
se elije una cantidad n de componentes donde se produzca un \"codo\".

``` python
  print(pca.explained_variance_ratio_)
```

    [9.00473142e-01 9.10572859e-02 6.13338983e-03 1.10196448e-03
     7.72161262e-04]

``` python
fig = plt.figure(figsize = (8,8))
ax = fig.add_subplot(1,1,1) 
ax.set_xlabel('Componentes', fontsize = 15)
ax.set_ylabel('Varianza Explicada', fontsize = 15)
ax.set_title('Scree Plot', fontsize = 20)
plt.xticks(np.arange(0, 5, step=1))
plt.plot(pca.explained_variance_ratio_)
```

    [<matplotlib.lines.Line2D at 0x24081729360>]

<img src="/m6/3/369c3fe3407bcf15f1297f11280ddabb4c64bb09.png" alt="dimensionalidad" />

En el análisis empírico de la curva de bonos, se reconocen 3 componentes
principales como importantes. El primero de nivel, el segundo de
pendiente y el tercero de curvatura.

``` python
pca1 = dfpca["Componente 1"]
fig = plt.figure(figsize = (8,8))
ax = fig.add_subplot(1,1,1) 
ax.set_xlabel('Time', fontsize = 15)
ax.set_ylabel('Componente principal 1', fontsize = 15)
ax.set_title('Nivel', fontsize = 20)
plt.plot(rates.index,pca1)
```

    [<matplotlib.lines.Line2D at 0x24081510460>]

<img src="/m6/3/aa6537716f35a9636682f8d27efb394cb053ee04.png" alt="dimensionalidad" />

``` python
pca2 = dfpca["Componente 2"]
fig = plt.figure(figsize = (8,8))
ax = fig.add_subplot(1,1,1) 
ax.set_xlabel('Time', fontsize = 15)
ax.set_ylabel('Componente principal 2', fontsize = 15)
ax.set_title('Pendiente', fontsize = 20)
plt.plot(rates.index,pca2)
```

    [<matplotlib.lines.Line2D at 0x24090cf47c0>]

<img src="/m6/3/cbdfd5fa6b71fdccf306affd54f618c7f3c0dbaf.png" alt="dimensionalidad" />

``` python
fig = plt.figure(figsize = (8,8))
ax = fig.add_subplot(1,1,1) 
ax.set_xlabel('PCA1', fontsize = 15)
ax.set_ylabel('PCA2', fontsize = 15)
ax.set_title('PCA 1 vs PCA 2', fontsize = 20)
plt.scatter(pca1,pca2)
```

    <matplotlib.collections.PathCollection at 0x24093316ad0>

<img src="/m6/3/57cc371b91eda74b41e17709297c318ce0327903.png" alt="dimensionalidad" />

``` python
pca3 = dfpca["Componente 3"]
fig = plt.figure(figsize = (8,8))
ax = fig.add_subplot(1,1,1) 
ax.set_xlabel('Tiempo', fontsize = 15)
ax.set_ylabel('Componente principal 3', fontsize = 15)
ax.set_title('Curvatura', fontsize = 20)
plt.plot(rates.index,pca3)
```

    [<matplotlib.lines.Line2D at 0x240815f7fd0>]

<img src="/m6/3/5dbb11c017414b97094c922b29e594d5267bf83c.png" alt="dimensionalidad" />