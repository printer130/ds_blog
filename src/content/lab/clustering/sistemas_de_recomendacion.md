---
title: "Sistemas de Recomendación"
description: "En esta práctica abordaremos los aspectos centrales inherentes a los
sistemas de recomendación."
pubDate: "Jul 08 2022"
heroImage: "/placeholder-hero.jpg"
url: "/ensamblers/sistemas_de_recomendacion"
---

---

En esencia, un sistema de recomendación (en adelante, \"RS\") es un
algoritmo que predice la preferencia de los usuarios ante un cierto
ítem.

En este punto, es importante introducir los dos elementos fundamentales
en todo el proceso de RS: `usuarios` e `ítems`.

---

Los usuarios tienen preferencias para ciertos artículos, y estas
preferencias deben extraerse de los datos. Los datos en sí se
representan como una **`matriz de utilidad`**, dando para cada par
usuario-ítem un valor que representa lo que se sabe sobre el grado de
preferencia de ese usuario por ese artículo.

<img src="/assets/matriz_utilidad.jpg" height=150 alt="Matriz utilidad image">

_Ejemplo de matriz de utilidad_.

En esta matriz, tenemos representadas las preferencias de cada usuario
(A, B, C y D) para cada uno de los ítems (HP1, HP2, HP3, TW, SW1, SW2 y
SW3). Podría asemejarse a una plataforma de streaming para películas
-por supuesto que a una escala mucho más simplificada para fines
prácticos-.

Esta matriz, como la mayoría de su tipo, es `dispersa`. Esto quiere
decir que contiene muchos valores faltantes. Por ejemplo, el usuario B
calificó las películas de Harry Potter. Pero no puede calificar
absolutamente todas las películas disponibles en la plataforma.
Probablemente no haya visto ni el 1% de todo el contenido que brinda un
servicio de streaming como Netflix.

Nuestro objetivo es predecir todos los valores desconocidos en la matriz
de utilidad.

A simple vista, uno podría inferir que si al usuario A no le gustó Star
Wars 1, probablemente tampoco le gustará Star Wars 2 y Star Wars 3. Por
otra parte, si tuviéramos en nuestra matriz el artículo Harry Potter 4,
y el usuario B no la vio, las probabilidades de que le guste son altas.
Por supuesto, el objetivo es hacer todas estas predicciones pero de
manera sistemática, no manual.

---

### **TIPOLOGÍA**

Una vez completada la matriz de utilidad, existen diversas formas de
realizar recomendaciones a los usuarios. Por un lado, un modelo
benchmark clásico para estos casos consiste en recomendar los n-mejores
ítems. Claro está, esta estrategia carece de personalización y
segmentación de los usuarios y las preferencias. Recomienda,
simplemente, por popularidad de los artículos.

### **Basados en contenidos**

Estos RS recomiendan a partir de la información extraída de los ítems.
Para la matriz de utilidad que estuvimos viendo, basaría su
recomendación en la información per se de la película -cuál es su
director, quiénes actúan, a qué género pertenece, en qué año se estrenó,
etc.-.

En este caso, se le recomendarán al usuario ítems que sean parecidos a
los que calificó positivamente.

### **Filtro colaborativo**

Acá la similitud no se buscará entro los ítems, sino entre los usuarios.
Ya no nos importa extraer información del artículo que recomendamos,
sino buscar similaridad entre los usuarios. Puede pensarse como una
regla de transitividad.

Emplea una descomposición UV.

Veamos, esquemáticamente, cuál es el fundamento de cada una de las
estrategias:

<img src="https://miro.medium.com/max/1064/1*mz9tzP1LjPBhmiWXeHyQkQ.png" height = 400 alt="Image">

---

### **SIMILITUD**

La pregunta que debemos responder ahora es, ¿cómo determinamos
similitud?¿Con qué criterio establecemos que dos artículos, por ejemplo,
son similares entre sí?

Este concepto está muy relacionado con la **distancia**.

#### **_Similitud coseno_**

Una de las formas de obtener esta característica, entre ítems o
usuarios, es con la `similitud coseno`. Esta estrategia determina la
similaridad según el ángulo del vector.

---

  <img src="https://www.tyrrell4innovation.ca/wp-content/uploads/2021/06/rsz_jenny_du_miword.png" height=450 alt="image">

  <img src="/assets/RS.jpg" height=300 alt="image">
  -------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------

---

#### **_Índice Jaccard_**

Esta medida deriva de la teoría de los conjuntos. Lo que hace es
determinar similaridad a partir de la cantidad de elementos en común que
tienen los cojuntos -por ejemplo, los usuarios-.

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOlmfUP56ZbgwudKcjlXEc9os0Vwe7NO7wRA&usqp=CAU" alt="image" height=200>

<img src="https://storage.googleapis.com/lds-media/images/jaccard_similarity.width-1200.jpg" alt="image" height=400>

---

### `Práctica`

Trabajaremos con un
[dataset](https://www.kaggle.com/datasets/netflix-inc/netflix-prize-data)
de Netflix, disponibilizado por la compañía en ocasión de un Challenge
que hicieron público. Aplicaremos un filtro colaborativo. Podrán
observar que nos estamos enfrentando a un caso real, con una cantidad de
datos altamente superior a lo que estamos acostumbrados a usar como
ejemplos de prácticas.

En una primaria instancia, cargaremos solo uno de los archivos.
Deberemos hacer un exhaustivo análisis exploratorio de los datos.
Posteriormente, instanciaremos nuestro modelo con la librería `surprise`
y, finalmente, mostraremos cómo incorporar los demás archivos
disponibles.

Teniendo en cuenta el espacio en memoria que ocuparán nuestros datos,
iremos aplicando diversas estrategias que, además, pueden ser de mucha
utilidad a futuro para casos similares.

```python
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()

import pandas as pd

import gc #garbage collector
```

```python
def load_data(name):
    df = pd.read_csv(name, header = None, names = ['User','Rating'], usecols = [0,1])

    # En algunas ocasiones forzar un tipo de dato hace que se ahorre mucho lugar en memoria.
    df['Rating'] = df['Rating'].astype(float)
    return df

df1 = load_data('../Datasets/Clase_08_RS/combined_data_1.txt')
print(df1.shape)
```

    (24058263, 2)

**Sí. Tenemos 24 millones de filas. Y es solo el primer archivo del
dataset total, que está subdividido en 4 txt.**

<img src = "https://c.tenor.com/Je27rnxSMbMAAAAM/suspicious-the-simpsons.gif" alt="image">

```python
df1.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 24058263 entries, 0 to 24058262
    Data columns (total 2 columns):
     #   Column  Dtype
    ---  ------  -----
     0   User    object
     1   Rating  float64
    dtypes: float64(1), object(1)
    memory usage: 367.1+ MB

```python
df1.head()
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>User</th>
      <th>Rating</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1:</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1488844</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>822109</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>885013</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>30878</td>
      <td>4.0</td>
    </tr>
  </tbody>
</table>
</div>

**Para saber a qué película corresponde cada calificación, debemos
importar el dataset que aporta dicha información.**

```python
df_title = pd.read_csv('../Datasets/Clase_08_RS/movie_titles.csv', encoding = "ISO-8859-1",index_col = 0, header = None, usecols = [0,2], names = ['Movie_Id', 'Name'])
df_title.head()
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Name</th>
    </tr>
    <tr>
      <th>Movie_Id</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Dinosaur Planet</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Isle of Man TT 2004 Review</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Character</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Paula Abdul's Get Up &amp; Dance</td>
    </tr>
    <tr>
      <th>5</th>
      <td>The Rise and Fall of ECW</td>
    </tr>
  </tbody>
</table>
</div>

```python
movie_id = 5
print(df_title.loc[movie_id].Name)
```

    The Rise and Fall of ECW

```python
# Si queremos contar cuántos identificadores hay, vamos a usar la siguiente información: al lado del identificador de la película, la columna `Rating` de `df1` tiene un `NaN`.

movies_ids_df1 = df1.User[df1.Rating.isna()].values
print(movies_ids_df1)
print(len(movies_ids_df1))
```

    ['1:' '2:' '3:' ... '4497:' '4498:' '4499:']
    4499

```python
# Proceso para poder pasar los identificados a nombres

movies_ids_df1 = np.arange(1,len(movies_ids_df1) + 1)
print(movies_ids_df1)
```

    [   1    2    3 ... 4497 4498 4499]

### **Movie id**

Aquí, buscaremos agregar una columna con el ID de la película a la que
corresponde cada calificación.

```python
df1_nan = pd.DataFrame(pd.isnull(df1.Rating))
df1_nan = df1_nan[df1_nan['Rating'] == True]
idx_movies_ids = df1_nan.index.values
print(idx_movies_ids)
```

    [       0      548      694 ... 24056849 24057564 24057834]

Queremos crear un vector de tantas instancias como `df1`, donde en cada
lugar esté el movie_id a cual corresponde la calificación. Como tenemos
los índices donde está cada movie_id, podemos obtener cuántas
calificaciones hay de cada película.

```python
# Agregamos el índice de la última instancia del DataFrame

idx_movies_ids = np.append(idx_movies_ids,df1.shape[0])
cantidad_criticas = np.diff(idx_movies_ids)
cantidad_criticas
```

    array([ 548,  146, 2013, ...,  715,  270,  429], dtype=int64)

```python
# Celda no apta para ansiosos

import time

comienzo = time.time()

columna_movie_id = np.array([])
for i in range(cantidad_criticas.size):
    aux = np.full(cantidad_criticas[i], movies_ids_df1[i])
    columna_movie_id = np.concatenate((columna_movie_id, aux))

tiempo = time.time() - comienzo

print(f'Tardó {round(tiempo)} segundos')
```

    Tardó 207 segundos

```python
# Incorporamos la columna al DataFrame

df1['movie_id'] = columna_movie_id
del columna_movie_id

df1.dropna(inplace = True)
df1['User'] = df1['User'].astype(int)
df1['movie_id'] = df1['movie_id'].astype(np.int16)
df1['Rating'] = df1['Rating'].astype(np.int8)
```

```python
gc.collect()
```

    0

```python
# Observamos cómo quedó nuestra tabla

df1
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>User</th>
      <th>Rating</th>
      <th>movie_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>1488844</td>
      <td>3</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>822109</td>
      <td>5</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>885013</td>
      <td>4</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>30878</td>
      <td>4</td>
      <td>1</td>
    </tr>
    <tr>
      <th>5</th>
      <td>823519</td>
      <td>3</td>
      <td>1</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>24058258</th>
      <td>2591364</td>
      <td>2</td>
      <td>4499</td>
    </tr>
    <tr>
      <th>24058259</th>
      <td>1791000</td>
      <td>2</td>
      <td>4499</td>
    </tr>
    <tr>
      <th>24058260</th>
      <td>512536</td>
      <td>5</td>
      <td>4499</td>
    </tr>
    <tr>
      <th>24058261</th>
      <td>988963</td>
      <td>3</td>
      <td>4499</td>
    </tr>
    <tr>
      <th>24058262</th>
      <td>1704416</td>
      <td>3</td>
      <td>4499</td>
    </tr>
  </tbody>
</table>
<p>24053764 rows × 3 columns</p>

```python
# Guardamos
switch = False #cambien acá si quieren guardarlo

if switch:
    df1.to_csv('../Dataset/Clase_08_RS/combined_data_1_con_movie_id.csv', index= False)
```

---

### **Análisis Exploratorio de Datos**

```python
print(df1.shape)
df1.head()
```

    (24053764, 3)

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>User</th>
      <th>Rating</th>
      <th>movie_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>1488844</td>
      <td>3</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>822109</td>
      <td>5</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>885013</td>
      <td>4</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>30878</td>
      <td>4</td>
      <td>1</td>
    </tr>
    <tr>
      <th>5</th>
      <td>823519</td>
      <td>3</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
```

```python
df1 = pd.read_csv('../Datasets/Clase_08_RS/combined_data_1_con_movie_id.csv', dtype={'Rating': np.int8, 'movie_id': np.int16})
print(df1.shape)
df1.head()
```

    (24053764, 3)

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>User</th>
      <th>Rating</th>
      <th>movie_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1488844</td>
      <td>3</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>822109</td>
      <td>5</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>885013</td>
      <td>4</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>30878</td>
      <td>4</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>823519</td>
      <td>3</td>
      <td>1</td>
    </tr>
  </tbody>
</table>

```python
df1.dtypes
```

    User        int64
    Rating       int8
    movie_id    int16
    dtype: object

```python
df_title
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Name</th>
    </tr>
    <tr>
      <th>Movie_Id</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Dinosaur Planet</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Isle of Man TT 2004 Review</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Character</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Paula Abdul's Get Up &amp; Dance</td>
    </tr>
    <tr>
      <th>5</th>
      <td>The Rise and Fall of ECW</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
    </tr>
    <tr>
      <th>17766</th>
      <td>Where the Wild Things Are and Other Maurice Se...</td>
    </tr>
    <tr>
      <th>17767</th>
      <td>Fidel Castro: American Experience</td>
    </tr>
    <tr>
      <th>17768</th>
      <td>Epoch</td>
    </tr>
    <tr>
      <th>17769</th>
      <td>The Company</td>
    </tr>
    <tr>
      <th>17770</th>
      <td>Alien Hunter</td>
    </tr>
  </tbody>
</table>
<p>17770 rows × 1 columns</p>

```python
# Usuarios únicos

print(len(df1['User'].unique()))
```

    470758

```python
# Calificaciones de películas por usuario

df1_by_users = df1.groupby(['User']).count()
df1_by_users.head()
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Rating</th>
      <th>movie_id</th>
    </tr>
    <tr>
      <th>User</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>6</th>
      <td>153</td>
      <td>153</td>
    </tr>
    <tr>
      <th>7</th>
      <td>195</td>
      <td>195</td>
    </tr>
    <tr>
      <th>8</th>
      <td>21</td>
      <td>21</td>
    </tr>
    <tr>
      <th>10</th>
      <td>49</td>
      <td>49</td>
    </tr>
    <tr>
      <th>25</th>
      <td>4</td>
      <td>4</td>
    </tr>
  </tbody>
</table>

```python
plt.hist(df1_by_users.Rating, log= True)
plt.title('Calificaciones por usuario')
plt.show()
```

<img src="/m6/4/0ba60c496850a82094926f813b7a2d6f03ffc364.png" alt="sistema de recomendacion image" />

```python
# Observamos la distribución de las calificaciones

df1['Rating'].hist()
plt.title('Distribución de calificaciones')
plt.show()
```

<img src="/m6/4/bc27c26f449f663947ccfc6b6b0d2ba57eed965a.png" alt="sistema de recomendacion image" />

**Veamos cuál es la película que más calificaciones tiene y cuál la que
menos**.

```python
df1_by_movies = df1.groupby(['movie_id']).count()
df1_by_movies.head()
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>User</th>
      <th>Rating</th>
    </tr>
    <tr>
      <th>movie_id</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>547</td>
      <td>547</td>
    </tr>
    <tr>
      <th>2</th>
      <td>145</td>
      <td>145</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2012</td>
      <td>2012</td>
    </tr>
    <tr>
      <th>4</th>
      <td>142</td>
      <td>142</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1140</td>
      <td>1140</td>
    </tr>
  </tbody>
</table>

```python
idx_max = df1_by_movies['User'].idxmax()
print(df_title.loc[idx_max].Name)
```

    Pirates of the Caribbean: The Curse of the Black Pearl

```python
# Pelicula con menos calificaciones
idx_min = df1_by_movies['User'].idxmin()
print(df_title.loc[idx_min].Name)
```

    Bram Stoker's: To Die For

### **Películas por popularidad**

```python
df1_by_movies = df1.groupby(['movie_id']).count()
df1_by_movies.sort_values('User', ascending = False, inplace = True)
df1_by_movies['Vistos'] = df1_by_movies['User']
df1_by_movies.drop(columns = ['User','Rating'], inplace = True)
df1_by_movies.head(10)
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Vistos</th>
    </tr>
    <tr>
      <th>movie_id</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1905</th>
      <td>193941</td>
    </tr>
    <tr>
      <th>2152</th>
      <td>162597</td>
    </tr>
    <tr>
      <th>3860</th>
      <td>160454</td>
    </tr>
    <tr>
      <th>4432</th>
      <td>156183</td>
    </tr>
    <tr>
      <th>571</th>
      <td>154832</td>
    </tr>
    <tr>
      <th>3938</th>
      <td>153996</td>
    </tr>
    <tr>
      <th>4306</th>
      <td>151292</td>
    </tr>
    <tr>
      <th>2452</th>
      <td>149866</td>
    </tr>
    <tr>
      <th>1962</th>
      <td>145519</td>
    </tr>
    <tr>
      <th>3962</th>
      <td>140979</td>
    </tr>
  </tbody>
</table>

```python
df_title.head(3)
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Name</th>
    </tr>
    <tr>
      <th>Movie_Id</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Dinosaur Planet</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Isle of Man TT 2004 Review</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Character</td>
    </tr>
  </tbody>
</table>

```python
df1_by_movies['Titulo'] = df_title.loc[df1_by_movies.index].Name
```

```python
df1_by_movies.head()
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Vistos</th>
      <th>Titulo</th>
    </tr>
    <tr>
      <th>movie_id</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1905</th>
      <td>193941</td>
      <td>Pirates of the Caribbean: The Curse of the Bla...</td>
    </tr>
    <tr>
      <th>2152</th>
      <td>162597</td>
      <td>What Women Want</td>
    </tr>
    <tr>
      <th>3860</th>
      <td>160454</td>
      <td>Bruce Almighty</td>
    </tr>
    <tr>
      <th>4432</th>
      <td>156183</td>
      <td>The Italian Job</td>
    </tr>
    <tr>
      <th>571</th>
      <td>154832</td>
      <td>American Beauty</td>
    </tr>
  </tbody>
</table>

```python
plt.figure(figsize = (8,4))

df1_by_movies.Vistos[df1_by_movies.Vistos<1000].hist(log = True, bins = 20)
plt.title('Distribución de la cantidad de vistas')

plt.show()
```

<img src="/m6/4/58f7bb853c285c3172fad2bfd370739abcba8552.png" alt="sistema de recomendacion image" />

En esta etapa, lo que haremos será filtrar de nuestro dataset a aquellas
películas con pocas calificaciones. Para ello, establecemos un umbral.

```python
umbral = 1000
mascara_pocos_vistos = df1_by_movies.Vistos<umbral
```

```python
peliculas_pocos_vistos = mascara_pocos_vistos[mascara_pocos_vistos].index.values
print(len(peliculas_pocos_vistos), peliculas_pocos_vistos)
```

    2757 [1817  806 3486 ... 3656 4338 4362]

```python
mascara_descartables = df1.movie_id.isin(peliculas_pocos_vistos)
```

```python
# Obsevamos cómo cambia la cantidad de registros a partir del filtrado

print(df1.shape)
df1 = df1[~mascara_descartables]
print(df1.shape)
```

    (24053764, 3)
    (23163063, 3)

## **Machine Learning**

Para trabajar con sistemas de recomendación, emplearemos la librería
`Surprise` de la que dejamos
[aquí](https://surprise.readthedocs.io/en/stable/) la documentación.

Tendremos que llevar nuestro dataset al formato con el que trabaja esta
librería.

```python
import sys
!conda activate my_ass-bootcamp
!conda install -c conda-forge scikit-surprise
#from scikit.surprise import Dataset
#from surprise import Reader
#from surprise.model_selection import train_test_split
```

```python
reader = Reader()
```

```python
N_filas = 100000 # Limitamos el dataset a N_filas

data = Dataset.load_from_df(df1[['User', 'movie_id', 'Rating']][:N_filas], reader)
```

```python
# Separamos nuestros datos

trainset, testset = train_test_split(data, test_size=.25)
```

```python
# Usaremos un modelo de Singular Value Decomposition

from surprise import SVD
model = SVD()
```

```python
# Entrenamos el modelo

model.fit(trainset)
```

    <surprise.prediction_algorithms.matrix_factorization.SVD at 0x20286bfc8b0>

```python
# Predecimos

predictions = model.test(testset)
```

```python
predictions[1]
```

    Prediction(uid=2219491, iid=28, r_ui=4.0, est=3.8249210765751536, details={'was_impossible': False})

```python
# Hacemos una predicción al azar para usuario y película

model.predict(1328945,28)
```

    Prediction(uid=1328945, iid=28, r_ui=None, est=3.8249210765751536, details={'was_impossible': False})

```python
# Tomaremos un usuario para hacerle una recomendación

usuario = 1539350
rating = 4   # Tomamos películas a las que haya calificado con 4 o 5 estrellas
df_user = df1[(df1['User'] == usuario) & (df1['Rating'] >= rating)]
df_user = df_user.reset_index(drop=True)
df_user['Name'] = df_title['Name'].loc[df_user.movie_id].values
df_user
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>User</th>
      <th>Rating</th>
      <th>movie_id</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1539350</td>
      <td>4</td>
      <td>111</td>
      <td>Duplex (Widescreen)</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1539350</td>
      <td>4</td>
      <td>175</td>
      <td>Reservoir Dogs</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1539350</td>
      <td>4</td>
      <td>197</td>
      <td>Taking Lives</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1539350</td>
      <td>5</td>
      <td>269</td>
      <td>Parenthood</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1539350</td>
      <td>5</td>
      <td>270</td>
      <td>Sex and the City: Season 4</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1539350</td>
      <td>4</td>
      <td>367</td>
      <td>Spun</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1539350</td>
      <td>5</td>
      <td>406</td>
      <td>Hostage</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1539350</td>
      <td>4</td>
      <td>457</td>
      <td>Kill Bill: Vol. 2</td>
    </tr>
    <tr>
      <th>8</th>
      <td>1539350</td>
      <td>4</td>
      <td>692</td>
      <td>The Hand that Rocks the Cradle</td>
    </tr>
    <tr>
      <th>9</th>
      <td>1539350</td>
      <td>4</td>
      <td>758</td>
      <td>Mean Girls</td>
    </tr>
    <tr>
      <th>10</th>
      <td>1539350</td>
      <td>4</td>
      <td>798</td>
      <td>Jaws</td>
    </tr>
    <tr>
      <th>11</th>
      <td>1539350</td>
      <td>4</td>
      <td>831</td>
      <td>Mannequin</td>
    </tr>
    <tr>
      <th>12</th>
      <td>1539350</td>
      <td>4</td>
      <td>963</td>
      <td>A Streetcar Named Desire</td>
    </tr>
    <tr>
      <th>13</th>
      <td>1539350</td>
      <td>4</td>
      <td>1102</td>
      <td>Training Day</td>
    </tr>
    <tr>
      <th>14</th>
      <td>1539350</td>
      <td>5</td>
      <td>1202</td>
      <td>National Lampoon's Vacation</td>
    </tr>
    <tr>
      <th>15</th>
      <td>1539350</td>
      <td>4</td>
      <td>1220</td>
      <td>Man on Fire</td>
    </tr>
    <tr>
      <th>16</th>
      <td>1539350</td>
      <td>4</td>
      <td>1307</td>
      <td>S.W.A.T.</td>
    </tr>
    <tr>
      <th>17</th>
      <td>1539350</td>
      <td>4</td>
      <td>1509</td>
      <td>National Lampoon's Van Wilder</td>
    </tr>
    <tr>
      <th>18</th>
      <td>1539350</td>
      <td>4</td>
      <td>1659</td>
      <td>Grumpy Old Men</td>
    </tr>
    <tr>
      <th>19</th>
      <td>1539350</td>
      <td>4</td>
      <td>1744</td>
      <td>Beverly Hills Cop</td>
    </tr>
    <tr>
      <th>20</th>
      <td>1539350</td>
      <td>4</td>
      <td>1754</td>
      <td>Sixteen Candles</td>
    </tr>
    <tr>
      <th>21</th>
      <td>1539350</td>
      <td>4</td>
      <td>1770</td>
      <td>Trainspotting</td>
    </tr>
    <tr>
      <th>22</th>
      <td>1539350</td>
      <td>4</td>
      <td>1798</td>
      <td>Lethal Weapon</td>
    </tr>
    <tr>
      <th>23</th>
      <td>1539350</td>
      <td>4</td>
      <td>1799</td>
      <td>Die Hard 2: Die Harder</td>
    </tr>
    <tr>
      <th>24</th>
      <td>1539350</td>
      <td>4</td>
      <td>1843</td>
      <td>Beverly Hills Cop III</td>
    </tr>
    <tr>
      <th>25</th>
      <td>1539350</td>
      <td>4</td>
      <td>1905</td>
      <td>Pirates of the Caribbean: The Curse of the Bla...</td>
    </tr>
    <tr>
      <th>26</th>
      <td>1539350</td>
      <td>4</td>
      <td>1962</td>
      <td>50 First Dates</td>
    </tr>
    <tr>
      <th>27</th>
      <td>1539350</td>
      <td>4</td>
      <td>2152</td>
      <td>What Women Want</td>
    </tr>
    <tr>
      <th>28</th>
      <td>1539350</td>
      <td>4</td>
      <td>2161</td>
      <td>Six Degrees of Separation</td>
    </tr>
    <tr>
      <th>29</th>
      <td>1539350</td>
      <td>4</td>
      <td>2178</td>
      <td>Lock</td>
    </tr>
    <tr>
      <th>30</th>
      <td>1539350</td>
      <td>4</td>
      <td>2252</td>
      <td>Bram Stoker's Dracula</td>
    </tr>
    <tr>
      <th>31</th>
      <td>1539350</td>
      <td>4</td>
      <td>2391</td>
      <td>Along Came Polly</td>
    </tr>
    <tr>
      <th>32</th>
      <td>1539350</td>
      <td>4</td>
      <td>2395</td>
      <td>Scream</td>
    </tr>
    <tr>
      <th>33</th>
      <td>1539350</td>
      <td>4</td>
      <td>2462</td>
      <td>Planes</td>
    </tr>
    <tr>
      <th>34</th>
      <td>1539350</td>
      <td>4</td>
      <td>2612</td>
      <td>Don't Say a Word</td>
    </tr>
    <tr>
      <th>35</th>
      <td>1539350</td>
      <td>5</td>
      <td>2862</td>
      <td>The Silence of the Lambs</td>
    </tr>
    <tr>
      <th>36</th>
      <td>1539350</td>
      <td>4</td>
      <td>3079</td>
      <td>The Lion King: Special Edition</td>
    </tr>
    <tr>
      <th>37</th>
      <td>1539350</td>
      <td>5</td>
      <td>3151</td>
      <td>Napoleon Dynamite</td>
    </tr>
    <tr>
      <th>38</th>
      <td>1539350</td>
      <td>4</td>
      <td>3182</td>
      <td>Private Parts</td>
    </tr>
    <tr>
      <th>39</th>
      <td>1539350</td>
      <td>4</td>
      <td>3418</td>
      <td>Sister Act 2: Back in the Habit</td>
    </tr>
    <tr>
      <th>40</th>
      <td>1539350</td>
      <td>5</td>
      <td>3605</td>
      <td>The Wizard of Oz: Collector's Edition</td>
    </tr>
    <tr>
      <th>41</th>
      <td>1539350</td>
      <td>4</td>
      <td>3610</td>
      <td>Lethal Weapon 3</td>
    </tr>
    <tr>
      <th>42</th>
      <td>1539350</td>
      <td>4</td>
      <td>3648</td>
      <td>Who Framed Roger Rabbit?: Special Edition</td>
    </tr>
    <tr>
      <th>43</th>
      <td>1539350</td>
      <td>4</td>
      <td>3864</td>
      <td>Batman Begins</td>
    </tr>
    <tr>
      <th>44</th>
      <td>1539350</td>
      <td>5</td>
      <td>3928</td>
      <td>Nip/Tuck: Season 2</td>
    </tr>
    <tr>
      <th>45</th>
      <td>1539350</td>
      <td>4</td>
      <td>3938</td>
      <td>Shrek 2</td>
    </tr>
    <tr>
      <th>46</th>
      <td>1539350</td>
      <td>4</td>
      <td>3962</td>
      <td>Finding Nemo (Widescreen)</td>
    </tr>
    <tr>
      <th>47</th>
      <td>1539350</td>
      <td>4</td>
      <td>4145</td>
      <td>Law &amp; Order: Special Victims Unit: The First Year</td>
    </tr>
    <tr>
      <th>48</th>
      <td>1539350</td>
      <td>5</td>
      <td>4159</td>
      <td>Barbershop</td>
    </tr>
    <tr>
      <th>49</th>
      <td>1539350</td>
      <td>4</td>
      <td>4227</td>
      <td>The Full Monty</td>
    </tr>
    <tr>
      <th>50</th>
      <td>1539350</td>
      <td>4</td>
      <td>4306</td>
      <td>The Sixth Sense</td>
    </tr>
    <tr>
      <th>51</th>
      <td>1539350</td>
      <td>4</td>
      <td>4345</td>
      <td>Bowling for Columbine</td>
    </tr>
    <tr>
      <th>52</th>
      <td>1539350</td>
      <td>4</td>
      <td>4369</td>
      <td>Porky's</td>
    </tr>
    <tr>
      <th>53</th>
      <td>1539350</td>
      <td>4</td>
      <td>4384</td>
      <td>Dawn of the Dead</td>
    </tr>
    <tr>
      <th>54</th>
      <td>1539350</td>
      <td>4</td>
      <td>4465</td>
      <td>The Big One</td>
    </tr>
  </tbody>
</table>

```python
recomendaciones_usuario = df_title.iloc[:4499].copy()
print(recomendaciones_usuario.shape)
recomendaciones_usuario.head()
```

    (4499, 1)

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Name</th>
    </tr>
    <tr>
      <th>Movie_Id</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Dinosaur Planet</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Isle of Man TT 2004 Review</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Character</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Paula Abdul's Get Up &amp; Dance</td>
    </tr>
    <tr>
      <th>5</th>
      <td>The Rise and Fall of ECW</td>
    </tr>
  </tbody>
</table>

```python
# Debemos extraer las películas que ya ha visto

usuario_vistas = df1[df1['User'] == usuario]
print(usuario_vistas.shape)
usuario_vistas.head()
```

    (97, 3)

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>User</th>
      <th>Rating</th>
      <th>movie_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>219870</th>
      <td>1539350</td>
      <td>3</td>
      <td>33</td>
    </tr>
    <tr>
      <th>409717</th>
      <td>1539350</td>
      <td>4</td>
      <td>111</td>
    </tr>
    <tr>
      <th>445206</th>
      <td>1539350</td>
      <td>3</td>
      <td>127</td>
    </tr>
    <tr>
      <th>664099</th>
      <td>1539350</td>
      <td>4</td>
      <td>175</td>
    </tr>
    <tr>
      <th>894718</th>
      <td>1539350</td>
      <td>4</td>
      <td>197</td>
    </tr>
  </tbody>
</table>

```python
if True: # Sacamos las que filtramos
    recomendaciones_usuario.drop(peliculas_pocos_vistos, inplace = True)
```

```python
recomendaciones_usuario.drop(usuario_vistas.movie_id, inplace = True)
recomendaciones_usuario = recomendaciones_usuario.reset_index()
recomendaciones_usuario.head()
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Movie_Id</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>3</td>
      <td>Character</td>
    </tr>
    <tr>
      <th>1</th>
      <td>5</td>
      <td>The Rise and Fall of ECW</td>
    </tr>
    <tr>
      <th>2</th>
      <td>6</td>
      <td>Sick</td>
    </tr>
    <tr>
      <th>3</th>
      <td>8</td>
      <td>What the #$*! Do We Know!?</td>
    </tr>
    <tr>
      <th>4</th>
      <td>16</td>
      <td>Screamers</td>
    </tr>
  </tbody>
</table>

```python
# Recomendamos

recomendaciones_usuario['Estimate_Score'] = recomendaciones_usuario['Movie_Id'].apply(lambda x: model.predict(usuario, x).est)
```

```python
recomendaciones_usuario = recomendaciones_usuario.sort_values('Estimate_Score', ascending=False)
print(recomendaciones_usuario.head(10))
```

          Movie_Id                                           Name  Estimate_Score
    8           25  Inspector Morse 31: Death Is Now My Neighbour        3.993816
    1            5                       The Rise and Fall of ECW        3.922796
    6           18                               Immortal Beloved        3.828125
    10          28                                Lilo and Stitch        3.824921
    11          30                         Something's Gotta Give        3.675472
    0            3                                      Character        3.642784
    1102      3054                                 I'm Not Scared        3.549960
    1101      3047                        The Fabulous Baker Boys        3.549960
    1094      3023                                       Upstairs        3.549960
    1100      3046              The Simpsons: Treehouse of Horror        3.549960

### **Evaluación**

```python
from surprise import accuracy

accuracy.rmse(predictions)
```

    RMSE: 1.0357

    1.0356704607271807

### **Optimización de hiperparámetros**

```python
from surprise.model_selection import cross_validate

rmse_test_means = []
factores = [1,2,4,8,16,32,64,128,256]

for factor in factores:
    print(factor)
    model = SVD(n_factors=factor)
    cv = cross_validate(model, data, measures=['RMSE'], cv = 3, verbose=True)
    rmse_test_means.append(np.mean(cv['test_rmse']))
```

    1
    Evaluating RMSE of algorithm SVD on 3 split(s).

                      Fold 1  Fold 2  Fold 3  Mean    Std
    RMSE (testset)    1.0425  1.0346  1.0411  1.0394  0.0034
    Fit time          1.45    1.45    1.42    1.44    0.01
    Test time         0.50    0.26    0.46    0.41    0.10
    2
    Evaluating RMSE of algorithm SVD on 3 split(s).

                      Fold 1  Fold 2  Fold 3  Mean    Std
    RMSE (testset)    1.0423  1.0374  1.0376  1.0391  0.0023
    Fit time          1.09    0.97    1.01    1.02    0.05
    Test time         0.17    0.17    0.17    0.17    0.00
    4
    Evaluating RMSE of algorithm SVD on 3 split(s).

                      Fold 1  Fold 2  Fold 3  Mean    Std
    RMSE (testset)    1.0379  1.0422  1.0401  1.0401  0.0018
    Fit time          1.05    1.01    1.02    1.02    0.02
    Test time         0.16    0.16    0.17    0.16    0.00
    8
    Evaluating RMSE of algorithm SVD on 3 split(s).

                      Fold 1  Fold 2  Fold 3  Mean    Std
    RMSE (testset)    1.0443  1.0372  1.0452  1.0422  0.0036
    Fit time          1.13    1.17    1.14    1.15    0.02
    Test time         0.18    0.15    0.17    0.17    0.01
    16
    Evaluating RMSE of algorithm SVD on 3 split(s).

                      Fold 1  Fold 2  Fold 3  Mean    Std
    RMSE (testset)    1.0457  1.0425  1.0401  1.0428  0.0023
    Fit time          1.38    1.34    1.36    1.36    0.02
    Test time         0.17    0.19    0.15    0.17    0.01
    32
    Evaluating RMSE of algorithm SVD on 3 split(s).

                      Fold 1  Fold 2  Fold 3  Mean    Std
    RMSE (testset)    1.0416  1.0395  1.0508  1.0440  0.0049
    Fit time          1.67    1.69    1.70    1.69    0.02
    Test time         0.17    0.16    0.18    0.17    0.01
    64
    Evaluating RMSE of algorithm SVD on 3 split(s).

                      Fold 1  Fold 2  Fold 3  Mean    Std
    RMSE (testset)    1.0407  1.0435  1.0529  1.0457  0.0052
    Fit time          2.45    2.53    2.57    2.52    0.05
    Test time         0.17    0.35    0.16    0.23    0.09
    128
    Evaluating RMSE of algorithm SVD on 3 split(s).

                      Fold 1  Fold 2  Fold 3  Mean    Std
    RMSE (testset)    1.0433  1.0468  1.0491  1.0464  0.0024
    Fit time          3.86    3.93    3.98    3.92    0.05
    Test time         0.38    0.15    0.35    0.29    0.10
    256
    Evaluating RMSE of algorithm SVD on 3 split(s).

                      Fold 1  Fold 2  Fold 3  Mean    Std
    RMSE (testset)    1.0540  1.0470  1.0407  1.0472  0.0054
    Fit time          6.91    6.91    6.93    6.92    0.01
    Test time         0.16    0.38    0.18    0.24    0.10

```python
# Ploteamos desempeño según cantidad de factores de SVD

plt.scatter(factores, rmse_test_means)
plt.xlabel('Numero de factores')
plt.ylabel('Error RMSE')
plt.show()
```

<img src="/m6/4/1cc195f4d8ecc30ab05d9e411d10407ff3c6b6b5.png" alt="sistema de recomendacion image" />

```python
# Nuevamente, no apto para ansiosos

from surprise.model_selection import GridSearchCV

param_grid = {'n_factors': [5,50,100],'n_epochs': [5, 10,20], 'lr_all': [0.001, 0.002, 0.005],
              'reg_all': [0.002, 0.02, 0.2]}
gs = GridSearchCV(SVD, param_grid, measures=['rmse'], cv=3, n_jobs = -1)
gs.fit(data)
```

```python
# Observamos performance del mejor modelo

print(gs.best_score['rmse'])
print(gs.best_params['rmse'])
```

    1.0402300239724742
    {'n_factors': 5, 'n_epochs': 20, 'lr_all': 0.005, 'reg_all': 0.2}

Para entender un poco más estas métricas podemos irnos
[aquí](https://surprise.readthedocs.io/en/stable/matrix_factorization.html).

---

## **Incorporación de nuevos datos**

Vamos a ver cómo sumar las calificaciones que no hemos usado.

```python
# 1

def load_data(name):
    df = pd.read_csv(name, header = None, names = ['User','Rating'], usecols = [0,1])

    # En ciertos casos, forzar un tipo de dato hace que se ahorre mucho lugar en memoria.
    df['Rating'] = df['Rating']#.astype(float)
    return df


df2 = load_data('../Datasets/Clase_08_RS/combined_data_2.txt')
print(df2.shape)
```

    (26982302, 2)

```python
# 2

movies_ids_df2 = df2.User[df2.Rating.isna()].values
print(movies_ids_df2)
print(len(movies_ids_df2))

movies_ids_df2 = np.arange(4500,len(movies_ids_df2) + 4500)
print(movies_ids_df2)
```

    ['4500:' '4501:' '4502:' ... '9208:' '9209:' '9210:']
    4711
    [4500 4501 4502 ... 9208 9209 9210]

```python
df2_nan = pd.DataFrame(pd.isnull(df2.Rating))
df2_nan = df2_nan[df2_nan['Rating'] == True]
idx_movies_ids = df2_nan.index.values
print(idx_movies_ids)
```

    [       0      259      855 ... 26961403 26980373 26980497]

```python
# Agregamos el índice de la última instancia del DataFrame

idx_movies_ids = np.append(idx_movies_ids,df2.shape[0])
```

```python
cantidad_criticas = np.diff(idx_movies_ids)
```

```python
cantidad_criticas
```

    array([  259,   596,   105, ..., 18970,   124,  1805], dtype=int64)

```python
columna_movie_id = np.array([])
for i in range(cantidad_criticas.size):
    aux = np.full(cantidad_criticas[i], movies_ids_df2[i])
    columna_movie_id = np.concatenate((columna_movie_id, aux))
```

```python
df2['movie_id'] = columna_movie_id
del columna_movie_id

df2.dropna(inplace = True)
df2['User'] = df2['User'].astype(int)
df2['movie_id'] = df2['movie_id'].astype(np.int16)
df2['Rating'] = df2['Rating'].astype(np.int8)

gc.collect()
```

    2493

```python
df2
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>User</th>
      <th>Rating</th>
      <th>movie_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>2532865</td>
      <td>4</td>
      <td>4500</td>
    </tr>
    <tr>
      <th>2</th>
      <td>573364</td>
      <td>3</td>
      <td>4500</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1696725</td>
      <td>3</td>
      <td>4500</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1253431</td>
      <td>3</td>
      <td>4500</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1265574</td>
      <td>2</td>
      <td>4500</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>26982297</th>
      <td>2420260</td>
      <td>1</td>
      <td>9210</td>
    </tr>
    <tr>
      <th>26982298</th>
      <td>761176</td>
      <td>3</td>
      <td>9210</td>
    </tr>
    <tr>
      <th>26982299</th>
      <td>459277</td>
      <td>3</td>
      <td>9210</td>
    </tr>
    <tr>
      <th>26982300</th>
      <td>2407365</td>
      <td>4</td>
      <td>9210</td>
    </tr>
    <tr>
      <th>26982301</th>
      <td>627867</td>
      <td>3</td>
      <td>9210</td>
    </tr>
  </tbody>
</table>
<p>26977591 rows × 3 columns</p>

```python
### 4.

df1 = pd.read_csv('../Datasets/Clase_08_RS/combined_data_1_con_movie_id.csv', dtype={'Rating': np.int8, 'movie_id': np.int16})
print(df1.shape)
df1.head()
```

    (24053764, 3)

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>User</th>
      <th>Rating</th>
      <th>movie_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1488844</td>
      <td>3</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>822109</td>
      <td>5</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>885013</td>
      <td>4</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>30878</td>
      <td>4</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>823519</td>
      <td>3</td>
      <td>1</td>
    </tr>
  </tbody>
</table>

```python
### 5.
df = df1.copy()
del df1
df = df.append(df2)
print(df.shape)
```

    (51031355, 3)

```python
# Corroboramos que estén todas las películas

peliculas_presentes = df.movie_id.unique()
peliculas_presentes
```

    array([   1,    2,    3, ..., 9208, 9209, 9210], dtype=int16)

```python
print((peliculas_presentes - np.arange(1,9210 + 1)).sum())
```

    0

```python
switch = False
if switch:
    df.to_csv('../Datasets/Clase_08_RS/combined_data_1y2_con_movie_id.csv', index= False)
```
