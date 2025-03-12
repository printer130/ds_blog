---
title: 'NLP 4: NLP con ML. Representación de palabras, sémantica, distancia y relación entre palabras'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

## Vectores y word embeddings

> "Los word embeddings son representaciones numéricas de las palabras, generalmente en forma de un vector, que consiguen que las palabras con significados similares tengan representaciones similares."

---

En el 1950 sale la "hipótesis de la distribución" donde las palabras que aparecen en contextos similares tiendes a tener significados similares.

Hay determinadas palabras que se encuantran en el mismo dominio (océano, río), otras son sinónimos entre sí(médico, doctor) y otras antónimos (frío,caliente), así como pueden tener distintas connotaciones e intenciones. Definir estas relaciones entre palabras por medio de vectores que las representen en un espacio vectorial artificial es lo que veremos a continuación.

La palabra _"ratón"_ es un conjunto de cinco caracteres; esto se llama **word form**. Puede referirse al cursor de una PC o a un animal, lo que se denomina **word sense**. Cuando un **word form** tiene varios **word senses**, se llama **polisemia**.

Por otro lado estan los sinónimos donde los **word forms** tienen un mismo **word sense** así esta relación se considera muy fuerte que pueden ser intercambiadas desde un punto de vista semántico.

Gracias a la representación en **embeddings(representación de palaras)** podremos medir numéricamente la distancia entre palabras para así descubrir la relación que hay entre ellas mediante un modelo de NLP. La métrica **similitud** estima cómo de parecidas son dos palabras, también podemos usar la asociación o **relatedness** que ve si dos palabras pertenecen al mismo dominio.

Para crear estos embeddings empezamos por seleccionar dimensiones de forma manual categorizando el significado de las palabras.

> Si tenemos una dimension 0 representa masculino y 1 representa femenino seria valido, o de dos dimensiones una que diga el tono(posivito-negativo) y otra que diga (abstracta-concreta) entonces "silla" seria un valor neutro de positivismo y alto en concreción(0.00, 5.00) mientras que "parque de atracciones" seriá (5.00,4.00) y así analizar la distancia entre los dos vectores de la similitud de las palabras, triste y enfadado son "negativas" y muy abstractas

Entonces en un universo de **word embeddings** por ML necesimatos un corpus y un **método de embedding** aquí asignamos manualmente dos dimensiones a las palabras pero existen muchos métodos.

- Un **corpus** puede ser **genérico**, recopilado de libros, artículos y páginas web para capturar el significado general de un idioma sin sesgos de dominio. En contraste, un **corpus especializado** se centra en un ámbito específico, utilizando documentos técnicos y científicos para entrenar modelos de NLP en la categorización y representación vectorial del lenguaje dentro de ese dominio.

- El método de **embedding** utilizará un modelo de ML para definir el mejor espacio vectorial que represente el significado de las palabras en el corpus de entrenamiento. Exploraremos dos enfoques principales: **TF-IDF** y **Word2Vec (CBOW)**.

### Matriz de co-ocurrencia

La mayor parte de los embeddings están basados en el análisis de una matriz llamada co-ocurrencia que representa las palabras que aparecen juntas y en los mismos contextos dentro de un corpus.

**Matriz término-documento**

Esta matriz ayuda extraer información rápida(information retrieval), gracias a la cual podemos identificar documentos con temáticas similares por la similitud que tienen sus columnas.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741531397/recuento_fwcpt0.webp" alt="Matriz término documento">

En un ejemplo real tendríamos miles de filas, una por cada palabra del vocabulario de interés, y tantas columnas como docs formaran parte de nuestro corpus. La palabra árbol tendría un vector **[0,0,8,12]** de igual forma que documentos similares suelen compartir palabras, podemos afirmar que palabras similares aparecen en los mismos documentos. Así esta matriz nos permite definir las palabras por su ocurrencia en cada uno de los documentos de nuestro corpus.

### 1. Matriz Término-Término

En esta matriz, tanto las filas como las columnas representan palabras del vocabulario, y cada celda indica la frecuencia con la que la palabra de la fila aparece en el mismo contexto que la de la columna.

El **contexto** puede ser una frase, un documento o una ventana deslizante de **±5 palabras** alrededor de la analizada.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741639211/termino-termino_wdznwu.webp" alt="Matriz término-término">

A pesar de la similitud entre algunas palabras, sus vectores pueden no serlo, lo que genera valores cercanos a **cero** en la mayoría de las celdas.

### 2. Medición de distancia entre palabras: La distancia del coseno

