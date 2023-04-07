---
title: "Serie de tiempo 3"
description: "En esta última práctica guiada de series de tiempo trabajaremos con el
dataset de temperaturas de la Ciudad Autónoma de Buenos Aires -ya
transformado a partir del análisis de la Práctica_01-."
pubDate: "Jul 22 2022"
heroImage: "/placeholder-hero.jpg"
url: "/time_series_3"
---

---

#### Contenido:

<ul>
  <li>
    <a href='#one-step' target='_self'>
      One-step
    </a>
  </li>
  <li>
    <a href='#multi-step' target='_self'>
      Multi-step
    </a>
  </li>
  <li>
    <a href='#prophet' target='_self'>
      Prophet
    </a>
  </li>
</ul>


## One-step

La principal adaptación que se necesita hacer para aplicar modelos de
Machine Learning a problemas de forecasting -proceso que consiste en
predecir el valor futuro de una serie temporal- es transformar la serie
temporal en un matriz en la que cada valor está asociado a la ventana
temporal (lags) que le precede. Esto significa que, para cada
predicción, se utilizan como predictores las temperaturas de la cantidad
de semanas establecidas como lags.

``` python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()
```

``` python
data = pd.read_csv(r'..\Datasets\Clase_04_temperatura_transf.csv')
```

``` python
data.head(3)
```

<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>fecha</th>
      <th>Tmax</th>
      <th>Tmin</th>
      <th>Tmean</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1959-01-04</td>
      <td>26.125</td>
      <td>15.850000</td>
      <td>20.987500</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1959-01-11</td>
      <td>26.600</td>
      <td>12.785714</td>
      <td>19.692857</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1959-01-18</td>
      <td>28.300</td>
      <td>16.885714</td>
      <td>22.592857</td>
    </tr>
  </tbody>
</table>
</div>
```

``` python
data['fecha'] = pd.to_datetime(data.fecha)
```

``` python
data.set_index('fecha', inplace = True)
```

``` python
# Nos quedamos solamente con la variable que queremos predecir

senial = data.Tmean
```

``` python
senial
```

    fecha
    1959-01-04    20.987500
    1959-01-11    19.692857
    1959-01-18    22.592857
    1959-01-25    23.850000
    1959-02-01    21.823810
                    ...    
    2018-05-20    14.050000
    2018-05-27    15.292857
    2018-06-03    14.542857
    2018-06-10    11.935714
    2018-06-17    11.133333
    Name: Tmean, Length: 3103, dtype: float64

``` python
#  Usamos x semanas para predecir el valor siguiente

look_back = 2*52 # En este caso, utilizaremos 2 años
```

``` python
N = senial.shape[0]
X = np.zeros((N - look_back - 1,look_back))
y = np.zeros(N - look_back - 1)
print(X.shape, y.shape)
```

    (2998, 104) (2998,)

``` python
# Llenamos los X e Y

for i in range(X.shape[0]):
    X[i,:] = senial.iloc[i:i+look_back]
    y[i] = senial.iloc[i+look_back]
```

``` python
N_train = 10*52 - look_back  # Cantidad de instancias anteriores que vamos a usar para entrenar el modelo. Elegimos 10 años
N_test = 4*52  # Cantidad de instancias que vamos a usar para evaluar el modelo. Elegimos 4 años
N_total = N_train + N_test

length_total = N_train + N_test + look_back

X_train = X[:N_train,:]
y_train = y[:N_train]
print('Shape de x e y en el set de entrenamiento:', X_train.shape, y_train.shape)

X_test = X[N_train:N_train+N_test,:]
y_test = y[N_train:N_train+N_test]
print('Shape de x e y en el set de testeo:', X_test.shape, y_test.shape)
```

    Shape de x e y en el set de entrenamiento: (416, 104) (416,)
    Shape de x e y en el set de testeo: (208, 104) (208,)

``` python
# Entrenamos un árbol de decisión
# ==============================================================================

from sklearn.metrics import mean_squared_error
from sklearn.tree import DecisionTreeRegressor
tree_reg = DecisionTreeRegressor(max_depth= 4, random_state=42)

tree_reg.fit(X_train,y_train)
```

``` python
# Ploteamos la importancia de los atributos

