---
title: 'NLP 5: Procesamiento de lenguaje natural con deep learning'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

> "El lenguaje es un fenómeno temporal en el que se añaden conceptos, entidades y acciones a medida que se desarrolla, y el procesamiento del mismo por parte del cerebro humano parte por una comprensión temporal del mismo"

Los modelos tendran una percepción temporal del lenguaje a la vez que son capaces de procesar un contexto ilimitado respecto al mismo, uno de los objetivos principales de los modelos de NLP es la predicción de la siguiente palabra de una frase dado el comienzo de la misma.

## 1. Recurrent neural networks (RNN)

El valor de una de las neuronas vuelve a la misma neurona convirtiéndose en uno de los inputs de la siguiente iteración del proceso "hacia adelante" de la red neuronal y así tener un recuerdo de lo que han procesado en iteraciones previas.

La diferencia con las otras redes es que la salida de la capa intermedia vuelve a convertirse en su entrada, uniéndose a la información que proporciona la entrada a la red neuronal implicando que puede computar salidas para cada momento del procesamiento sin necesidad de tener un contexto de una longitud dada como en los modelos anteriores.

Estos nuevos pesos determinan la ponderación que dará la RNN al bucle que hemos añadido en esta arquitectura. Vemos cómo la salida de la hidden layer vuelve a entrar a sus neuronas aplicando pesos U y un sesgo distinto, pero el funcionamiento es igual a la neurona convencional.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741976653/rnn_q92spn.webp">

## 2. Long Short-Term Memory (LSTM)

### 2.1 LSTM para la clasificación de textos: EJEMPLO

### 2.2 Aplicación de una red LSTM en NLP: Named Entity Recognition (NER)

### 2.3 Otras aplicaciones de la arquitectura LSTM
