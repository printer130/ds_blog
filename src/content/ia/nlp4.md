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

### 3.TF ? IDF: Term Frequency ? Inverse Document Frequency y PPMI