plt.figure(figsize = (12,7))
plt.scatter(np.arange(tree_reg.feature_importances_.size),tree_reg.feature_importances_)
for x in np.arange(3)*52:
     plt.axvline(x, linestyle ='--', color= 'r')
plt.show()
```

<img src="/m4/3/87dbe8dbca1865951c6c45138bc446e8cc0dd183.png" alt="Series de tiempo parte 3" />

``` python
# En esta parte predecimos
# ==============================================================================

y_pred = tree_reg.predict(X)
y_train_pred = tree_reg.predict(X_train)
y_test_pred = tree_reg.predict(X_test)
```

``` python
plt.figure(figsize=(16,8))
plt.plot(senial.index[:length_total], senial[:length_total],lw = 0.75, label = 'Serie de tiempo original')
plt.plot(senial.index[:N_train + look_back], senial[:N_train + look_back],'--', label = 'Conjunto de datos usados para entrenar')
plt.plot(senial.index[look_back: look_back + N_train], y_train_pred,'-.',label = 'Predicho en Train')
plt.plot(senial.index[N_train+look_back: length_total], y_test_pred,'-.', lw = 4, label = 'Predicho en Test')
plt.legend()
plt.xlabel('Tiempo')
plt.ylabel('Temperatura (°C)')
plt.show()
```

<img src="/m4/3/dc954e9c1a5f71ef64b91e6d5a385da2fd932c5a.png" alt="Series de tiempo parte 3" />

``` python
# Evaluamos el modelo
# ==============================================================================

MSE = mean_squared_error(y_train, y_train_pred)
print('Error en Train:',np.sqrt(MSE))

MSE = mean_squared_error(y_test, y_test_pred)
print('Error en Test:',np.sqrt(MSE))
```

    Error en Train: 2.0092702724200717
    Error en Test: 3.0748113205772483

## Multi-step

Cuando se trabaja con series temporales, raramente se quiere predecir
solo el siguiente elemento -step- de la serie (t+1), sino todo un
intervalo futuro o un punto alejado en el tiempo (t+n). A cada paso de
la predicción se le conoce como step.

Tenemos dos métodos para aplicar Multi-step. Uno se llama `recursivo` y
el otro `directo`. La predicción recursiva se basa en la predicción
anterior hecha por el modelo, mientras que el método directo entrena un
modelo diferente para cada uno de lo steps que se desea predecir.

En el recursivo, si establecemos una ventana temporal -o ventana de
predictores- de 10 para predecir, el valor t+1 va a tomar en cuenta las
10 semanas anteriores. Ahora bien, cuando queramos predecir el segundo
step (t+2), en los 10 lags que utiliza el modelo para predecir va a
considerar t+1 -o sea, un valor que no es real sino predicho-. Y así
sucesivamente. En el método directo, en cambio, si quisiéramos predecir
el resultado de las próximas 10 semanas de una serie, se entrenarán 10
modelos diferentes. Este método es mucho más costoso computacionalmente
porque requiere entrenar varios modelos (uno para cada step
-predicción-).

***`Método recursivo`***

`<img src = "https://www.cienciadedatos.net/images/diagrama-multistep-recursiva.png" height = 300>`{=html}

-   Ventajas: solo hay que entrenar un modelo.

-   Desventajas : cuanto más nos alejamos de los datos medidos, más
    probable que se acumulen errores

***`Método directo`***

`<img src = "https://www.cienciadedatos.net/images/diagrama-prediccion-multistep-directa.png" height = 300>`{=html}

-   Ventajas: no acumula error

-   Desventajas : hay que crear un modelo para cada paso. Tendremos
    tantos modelos como cantidad de semanas -en este caso- queramos
    predecir

### **Método recursivo**

Empecemos con el método recursivo. Crearemos y entrenaremos un modelo
autorregresivo recursivo (ForecasterAutoreg) a partir de un modelo de
árbol de decisión y una ventana temporal de 14 semanas (14 lags). Esto
último significa que, para cada predicción, se utilizan como predictores
los niveles de temperaturas de las 14 semanas anteriores.

``` python
from skforecast.ForecasterAutoreg import ForecasterAutoreg
from skforecast.ForecasterAutoregMultiOutput import ForecasterAutoregMultiOutput
```

``` python
senial
```

    fecha
    1959-01-04    20.987500
    1959-01-11    19.692857
    1959-01-18    22.592857
    1959-01-25    23.850000
    1959-02-01    21.823810
                    ...    
    2018-05-20    14.050000
    2018-05-27    15.292857
    2018-06-03    14.542857
    2018-06-10    11.935714
    2018-06-17    11.133333
    Name: Tmean, Length: 3103, dtype: float64

``` python
senial = senial.asfreq('W') # Multi-step necesita un índice que especifique la frecuencia
```

``` python
senial.index
```

    DatetimeIndex(['1959-01-04', '1959-01-11', '1959-01-18', '1959-01-25',
                   '1959-02-01', '1959-02-08', '1959-02-15', '1959-02-22',
                   '1959-03-01', '1959-03-08',
                   ...
                   '2018-04-15', '2018-04-22', '2018-04-29', '2018-05-06',
                   '2018-05-13', '2018-05-20', '2018-05-27', '2018-06-03',
                   '2018-06-10', '2018-06-17'],
                  dtype='datetime64[ns]', name='fecha', length=3103, freq='W-SUN')

``` python
# Separación de datos en set de entrenamiento y testeo
# ==============================================================================

