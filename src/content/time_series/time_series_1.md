---
title: "Series de tiempo 1"
description: "En esta clase abordaremos modelos con un grado de complejidad mayor a
los que veníamos trabajando. Hasta ahora, entrenamos y evaluamos cada
modelo individualmente. Pero podríamos combinarlos, para así obtener un
modelo aún mejor. Eso hace el método de ensamble."
pubDate: "Jul 22 2022"
heroImage: "/placeholder-hero.jpg"
url: "/time_series"
---

## **Series de tiempo**

Para esta práctica trabajaremos con un dataset de temperaturas de la
Ciudad Autónoma de Buenos Aires.

Es fundamental que, como data scientist, conozcamos en detalle las
funcionalidades y características que nos brinda el módulo `datetime`
provisto por Python. En esta línea, aconsejamos revisar y tener como
fuente de consulta el siguiente
[link](https://realpython.com/python-datetime/).

También, familiarizarnos con ella, nos hará más amena la tarea de
trabajar con fechas en series de tiempo.

En esta primera práctica ahondaremos en cómo realizar un EDA en series
de tiempo e indenfificar sus componentes.

En una segunda práctica haremos forecasting con `ARIMA`, dentro de los
modelos clásicos estocásticos.
:::

### 1. EDA {#1-eda}

``` python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import datetime
sns.set()
```

``` python
data = pd.read_csv('..\Datasets\Clase_04_temperatura.csv')
```

``` python
data
```

| dia      | mes | anio |  Tmax | Tmin |
| -------- | --- | ---- |  ---- |:-----|
| 9        | 6   | 2018 |  16.0 | 8.8  |
| 10       | 6   | 2018 |  17.6 | 13.5 |
| 11       | 6   | 2018 |  15.0 | 12.0 |
| 12       | 6   | 2018 |  13.4 | 6.7  |
| 13       | 6   | 2018 |  NaN  | 5.5  |

<p>21714 rows × 5 columns</p>

``` python
data.anio.max() - data.anio.min() # o data["anio"].max()
```
    59

Tenemos una `frecuencia de muestreo` diaria y una `ventana temporal` con
un tamaño de 59 años

Tenemos la información suficiente como para crear el campo `fecha`.
Veamos cómo hacerlo:

``` python
{'year': data.anio, 'month': data.mes, 'day': data.dia}
```

    {'year': 0        1959
     1        1959
     2        1959
     3        1959
     4        1959
              ... 
     21709    2018
     21710    2018
     21711    2018
     21712    2018
     21713    2018
     Name: anio, Length: 21714, dtype: int64,
     'month': 0        1
     1        1
     2        1
     3        1
     4        1
             ..
     21709    6
     21710    6
     21711    6
     21712    6
     21713    6
     Name: mes, Length: 21714, dtype: int64,
     'day': 0         1
     1         2
     2         3
     3         4
     4         5
              ..
     21709     9
     21710    10
     21711    11
     21712    12
     21713    13
     Name: dia, Length: 21714, dtype: int64}

``` python
data['fecha'] = pd.to_datetime({'year':data.anio, 'month': data.mes, 'day': data.dia}) 
```

``` python
data.head(3)
```

| dia      | mes | anio |  Tmax | Tmin | fecha |
| -------- | --- | ---- |  ---- |:-----| ----- |
| 1        | 1   | 1959 | 25.6  | 11.6 |1959-01-01|
| 2       | 1   | 1959 |  26.2 | 16.4 |1959-01-02|
| 3      | 1   | 1959 |  27.3 | 18.8 |1959-01-03|

Ya no necesitamos las columnas que utilizamos para crear el campo fecha.

``` python
data.drop(columns= ['dia','mes', 'anio'], inplace = True)
```

Es momento de visualizar nuestra serie de tiempo.

``` python
plt.figure(figsize = (15,5))

plt.plot(data.fecha, data.Tmax, label = 'Temperatura máxima')
plt.plot(data.fecha, data.Tmin, label = 'Temperatura mínima')
plt.legend()
plt.xlabel('Fecha')
plt.ylabel('Temperatura (°C)')
#plt.ylim(-10,40)
plt.show()
```

<img src="/m4/1/b86f5ce62917616f458eb5c997182fb6b2cacf28.png" alt="Series de tiempo ML" />

Tenemos algunos outliers que nos amplían en demasía el valor máximo del
eje Y. Probemos limitar el eje Y.

``` python
plt.figure(figsize = (15,5))

plt.plot(data.fecha, data.Tmax, label = 'Temperatura máxima')
plt.plot(data.fecha, data.Tmin, label = 'Temperatura mínima')
plt.legend()
plt.xlabel('Fecha')
plt.ylabel('Temperatura (°C)')
plt.ylim(-20,50)
plt.show()
```

<img src="/m4/1/d515d622ff6223ca96f8cc79f2821ccf68ae1e4a.png" alt="Series de tiempo ML" />

Como recordarán de lo visto en la clase teórica, cuando tenemos una
frecuencia de muestreo relativamente chica en una ventana temporal
grande corremos el riesgo de que, al querer graficarla, obtengamos una
serie muy distorsionada o saturada. Para ello, recurríamos al
`resampleo`.

Probemos reaugrupar o resumir nuestros datos en una frecuencia de
muestreo más grande -semanal o mensual-.

``` python
# Agrupamos nuestras mediciones por el promedio semanal

semanal = data.resample('W', on = 'fecha').mean()
semanal.head()
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Tmax</th>
      <th>Tmin</th>
    </tr>
    <tr>
      <th>fecha</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1959-01-04</th>
      <td>26.125000</td>
      <td>15.850000</td>
    </tr>
    <tr>
      <th>1959-01-11</th>
      <td>26.600000</td>
      <td>12.785714</td>
    </tr>
    <tr>
      <th>1959-01-18</th>
      <td>28.300000</td>
      <td>16.885714</td>
    </tr>
    <tr>
      <th>1959-01-25</th>
      <td>31.300000</td>
      <td>16.400000</td>
    </tr>
    <tr>
      <th>1959-02-01</th>
      <td>27.633333</td>
      <td>16.014286</td>
    </tr>
  </tbody>
</table>

``` python
plt.figure(figsize = (15,5))

plt.plot(semanal.index, semanal.Tmax, label = 'Temperatura máxima')
plt.plot(semanal.index, semanal.Tmin, label = 'Temperatura mínima')
plt.xlabel('Fecha')
plt.ylabel('Temperatura (°C)')
#plt.ylim(-10,40)
plt.legend()
plt.show()
```

<img src="/m4/1/ff600ef38e924c555e2026ddc803d68a450f4e6e.png" alt="Series de tiempo ML" />

Mejoró un poco, ¿verdad?

Comenten la línea `plt.ylim(-10,40)` y noten un detalle respecto a la
primera visualuzación que hicimos. Ahora, nuestro pico del outlier más
alto ya no está en torno a los 500º sino cercano a los 80º ¿Por qué
creés que sucedió esto?

``` python
# Ahora veamos qué pasa si reagrupamos las temperaturas mensualmente.

mensual = data.resample('M', on = 'fecha').mean()
mensual.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Tmax</th>
      <th>Tmin</th>
    </tr>
    <tr>
      <th>fecha</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1959-01-31</th>
      <td>28.183871</td>
      <td>15.554839</td>
    </tr>
    <tr>
      <th>1959-02-28</th>
      <td>NaN</td>
      <td>16.832143</td>
    </tr>
    <tr>
      <th>1959-03-31</th>
      <td>25.606452</td>
      <td>13.861290</td>
    </tr>
    <tr>
      <th>1959-04-30</th>
      <td>19.143333</td>
      <td>9.946667</td>
    </tr>
    <tr>
      <th>1959-05-31</th>
      <td>17.270968</td>
      <td>6.367742</td>
    </tr>
  </tbody>
</table>
</div>

``` python
plt.figure(figsize = (15,5))

plt.plot(mensual.index, mensual.Tmax, label = 'Temperatura máxima')
plt.plot(mensual.index, mensual.Tmin, label = 'Temperatura mínima')
plt.xlabel('Fecha')
plt.ylabel('Temperatura (°C)')
#plt.xlim(datetime.date(1990,1,1), datetime.date(2018,1,1))

plt.legend()
plt.show()
```

<img src="/m4/1/bf225f5ace8742beb8fbb42c49602eebdce1f9c7.png" alt="Series de tiempo ML" />

En este caso, ya no es necesario limitar el eje Y por la miniaturización
del gráfico que probocaba nuestro punto máximo.

Práctiquemos un caso de uso la librería `datetime` para limitar el
periodo temporal que queremos abarcar de nuestra serie.

``` python
plt.figure(figsize = (15,5))

plt.plot(mensual.index, mensual.Tmax, label = 'Temperatura máxima')
plt.plot(mensual.index, mensual.Tmin, label = 'Temperatura mínima')
plt.xlabel('Fecha')
plt.ylabel('Temperatura (°C)')
plt.xlim(datetime.date(2000,1,1), datetime.date(2015,1,1))

plt.legend()
plt.show()
```

<img src="/m4/1/450bdfd93467b05d2f005c00f123f34a95d66085.png" alt="Series de tiempo ML" />

### **`Componentes de la serie de tiempo`**

Veremos dos formas de obtenerlas: *media móvil* y *regresión lineal*.

***Media móvil***

Aquí utilizaremos la función *rolling window*. Fijaremos una ventana que
define la cantidad de registros anteriores + actual para realizar el
promedio en la fila actual.

Vamos a sacar algunos valores de medición y, a su vez, rellenar los
faltantes.

``` python
semanal.Tmin[semanal.Tmin > 50] = np.nan
```

``` python
# Observamos cuántos faltantes tenemos

print(semanal.isnull().sum())
```

    Tmax    39
    Tmin    32
    dtype: int64

``` python
# Imputamos faltantes con la función interpolate

semanal = semanal.interpolate()
```

Ahora vamos a obtener la temperatura promedio semanal -combinando las
temperaturas mínimas y máximas-.

``` python
semanal['Tmean'] = (semanal.Tmax + semanal.Tmin)/2
```

``` python
semanal.head(3)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Tmax</th>
      <th>Tmin</th>
      <th>Tmean</th>
    </tr>
    <tr>
      <th>fecha</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1959-01-04</th>
      <td>26.125</td>
      <td>15.850000</td>
      <td>20.987500</td>
    </tr>
    <tr>
      <th>1959-01-11</th>
      <td>26.600</td>
      <td>12.785714</td>
      <td>19.692857</td>
    </tr>
    <tr>
      <th>1959-01-18</th>
      <td>28.300</td>
      <td>16.885714</td>
      <td>22.592857</td>
    </tr>
  </tbody>
</table>
</div>

Pasemos a establecer el tamaño nuestra ventana móvil:

``` python
# Probar ir variando este valor donde elegimos la cantidad de semanas con la que se irá calculando la media

ventana = (105)
```

``` python
semanal_promedio_tendencia = semanal.Tmean.rolling(window=ventana, center = True).mean()
semanal_promedio_tendencia.head(200)
```

    fecha
    1959-01-04          NaN
    1959-01-11          NaN
    1959-01-18          NaN
    1959-01-25          NaN
    1959-02-01          NaN
                    ...    
    1962-09-30    16.410096
    1962-10-07    16.395538
    1962-10-14    16.397375
    1962-10-21    16.355198
    1962-10-28    16.342817
    Freq: W-SUN, Name: Tmean, Length: 200, dtype: float64

*Cuanto más grande sea nuestra ventana, más valores necesitará para
empezar a establecer valores y, por ende, más faltantes observemos en el
dataframe*.

``` python
plt.figure(figsize = (15,5))
plt.plot(semanal.index, semanal.Tmean, label = 'Temperatura Promedio')
plt.plot(semanal_promedio_tendencia, lw = 4, label = 'Temperatura Promedio - Rolling Window')
plt.xlabel('Fecha')
plt.ylabel('Temperatura (°C)')
plt.legend()
plt.show()
```

<img src="/m4/1/8643c798cf263b2c7b52c69ee3bfc139941fa4bd.png" alt="Series de tiempo ML" />

***Tendencia lineal***

Aquí ajustaremos una regresión lineal a la serie. Tomar en consideración
que la aplicabilidad de este método es muy limitada a casos muy
puntuales.

Como primer paso, no podemos utilizar una regresión lineal con el tipo
de fechas que tenemos, por lo que habrá que pasarlas a un formato
numérico.

``` python
semanal['fecha_numeros']=semanal.index.map(datetime.datetime.toordinal)
```

``` python
semanal.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Tmax</th>
      <th>Tmin</th>
      <th>Tmean</th>
      <th>fecha_numeros</th>
    </tr>
    <tr>
      <th>fecha</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1959-01-04</th>
      <td>26.125000</td>
      <td>15.850000</td>
      <td>20.987500</td>
      <td>715148</td>
    </tr>
    <tr>
      <th>1959-01-11</th>
      <td>26.600000</td>
      <td>12.785714</td>
      <td>19.692857</td>
      <td>715155</td>
    </tr>
    <tr>
      <th>1959-01-18</th>
      <td>28.300000</td>
      <td>16.885714</td>
      <td>22.592857</td>
      <td>715162</td>
    </tr>
    <tr>
      <th>1959-01-25</th>
      <td>31.300000</td>
      <td>16.400000</td>
      <td>23.850000</td>
      <td>715169</td>
    </tr>
    <tr>
      <th>1959-02-01</th>
      <td>27.633333</td>
      <td>16.014286</td>
      <td>21.823810</td>
      <td>715176</td>
    </tr>
  </tbody>
</table>
</div>

``` python
from sklearn.linear_model import LinearRegression

reg_lineal = LinearRegression() #Instanciamos el modelo

reg_lineal.fit(semanal.fecha_numeros.values.reshape(-1, 1), semanal.Tmean) # Lo entrenamos
```


``` python
plt.figure(figsize = (15,5)) 

plt.plot(semanal.index, semanal.Tmean, label = 'Temperatura Promedio')
plt.plot(semanal_promedio_tendencia, ls = '--', lw = 4, label = 'Temperatura Promedio - Rolling Window')
plt.plot(semanal.index, reg_lineal.predict(semanal.fecha_numeros.values.reshape(-1, 1)), lw = 4, label = 'Temperatura Promedio - Ajuste Lineal')

plt.xlabel('Fecha')
plt.ylabel('Temperatura (°C)')
plt.legend()
plt.show()
```

<img src="/m4/1/5f1a649030bc74cc364261a3bb221e279b5652b1.png" alt="Series de tiempo ML" />

``` python
# Veamos las componentes

plt.figure(figsize = (12,9))

plt.subplot(3,1,1)
plt.title('Serie Original')
plt.plot(semanal.index, semanal.Tmean)
plt.ylabel('Temperatura (°C)')

plt.subplot(3,1,2)
plt.title('Tendencia Rolling Window')
plt.plot(semanal_promedio_tendencia)
plt.ylabel('Temperatura (°C)')

plt.subplot(3,1,3)
plt.title('Diferencia entre la serie original y la tendencia')
plt.plot(semanal.index, semanal.Tmean - semanal_promedio_tendencia)
plt.xlabel('Fecha')
plt.ylabel('Temperatura (°C)')

plt.tight_layout()
plt.show()
```

<img src="/m4/1/1a236d3487806dc057b2be4b09d9c73277d5d628.png" alt="Series de tiempo ML" />

**Estacionalidad**

En este caso, agrupamos los datos por mes y mostramos las distribuciones
de cada grupo. De esta manera, se visualiza la estacionalidad anual.
Podría buscarse, también, una estacionalidad mensual y agrupar los datos
por día. Todo eso depende de los datos con los que estemos trabajando.
Aquí, como estamos trabajando con temperaturas, al observar una
estacionalidad anual podemos corroborar el patrón y la incidenciade las
4 estaciones del año en la temperatura promedio.

``` python
# Agrupamos los datos por mes y mostramos las distribuciones de cada grupo. De esta manera, se visualiza la estacionalidad anual.

plt.figure(figsize = (20,9))
sns.boxplot(data=semanal,x=semanal.index.month,y= semanal.Tmean)
plt.title('Estacionalidad anual de la temperatura en CABA', fontsize = 15)
plt.xlabel('Mes')
plt.ylabel('Temperatura')
```

    Text(0, 0.5, 'Temperatura')

<img src="/m4/1/ce4ad42a1ab0acbe5e4c052a158aa6bf97349414.png" alt="Series de tiempo ML" />

Existen dos librerías muy importantes que nos permiten obtener las
componentes de una serie de tiempo de manera más sencilla.

Una es `stats model` y la otra `Prophet`.

Recomendamos ir familiarizándose con la primera de ellas.

**Stats model**

``` python
#import sys
#!{sys.executable} -m pip install statsmodels

from statsmodels.tsa.seasonal import seasonal_decompose

result = seasonal_decompose(semanal.Tmean, model='additive') # y= t+s+u podría ser y=t*s*u
```

``` python
import matplotlib
matplotlib.rcParams['figure.figsize'] = [15,10]
result.plot()
plt.title('Componentes de la serie de tiempo')
plt.show()
```

<img src="/m4/1/db026733250862d994586989ec0dcf5c9a8ed21d.png" alt="Series de tiempo ML" />

``` python
#Exportamos el csv ya transformado
#semanal.drop(columns = 'fecha_numeros', inplace = True)
#semanal.to_csv('Clase_04_temperatura_transf.csv')
```
