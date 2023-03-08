---
title: "Ensamblers"
description: "Lorem ipsum dolor sit amet"
pubDate: "Jul 22 2022"
heroImage: "/placeholder-hero.jpg"
---
# Estimando 

El objetivo de esta actividad es reflexionar sobre los procesos de medición y de estimación. También, amigarse con las incertezas y los errores.

En un frasco, llamémoslo Frasco 1, ponemos una cantidad $n$ de algún elemento que sea relativamente fácil de contar; por ejemplo, porotos, monedas de cinco centavos, etc. En otro frasco, Frasco 2, ponemos una cantidad definida de esos mismos elementos, por ejemplo, 50 monedas.

La idea es estimar cota inferior, valor más probable y cota superior de la cantidad de elementos en el Frasco 1 en las siguientes situaciones:

1. Observando el frasco lleno (Frasco 1) y el frasco con 50 monedas (Frasco 2).
2. Con el peso del Frasco 1 (frasco + monedas) y el peso de las 50 monedas (solo las monedas).
3. Con el peso del Frasco 1 (frasco + monedas), el peso de las 50 monedas y el peso del frasco vacío.

### Algunas reflexiones e indicaciones para la consigna:

* Estimar implica hacer suposiciones. Explicar esas suposiciones, ordenar su razonamiento.
* A medida que les damos datos extra, ¿qué valor se modifica más: cota inferior, valor más probable o cota superior?
* ¿Cómo *propagarían* el error en la medición del frasco?
* El manejo de incertezas es una temática importantísima en Data Science. Una estimación sin una incerteza asociada en general tiene poco valor.
* A medida que vamos agregando información, ¿qué esperan que pase con las incertezas?

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()
data = pd.read_csv('../DataSets/frasco_monedas.csv')
data.head(10)
Los datos que les dimos
n_real = 283 # cantidad de monedas. Las contamos despues de hacer la experiencia

# Todos los pesos en gramos
peso_frasco_lleno = 705 # monedas + frasco
peso_frasco_vacio_ci = 125 # cota inferior peso frasco vacio
peso_frasco_vacio_cs = 130 # cota superior peso frasco vacio
peso_50_monedas = 100 
$N_{monedas} = \frac{Peso Frasco Lleno - Peso Frasco Vacio}{100}*50$
**Experiencia 2**
# Asumiendo que el peso del frasco es despreciable frente al peso de las monedas.
# Cota superior

n_estimado_2 = peso_frasco_lleno*50/peso_50_monedas
print(n_estimado_2)

**Experiencia 3**
n_estimado_3_ci = (peso_frasco_lleno - peso_frasco_vacio_ci)*50/peso_50_monedas
n_estimado_3_cs = (peso_frasco_lleno - peso_frasco_vacio_cs)*50/peso_50_monedas
print(n_estimado_3_ci, n_estimado_3_cs)
**Algunos Gráficos**
plt.figure(figsize = (12,6))
plt.scatter(data['Nombre'], data['P1'], label = 'P1')
plt.scatter(data['Nombre'], data['P2'], label = 'P2')
plt.scatter(data['Nombre'], data['P3'], label = 'P3')
plt.xlabel('Nombre')
plt.ylabel('Valor Estimado')
plt.xticks(rotation=45)
plt.axhline(n_real,ls = '--', c = 'r', label = 'Valor Real')
plt.legend()
plt.show()
plt.figure(figsize = (12,6))
plt.errorbar(x = data['Nombre'],y = data['P1'], yerr = (data['P1'] - data['Min1'], data['Max1'] - data['P1']), fmt='o', label = 'P1')
# plt.scatter(data['Nombre'], data['P2'], label = 'P2')
# plt.scatter(data['Nombre'], data['P3'], label = 'P3')
plt.xlabel('Nombre')
plt.ylabel('Valor Estimado')
plt.xticks(rotation=45)
plt.axhline(n_real,ls = '--', c = 'r', label = 'Valor Real')
plt.legend()
plt.show()
plt.figure(figsize = (12,6))
plt.errorbar(x = data['Nombre'],y = data['P2'], yerr = (data['P2'] - data['Min2'], data['Max2'] - data['P2']), fmt='o', label = 'P2')
# plt.scatter(data['Nombre'], data['P2'], label = 'P2')
# plt.scatter(data['Nombre'], data['P3'], label = 'P3')
plt.xlabel('Nombre')
plt.ylabel('Valor Estimado')
plt.xticks(rotation=45)
plt.axhline(n_real,ls = '--', c = 'r', label = 'Valor Real')
plt.legend()
plt.show()
plt.figure(figsize = (12,6))
plt.errorbar(x = data['Nombre'],y = data['P3'], yerr = (data['P3'] - data['Min3'], data['Max3'] - data['P3']), fmt='o', label = 'P3')
# plt.scatter(data['Nombre'], data['P2'], label = 'P2')
# plt.scatter(data['Nombre'], data['P3'], label = 'P3')
plt.xlabel('Nombre')
plt.ylabel('Valor Estimado')
plt.xticks(rotation=45)
plt.axhline(n_real,ls = '--', c = 'r', label = 'Valor Real')
plt.legend()
plt.show()
def plot_grupo(grupo, data):
    mask = data['Nombre'] == grupo
    datos_grupo = data[mask]
    valores_probables = datos_grupo[['P1','P2','P3']].values[0]
    valores_maximos = datos_grupo[['Max1','Max2','Max3']].values[0]
    valores_minimos = datos_grupo[['Min1','Min2','Min3']].values[0]
    yerr = (valores_probables - valores_minimos, valores_maximos - valores_probables)
    plt.errorbar(x = ['Exp1','Exp2','Exp3'],y = valores_probables, yerr = yerr, fmt='o', label = nombre)
plt.figure(figsize = (12,6))
for nombre in data['Nombre']:
    plot_grupo(nombre, data)

plt.axhline(n_real, ls = '--')
plt.legend()
plt.show()
```

Este último gráfico es muy interesante. A medida que agregamos información, no solamente tienden al valor real, ¡sino que disminuyen las incertezas!
# Media Geométrica

La media geométrica, es una métrica que puede ayudar para obtener un valor cercano al real. En este caso suponemos que hacemos la encuesta a 2000 personas...

mediciones = 2000
# Creamos una distribucion gamma con shape 2 y scale 1000
valores = np.round(np.random.gamma(2, 1000, mediciones))
n_bins = 50
fig, eje = plt.subplots()
n, bins, _ = eje.hist(valores, n_bins)
print('Valor medio: ', valores.mean())
Visualizar el valor medio de la muestra...

Ahora, se va a reescalar los datos, reemplazando el dato por la **Base** de su **Logaritmo en base 10**:
valores_log = np.log10(valores)
fig, eje = plt.subplots()
n, bins, _ = eje.hist(valores_log, n_bins)
valores[:5]
valores_log[:5]
valores_log.mean()
print('Valor medio: ', np.power(10, valores_log.mean()))
Visualizar en primer lugar, que la muestra ahora tiene una distribución más parecida a la **Distribución Gaussiana o Normal**...

Finalmente se toma el promedio de esta nueva muestra, y se lo usa para elevar 10 a esa potencia, obteniendo la **media geométrica**