steps = 52*4 # Cantidad de semanas que usaremos para testear
datos_train = senial[:-steps]
datos_test  = senial[-steps:]

print(f"Fechas train : {datos_train.index.min()} --- {datos_train.index.max()}  (n={len(datos_train)})")
print(f"Fechas test  : {datos_test.index.min()} --- {datos_test.index.max()}  (n={len(datos_test)})")

plt.subplots(figsize=(18, 7))
plt.plot(datos_train, label='train')
plt.plot(datos_test, label='test')
plt.xlabel('Fecha')
plt.ylabel('Temperatura (ºC')
plt.title('División del set de entrenamiento y test', fontsize = 15)
plt.legend()
plt.show()
```

    Fechas train : 1959-01-04 00:00:00 --- 2014-06-22 00:00:00  (n=2895)
    Fechas test  : 2014-06-29 00:00:00 --- 2018-06-17 00:00:00  (n=208)

<img src="/m4/3/4f89a1e1ab26c882580887523b047c57bc79b711.png" alt="Series de tiempo parte 3" />

``` python
# Fijamos, en lags, la ventana temporal que considerará el modelo para hacer sus predicciones

forecaster = ForecasterAutoreg(regressor = DecisionTreeRegressor(random_state=42), lags = 14)

forecaster.fit(y= datos_train)
forecaster
```

    ================= 
    ForecasterAutoreg 
    ================= 
    Regressor: DecisionTreeRegressor(random_state=42) 
    Lags: [ 1  2  3  4  5  6  7  8  9 10 11 12 13 14] 
    Window size: 14 
    Included exogenous: False 
    Type of exogenous variable: None 
    Exogenous variables names: None 
    Training range: [Timestamp('1959-01-04 00:00:00'), Timestamp('2014-06-22 00:00:00')] 
    Training index type: DatetimeIndex 
    Training index frequency: W-SUN 
    Regressor parameters: {'ccp_alpha': 0.0, 'criterion': 'squared_error', 'max_depth': None, 'max_features': None, 'max_leaf_nodes': None, 'min_impurity_decrease': 0.0, 'min_samples_leaf': 1, 'min_samples_split': 2, 'min_weight_fraction_leaf': 0.0, 'random_state': 42, 'splitter': 'best'} 
    Creation date: 2022-09-02 15:40:46 
    Last fit date: 2022-09-02 15:40:46 
    Skforecast version: 0.4.2 

``` python
# Una vez entrenado el modelo, se predicen los datos de test (valor fijado en steps cuando separamos los datos en train/test)

# Predicciones
# ==============================================================================

predicciones = forecaster.predict(steps= steps)
predicciones.head(5)
```

    2014-06-29    11.685714
    2014-07-06    10.992857
    2014-07-13     6.057143
    2014-07-20     7.435714
    2014-07-27     7.878571
    Freq: W-SUN, Name: pred, dtype: float64

``` python
plt.subplots(figsize=(16, 6))
plt.plot(datos_train, label='Datos de entrenamiento',)
plt.plot(datos_test, label='Datos de testeo')
plt.plot(predicciones, label='Predicciones en test', lw= 2)
plt.xlabel('Fecha')
plt.ylabel('Temperatura (ºC)')
plt.title('Multistep - recursivo', fontsize = 18)
plt.legend()
plt.show()
```

<img src="/m4/3/9fb776df410a5afe99c90cb0b95e24edeb722f7b.png" alt="Series de tiempo parte 3" />

``` python
# Error test
# ==============================================================================
error_mse = mean_squared_error(y_true = datos_test, y_pred = predicciones, squared= False)

