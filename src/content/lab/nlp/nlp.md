---
title: "Procesamiento de Lenguaje Natural"
description: "..."
pubDate: "Apr 10 2023"
heroImage: "/placeholder-hero.jpg"
slug: 'natural_language_processing/1'
---

---

Usaremos el siguiente dataset:

<https://www.kaggle.com/rmisra/news-headlines-dataset-for-sarcasm-detection/>

La biblioteca fundamental que vamos a usar es NLTK. Probablemente tengan
que instalarla. - - -

## 1. Carga de datos

Lo primero que tienen que hacer es fijarse en qué formato están los
datos. ¿De qué se trata es formato?¿Cómo se abre? Si googlean, van a ver
que hay muchas formas de abrir archivos JSON con Python. Como venimos
trabajando con Pandas, googleen \"Open JSON with Pandas\". Prueben esa
función. Si les tira un error en el primer intento, googleen el error.
Les aseguramos que la respuesta está muy a mano y es muy accesible, no
tienen que hacer nada raro.

``` python
import itertools

import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
import seaborn as sns
sns.set()

import nltk

# Esto sirve para configurar NLTK. La primera vez puede tardar un poco
nltk.download('punkt')
nltk.download('stopwords')
```

    [nltk_data] Downloading package punkt to /home/printer/nltk_data...
    [nltk_data]   Package punkt is already up-to-date!
    [nltk_data] Downloading package stopwords to
    [nltk_data]     /home/printer/nltk_data...
    [nltk_data]   Package stopwords is already up-to-date!

    True

Dato; ¿para que sirve el lines = True?

Cuando traemos un conjunto de datos, en este caso un json, al final de
cada linea tiene el \\n (que es el salto de linea).

Si nosotros no le pasamos el \"lines = True\" nos trae un error del tipo
\"ValueError: Trailing data\". Entonces básicamente sirve para que pueda
leer correctamente el archivo sin que nos traigan errores.

Fuente de dicha información:

[Como manejar el \"ValueError: Trailing
data\"](https://www.statology.org/valueerror-trailing-data/)

``` python
dataset = pd.read_json('../Datasets/Sarcasm_Headlines_Dataset.json', lines= True)
dataset.head()
```
<div id='tables'>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>article_link</th>
      <th>headline</th>
      <th>is_sarcastic</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>https://www.huffingtonpost.com/entry/versace-b...</td>
      <td>former versace store clerk sues over secret 'b...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>https://www.huffingtonpost.com/entry/roseanne-...</td>
      <td>the 'roseanne' revival catches up to our thorn...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>https://local.theonion.com/mom-starting-to-fea...</td>
      <td>mom starting to fear son's web series closest ...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>https://politics.theonion.com/boehner-just-wan...</td>
      <td>boehner just wants wife to listen, not come up...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>https://www.huffingtonpost.com/entry/jk-rowlin...</td>
      <td>j.k. rowling wishes snape happy birthday in th...</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>

¿Qué forma tiene el dataset?¿Cuántas instancias?¿Cuáles son sus
columnas?¿Cuántos titulares hay de cada tipo?¿Podemos hablar ya de
*features*?

``` python
dataset.shape
```

    (26709, 3)

``` python
sns.countplot(dataset.is_sarcastic)
plt.show()
```

<img src="/m8/2/236a6b9a5078a978f4127288ccb2dcbd698cfaeb.png" alt="NLP" />

## 2. Breve exploración del dataset {#2-breve-exploración-del-dataset}

Elegir una instancia del dataset al azar y seleccionar el *headline*.

``` python
index_random = np.random.randint(0,high = dataset.shape[0])
titular = dataset.iloc[index_random].headline
print(index_random, titular)
```

    8722 report: 50% of heaven's population just assholes who begged for forgiveness at last second

\"Turn Your Scraps Of Summer Fruit Into The Most Gorgeous Ice Cubes\"

Traducción de lo anterior: \"convierte tus restos de fruta de verano en
los cubitos de hielo más hermosos\"

¿Les parece que es sarcástico?¿Qué características del texto les hace
creer - o no - eso? Comprobar si es sarcástico o no imprimiendo en la
celda de abajo el valor correspondiente del dataset. (Como la mayoría de
los titulares están en inglés y encima refieren a política local, no se
preocupen si es una tarea difícil).

``` python
print(index_random, dataset.iloc[index_random].is_sarcastic)
```

    8722 1

## 3. NLTK

Si es difícil para algunos humanos detectar el sarcasmo, probablemente
también lo sea para una computadora. De todas formas, se puede hacer el
intento. Para ello, es necesario extraer características de cada texto
que nos sirvan para ir apuntando al objetivo. Elegir un titular que les
llame la atención y probar las siguientes herramientas:

### Tokenización

¿Qué es y para qué sirve?¿Cuáles de todas las formas de tokenización
presentadas les parece más útil para este problema?

La tokenización es el proceso mediante el cual una gran cantidad de
texto se divide en partes más pequeñas llamadas tokens. Estos tokens son
muy útiles para encontrar patrones y se consideran un paso base para la
derivación y la lematización. La tokenización también ayuda a sustituir
elementos de datos confidenciales por elementos de datos no
confidenciales. Fuente de la definición anterior: [Que es la
tokenizacion?](https://www.guru99.com/tokenize-words-sentences-nltk.html)

1.  `sent_tokenize: Lo que hace es tokenizar las oraciones, es decir que, si encuentra varias oraciones (dentro de un mismo titular en este caso) las va a separar.`
:::

``` python
type(titular)
```

    str

``` python
titular_st = nltk.tokenize.sent_tokenize(titular)
titular_st
```

    ["report: 50% of heaven's population just assholes who begged for forgiveness at last second"]

1.  word_tokenize

::: {.cell .code execution_count="178"}
``` python
titular_wt = nltk.tokenize.word_tokenize(titular)
titular_wt
```

    ['report',
     ':',
     '50',
     '%',
     'of',
     'heaven',
     "'s",
     'population',
     'just',
     'assholes',
     'who',
     'begged',
     'for',
     'forgiveness',
     'at',
     'last',
     'second']

``` python
import re
titular_wt = nltk.tokenize.word_tokenize("El día de ayer fue el día más lluvioso del año!!.".lower())
re.sub("[^a-zA-Z!ñíá]"," ",str(titular_wt))
```

    '  el    día    de    ayer    fue    el    día    más    lluvioso    del    año    !    !       '

### Normalización

¿Qué es y para qué sirve? Notar que varias formas de normalización ya
vienen aplicadas en el dataset.

1.  Stopwords

Importar los `stopwords` del inglés e imprimirlos.

Qué es el stopwords? Es un diccionario de palabras \"inútiles\" o
palabras que no le dan un valor agregado a nuestro conjunto de datos.

``` python
stopwords = nltk.corpus.stopwords.words('spanish')
stopwords = [palabra for palabra in stopwords if 'not' not in palabra]
stopwords
```

    ['de',
     'la',
     'que',
     'el',
     'en',
     'del',
     '...',
     'teniendo',
     'tenido',
     'tenida',
     'tenidos',
     'tenidas',
     'tened'](180)

``` python
stopwords.append('Palabra_nueva_que_no_queremos_que_aparezca')
```

``` python
stopwords
```

    ['de',
     'la',
     '...',
     'tenidos',
     'tenidas',
     'tened',
     'Palabra_nueva_que_no_queremos_que_aparezca']

#### ¿Les parece conveniente aplicar todos los stopwords que aparecen en esa lista?

#### Eliminar del titular elegido los stopwords. {#eliminar-del-titular-elegido-los-stopwords}

``` python
## Titular entero con los stopwords
titular_wt
```

    ['el',
     'día',
     'de',
     'ayer',
     'fue',
     'el',
     'día',
     'más',
     'lluvioso',
     'del',
     'año',
     '!',
     '!',
     '.']

``` python
titular_wt_sin_sw = [word for word in titular_wt if word not in stopwords]
titular_wt_sin_sw
```

    ['día', 'ayer', 'día', 'lluvioso', 'año', '!', '!', '.']

¿Cuál o cuáles palabras se fueron?

### Frecuencia de palabras

Dado el titular ya tokenizado por palabras y sin stopwords, usar `nltk`
para extrar la frecuencia con que aparece cada palabras. ¿Tiene sentido
esto para titulares?

``` python
titular_wt_sin_sw
```

    ['día', 'ayer', 'día', 'lluvioso', 'año', '!', '!', '.']

``` python
freq = nltk.FreqDist(titular_wt_sin_sw)
freq
```

    FreqDist({'día': 2, '!': 2, 'ayer': 1, 'lluvioso': 1, 'año': 1, '.': 1})

``` python
type(freq)
```

    nltk.probability.FreqDist

### Dataset Completo

Antes de pasar a extraer features de cada instancia del Dataset, podemos
hacer un pequeño análisis del dataset en su conjunto. Por ejemplo, una
opción es agrupar todos los titulares por tipo y extraer de cada clase
las palabras más frecuentes. Para ello:

1.  Agrupar los titulares por tipo. Crear un dataframe para cada uno.
    Recuerden usar máscaras.
2.  Crear una lista vacia y agregar en esa lista todos los titulares
    (por tipo/dataframe creado) ya tokenizados (usar el
    `RegexpTokenizer`) y filtrado por `stopwords`.
3.  Usar el `FreqDist` en esa lista que acaban de llenar. Llevar lo que
    devuelve `FreqDist` a un Dataframe. Ordenar por frecuencia en que
    aparece cada palabra.
4.  Hacer un `barplot` o similar para visualizar.
5.  ¿Qué palabras filtrarían, aparte de las que aparecen en `stopwords`?
    Crear una lista vacía y agregarlas a mano. Agregar en el código que
    realizaron una línea (similar a la que usan con `stopwords`) para
    que también filtre por esas palabras.
6.  Volver a visualizar.

#### No-Sarcasmo

``` python
stopwords = nltk.corpus.stopwords.words('english')
filtrar = []
if True:
    filtrar.append("u")
    filtrar.append("new")
```

``` python
dataset_no_sarcasmo = dataset[dataset.is_sarcastic==0]
dataset_no_sarcasmo.head()
```
<div id='tables'>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>article_link</th>
      <th>headline</th>
      <th>is_sarcastic</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>https://www.huffingtonpost.com/entry/versace-b...</td>
      <td>former versace store clerk sues over secret 'b...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>https://www.huffingtonpost.com/entry/roseanne-...</td>
      <td>the 'roseanne' revival catches up to our thorn...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>https://www.huffingtonpost.com/entry/jk-rowlin...</td>
      <td>j.k. rowling wishes snape happy birthday in th...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>5</th>
      <td>https://www.huffingtonpost.com/entry/advancing...</td>
      <td>advancing the world's women</td>
      <td>0</td>
    </tr>
    <tr>
      <th>6</th>
      <td>https://www.huffingtonpost.com/entry/how-meat-...</td>
      <td>the fascinating case for eating lab-grown meat</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>

``` python
titular
```

    "report: 50% of heaven's population just assholes who begged for forgiveness at last second"

``` python
nltk.tokenize.RegexpTokenizer("[\w]+").tokenize(titular)
```

    ['report',
     '50',
     'of',
     'heaven',
     's',
     'population',
     'just',
     'assholes',
     'who',
     'begged',
     'for',
     'forgiveness',
     'at',
     'last',
     'second']

#### Veamos que le estamos pasando un texto que contiene un usuario al principio, una url y otro usuario al final y lo borra del texto. {#veamos-que-le-estamos-pasando-un-texto-que-contiene-un-usuario-al-principio-una-url-y-otro-usuario-al-final-y-lo-borra-del-texto}

``` python
import re

text = '@username1: some tweet here, http://www.url.com, aaaaa @username2'
processed_text = re.sub(r"(?:\@|http?\://|https?\://|www)\S+", "", text)
processed_text = " ".join(processed_text.split())
print(processed_text)
```

    some tweet here, aaaaa

``` python
todos_titulares_no_sarcasmo = []
for i in range(dataset_no_sarcasmo.shape[0]):
    titular = dataset_no_sarcasmo.iloc[i].headline
    titular = nltk.tokenize.RegexpTokenizer("[\w]+").tokenize(titular)
    titular = [word for word in titular if word not in stopwords]
    titular = [word for word in titular if word not in filtrar]

    todos_titulares_no_sarcasmo.append(titular)
```

``` python
todos_titulares_no_sarcasmo = list(itertools.chain(*todos_titulares_no_sarcasmo))
todos_titulares_no_sarcasmo[0:10]
```

    ['former',
     'versace',
     'store',
     'clerk',
     'sues',
     'secret',
     'black',
     'code',
     'minority',
     'shoppers']

``` python
list(itertools.chain(*('hola mundo')))
```

    ['h', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o']

``` python
freq_no_sarcasmo = nltk.FreqDist(todos_titulares_no_sarcasmo)
freq_no_sarcasmo
```

    FreqDist({'trump': 1446, 'donald': 458, 'says': 349, 'women': 317, 'one': 268, 'year': 244, 'first': 242, 'world': 241, 'man': 241, 'people': 241, ...})

``` python
df_no_sarcasmo = pd.DataFrame(list(freq_no_sarcasmo.items()), columns = ["Word","Frequency"])
df_no_sarcasmo.head()
```
<div id="tables">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Word</th>
      <th>Frequency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>former</td>
      <td>82</td>
    </tr>
    <tr>
      <th>1</th>
      <td>versace</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>store</td>
      <td>14</td>
    </tr>
    <tr>
      <th>3</th>
      <td>clerk</td>
      <td>5</td>
    </tr>
    <tr>
      <th>4</th>
      <td>sues</td>
      <td>15</td>
    </tr>
  </tbody>
</table>
</div>

``` python
df_no_sarcasmo.sort_values('Frequency',ascending=False, inplace = True)
df_no_sarcasmo.head(30)
```

<div id="tables">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Word</th>
      <th>Frequency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>46</th>
      <td>trump</td>
      <td>1446</td>
    </tr>
    <tr>
      <th>229</th>
      <td>donald</td>
      <td>458</td>
    </tr>
    <tr>
      <th>421</th>
      <td>says</td>
      <td>349</td>
    </tr>
    <tr>
      <th>29</th>
      <td>women</td>
      <td>317</td>
    </tr>
    <tr>
      <th>258</th>
      <td>one</td>
      <td>268</td>
    </tr>
    <tr>
      <th>305</th>
      <td>year</td>
      <td>244</td>
    </tr>
    <tr>
      <th>284</th>
      <td>first</td>
      <td>242</td>
    </tr>
    <tr>
      <th>28</th>
      <td>world</td>
      <td>241</td>
    </tr>
    <tr>
      <th>52</th>
      <td>man</td>
      <td>241</td>
    </tr>
    <tr>
      <th>343</th>
      <td>people</td>
      <td>241</td>
    </tr>
    <tr>
      <th>114</th>
      <td>obama</td>
      <td>235</td>
    </tr>
    <tr>
      <th>340</th>
      <td>day</td>
      <td>226</td>
    </tr>
    <tr>
      <th>594</th>
      <td>make</td>
      <td>217</td>
    </tr>
    <tr>
      <th>353</th>
      <td>gop</td>
      <td>215</td>
    </tr>
    <tr>
      <th>132</th>
      <td>like</td>
      <td>213</td>
    </tr>
    <tr>
      <th>369</th>
      <td>5</td>
      <td>212</td>
    </tr>
    <tr>
      <th>6</th>
      <td>black</td>
      <td>208</td>
    </tr>
    <tr>
      <th>749</th>
      <td>get</td>
      <td>207</td>
    </tr>
    <tr>
      <th>198</th>
      <td>life</td>
      <td>203</td>
    </tr>
    <tr>
      <th>1143</th>
      <td>clinton</td>
      <td>203</td>
    </tr>
    <tr>
      <th>1405</th>
      <td>white</td>
      <td>189</td>
    </tr>
    <tr>
      <th>352</th>
      <td>house</td>
      <td>188</td>
    </tr>
    <tr>
      <th>293</th>
      <td>time</td>
      <td>187</td>
    </tr>
    <tr>
      <th>1149</th>
      <td>watch</td>
      <td>186</td>
    </tr>
    <tr>
      <th>106</th>
      <td>could</td>
      <td>186</td>
    </tr>
    <tr>
      <th>283</th>
      <td>america</td>
      <td>183</td>
    </tr>
    <tr>
      <th>489</th>
      <td>police</td>
      <td>176</td>
    </tr>
    <tr>
      <th>580</th>
      <td>need</td>
      <td>174</td>
    </tr>
    <tr>
      <th>71</th>
      <td>hillary</td>
      <td>171</td>
    </tr>
    <tr>
      <th>1142</th>
      <td>bill</td>
      <td>170</td>
    </tr>
  </tbody>
</table>
</div>

``` python
df_no_sarcasmo.reset_index(drop = True, inplace=True)
df_no_sarcasmo.head()
```

<div id='tables'>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Word</th>
      <th>Frequency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>trump</td>
      <td>1446</td>
    </tr>
    <tr>
      <th>1</th>
      <td>donald</td>
      <td>458</td>
    </tr>
    <tr>
      <th>2</th>
      <td>says</td>
      <td>349</td>
    </tr>
    <tr>
      <th>3</th>
      <td>women</td>
      <td>317</td>
    </tr>
    <tr>
      <th>4</th>
      <td>one</td>
      <td>268</td>
    </tr>
  </tbody>
</table>
</div>

``` python
plt.figure(figsize = (15,8))
plot = sns.barplot(x  = df_no_sarcasmo.iloc[:30].Word, y = df_no_sarcasmo.iloc[:30].Frequency)
for item in plot.get_xticklabels():
    item.set_rotation(90)
plt.show()
```

<img src="/m8/2/65cf1f6599e9d6c21ad1fcb2433d06ade5863f1c.png" alt="NLP" />

#### Sarcasmo

``` python
dataset_sarcasmo = dataset[dataset.is_sarcastic==1]
dataset_sarcasmo.head()
```
<div id='tables'>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>article_link</th>
      <th>headline</th>
      <th>is_sarcastic</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2</th>
      <td>https://local.theonion.com/mom-starting-to-fea...</td>
      <td>mom starting to fear son's web series closest ...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>https://politics.theonion.com/boehner-just-wan...</td>
      <td>boehner just wants wife to listen, not come up...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>8</th>
      <td>https://politics.theonion.com/top-snake-handle...</td>
      <td>top snake handler leaves sinking huckabee camp...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>15</th>
      <td>https://entertainment.theonion.com/nuclear-bom...</td>
      <td>nuclear bomb detonates during rehearsal for 's...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>16</th>
      <td>https://www.theonion.com/cosby-lawyer-asks-why...</td>
      <td>cosby lawyer asks why accusers didn't come for...</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>

``` python
todos_titulares_sarcasmo = []
for i in range(dataset_sarcasmo.shape[0]):
    titular = dataset_sarcasmo.iloc[i].headline
    titular = nltk.tokenize.RegexpTokenizer("[\w]+").tokenize(titular)
    titular = [word for word in titular if word not in stopwords]
    titular = [word for word in titular if word not in filtrar]
    todos_titulares_sarcasmo.append(titular)
```

``` python
todos_titulares_sarcasmo = list(itertools.chain(*todos_titulares_sarcasmo))
```

``` python
todos_titulares_sarcasmo[0:10]
```

    ['mom',
     'starting',
     'fear',
     'son',
     'web',
     'series',
     'closest',
     'thing',
     'grandchild',
     'boehner']

``` python
list(itertools.chain(*('HOLA MUNDO!!!')))
```

    ['H', 'O', 'L', 'A', ' ', 'M', 'U', 'N', 'D', 'O', '!', '!', '!']

``` python
freq_sarcasmo = nltk.FreqDist(todos_titulares_sarcasmo)
freq_sarcasmo
```

    FreqDist({'man': 1154, 'area': 480, 'report': 426, 'nation': 339, 'woman': 319, 'year': 308, 'one': 273, 'old': 267, 'time': 252, 'day': 245, ...})

``` python
df_sarcasmo = pd.DataFrame(list(freq_sarcasmo.items()), columns = ["Word","Frequency"])
df_sarcasmo.head()
```
<div id=tables>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Word</th>
      <th>Frequency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>mom</td>
      <td>117</td>
    </tr>
    <tr>
      <th>1</th>
      <td>starting</td>
      <td>32</td>
    </tr>
    <tr>
      <th>2</th>
      <td>fear</td>
      <td>16</td>
    </tr>
    <tr>
      <th>3</th>
      <td>son</td>
      <td>71</td>
    </tr>
    <tr>
      <th>4</th>
      <td>web</td>
      <td>7</td>
    </tr>
  </tbody>
</table>
</div>

``` python
df_sarcasmo.sort_values('Frequency',ascending=False, inplace = True)
df_sarcasmo.head()
```

<div id='tables'>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Word</th>
      <th>Frequency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>30</th>
      <td>man</td>
      <td>1154</td>
    </tr>
    <tr>
      <th>182</th>
      <td>area</td>
      <td>480</td>
    </tr>
    <tr>
      <th>157</th>
      <td>report</td>
      <td>426</td>
    </tr>
    <tr>
      <th>56</th>
      <td>nation</td>
      <td>339</td>
    </tr>
    <tr>
      <th>183</th>
      <td>woman</td>
      <td>319</td>
    </tr>
  </tbody>
</table>
</div>

``` python
df_sarcasmo.reset_index(drop = True, inplace=True)
df_sarcasmo.head()
```

<div id='tables'>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Word</th>
      <th>Frequency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>man</td>
      <td>1154</td>
    </tr>
    <tr>
      <th>1</th>
      <td>area</td>
      <td>480</td>
    </tr>
    <tr>
      <th>2</th>
      <td>report</td>
      <td>426</td>
    </tr>
    <tr>
      <th>3</th>
      <td>nation</td>
      <td>339</td>
    </tr>
    <tr>
      <th>4</th>
      <td>woman</td>
      <td>319</td>
    </tr>
  </tbody>
</table>
<div>

``` python
plt.figure(figsize = (15,8))
plot = sns.barplot(x  = df_sarcasmo.iloc[:30].Word, y = df_sarcasmo.iloc[:30].Frequency)
for item in plot.get_xticklabels():
    item.set_rotation(90)
plt.show()
```

<img src="/m8/2/05f5ab9b5fd43cc19cb70ee95d21de72a70dbcc9.png" alt="NLP" />

## 4. Stemming

Por razones gramaticales muchas palabras pueden escribirse de manera
distinta (debido a conjugación, género, número) pero tener el mismo
significado para el texto. Por ejemplo si decimos \"jugar\", \"jugando\"
o \"juega\", debido a la como estan conjugadas, la computadora las
tratará como palabras distintas, pero en términos de significado, todas
estan relacionadas al verbo Jugar. Muchas veces nos va a convenir unir
todas estos términos en uno solo.

Una de las manera de hacer esto es por \"STEMMING\". El Stemming es un
proceso eurístico que recorta la terminación de las palabras,
agrupándolas por su raiz. Reduzcamos la cantidad de palabras diferentes
en nuestro dataset utilizando este proceso.

a\. Importar nuevamente el dataset completo

``` python
dataset = pd.read_json('../Datasets/Sarcasm_Headlines_Dataset.json', lines= True)
dataset.head()
```

<div id='tables'>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>article_link</th>
      <th>headline</th>
      <th>is_sarcastic</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>https://www.huffingtonpost.com/entry/versace-b...</td>
      <td>former versace store clerk sues over secret 'b...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>https://www.huffingtonpost.com/entry/roseanne-...</td>
      <td>the 'roseanne' revival catches up to our thorn...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>https://local.theonion.com/mom-starting-to-fea...</td>
      <td>mom starting to fear son's web series closest ...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>https://politics.theonion.com/boehner-just-wan...</td>
      <td>boehner just wants wife to listen, not come up...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>https://www.huffingtonpost.com/entry/jk-rowlin...</td>
      <td>j.k. rowling wishes snape happy birthday in th...</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<div>

b, Tomar del `dataset` solo las columnas de interes

``` python
dataset=pd.concat([dataset.headline,dataset.is_sarcastic],axis=1)
dataset.dropna(axis=0,inplace=True)  # Si hay alguna nan, tiramos esa instancia
dataset.head()
```

<div id='tables'>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>headline</th>
      <th>is_sarcastic</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>former versace store clerk sues over secret 'b...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>the 'roseanne' revival catches up to our thorn...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>mom starting to fear son's web series closest ...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>boehner just wants wife to listen, not come up...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>j.k. rowling wishes snape happy birthday in th...</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>

c\. Antes de realizar el proceso de Stemming, vamos a normalizar el
texto con lo que ya estuvimos viendo. Le agregamos en este caso el uso
de la libreria `re`, que nos permite sacar del texto todos los
caracteres que no sean palabras. Notemos que hay veces que no conviene
quitar estos caracteres ya que, por ejemplo, no podremos distiguir
preguntas (?) o exclamaciones (!).

``` python
# Importamos esta libreria que nos permite reemplzar caracteres
import re

# Importamos la función que nos permite Stemmizar de nltk y definimos el stemmer
from nltk.stem import PorterStemmer
stemmer = PorterStemmer()

# Traemos nuevamente las stopwords
stopwords = nltk.corpus.stopwords.words('english')
#stopword.remove('no')
#stopword.remove('not')
```

``` python
# Recorremos todos los titulos y le vamos aplicando la Normalizacion y luega el Stemming a cada uno
titular_list=[]
for titular in dataset.headline:
    # Vamos a reemplzar los caracteres que no sean leras por espacios
    titular=re.sub("[^a-zA-Z]"," ",str(titular))
    # Pasamos todo a minúsculas
    titular=titular.lower()
    # Tokenizamos para separar las palabras del titular
    titular=nltk.word_tokenize(titular)
    # Eliminamos las palabras de menos de 3 letras
    titular = [palabra for palabra in titular if len(palabra)>3]
    # Sacamos las Stopwords
    titular = [palabra for palabra in titular if not palabra in stopwords]
    
    ## Hasta acá Normalizamos, ahora a stemmizar
    
    # Aplicamos la funcion para buscar la raiz de las palabras
    titular=[stemmer.stem(palabra) for palabra in titular]
    # Por ultimo volvemos a unir el titular
    titular=" ".join(titular)
    
    # Vamos armando una lista con todos los titulares
    titular_list.append(titular)
    #dataset["titular_normalizado"] = titular_list
```

d\. Agregamos al dataset una columna llamado `titular_stem` que contenga
los titulares stemmizados

#### Veamos como funciona el Stemming

Definiendo el stemming de una manera más informal, lo que hace es
truncar o devolver la raíz de las palabras. Ojo que la raíz de las
palabras puede no ser tan intuitivo.

``` python
print(stemmer.stem("El gato con botas"))
print(stemmer.stem("Los gatos con botas"))
print(stemmer.stem("El estudia procesamiento de lenguaje natural"))
print(stemmer.stem("Estudian procesamientos de lenguajes naturales"))
```

    el gato con bota
    los gatos con bota
    el estudia procesamiento de lenguaje natur
    estudian procesamientos de lenguajes natural

``` python
dataset["titular_stem"] = titular_list
dataset.tail(50)
```

<div id='tables'>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>headline</th>
      <th>is_sarcastic</th>
      <th>titular_stem</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>26659</th>
      <td>obamacare case to be turned against government...</td>
      <td>0</td>
      <td>obamacar case turn govern emiss rule</td>
    </tr>
    <tr>
      <th>26660</th>
      <td>the tragic death of alejandro nieto and san fr...</td>
      <td>0</td>
      <td>tragic death alejandro nieto francisco gentrif</td>
    </tr>
    <tr>
      <th>26661</th>
      <td>olympic skier ashley caldwell's snooze button ...</td>
      <td>0</td>
      <td>olymp skier ashley caldwel snooz button habit ...</td>
    </tr>
    <tr>
      <th>26662</th>
      <td>frantic john kerry looks on as teresa slowly l...</td>
      <td>1</td>
      <td>frantic john kerri look teresa slowli lower jo...</td>
    </tr>
    <tr>
      <th>26663</th>
      <td>hot-rod-lincoln-driving son may have contribut...</td>
      <td>1</td>
      <td>lincoln drive contribut father alcohol</td>
    </tr>
    <tr>
      <th>26664</th>
      <td>yes, men are still harassing people on the str...</td>
      <td>0</td>
      <td>still harass peopl street still okay</td>
    </tr>
    <tr>
      <th>26665</th>
      <td>floyd mayweather jr. stripped of title from ma...</td>
      <td>0</td>
      <td>floyd mayweath strip titl manni pacquiao fight</td>
    </tr>
    <tr>
      <th>26666</th>
      <td>man on horse hates city</td>
      <td>1</td>
      <td>hors hate citi</td>
    </tr>
    <tr>
      <th>26667</th>
      <td>the iconic blue ikea bag is getting a makeover</td>
      <td>0</td>
      <td>icon blue ikea get makeov</td>
    </tr>
    <tr>
      <th>26668</th>
      <td>poll: majority of americans ready to give up o...</td>
      <td>1</td>
      <td>poll major american readi give someon els goe ...</td>
    </tr>
    <tr>
      <th>26669</th>
      <td>brilliant, innovative ceo just wrote words 'so...</td>
      <td>1</td>
      <td>brilliant innov wrote word social media whiteb...</td>
    </tr>
    <tr>
      <th>26670</th>
      <td>donald trump will not get his son-in-law's new...</td>
      <td>0</td>
      <td>donald trump newspap endors</td>
    </tr>
    <tr>
      <th>26671</th>
      <td>greece votes in its second election of 2015</td>
      <td>0</td>
      <td>greec vote second elect</td>
    </tr>
    <tr>
      <th>26672</th>
      <td>6 things you need to know about drowsy driving</td>
      <td>0</td>
      <td>thing need know drowsi drive</td>
    </tr>
    <tr>
      <th>26673</th>
      <td>report: some shithead out there makes so much ...</td>
      <td>1</td>
      <td>report shithead make much money</td>
    </tr>
    <tr>
      <th>26674</th>
      <td>3 attacks in 3 months put spotlight on terrori...</td>
      <td>0</td>
      <td>attack month spotlight terror</td>
    </tr>
    <tr>
      <th>26675</th>
      <td>trump holds strategy meeting with campaign's t...</td>
      <td>1</td>
      <td>trump hold strategi meet campaign militia lead...</td>
    </tr>
    <tr>
      <th>26676</th>
      <td>avoiding auto repair scams</td>
      <td>0</td>
      <td>avoid auto repair scam</td>
    </tr>
    <tr>
      <th>26677</th>
      <td>7-eleven shareholders approve sale of busch li...</td>
      <td>1</td>
      <td>eleven sharehold approv sale busch light pack</td>
    </tr>
    <tr>
      <th>26678</th>
      <td>man thinks he managed to masturbate without wa...</td>
      <td>1</td>
      <td>think manag masturb without wake roommat</td>
    </tr>
    <tr>
      <th>26679</th>
      <td>un/opcw report blames syria government, islami...</td>
      <td>0</td>
      <td>opcw report blame syria govern islam state che...</td>
    </tr>
    <tr>
      <th>26680</th>
      <td>kim jong-un's absence leaves north korean gove...</td>
      <td>1</td>
      <td>jong absenc leav north korean govern offici agre</td>
    </tr>
    <tr>
      <th>26681</th>
      <td>dog born with odds stacked against her found j...</td>
      <td>0</td>
      <td>born odd stack found parent need</td>
    </tr>
    <tr>
      <th>26682</th>
      <td>american dream week a smashing, mostly uninves...</td>
      <td>0</td>
      <td>american dream week smash mostli uninvestig su...</td>
    </tr>
    <tr>
      <th>26683</th>
      <td>complete idiot forgot to shave area between mo...</td>
      <td>1</td>
      <td>complet idiot forgot shave area mouth nose</td>
    </tr>
    <tr>
      <th>26684</th>
      <td>retreating clinton campaign torches iowa town ...</td>
      <td>1</td>
      <td>retreat clinton campaign torch iowa town slow ...</td>
    </tr>
    <tr>
      <th>26685</th>
      <td>don't nobody wanna hear area man run his mouth</td>
      <td>1</td>
      <td>nobodi hear area mouth</td>
    </tr>
    <tr>
      <th>26686</th>
      <td>48 syrian civilians massacred during claire da...</td>
      <td>1</td>
      <td>syrian civilian massacr clair dane emmi award ...</td>
    </tr>
    <tr>
      <th>26687</th>
      <td>readin' researchin' writin' and the tools to m...</td>
      <td>0</td>
      <td>readin researchin writin tool make happen</td>
    </tr>
    <tr>
      <th>26688</th>
      <td>report: uttering phrase 'easy does it' prevent...</td>
      <td>1</td>
      <td>report utter phrase easi prevent drywal damag ...</td>
    </tr>
    <tr>
      <th>26689</th>
      <td>ted cruz blasts new york times for keeping boo...</td>
      <td>0</td>
      <td>cruz blast york time keep book bestsel list</td>
    </tr>
    <tr>
      <th>26690</th>
      <td>voting underway in myanmar's first free electi...</td>
      <td>0</td>
      <td>vote underway myanmar first free elect year</td>
    </tr>
    <tr>
      <th>26691</th>
      <td>ice cube thrown into sink flies up side like s...</td>
      <td>1</td>
      <td>cube thrown sink fli side like skateboard shre...</td>
    </tr>
    <tr>
      <th>26692</th>
      <td>fisherman's worst nightmare comes true</td>
      <td>0</td>
      <td>fisherman worst nightmar come true</td>
    </tr>
    <tr>
      <th>26693</th>
      <td>new bailiff tired of hearing how old bailiff d...</td>
      <td>1</td>
      <td>bailiff tire hear bailiff thing</td>
    </tr>
    <tr>
      <th>26694</th>
      <td>breaking: 'the onion' in kill range of boston ...</td>
      <td>1</td>
      <td>break onion kill rang boston bomber suspect</td>
    </tr>
    <tr>
      <th>26695</th>
      <td>seaworld crowd applauds for dolphin playfully ...</td>
      <td>1</td>
      <td>seaworld crowd applaud dolphin play spray bloo...</td>
    </tr>
    <tr>
      <th>26696</th>
      <td>zimbabwe's youth defy blackout to organize pro...</td>
      <td>0</td>
      <td>zimbabw youth defi blackout organ protest soci...</td>
    </tr>
    <tr>
      <th>26697</th>
      <td>emma gonzalez: 'one of the biggest threats' to...</td>
      <td>0</td>
      <td>emma gonzalez biggest threat teen today shot</td>
    </tr>
    <tr>
      <th>26698</th>
      <td>hackers breached u.s. election agency after vo...</td>
      <td>0</td>
      <td>hacker breach elect agenc vote accord secur firm</td>
    </tr>
    <tr>
      <th>26699</th>
      <td>what you should buy your 'basic' friend, accor...</td>
      <td>0</td>
      <td>basic friend accord pinterest</td>
    </tr>
    <tr>
      <th>26700</th>
      <td>what's in your mailbox? tips on what to do whe...</td>
      <td>0</td>
      <td>mailbox tip uncl come knock</td>
    </tr>
    <tr>
      <th>26701</th>
      <td>paul ryan is more of a con man than ever</td>
      <td>0</td>
      <td>paul ryan ever</td>
    </tr>
    <tr>
      <th>26702</th>
      <td>pentagon to withhold budget figures out of res...</td>
      <td>1</td>
      <td>pentagon withhold budget figur respect america...</td>
    </tr>
    <tr>
      <th>26703</th>
      <td>pope francis wearing sweater vestments he got ...</td>
      <td>1</td>
      <td>pope franci wear sweater vestment christma</td>
    </tr>
    <tr>
      <th>26704</th>
      <td>american politics in moral free-fall</td>
      <td>0</td>
      <td>american polit moral free fall</td>
    </tr>
    <tr>
      <th>26705</th>
      <td>america's best 20 hikes</td>
      <td>0</td>
      <td>america best hike</td>
    </tr>
    <tr>
      <th>26706</th>
      <td>reparations and obama</td>
      <td>0</td>
      <td>repar obama</td>
    </tr>
    <tr>
      <th>26707</th>
      <td>israeli ban targeting boycott supporters raise...</td>
      <td>0</td>
      <td>isra target boycott support rais alarm abroad</td>
    </tr>
    <tr>
      <th>26708</th>
      <td>gourmet gifts for the foodie 2014</td>
      <td>0</td>
      <td>gourmet gift foodi</td>
    </tr>
  </tbody>
</table>
</div>

Armamos un nuevo dataset llamado `dataset_stem` que contenga solo las
columnas `titular_stem` e `is_sarcastic`

``` python
dataset_stem=pd.concat([dataset.titular_stem,dataset.is_sarcastic],axis=1)
dataset_stem.dropna(axis=0,inplace=True)  # Por si quedaron titulares vacios

dataset_stem.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 26709 entries, 0 to 26708
    Data columns (total 2 columns):
     #   Column        Non-Null Count  Dtype 
    ---  ------        --------------  ----- 
     0   titular_stem  26709 non-null  object
     1   is_sarcastic  26709 non-null  int64 
    dtypes: int64(1), object(1)
    memory usage: 417.5+ KB

## 5. Lemmatization {#5-lemmatization}

Otra manera de llevar distintas palabras a un raíz común en la que
comparten un significado es mediante el procezo de \'Lemmatizar\' el
texto. Es similar al \'Stemming\' pero un poco más educado, ya que
intenta realizar el proceso teniendo en cuenta cuál es el rol que la
palabra cumple en el texto. Esto quiere decir que su accionar será
distinto si la palabra a lemmantizar está actuando como verbo,
sustantivo, etc.

Para usar las funciones que ofrece `nltk` para lemmantizar, tendremos
primero que descargar la libreria `Wordnet` que se encuentra en la
solapa \'corpora\' y las librerias \'maxent_treebank_pos\_\' y
\'averaged_perceptron_tagger\' que se encuentra en la solapa \'Models\'.
Para eso ejecute la siguiente celda:

``` python
nltk.download()
```

    showing info https://raw.githubusercontent.com/nltk/nltk_data/gh-pages/index.xml

    True

``` python
# Importamos esta libreria que nos permite reemplzar caracteres
import re

# Importamos el lemmatizar de NLTK, y creamos el objeto
from nltk.stem import WordNetLemmatizer
wordnet_lemmatizer = WordNetLemmatizer()
```

Veamos cómo actúa el lemmatizer sobre una frase de ejemplo.

### Regular expressions

[Cómo trabajar con regular expressions \-\--\> Documentación de
Python](https://docs.python.org/3/howto/regex.html)

[Pequeña práctica de W3Schools, como usar regular
expressions](https://www.w3schools.com/python/python_regex.asp)

``` python
# Oracion que usaremos como ejemplo
frase = "He was running and eating at same time. He has bad habit of swimming after playing long hours in the Sun."

# Hay que regularizar el texto. Dejar solo letra, pasar a minúsculas y tokenizar:

# Sacamos todo lo que no sean letras
frase = re.sub("[^a-zA-Z]"," ",str(frase))
# Pasamos a minúsculas
frase = frase.lower()
# Tokenizamos
frase_tokens = nltk.word_tokenize(frase)

# Veamos como cambians las palabras al lemmatizar
""" print("{0:20}{1:20}".format("Word","Lemma"))
for palabra in frase_tokens:
    print ("{0:20}{1:20}".format(palabra,wordnet_lemmatizer.lemmatize(palabra))) """
```

    ' print("{0:20}{1:20}".format("Word","Lemma"))\nfor palabra in frase_tokens:\n    print ("{0:20}{1:20}".format(palabra,wordnet_lemmatizer.lemmatize(palabra))) '

¿Les sorprende lo que paso? No cambiaron casi nada (solo se fueron las
\"s\" del final). El problema es que precisamos darle información extra
al Lemmatizer, decirle qué rol está cumpliendo la palabra en la oración.
Si se fijan en la documentación, esto se hace pasandole un argumento
extra a la función llamado POS (Part Of Speech).

Hay distintos metodos que intentan averiguar el rol que cumple una
palabra en una oración. Nosotros vamos a utilizar uno que viene
incorporado en NLTK llamado pos_tag.

Tag - Function

CC - coordinating conjunction

CD - cardinal number

DT - determiner

EX - existential `there`

FW - foreign word

IN - preposition

JJ - adjective

JJR - adjective, comparative

JJS - adjective, superlative

MD - modal

NN - non-plural common noun

NNP - non-plural proper noun

NNPS - plural proper noun

NNS - plural common noun

of - the word `of`

PDT - pre-determiner

POS - posessive

PRP - pronoun

puncf - final punctuation (period,

question - mark and exclamation mark)

punc - other punction

hline - RB adverb

RBR - adverb, comparative

RBS - adverb, superlative

RP - particle

TO - the word `to`

UH - interjection

VB - verb, base form

VBD - verb, past tense

VBG - verb, gerund or present participle

VBN - verb, past participle

VBP - verb, non-3rd person

VBZ - verb, 3rd person

WDT - wh-determiner

WP - wh-pronoun

WRB - wh-adverb

sym - symbol

2 - ambiguously labelled

``` python
print(nltk.pos_tag(frase_tokens))
```

**********************************************************************
  Resource [93maveraged_perceptron_tagger[0m not found.
  Please use the NLTK Downloader to obtain the resource:

  [31m>>> import nltk
  >>> nltk.download('averaged_perceptron_tagger')
  [0m
  For more information see: https://www.nltk.org/data.html

  Attempted to load [93mtaggers/averaged_perceptron_tagger/averaged_perceptron_tagger.pickle[0m

**********************************************************************

Las etiquetas refieren al tipo de palabra. Vamos a definir una función
para traducir estas etiquetas a los valores de POS que entiende
\'wordnet_lemmatizer\'.

``` python
from nltk.corpus import wordnet

def get_wordnet_pos(word):
    """Map POS tag to first character lemmatize() accepts"""
    tag = nltk.pos_tag([word])[0][1][0].upper()
    tag_dict = {"J": wordnet.ADJ,
                "N": wordnet.NOUN,
                "V": wordnet.VERB,
                "R": wordnet.ADV}

    return tag_dict.get(tag, wordnet.NOUN)
```

Veamos finalmente como funciona en nuestro ejemplo.

``` python
frase_lemma = [wordnet_lemmatizer.lemmatize(w, get_wordnet_pos(w)) for w in nltk.word_tokenize(frase)]
tipo_palabra = [get_wordnet_pos(w) for w in nltk.word_tokenize(frase)]

# Veamos como cambiaron las palabras
print("{0:20}{1:20}{2:20}".format("Palabra:","Tipo:","Lemma:"))

for i in range(len(frase_tokens)):
  print ("{0:20}{1:20}{2:20}".format(frase_tokens[i],tipo_palabra[i],frase_lemma[i]))
```

**********************************************************************
  Resource [93maveraged_perceptron_tagger[0m not found.
  Please use the NLTK Downloader to obtain the resource:

  [31m>>> import nltk
  >>> nltk.download('averaged_perceptron_tagger')
  [0m
  For more information see: https://www.nltk.org/data.html

  Attempted to load [93mtaggers/averaged_perceptron_tagger/averaged_perceptron_tagger.pickle[0m

**********************************************************************

matriz_titulosa. Ahora les toca aplicar todo esto a nuestro dataset.
Vamos a volver a importarlo y hacer un procedimiento análogo al que
hicimos para la parte de Stemming.

``` python
# Importamos el lemmatizar de NLTK, y creamos el objeto
from nltk.stem import WordNetLemmatizer
wordnet_lemmatizer = WordNetLemmatizer()

# Importamos esta libreria que nos permite reemplzar caracteres
import re

dataset = pd.read_json('../Datasets/Sarcasm_Headlines_Dataset.json', lines= True)
dataset = pd.concat([dataset.headline,dataset.is_sarcastic],axis=1)
dataset.dropna(axis=0,inplace=True)

# Traemos nuevamente las stopwords
stopwords = nltk.corpus.stopwords.words('english')
#stopword.remove('no')
#stopword.remove('not')
```

#### Ojo que la ejecución de la siguiente celda puede demorar un buen rato

``` python
# Este proceso demora bastante!
titular_list=[]
for titular in dataset.headline:
    # Vamos a reemplzar los caracteres que no sean leras por espacios
    titular=re.sub("[^a-zA-Z]"," ",str(titular))
    # Pasamos todo a minúsculas
    titular=titular.lower()
    # Tokenizamos para separar las palabras
    titular=nltk.word_tokenize(titular)

    # Aplicamos el Lemmatizer (Esto puede tardar un ratito)
    frase_lemma = [wordnet_lemmatizer.lemmatize(w, get_wordnet_pos(w)) for w in titular]
    
    # Eliminamos las palabras d emenos de 3 letras
    titular = [palabra for palabra in titular if len(palabra)>3]
    # Sacamos las Stopwords
    titular = [palabra for palabra in titular if not palabra in stopwords]
    
    # Por ultimo volvemos a unir el titular
    titular=" ".join(titular)
    #dataset["titular_normalizado"] = titular_list
    titular_list.append(titular)
```

**********************************************************************
  Resource [93maveraged_perceptron_tagger[0m not found.
  Please use the NLTK Downloader to obtain the resource:

  [31m>>> import nltk
  >>> nltk.download('averaged_perceptron_tagger')
  [0m
  For more information see: https://www.nltk.org/data.html

  Attempted to load [93mtaggers/averaged_perceptron_tagger/averaged_perceptron_tagger.pickle[0m

**********************************************************************

``` python
dataset["titular_lemm"] = titular_list
dataset.tail(30)
```

<div id='tables'>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>headline</th>
      <th>is_sarcastic</th>
      <th>titular_lemm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>26679</th>
      <td>un/opcw report blames syria government, islami...</td>
      <td>0</td>
      <td>opcw report blames syria government islamic st...</td>
    </tr>
    <tr>
      <th>26680</th>
      <td>kim jong-un's absence leaves north korean gove...</td>
      <td>1</td>
      <td>jong absence leaves north korean government of...</td>
    </tr>
    <tr>
      <th>26681</th>
      <td>dog born with odds stacked against her found j...</td>
      <td>0</td>
      <td>born odds stacked found parents needed</td>
    </tr>
    <tr>
      <th>26682</th>
      <td>american dream week a smashing, mostly uninves...</td>
      <td>0</td>
      <td>american dream week smashing mostly uninvestig...</td>
    </tr>
    <tr>
      <th>26683</th>
      <td>complete idiot forgot to shave area between mo...</td>
      <td>1</td>
      <td>complete idiot forgot shave area mouth nose</td>
    </tr>
    <tr>
      <th>26684</th>
      <td>retreating clinton campaign torches iowa town ...</td>
      <td>1</td>
      <td>retreating clinton campaign torches iowa town ...</td>
    </tr>
    <tr>
      <th>26685</th>
      <td>don't nobody wanna hear area man run his mouth</td>
      <td>1</td>
      <td>nobody hear area mouth</td>
    </tr>
    <tr>
      <th>26686</th>
      <td>48 syrian civilians massacred during claire da...</td>
      <td>1</td>
      <td>syrian civilians massacred claire danes emmy a...</td>
    </tr>
    <tr>
      <th>26687</th>
      <td>readin' researchin' writin' and the tools to m...</td>
      <td>0</td>
      <td>readin researchin writin tools make happen</td>
    </tr>
    <tr>
      <th>26688</th>
      <td>report: uttering phrase 'easy does it' prevent...</td>
      <td>1</td>
      <td>report uttering phrase easy prevents drywall d...</td>
    </tr>
    <tr>
      <th>26689</th>
      <td>ted cruz blasts new york times for keeping boo...</td>
      <td>0</td>
      <td>cruz blasts york times keeping book bestseller...</td>
    </tr>
    <tr>
      <th>26690</th>
      <td>voting underway in myanmar's first free electi...</td>
      <td>0</td>
      <td>voting underway myanmar first free election years</td>
    </tr>
    <tr>
      <th>26691</th>
      <td>ice cube thrown into sink flies up side like s...</td>
      <td>1</td>
      <td>cube thrown sink flies side like skateboarder ...</td>
    </tr>
    <tr>
      <th>26692</th>
      <td>fisherman's worst nightmare comes true</td>
      <td>0</td>
      <td>fisherman worst nightmare comes true</td>
    </tr>
    <tr>
      <th>26693</th>
      <td>new bailiff tired of hearing how old bailiff d...</td>
      <td>1</td>
      <td>bailiff tired hearing bailiff things</td>
    </tr>
    <tr>
      <th>26694</th>
      <td>breaking: 'the onion' in kill range of boston ...</td>
      <td>1</td>
      <td>breaking onion kill range boston bomber suspect</td>
    </tr>
    <tr>
      <th>26695</th>
      <td>seaworld crowd applauds for dolphin playfully ...</td>
      <td>1</td>
      <td>seaworld crowd applauds dolphin playfully spra...</td>
    </tr>
    <tr>
      <th>26696</th>
      <td>zimbabwe's youth defy blackout to organize pro...</td>
      <td>0</td>
      <td>zimbabwe youth defy blackout organize protests...</td>
    </tr>
    <tr>
      <th>26697</th>
      <td>emma gonzalez: 'one of the biggest threats' to...</td>
      <td>0</td>
      <td>emma gonzalez biggest threats teens today shot</td>
    </tr>
    <tr>
      <th>26698</th>
      <td>hackers breached u.s. election agency after vo...</td>
      <td>0</td>
      <td>hackers breached election agency vote accordin...</td>
    </tr>
    <tr>
      <th>26699</th>
      <td>what you should buy your 'basic' friend, accor...</td>
      <td>0</td>
      <td>basic friend according pinterest</td>
    </tr>
    <tr>
      <th>26700</th>
      <td>what's in your mailbox? tips on what to do whe...</td>
      <td>0</td>
      <td>mailbox tips uncle comes knocking</td>
    </tr>
    <tr>
      <th>26701</th>
      <td>paul ryan is more of a con man than ever</td>
      <td>0</td>
      <td>paul ryan ever</td>
    </tr>
    <tr>
      <th>26702</th>
      <td>pentagon to withhold budget figures out of res...</td>
      <td>1</td>
      <td>pentagon withhold budget figures respect ameri...</td>
    </tr>
    <tr>
      <th>26703</th>
      <td>pope francis wearing sweater vestments he got ...</td>
      <td>1</td>
      <td>pope francis wearing sweater vestments christmas</td>
    </tr>
    <tr>
      <th>26704</th>
      <td>american politics in moral free-fall</td>
      <td>0</td>
      <td>american politics moral free fall</td>
    </tr>
    <tr>
      <th>26705</th>
      <td>america's best 20 hikes</td>
      <td>0</td>
      <td>america best hikes</td>
    </tr>
    <tr>
      <th>26706</th>
      <td>reparations and obama</td>
      <td>0</td>
      <td>reparations obama</td>
    </tr>
    <tr>
      <th>26707</th>
      <td>israeli ban targeting boycott supporters raise...</td>
      <td>0</td>
      <td>israeli targeting boycott supporters raises al...</td>
    </tr>
    <tr>
      <th>26708</th>
      <td>gourmet gifts for the foodie 2014</td>
      <td>0</td>
      <td>gourmet gifts foodie</td>
    </tr>
  </tbody>
</table>
</div>

b\. Por último nos armamos un nuevo datasate llamado `dataset_lem` que
tenga solo las columnas `titular_lemm` y `is_sarcastic`.

``` python
dataset_lemm = pd.concat([dataset.titular_lemm,dataset.is_sarcastic],axis=1)
dataset_lemm.dropna(axis=0,inplace=True)  # Por si quedaron titulares vacios
dataset_lemm.head()
```

<div id='tables'>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>titular_lemm</th>
      <th>is_sarcastic</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>former versace store clerk sues secret black c...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>roseanne revival catches thorny political mood...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>starting fear series closest thing grandchild</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>boehner wants wife listen come alternative deb...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>rowling wishes snape happy birthday magical</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>

## 6. Vectorizar

Tenemos un grupo de palabras por cada titular (bag of words). La idea
ahora es representar esta lista de palabras como un vector. Para esto
vamos a utilizar la función CountVectorizer de sklearn. Esta función nos
permite representar cada título por un vector con un `1` en las palabras
que contiene y un `0` en las que no. Además, vamos a trabajar únicamente
con las palabras que aparecen más veces en el texto, ya que las que
aparecen una única vez o pocas veces no nos van a brindar información
que se pueda generalizar.

[Video explicativo de como vectorizar
texto](https://www.youtube.com/watch?v=9IqWxJ1T57U)

[Vectorizar texto para tareas de machine
learning](https://naps.com.mx/blog/vectorizar-texto-para-machine-learning/)

a\. Tomamos la lista de palabras y el vector que nos dice si es o no
sarcástico el título

``` python
# Tomamos la lista de palabras y el vector que nos dice si es o no sarcastico el titulo
#list_titulos = list(dataset_lemm['titular_lemm'].values)
#is_sarc = dataset_lemm['is_sarcastic'].values

## Para probar con Stemmizer:
list_titulos = list(dataset_stem['titular_stem'].values)
is_sarc = dataset_stem['is_sarcastic'].values
```

b\. Preparamos el conversor de bag of words a vectores que traemos de
sklearn. `CountVectorizer` posee varias funcionalidades que pueden
determinarse a partir de parámetros. Les recomendamos fuertemente leer
su documentación.

``` python
from sklearn.feature_extraction.text import CountVectorizer

# Usaremos solo las 1000 palabras con mas frecuencia en todo el corpus para generar los vectores
max_features=1000

# Es decir que cada instancia tendrá 1000 features
cou_vec=CountVectorizer(max_features=max_features, stop_words="english" , ngram_range=(1,2))
```

Notemos que desde `CountVectorizer` se pueden quitar las stopwords (algo
que ya hicimos con `nltk`) e incluir los n_gramas automáticamente.

c\. Ahora sí, vamos generarnos los vectores para cada título a partir
del corpus total.

``` python
matriz_titulos = cou_vec.fit_transform(list_titulos)

# Tomamos las palabras
all_words = cou_vec.get_feature_names()

matriz_titulos
```

    <26709x1000 sparse matrix of type '<class 'numpy.int64'>'
    	with 91290 stored elements in Compressed Sparse Row format>

``` python
# Vizualizamos las 50 palabras mas usadas
print("50 palabras mas usadas: ",all_words[0:200])
```

    50 palabras mas usadas:  ['abort', 'abus', 'accept', 'accident', 'accord', 'account', 'accus', 'action', 'activist', 'actor', 'actual', 'add', 'addict', 'address', 'administr', 'admit', 'ador', 'advic', 'age', 'agent', 'agre', 'aid', 'airlin', 'airport', 'album', 'alleg', 'allow', 'alreadi', 'alway', 'amaz', 'amazon', 'america', 'american', 'amid', 'angel', 'anim', 'anniversari', 'announc', 'announc plan', 'anoth', 'answer', 'anti', 'anyon', 'anyth', 'apart', 'apolog', 'appar', 'appear', 'appl', 'approv', 'area', 'area woman', 'arrest', 'artist', 'asian', 'ask', 'assault', 'assur', 'attack', 'attempt', 'attend', 'attract', 'audienc', 'author', 'avoid', 'award', 'away', 'babi', 'ball', 'band', 'bank', 'base', 'bathroom', 'battl', 'bear', 'beat', 'beauti', 'becom', 'begin', 'believ', 'benefit', 'berni', 'berni sander', 'best', 'better', 'biden', 'biggest', 'billion', 'bird', 'birth', 'birthday', 'black', 'blame', 'blast', 'block', 'blood', 'blow', 'blue', 'board', 'bodi', 'bomb', 'book', 'border', 'boss', 'bowl', 'boy', 'boyfriend', 'break', 'bring', 'brother', 'brown', 'budget', 'build', 'burn', 'bush', 'busi', 'buy', 'california', 'camp', 'campaign', 'cancel', 'cancer', 'candid', 'captur', 'card', 'care', 'career', 'carolina', 'carri', 'case', 'cast', 'catch', 'caus', 'celebr', 'center', 'ceremoni', 'chair', 'challeng', 'chanc', 'chang', 'charact', 'charg', 'check', 'chicago', 'chicken', 'chief', 'child', 'children', 'china', 'chines', 'choic', 'chri', 'christian', 'christma', 'church', 'citi', 'citizen', 'civil', 'claim', 'class', 'clean', 'clear', 'clearli', 'climat', 'climat chang', 'clinton', 'close', 'coffe', 'colbert', 'collect', 'colleg', 'color', 'come', 'comey', 'comfort', 'comment', 'commerci', 'commun', 'compani', 'complet', 'concern', 'confirm', 'congress', 'congressman', 'conserv', 'consid', 'consum', 'contain', 'continu', 'control', 'controversi', 'convers', 'cook', 'cool', 'cop', 'corpor', 'cost', 'countri', 'coupl', 'cours']

## 7. Modelar

Ahora sí estamos listos para usar todo nuestro conocimiento de modelos
en este set de datos. Tengamos en cuenta que, dependiendo el número de
palabras (features) que hayamos elegido, los modelos pueden tardar un
rato en entrenarse.

a\. Primero, como siempre, separamos en test y train.

``` python
x = matriz_titulos.toarray()
x.shape
```

    (26709, 1000)

``` python
x[500]
```

    array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0], dtype=int64)

```python
y = is_sarc

x[0:2]
```

    array([[0, 0, 0, ..., 0, 0, 0],
           [0, 0, 0, ..., 0, 0, 0]], dtype=int64)

```python
y
```

    array([0, 0, 1, ..., 0, 0, 0], dtype=int64)

```python
from sklearn.model_selection import train_test_split
xtrain, xtest, ytrain, ytest = train_test_split(x,y,test_size=0.2,random_state=42,stratify=y)
```

Tambien definimos una función que nos permite plotear los resultados en
una matriz de confusión.

```python
from sklearn.metrics import confusion_matrix
import seaborn as sns

def confusion(ytest,y_pred):
    names=["No Sarcastico","Sarcastico"]
    cm=confusion_matrix(ytest,y_pred)
    f,ax=plt.subplots(figsize=(5,5))
    sns.heatmap(cm,annot=True,linewidth=.5,linecolor="r",fmt=".0f",ax=ax)
    plt.xlabel("y_pred")
    plt.ylabel("y_true")
    ax.set_xticklabels(names)
    ax.set_yticklabels(names)
    plt.show()

    return
```

### Naive Bayes

a\. Empecemos por un simple Naive Bayes para tener un benchmark de
referencia para el accuracy.

``` python
from sklearn.naive_bayes import GaussianNB
nb = GaussianNB()
nb.fit(xtrain,ytrain)
print("acc : ", nb.score(xtest,ytest))
```

    acc :  0.6789591913141145

b\. Veamos cómo queda graficada la matriz de confusión:

``` python
y_pred=nb.predict(xtest)
confusion(ytest,y_pred)
```

<img src="/m8/2/5102d2ffe0f9d00e117b9cec1928264071ae7d16.png" alt="NLP" />

### Random Forest

a\. Veamos cómo funciona un random forest para predecir el sarcasmo de
una nota en base a su titular.

``` python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix

rf = RandomForestClassifier(n_estimators = 50, random_state=42)
rf.fit(xtrain,ytrain)
print("acc: ",rf.score(xtest,ytest))
```

    acc:  0.7051666042680644

b\. Grafiquen su matriz de confusión:

``` python
y_pred=rf.predict(xtest)
confusion(ytest,y_pred)
```

<img src="/m8/2/1a9c19c5ed7e9900815a66c543842e8ef2f3a256.png" alt="NLP" />

c\. Algo muy bueno de Random Forest era poder preguntarle por la
importancia de los features que uso para clasificar. Veamos en este caso
cuales son las palabras que mayormente determinan el sarcasmo de una
nota para este clasificador.

``` python
# Le preguntamos la importancia de cada feature (cada palabra)
importances = rf.feature_importances_
# Tomamos la lista de palabras
all_words = cou_vec.get_feature_names()
columns = all_words

# Ordenamos por importnacia y tomamos las 20 primeras
indices = np.argsort(importances)[::-1]
indices = indices[:20]
selected_columns = [columns[i] for i in indices]
selected_importances = importances[indices]

# Por ultimo graficamos
plt.figure(figsize = (15,8))
sns.barplot(selected_columns, selected_importances)
plt.show()
```

<img src="/m8/2/36eb0414b0c8fabc6a6aa781384bc446dcb4255c.png" alt="NLP" />

### SVM

Por último vamos a utilizar uno de los modelos mas prometedores para
este tipo de datos donde el numero de features es comparable al número
de instancias: SVM.

a\. Entrene un modelo de SVM Lineal y calcule su accuracy para C = 1.

``` python
# Notar que en vez de utilizar SVC, vamos a usar LinearSVC. 
# Para el Kernel Lineal, esta función es MUCHO mas rapida que la tradicional SVC.
from sklearn.svm import LinearSVC

svc = LinearSVC(C = 1)
svc.fit(xtrain,ytrain)
svc.score(xtest,ytest)
```

    0.7347435417446649

b\. Grafiquen su matrz de confusión:

``` python
y_pred=svc.predict(xtest)
confusion(ytest,y_pred)
```

<img src="/m8/2/5d7c9485bbc05e1b53b7ba83a79f80a622468b57.png" alt="NLP" />

## 7. Explore las posibilidades

Si llegaron hasta acá, ya cuentan con todas las herramientas para poder
explorar que sucede con el poder predictivo cuando van cambiando la
manera en que procesan y vectorizan el texto. Algunas sugerencias para
explorar son las siguientes:

a\) Pruebe con Stemmizar en vez de lemmantizar

b\) Cambie el numero de features que esta tomando.

c\) Incluya los 2-gramas.

d\) Conserve los signos de exclamación y pregunta del texto.
:::

## TF-IDF

``` python
with open("../DataSets/EjemploPLN.txt", "r") as file:
    documents = file.read().splitlines()
    
print(documents)
```

    ['Los murciélagos usan la eco localización para navegar y encontrar comida en la oscuridad. ', 'Para eco localizar, los murciélagos emiten ondas sonoras por sus boca o nariz. ', 'Cuando las ondas sonoras impactan en un objeto, producen ecos. ', 'El eco rebota del objeto y vuelve a las orejas del murciélago.']

``` python
# Import the libraries we need
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd

# Step 2. Design the Vocabulary
# The default token pattern removes tokens of a single character. That's why we don't have the "I" and "s" tokens in the output
count_vectorizer = CountVectorizer()

# Step 3. Create the Bag-of-Words Model
bag_of_words = count_vectorizer.fit_transform(documents)

print(bag_of_words)
```

      (0, 15)	1
      (0, 17)	1
      (0, 31)	1
      (0, 11)	2
      (0, 4)	1
      (0, 13)	1
      (0, 24)	1
      (0, 19)	1
      (0, 9)	1
      (0, 1)	1
      (0, 8)	1
      (0, 23)	1
      (1, 15)	1
      (1, 17)	1
      (1, 4)	1
      (1, 24)	1
      (1, 14)	1
      (1, 7)	1
      (1, 21)	1
      (1, 28)	1
      (1, 25)	1
      (1, 29)	1
      (1, 0)	1
      (1, 18)	1
      (2, 8)	1
      (2, 21)	1
      (2, 28)	1
      (2, 2)	1
      (2, 12)	1
      (2, 10)	1
      (2, 30)	1
      (2, 20)	1
      (2, 26)	1
      (2, 5)	1
      (3, 4)	1
      (3, 12)	1
      (3, 20)	1
      (3, 6)	1
      (3, 27)	1
      (3, 3)	2
      (3, 32)	1
      (3, 22)	1
      (3, 16)	1

``` python
# Show the Bag-of-Words Model as a pandas DataFrame
feature_names = count_vectorizer.get_feature_names()
pd.DataFrame(bag_of_words.toarray(), columns = feature_names)

from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd

tfidf_vectorizer = TfidfVectorizer()
values = tfidf_vectorizer.fit_transform(documents)
values
```

    <4x33 sparse matrix of type '<class 'numpy.float64'>'
    	with 43 stored elements in Compressed Sparse Row format>

``` python
feature_names = tfidf_vectorizer.get_feature_names()
pd.DataFrame(values.toarray(), columns = feature_names)
```
<div id="tables">
<table class="dataframe">
  <thead>
    <tr >
      <th></th>
      <th>boca</th>
      <th>comida</th>
      <th>cuando</th>
      <th>del</th>
      <th>eco</th>
      <th>ecos</th>
      <th>el</th>
      <th>emiten</th>
      <th>en</th>
      <th>encontrar</th>
      <th>...</th>
      <th>oscuridad</th>
      <th>para</th>
      <th>por</th>
      <th>producen</th>
      <th>rebota</th>
      <th>sonoras</th>
      <th>sus</th>
      <th>un</th>
      <th>usan</th>
      <th>vuelve</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.000000</td>
      <td>0.27849</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.177757</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.219565</td>
      <td>0.27849</td>
      <td>...</td>
      <td>0.27849</td>
      <td>0.219565</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.27849</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.324181</td>
      <td>0.00000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.206920</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.324181</td>
      <td>0.000000</td>
      <td>0.00000</td>
      <td>...</td>
      <td>0.00000</td>
      <td>0.255588</td>
      <td>0.324181</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.255588</td>
      <td>0.324181</td>
      <td>0.000000</td>
      <td>0.00000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.000000</td>
      <td>0.00000</td>
      <td>0.351192</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.351192</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.276883</td>
      <td>0.00000</td>
      <td>...</td>
      <td>0.00000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.351192</td>
      <td>0.000000</td>
      <td>0.276883</td>
      <td>0.000000</td>
      <td>0.351192</td>
      <td>0.00000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.000000</td>
      <td>0.00000</td>
      <td>0.000000</td>
      <td>0.612834</td>
      <td>0.195582</td>
      <td>0.000000</td>
      <td>0.306417</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.00000</td>
      <td>...</td>
      <td>0.00000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.306417</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.00000</td>
      <td>0.306417</td>
    </tr>
  </tbody>
</table>
<div>

<p>4 rows × 33 columns</p>

## Ejercicio Extra 1

\"Scrapear\" una nota de algún medio digital y procesarla utilizando las
herramientas que vimos. Para ver como importar el texto de la pagina de
la noticia, ver video 1.6 \'Frecuencia de palabras\' de Procesamiento de
Lenguaje Natural.

``` python
# Librerias que van a precisar para esto
# ejecutar: conda install -c anaconda beautifulsoup4
from bs4 import BeautifulSoup
import urllib.request

response = urllib.request.urlopen('https://es.wikipedia.org/wiki/Prueba_de_Turing')

response
```

    <http.client.HTTPResponse at 0x1e9a9fdc1f0>

``` python
html = response.read()
soup = BeautifulSoup(html, 'html.parser')
text = soup.get_text()

text
```

    '\n\n\n\nPrueba de Turing - Wikipedia, la enciclopedia libre\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPrueba de Turing\n\nDe Wikipedia, la enciclopedia libre\n\n\n\nIr a la navegación\nIr a la \nDeclaración de cookies\n\n\n\n\n\n\n\n\n\n\n'

## Ejercicio Extra 2

La búsqueda difusa consiste en encontrar grados de similaridad entre
cadenas de caracteres, esto se utiliza cuando el dato que tenemos tiene
bajo nivel de calidad. Hay diversos algoritmos, uno de ellos es la
\"Distancia de Levenshtein\"

``` python
def levenshtein_ratio_and_distance(s, t, ratio_calc = False):
    """ levenshtein_ratio_and_distance:
        Esta función calcula la distancia de Levenshtein entre dos cadenas de caracteres
        Si ratio_calc = True, la función computa la distancia de Levenshtein o similaridad entre dos cadenas de caracteres
        Para todas las 'i' y 'j', distance[i,j] contendrá la distancia de Levenshtein entre los primeros 'i' caracteres de 's'
        y el primer 'j' de 't'
        Fuente: https://www.datacamp.com/community/tutorials/fuzzy-string-python
    """
    import numpy as np
    # Initialize matrix of zeros
    s = str(s)
    t = str(t)
    rows = len(s)+1
    cols = len(t)+1
    if (rows == 1 | cols == 1):
        return 0
    col = 0
    row = 0
    distance = np.zeros((rows,cols),dtype = int)

    # Populate matrix of zeros with the indeces of each character of both strings
    for i in range(1, rows):
        for k in range(1,cols):
            distance[i][0] = i
            distance[0][k] = k

    # Iterate over the matrix to compute the cost of deletions,insertions and/or substitutions    
    for col in range(1, cols):
        for row in range(1, rows):
            if s[row-1] == t[col-1]:
                cost = 0 # If the characters are the same in the two strings in a given position [i,j] then the cost is 0
            else:
                # In order to align the results with those of the Python Levenshtein package, if we choose to calculate the ratio
                # the cost of a substitution is 2. If we calculate just distance, then the cost of a substitution is 1.
                if ratio_calc == True:
                    cost = 2
                else:
                    cost = 1
            distance[row][col] = min(distance[row-1][col] + 1,      # Cost of deletions
                                 distance[row][col-1] + 1,          # Cost of insertions
                                 distance[row-1][col-1] + cost)     # Cost of substitutions
    if ratio_calc == True:
        # Computation of the Levenshtein Distance Ratio
        Ratio = ((len(s)+len(t)) - distance[row][col]) / (len(s)+len(t))
        return Ratio
    else:
        # print(distance) # Uncomment if you want to see the matrix showing how the algorithm computes the cost of deletions,
        # insertions and/or substitutions
        # This is the minimum number of edits needed to convert string a to string b
        return "Las cadenas de caracteres están a {} ediciones de distancia".format(distance[row][col])
```

``` python
valor1 = 'Capital Federal'
```

``` python
valor2 = 'Cap. Federal'
```

``` python
levenshtein_ratio_and_distance(valor1, valor2, ratio_calc = True)
```

    0.8148148148148148

``` python
levenshtein_ratio_and_distance(valor1, valor2)
```

    'Las cadenas de caracteres están a 4 ediciones de distancia'

``` python
from nltk.stem import WordNetLemmatizer
wordnet_lemmatizer = WordNetLemmatizer()
Ejemplo_de_texto = 'So, this is what you meant when you said that you were spent?. And now it is time to build from the bottom of the pit. Right to the top, dont hold back'
print(wordnet_lemmatizer.lemmatize(Ejemplo_de_texto, get_wordnet_pos(Ejemplo_de_texto)))
```

    So, this is what you meant when you said that you were spent?. And now it is time to build from the bottom of the pit. Right to the top, dont hold back

``` python
from nltk.stem import WordNetLemmatizer
wordnet_lemmatizer = WordNetLemmatizer()
Ejemplo_de_texto = 'Escribiendo caminé textos'
print(wordnet_lemmatizer.lemmatize(Ejemplo_de_texto, get_wordnet_pos(Ejemplo_de_texto)))
```

**********************************************************************
  Resource [93maveraged_perceptron_tagger[0m not found.
  Please use the NLTK Downloader to obtain the resource:

  [31m>>> import nltk
  >>> nltk.download('averaged_perceptron_tagger')
  [0m
  For more information see: https://www.nltk.org/data.html

  Attempted to load [93mtaggers/averaged_perceptron_tagger/averaged_perceptron_tagger.pickle[0m

**********************************************************************

``` python
from nltk.stem import PorterStemmer
stemmer = PorterStemmer()
stemmer.stem(Ejemplo_de_texto)
```

    'escribiendo caminé texto'