Dado dos vectores de palabras(embedding) podemos medir la distancia entre ellas con todas sus dimensiones en un espacio vectorial, el método más usado es la distancia del coseno (cosine distance) que mide el coseno del ángulo que forman ambos vectores entre si, este coseno está basado en producto escalar.

```python
# Producto escalar
v = (v1,v2,v3,v4...)
w = (w1,w2,w3,w4...)
vw = v1w1 + v2w2 + v3w3 +v4w4 ...

# Distancia del coseno entre dos vectores
vw / |v||w| = cos0

```

Entonces dado el siguiente ejemplo:

|             | tarta | datos | ordenador |
| ----------- | ----- | ----- | --------- |
| Cereza      | 442   | 8     | 2         |
| Digital     | 5     | 1683  | 1670      |
| Información | 5     | 3982  | 3325      |

Aplicando directamente la matriz de coocurrencia para construir los embeddings:

```python
cereza = (442, 8, 2)
digital = (5, 1683, 1670)
información = (5, 3982, 3325)

```

Calculando la distancia del coseno entre ambos pares de palabras:

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741704668/coseno_kvj0b3.webp">

Digital e información son parecidas mientras que cereza e información son distantes.

### 3.TF ? IDF: Term Frequency ? Inverse Document Frequency y PPMI

Jererquiza las palabras que se basan en la frecuencia de cada término y en la frecuencia inversa de cada documento. De esta manera descubrimos cuales son sencillamente palabras frecuentes en un corpus o en un idioma y que no deberemos usar para definir el significado semántico de nuestras palabras ni para calcular distancias entre ellas para no estropear nuestro modelo.

Existen dos algoritmos para encontrar este equilibrio, en función de documentos o en base a palabras.

**1. Term Frequency (TF-IDF):** El término TF es para un término _t_ en un documento _d_:

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741706136/tf-idf_tfymyy.webp">

**2. Inverse Document Frequency:** Los términos que aparecen muy poco en los documentos son útiles para distinguirlos del resto.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741706473/tf-inverse_aamzvr.webp">

Como ejemplo dado la obra de Shakespeare:

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741706540/shake_xybtgf.webp">

Dado: _D_ = Corpus de documentos, _d_ = Documento específico, _w_ = Palabra; Entonces la relevancia de la palabra para definir y caracterizar el documento es:

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741707058/calc-idftf_ptkqtk.webp">

A mayor TF-IDF más relevante es la palabra para el documento y así podremos caracterizar este documento y generar información que pueda ayudar a posteriores modelos de minería de datos filtrando las palabras menos relevantes gracias a este equilibrio entre la frecuencia absoluta de una palabra y la rareza de dicha palabra en todo el conjunto del corpus.

Sobre los word embeddings, TF-IDF es útil al generar vectores para los embeddings que nos ayudan a comparar documentos. Al generar un vector para cada palabra más relevante de un documento estamos ahorrando cómputo.

Emplearemos las N palabras más relevantes de un documento(con mayor puntuación en TF-IDF), y luego aplicaremos la distancia del coseno.

El método TF-IDF está orientado a la clasificación de palabras relevantes respecto a documentos. Si emplearamos un método para generar vectores en base a la matriz de coocurrencia o matriz de término-término tendríamos la oipción de empelar el método _Positive PointWise Mutual Information o PPMI_.

**PPMI:**

Se basa en la intuición de que la mejor forma de medir la asociación y similitud entre dos palabras es tratar de definir cuánto más coocurren estas dos palabras en un corpus de lo que habríamos poder esperado a priori si fueran dos palabras al azar.

EL PMI (Pointwise Mutual INformation) es importante en NLP. Mide cómo de habitual es que dos eventos _x_ e _y_ ocurran en conjunto en comparación con lo que habríamos esperado si fueran independientes.

_w=palabra objetivo_; _c=palabra contextual_

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741717808/pmi_sgofif.webp">

Compara la probabilidad de que ambas palabras sucedan en el mismo contexto con la probabilidad de que sucedan de forma independiente. Es una herramienta para tratar de definir si dos palabras tienen una asociación fuerte o no. Puede arrojar valores negativos entonces se aplica la métrica de PPMI en donde se los sustituye por 0:

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741718181/ppmi_vp1oel.webp">

Dado la siguiente tabla término-término veremos el PPMI para un corpus concreto con base a una matriz de coocurrencia.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741718415/table_elfbve.webp">