print(f"Error de test (RMSE): {error_mse}")
```

    Error de test (RMSE): 5.585375017705508

### **Método directo**

``` python
forecaster = ForecasterAutoregMultiOutput(regressor = DecisionTreeRegressor(random_state=42),steps= steps, lags= 14)

forecaster.fit(y=datos_train)
forecaster
```

    ============================ 
    ForecasterAutoregMultiOutput 
    ============================ 
    Regressor: DecisionTreeRegressor(random_state=42) 
    Lags: [ 1  2  3  4  5  6  7  8  9 10 11 12 13 14] 
    Window size: 14 
    Maximum steps predicted: 208 
    Included exogenous: False 
    Type of exogenous variable: None 
    Exogenous variables names: None 
    Training range: [Timestamp('1959-01-04 00:00:00'), Timestamp('2014-06-22 00:00:00')] 
    Training index type: DatetimeIndex 
    Training index frequency: W-SUN 
    Regressor parameters: {'ccp_alpha': 0.0, 'criterion': 'squared_error', 'max_depth': None, 'max_features': None, 'max_leaf_nodes': None, 'min_impurity_decrease': 0.0, 'min_samples_leaf': 1, 'min_samples_split': 2, 'min_weight_fraction_leaf': 0.0, 'random_state': 42, 'splitter': 'best'} 
    Creation date: 2022-09-02 15:42:08 
    Last fit date: 2022-09-02 15:42:26 
    Skforecast version: 0.4.2 

``` python
# Predecimos
# ==============================================================================
predicciones = forecaster.predict()

# Ploteamos
# ==============================================================================
plt.subplots(figsize=(16, 6))
plt.plot(datos_train, label='Datos de entrenamiento')
plt.plot(datos_test, label='Datos de testeo')
plt.plot(predicciones, label='Predicción en test')
plt.title('Multistep - directo', fontsize = 18)
plt.xlabel('Número de semana')
plt.ylabel('Nivel de ventas (R$)')
plt.legend()
plt.show()
```

<img src="/m4/3/63789248b8381fa032097e6b403ede497b3cce23.png" alt="Series de tiempo parte 3" />

``` python
# Evaluación del modelo
# ==============================================================================

error_mse = mean_squared_error(y_true = datos_test, y_pred = predicciones, squared= False)
print(f"Error de test (RMSE) : {(error_mse)}")
```

    Error de test (RMSE) : 3.890319465636852

## Prophet

Prophet utiliza un modelo de regresión aditiva para descomponer la serie
temporal en varios componentes: la tendencia, la estacionalidad, los
festivos y el error:

$$y(t) = g(t) + s(t) + h(t) + e(t)$$

-   $g(t)$ es la tendencia, que representa los cambios no periódicos que
    se modelizarán asumiendo una relación lineal o logística.

-   $s(t)$ es la estacionalidad, que representa cambios periódicos:
    semanales, mensuales, anuales, etc.

-   $h(t)$ es el efecto de los festivos, que pueden aparecer de manera
    irregular y tener una duración de 1 día o más.

-   $e(t)$ es el término de error, que representa cambios
    *idiosincrásicos* que no se pueden acomodar al modelo. Se asume que
    estos errores deben tener una distribución normal.

Prophet utiliza el ajuste de curvas para descomponer las series de
tiempo, teniendo en cuenta la estacionalidad en múltiples escalas de
tiempo, efectos de vacaciones, puntos de cambio abruptos y tendencias a
largo plazo.

``` python
from prophet import Prophet
```

    c:\Users\Pablo\.virtualenvs\practice_3-XeMdu4oE\lib\site-packages\tqdm\auto.py:22: TqdmWarning: IProgress not found. Please update jupyter and ipywidgets. See https://ipywidgets.readthedocs.io/en/stable/user_install.html
      from .autonotebook import tqdm as notebook_tqdm
    prophet.plot ERROR Importing plotly failed. Interactive plots will not work.

``` python
# Prophet trabaja la columna fecha con el nombre 'ds' y la columna con las etiquetas con el nombre 'y'

