---
title: "Serie de tiempo 2"
description: "En esta segunda parte ya instanciaremos nuestro primer modelo predictivo
de series de tiempo. Este notebook aplicará un modelo ARIMA."
pubDate: "Jul 22 2022"
heroImage: "/placeholder-hero.jpg"
url: "/time_series_2"
---

---

Utilizaremos un dataset de ventas mensuales de champagne entre 1964 y
1972.
[Aquí](https://www.kaggle.com/datasets/anupamshah/perrin-freres-monthly-champagne-sales)
podrán encontrarlo.

``` python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import datetime
sns.set()
```

``` python
data = pd.read_csv(r'..\Datasets\Clase_04_champagne.csv')
```

``` python
data.head(3)
```

<div>
<table class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Month</th>
      <th>Perrin Freres monthly champagne sales millions ?64-?72</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1964-01</td>
      <td>2815.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1964-02</td>
      <td>2672.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1964-03</td>
      <td>2755.0</td>
    </tr>
  </tbody>
</table>
</div>

## **ARIMA**

Autoregresivo (AR) integrada (I) media móvil (MA) corresponde a uno de
los modelos clásicos más empleados. Explica una serie de tiempo en
función de sus propios valores pasados.

Comprende tres términos:

- p: es el orden del término AR
- q: es el orden del término MA
- d: es el número de diferencias necesarias para que la serie sea
    estacionaria

Para aplicar este modelo, lo primero es hacer que la serie sea
estacionaria. Esto se debe a que el término AR significa que el valor
actual de la serie es una función lineal de los valores anteriores. Es
decir, utiliza sus propios regazos como predictores.

Para hacer estacionaria la serie de tiempo, tenemos que encontrar el
orden de diferenciación -el término **d**-.

Previamente, para identificar si la serie es estacionaria, utilizaremos
la `prueba de Dickey-Fuller aumentada`. La hipótesis nula es que la
serie no es estacionaria. Entonces, si **p** -el valor de la prueba- es
menor que el nivel de significancia (0.05) se rechaza la hipótesis nula.

Mientras $P - Value > 0.05$ : seguimos buscando el orden de
diferenciación.

``` python
# Importamos el dataset

df = pd.read_csv(r'..\Datasets\Clase_04_champagne.csv')
```

``` python
df['Perrin Freres monthly champagne sales millions ?64-?72'].iloc[106]
```

    nan

``` python
# Hacemos una breve limpieza del dataset

df.columns=['Month','Sales']
df.drop([105,106], inplace= True)
```

``` python
df['Month']= pd.to_datetime(df['Month']) # Convertimos a tipo de dato datetime
df.set_index('Month',inplace=True) # Seteamos la fecha como índice
```

``` python
df
```

<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Sales</th>
    </tr>
    <tr>
      <th>Month</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1964-01-01</th>
      <td>2815.0</td>
    </tr>
    <tr>
      <th>1964-02-01</th>
      <td>2672.0</td>
    </tr>
    <tr>
      <th>1964-03-01</th>
      <td>2755.0</td>
    </tr>
    <tr>
      <th>1964-04-01</th>
      <td>2721.0</td>
    </tr>
    <tr>
      <th>1964-05-01</th>
      <td>2946.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
    </tr>
    <tr>
      <th>1972-05-01</th>
      <td>4618.0</td>
    </tr>
    <tr>
      <th>1972-06-01</th>
      <td>5312.0</td>
    </tr>
    <tr>
      <th>1972-07-01</th>
      <td>4298.0</td>
    </tr>
    <tr>
      <th>1972-08-01</th>
      <td>1413.0</td>
    </tr>
    <tr>
      <th>1972-09-01</th>
      <td>5877.0</td>
    </tr>
  </tbody>
</table>
<p>105 rows × 1 columns</p>
</div>

``` python
plt.figure(figsize=(15,5))
plt.title('Ventas de champagne entre 1964-1972', fontsize = 15)
plt.plot(df)
plt.show()
```

<img src="/m4/2/955b196fd5a52ad4a6698e25ba32d830ec4ecb4a.png" alt="Series de tiempo parte 2" />

``` python
### Verificamos la estacionariedad

from statsmodels.tsa.stattools import adfuller

test_result = adfuller(df['Sales'])
```

``` python
#H0: No es estacionaria
#H1: Es estacionaria

def adfuller_test(sales):
    result = adfuller(sales)
    labels = ['ADF Test Statistic','p-value','#Lags Used','Number of Observations Used']
    for value,label in zip(result,labels):
        print(label+' : '+str(value) )
    if result[1] <= 0.05:
        print('El valor de p es menor a 0.05, lo que significa que podemos recharzar la hipótesis nula H0. Podemos concluir que los datos no tienen raíz unitaria y son estacionarios.')
    else:
        print('Evidencia débil contra la hipótesis nula, lo cual significa que la serie de tiempo tiene una raíz unitaria que indica que no es estacionaria.')
```

``` python
adfuller_test(df['Sales'])
```

    ADF Test Statistic : -1.8335930563276175
    p-value : 0.3639157716602477
    #Lags Used : 11
    Number of Observations Used : 93
    Evidencia débil contra la hipótesis nula, lo cual significa que la serie de tiempo tiene una raíz unitaria que indica que no es estacionaria.

### `Diferenciación`

La diferenciación ($\Delta^n$) ayuda a eliminar los cambios de los datos
y hace que sean estacionarios.

``` python
df['Sales'],df['Sales'].shift(1)
```

    (Month
     1964-01-01    2815.0
     1964-02-01    2672.0
     1964-03-01    2755.0
     1964-04-01    2721.0
     1964-05-01    2946.0
                    ...  
     1972-05-01    4618.0
     1972-06-01    5312.0
     1972-07-01    4298.0
     1972-08-01    1413.0
     1972-09-01    5877.0
     Name: Sales, Length: 105, dtype: float64,
     Month
     1964-01-01       NaN
     1964-02-01    2815.0
     1964-03-01    2672.0
     1964-04-01    2755.0
     1964-05-01    2721.0
                    ...  
     1972-05-01    4788.0
     1972-06-01    4618.0
     1972-07-01    5312.0
     1972-08-01    4298.0
     1972-09-01    1413.0
     Name: Sales, Length: 105, dtype: float64)

``` python
df['Sales First Difference'] = df['Sales'] - df['Sales'].shift(1)
```

``` python
df['Sales First Difference'].head(12)
```

    Month
    1964-01-01       NaN
    1964-02-01    -143.0
    1964-03-01      83.0
    1964-04-01     -34.0
    1964-05-01     225.0
    1964-06-01      90.0
    1964-07-01    -754.0
    1964-08-01     -70.0
    1964-09-01     710.0
    1964-10-01    1379.0
    1964-11-01    1463.0
    1964-12-01    1548.0
    Name: Sales First Difference, dtype: float64

Tenemos datos mensuales, así que intentemos con un shift de 12.

``` python
df['Sales'].shift(12).head(20)
```

    Month
    1964-01-01       NaN
    1964-02-01       NaN
    1964-03-01       NaN
    1964-04-01       NaN
    1964-05-01       NaN
    1964-06-01       NaN
    1964-07-01       NaN
    1964-08-01       NaN
    1964-09-01       NaN
    1964-10-01       NaN
    1964-11-01       NaN
    1964-12-01       NaN
    1965-01-01    2815.0
    1965-02-01    2672.0
    1965-03-01    2755.0
    1965-04-01    2721.0
    1965-05-01    2946.0
    1965-06-01    3036.0
    1965-07-01    2282.0
    1965-08-01    2212.0
    Name: Sales, dtype: float64

``` python
df['Seasonal First Difference']= df['Sales'] - df['Sales'].shift(12)
```

``` python
df.head(14)
```

<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Sales</th>
      <th>Sales First Difference</th>
      <th>Seasonal First Difference</th>
    </tr>
    <tr>
      <th>Month</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1964-01-01</th>
      <td>2815.0</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1964-02-01</th>
      <td>2672.0</td>
      <td>-143.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1964-03-01</th>
      <td>2755.0</td>
      <td>83.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1964-04-01</th>
      <td>2721.0</td>
      <td>-34.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1964-05-01</th>
      <td>2946.0</td>
      <td>225.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1964-06-01</th>
      <td>3036.0</td>
      <td>90.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1964-07-01</th>
      <td>2282.0</td>
      <td>-754.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1964-08-01</th>
      <td>2212.0</td>
      <td>-70.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1964-09-01</th>
      <td>2922.0</td>
      <td>710.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1964-10-01</th>
      <td>4301.0</td>
      <td>1379.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1964-11-01</th>
      <td>5764.0</td>
      <td>1463.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1964-12-01</th>
      <td>7312.0</td>
      <td>1548.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1965-01-01</th>
      <td>2541.0</td>
      <td>-4771.0</td>
      <td>-274.0</td>
    </tr>
    <tr>
      <th>1965-02-01</th>
      <td>2475.0</td>
      <td>-66.0</td>
      <td>-197.0</td>
    </tr>
  </tbody>
</table>
</div>

Verificamos si nuestros datos ahora son estacionarios.

``` python
adfuller_test(df['Seasonal First Difference'].dropna())
```

    ADF Test Statistic : -7.626619157213164
    p-value : 2.060579696813685e-11
    #Lags Used : 0
    Number of Observations Used : 92
    El valor de p es menor a 0.05, lo que significa que podemos recharzar la hipótesis nula H0. Podemos concluir que los datos no tienen raíz unitaria y son estacionarios.

``` python
plt.figure(figsize=(15,5))

plt.plot(df['Seasonal First Difference'])
plt.show()
```

<img src="/m4/2/cedc4b64e4180e893c5ee7795ba8e7c27c038e29.png" alt="Series de tiempo parte 2" />

### `Correlograma`

La correlación es una cuantificación de la relación entre dos variables.

Hasta este momento habíamos visto el concepto de correlación, el cual
nos servía para cuantificar la relación entre dos variables. Ahora
introduciremos el concepto de autocorrelación. La autocorrelación es la
correlación de una serie consigo misma. Pero toda variable
correlacionada consigo misma da 1, por lo que estaría faltando algo. Lo
que falta son los *lags* (ventana temporal).

La autocorrelación se calcula con la serie de tiempo original y la misma
serie desfasada o corrida en el tiempo.

En la librería `statsmodel` esto lo logramos con la función `acf`.

Veremos la función de autocorrelación parcial y la función de
autocorrelación . Mientras la primera solo tiene en cuenta el impacto de
las variables directas, la segunda tiene en cuenta el impacto de las
variables directas e indirectas.

``` python
#import sys
#!{sys.executable} -m pip uninstall statsmodels
#!{sys.executable} -m pip install statsmodels
import statsmodels as sm
```

``` python
from statsmodels.graphics import tsaplots
fig = plt.figure(figsize=(12,8))
ax1 = fig.add_subplot(211)
fig = tsaplots.plot_acf(df['Seasonal First Difference'].iloc[13:],lags=40,ax=ax1)
```

<img src="/m4/2/1300cd72feb1a33bba20cf9028e47fe80f25f533.png" alt="Series de tiempo parte 2" />

``` python
fig = plt.figure(figsize=(12,8))
ax1 = fig.add_subplot(211)
fig = tsaplots.plot_acf(df['Seasonal First Difference'].iloc[13:],lags=40,ax=ax1)
ax2 = fig.add_subplot(212)
fig = tsaplots.plot_pacf(df['Seasonal First Difference'].iloc[13:],lags=40,ax=ax2)
```

<img src="/m4/2/392af10444db97285b68acd08b7ffa013a1d0214.png" alt="Series de tiempo parte 2" />

*Cada pico (retraso) que está por encima del área punteada se considera
estadísticamente significativo.*

``` python
from statsmodels.tsa.arima.model import ARIMA
```

``` python
# Para datos no estacionales

# En parámetro order debemos especificar p, d y q

model = ARIMA(df['Sales'],order=(1,1,1)) # \Delta y_t = \psi_1y_{t-1} + \delta_1e_{t-1} + e_t

model_fit=model.fit()
```

``` python
model_fit.summary()
```

<table class="simpletable">
<caption>SARIMAX Results</caption>
<tr>
  <th>Dep. Variable:</th>         <td>Sales</td>      <th>  No. Observations:  </th>    <td>105</td>  
</tr>
<tr>
  <th>Model:</th>            <td>ARIMA(1, 1, 1)</td>  <th>  Log Likelihood     </th> <td>-952.814</td>
</tr>
<tr>
  <th>Date:</th>            <td>Fri, 02 Sep 2022</td> <th>  AIC                </th> <td>1911.627</td>
</tr>
<tr>
  <th>Time:</th>                <td>15:06:46</td>     <th>  BIC                </th> <td>1919.560</td>
</tr>
<tr>
  <th>Sample:</th>             <td>01-01-1964</td>    <th>  HQIC               </th> <td>1914.841</td>
</tr>
<tr>
  <th></th>                   <td>- 09-01-1972</td>   <th>                     </th>     <td> </td>   
</tr>
<tr>
  <th>Covariance Type:</th>        <td>opg</td>       <th>                     </th>     <td> </td>   
</tr>
</table>
<table class="simpletable">
<tr>
     <td></td>       <th>coef</th>     <th>std err</th>      <th>z</th>      <th>P>|z|</th>  <th>[0.025</th>    <th>0.975]</th>  
</tr>
<tr>
  <th>ar.L1</th>  <td>    0.4545</td> <td>    0.114</td> <td>    3.999</td> <td> 0.000</td> <td>    0.232</td> <td>    0.677</td>
</tr>
<tr>
  <th>ma.L1</th>  <td>   -0.9666</td> <td>    0.056</td> <td>  -17.316</td> <td> 0.000</td> <td>   -1.076</td> <td>   -0.857</td>
</tr>
<tr>
  <th>sigma2</th> <td> 5.226e+06</td> <td> 6.17e+05</td> <td>    8.473</td> <td> 0.000</td> <td> 4.02e+06</td> <td> 6.43e+06</td>
</tr>
</table>
<table class="simpletable">
<tr>
  <th>Ljung-Box (L1) (Q):</th>     <td>0.91</td> <th>  Jarque-Bera (JB):  </th> <td>2.59</td>
</tr>
<tr>
  <th>Prob(Q):</th>                <td>0.34</td> <th>  Prob(JB):          </th> <td>0.27</td>
</tr>
<tr>
  <th>Heteroskedasticity (H):</th> <td>3.40</td> <th>  Skew:              </th> <td>0.05</td>
</tr>
<tr>
  <th>Prob(H) (two-sided):</th>    <td>0.00</td> <th>  Kurtosis:          </th> <td>3.77</td>
</tr>
</table><br/><br/>Warnings:<br/>[1] Covariance matrix calculated using the outer product of gradients (complex-step).

``` python
df['forecast']=model_fit.predict(start = 90, end = 103, dynamic = True)
df[['Sales','forecast']].plot(figsize=(15,8))
plt.title('Modelo ARIMA -no estacional- para predicción de ventas de champagne', fontsize = 15)
plt.show()
```

<img src="/m4/2/df5541cc20a1607e1c21074971a03c62ae24b1e8.png" alt="Series de tiempo parte 2" />

No estamos obteniendo buenos resultados usando ARIMA porque nuestros
datos tienen un comportamiento estacional, así que intentemos usar ARIMA
estacional.

``` python
import statsmodels as sm
```

``` python
# En el parámetro seasonal_orden debemos indicar = p estacional, d estacional, q estacional y periodicidad estacional

model=sm.tsa.statespace.sarimax.SARIMAX(df['Sales'],order=(1, 1, 1),seasonal_order=(1,1,1,12))
results=model.fit()
```

``` python
results.summary()
```

<table class="simpletable">
<caption>SARIMAX Results</caption>
<tr>
  <th>Dep. Variable:</th>                <td>Sales</td>             <th>  No. Observations:  </th>    <td>105</td>  
</tr>
<tr>
  <th>Model:</th>           <td>SARIMAX(1, 1, 1)x(1, 1, 1, 12)</td> <th>  Log Likelihood     </th> <td>-738.402</td>
</tr>
<tr>
  <th>Date:</th>                   <td>Fri, 02 Sep 2022</td>        <th>  AIC                </th> <td>1486.804</td>
</tr>
<tr>
  <th>Time:</th>                       <td>15:16:25</td>            <th>  BIC                </th> <td>1499.413</td>
</tr>
<tr>
  <th>Sample:</th>                    <td>01-01-1964</td>           <th>  HQIC               </th> <td>1491.893</td>
</tr>
<tr>
  <th></th>                          <td>- 09-01-1972</td>          <th>                     </th>     <td> </td>   
</tr>
<tr>
  <th>Covariance Type:</th>               <td>opg</td>              <th>                     </th>     <td> </td>   
</tr>
</table>
<table class="simpletable">
<tr>
      <td></td>        <th>coef</th>     <th>std err</th>      <th>z</th>      <th>P>|z|</th>  <th>[0.025</th>    <th>0.975]</th>  
</tr>
<tr>
  <th>ar.L1</th>    <td>    0.2790</td> <td>    0.081</td> <td>    3.433</td> <td> 0.001</td> <td>    0.120</td> <td>    0.438</td>
</tr>
<tr>
  <th>ma.L1</th>    <td>   -0.9494</td> <td>    0.043</td> <td>  -22.334</td> <td> 0.000</td> <td>   -1.033</td> <td>   -0.866</td>
</tr>
<tr>
  <th>ar.S.L12</th> <td>   -0.4544</td> <td>    0.303</td> <td>   -1.499</td> <td> 0.134</td> <td>   -1.049</td> <td>    0.140</td>
</tr>
<tr>
  <th>ma.S.L12</th> <td>    0.2450</td> <td>    0.311</td> <td>    0.788</td> <td> 0.431</td> <td>   -0.365</td> <td>    0.855</td>
</tr>
<tr>
  <th>sigma2</th>   <td> 5.055e+05</td> <td> 6.12e+04</td> <td>    8.265</td> <td> 0.000</td> <td> 3.86e+05</td> <td> 6.25e+05</td>
</tr>
</table>
<table class="simpletable">
<tr>
  <th>Ljung-Box (L1) (Q):</th>     <td>0.26</td> <th>  Jarque-Bera (JB):  </th> <td>8.70</td> 
</tr>
<tr>
  <th>Prob(Q):</th>                <td>0.61</td> <th>  Prob(JB):          </th> <td>0.01</td> 
</tr>
<tr>
  <th>Heteroskedasticity (H):</th> <td>1.18</td> <th>  Skew:              </th> <td>-0.21</td>
</tr>
<tr>
  <th>Prob(H) (two-sided):</th>    <td>0.64</td> <th>  Kurtosis:          </th> <td>4.45</td> 
</tr>
</table><br/><br/>Warnings:<br/>[1] Covariance matrix calculated using the outer product of gradients (complex-step).

``` python
df['forecast']=results.predict(start=90,end=103,dynamic=True)
df[['Sales','forecast']].plot(figsize=(15,8))
plt.title('Modelo ARIMA -estacional- para predicción de ventas de champagne')
plt.show()
```

<img src="/m4/2/b28c4cef3785da7fe3def3b049e48115fc3f9522.png" alt="Series de tiempo parte 2" />

*Observamos cómo mejoro SARIMA respecto de ARIMA*.

Realizaremos una predicción de ventas para los próximos 3 años.

``` python
from pandas.tseries.offsets import DateOffset

future_dates = [df.index[-1]+ DateOffset(months=x)for x in range(0,36)] # 3 años = 36 meses
```

``` python
future_datest_df = pd.DataFrame(index=future_dates[1:],columns=df.columns)
```

``` python
future_df = pd.concat([df,future_datest_df]) # Concatenamos los dos dataframes
```

``` python
future_df['forecast'] = results.predict(start = 104, end = 156, dynamic= True)  
future_df[['Sales', 'forecast']].plot(figsize=(15, 8)) 
plt.title('Modelo ARIMA -estacional- para predecir las ventas de champagne en los príxmos 3 años del dataset')
plt.show()
```

<img src="/m4/2/f5b883028b299cbacfb36b1726859f8e6d626349.png" alt="Series de tiempo parte 2" />