```python
# PPMI:

P(información,datos) = 3982/11716 = 0.3399
P(información) = 7703/11716 = 0.6575
P(datos) = 5673/11716 = 0.4842
PPMI(información,datos) = log2(.3399/(.6575 * .4842)) = .0944

# ----- Para fresa y datos:
P(fresa, datos) = 0/11716 = .00
P(fresa) = 80/11716 = .0068
PPMI(fresa,datos) = log2(.00/(.0068 * .4842)) = .00
```

Los valores cercanos de PPMI a cero no comparten ningún tipo de significado. También podemos ver palabras similares en un corpus para extrapolarlo al conjunto de un idioma en un modelo de NLP.

## Word2vec

En 2013 presenta Google este algoritmo relevante en NLP, que emplea una red neuronal para encontrar asociaciones entre palabras en un gran corpus de texto, así puede detectar automáticamente sinónimos en un texto, como sugerir palabras para completar frases parciales. Teniendo 2 capas de neuronas para permitir al modelo reconstruir el contexto semántico de las palabras. Además recibe un gran corpus de texto y produce un espacio vectorial en el que se puede resumir cada una de las palabras del corpus para posteriores comparaciones entre ellas.

Existen 2 arquitecturas para word2vec:

**1. CBOW(continuous bag-of-words):** Asume que el orden de las palabras no influye en el conteo,

**2. Skip-grams with negative sampling(SGNS):**

Es una de las dos posibles arquitecturas con las que podemos hacer funcionar el algoritmo Word2Vec para generar vectores que representen palabras en un corpus. Es un modelo basado en regresión logística que aprende gracias al _Stochastic Gradient Descent_ y maximiza el producto escalar entre los vectores de una palabra que comparten contextos y minimiza entre los vectores que no lo hacen.

En lugar de contar cuántas veces una palabra aparece contextualmente cerca de otras palabras, trataremos de entrenar un modelo de ML para clasficiación(aprendizaje supervisado) de regresión logística que pueda resolver la clasificación: "¿Es probable que la palabra w aparezca cerca de la palabra c?: SI;NO"

Los pasos con este ML supervisado para cada par de palabras será:

1. Emplearemos la palabra objetivo (w) y la palabra contexto (c) como ejemplos positivos(SI).
2. Emplearemos palabras aleatorias de todo nuestro corpus como ejemplos negativos (NO).
3. Usaremos una regresión logística para entrenar un clasificador que trate de encontrar una línea que divida los ejemplos positivos y los negativos.
4. Emplearemos los pesos aprendidos por nuestro modelo de ML como las representaciones de nuestras palabras, nuestros embeddings.

> Por ejemplo: "... aleación, [el motor diésel es eficiente], dadas las últimas novedades..."

_c1 -> (el); c2 -> (motor); c3 -> (es); c4 -> (eficiente) el contexto de nuestra palabra w(diésel)_. El objetivo de nuestro modelo será, para un determinado par de _w,c_ como puede ser (diésel, motor) tratar de estimar la probabilidad de que c (motor) sea una palabra de contexto real para diésel. Cuanto más se parezcan los embeddings más probable será que una aparezca como contexto de la otra.

Usando la sigmoide y el producto escalar convertiremos los valores entre 0 y 1. Entonces c y w son vectores que representan nuestras palabras y no las palabras. Skip-gram almacena dos embeddings para cada w del vocabulario. Un embedding W para palabra y C para cuando la palabra actúa como contextual.

**Algoritmo de aprendizaje de skip-gram**

Parte de un corpus de N palabras, comienza asignando un vector aleatorio a cada w y luego itera a lo largo de cada w para ajustar su embedding para que sea similar a las palabras de las que tiende a encontrarse cerca en los textos del corpus, y distinta a aquellas que nunca coincide. Aplicando ejemplos positivos que aparecen en el corpus en el mismo contexto y ejemplos negativos que no aparecen en el mismo contexto que la w. Dado k es igual a cantidad de ejemplos negativos.

**k=2, Por cada POSITIVO genera dos NEGATIVOS; w='diesel'**

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741808128/n-gram_v9le4n.webp">

Dado 4 ejemplos positivos y 8 negativos porque k=2, el algoritmo cumplirá estos objetivos:

1. Maximizar la similitud entre los embeddings de la palabra w y los ejemplos positivos.
2. Minimizar la similitud entre los embeddings de la palabra w y los ejemplos negativos.

Con el uso de los SGD los embeddings aleatorios W y C van siendo modificados hasta el punto mínimo en el que se optimiza el problema y obtenemos 2 matrices para cada w objetivo y contexto c.