data.reset_index(level= 0, inplace= True)
data.rename(columns= {'fecha': 'ds', 'Tmean' : 'y'}, inplace = True)
data.drop(columns= ['Tmax', 'Tmin'], inplace= True)
```

``` python
# Instanciamos un modelo de Prophet

prophet = Prophet(yearly_seasonality= True, uncertainty_samples = 50, mcmc_samples=50, interval_width= 0.6)

# Entrenamos el modelo
prophet.fit(data)

# Construimos un dataframe con los x valores futuros que querámos predecir. En este caso, 4 años.
build_forecast = prophet.make_future_dataframe(periods=(4*52), freq='W') #

# Predecimos
forecast = prophet.predict(build_forecast)
```

``` python
df_cv
```

<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ds</th>
      <th>yhat</th>
      <th>yhat_lower</th>
      <th>yhat_upper</th>
      <th>y</th>
      <th>cutoff</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1972-07-02</td>
      <td>9.903766</td>
      <td>8.362189</td>
      <td>12.234795</td>
      <td>8.285714</td>
      <td>1972-06-28</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1972-07-09</td>
      <td>9.962477</td>
      <td>8.198298</td>
      <td>12.261026</td>
      <td>9.728571</td>
      <td>1972-06-28</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1972-07-16</td>
      <td>10.050048</td>
      <td>8.082345</td>
      <td>12.554628</td>
      <td>7.525000</td>
      <td>1972-06-28</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1972-07-23</td>
      <td>10.337271</td>
      <td>8.527659</td>
      <td>12.410838</td>
      <td>8.541667</td>
      <td>1972-06-28</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1972-07-30</td>
      <td>10.811299</td>
      <td>9.225636</td>
      <td>12.979184</td>
      <td>11.975000</td>
      <td>1972-06-28</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>4584</th>
      <td>2018-05-20</td>
      <td>14.084277</td>
      <td>12.091974</td>
      <td>15.561075</td>
      <td>14.050000</td>
      <td>2014-06-18</td>
    </tr>
    <tr>
      <th>4585</th>
      <td>2018-05-27</td>
      <td>13.214854</td>
      <td>11.238024</td>
      <td>14.776258</td>
      <td>15.292857</td>
      <td>2014-06-18</td>
    </tr>
    <tr>
      <th>4586</th>
      <td>2018-06-03</td>
      <td>12.228363</td>
      <td>10.836461</td>
      <td>14.089860</td>
      <td>14.542857</td>
      <td>2014-06-18</td>
    </tr>
    <tr>
      <th>4587</th>
      <td>2018-06-10</td>
      <td>11.415267</td>
      <td>9.689274</td>
      <td>13.331569</td>
      <td>11.935714</td>
      <td>2014-06-18</td>
    </tr>
    <tr>
      <th>4588</th>
      <td>2018-06-17</td>
      <td>10.990318</td>
      <td>8.587009</td>
      <td>13.410584</td>
      <td>11.133333</td>
      <td>2014-06-18</td>
    </tr>
  </tbody>
</table>
<p>4589 rows × 6 columns</p>
</div>

``` python
df_p = performance_metrics(df_cv)
df_p.describe()
```

``` python
fig = plot_cross_validation_metric(df_cv, metric='rmse')
```

<img src="/m4/3/ed957317fd09182a16dbabb2dab11677a2fdf966.png" alt="Series de tiempo parte 3" />

``` python
print('El RMSE es:', df_p.rmse.mean())
```

    El RMSE es: 2.198439791627254

``` python
df_p = performance_metrics(df_cv, rolling_window = 1)
```

``` python
df_p
```

<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>horizon</th>
      <th>mse</th>
      <th>rmse</th>
      <th>mae</th>
      <th>mape</th>
      <th>mdape</th>
      <th>smape</th>
      <th>coverage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1460 days</td>
      <td>5.041213</td>
      <td>2.245265</td>
      <td>1.760246</td>
      <td>0.12589</td>
      <td>0.084638</td>
      <td>0.1199</td>
      <td>0.610591</td>
    </tr>
  </tbody>
</table>
</div>
