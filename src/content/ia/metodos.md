---
title: 'Metodos y tecnologías fundacionales'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

## ¿Qué es la IA?

- La **IA** que implica grandes cantidades de datos se llama **Machine Learning (ML)**.
- La **IA** que implica grandes cantidades de datos y redes neuronales se llama **Deep Learning (DL)**.

---

## GOFAI: Inteligencia Artificial Simbólica

La **GOFAI** (Good Old-Fashioned AI) sigue vigente hoy y cumple dos funciones principales:

1. **Complementar productos basados en ML** para crear soluciones completas.
2. **Proveer soluciones sin ML**, utilizando reglas lógicas y razonamiento formal.

Estos sistemas están basados en:

- Programación lógica (PROLOG)
- Reglas anidadas
- Heurísticas
- Razonamiento formal
- Representación del conocimiento

Predominó desde los años 50 hasta finales de los 90, con aplicaciones en **sistemas expertos, chatbots simbólicos y agentes de juego como Deep Blue**.

GOFAI también ayuda a la IA moderna con **sesgos inductivos (inductive bias)**, permitiendo a los modelos aprender más rápido gracias a las suposiciones previas que proporcionan los humanos.

---

## Machine Learning: Aprendizaje a partir de datos

El **ML** permite a los algoritmos establecer sus propias reglas a partir de datos. Su proceso incluye:

1. **Definir el problema** con una descripción numérica.
2. **Recolectar datos**, paso esencial en cualquier proyecto de ML.
3. **Preparar los datos**, asegurando limpieza y normalización.
4. **Anotar los datos** (_ground truth_), proporcionando etiquetas.
5. **Seleccionar e implementar el algoritmo**, evaluando varias opciones.
6. **Entrenar el algoritmo**, ajustando sus parámetros con datos de entrenamiento.
7. **Evaluar el modelo** con datos nunca antes vistos.
8. **Ajustar el modelo** (_Fine Tuning_), mejorando puntos débiles.
9. **Desplegar el modelo**, haciéndolo operativo para inferencias.

---

## Tipos de Aprendizaje en ML

### 1. Aprendizaje Supervisado

Se usa un conjunto de datos etiquetados para que el modelo aprenda. Tipos principales:

- **Clasificación:** Responde a _"¿A qué categoría pertenece este dato?"_ (Ejemplo: clasificación de imágenes).
- **Regresión:** Estima un valor numérico continuo (Ejemplo: predicción del clima).

### 2. Aprendizaje No Supervisado

No se usan etiquetas, sino que el modelo detecta patrones por sí solo.

- **Clustering:** Agrupa datos similares automáticamente (Ejemplo: segmentación de clientes).
- **Asociación y reducción de dimensiones:** Encuentra relaciones entre datos y simplifica su análisis.

### 3. Aprendizaje por Refuerzo

El modelo aprende mediante prueba y error en un entorno simulado, optimizando sus decisiones en función de recompensas.

Ejemplo: Robots aprendiendo a caminar.

---

## ¿Dónde encaja el Deep Learning?

Desde 2012, el **Deep Learning** ha demostrado resolver problemas que antes parecían imposibles. Se encuentra al mismo nivel que otros algoritmos de ML como **árboles de decisión, modelos bayesianos y algoritmos de agrupación**.

### ¿Qué es el Deep Learning?

Es un subconjunto del ML basado en **Redes Neuronales Artificiales (ANN)**, que simulan el aprendizaje del cerebro humano. Estas redes contienen:

- **Neuronas y sinapsis**
- **Pesos y funciones de activación**

### Tipos de Redes Neuronales

#### 1. Redes Neuronales de Alimentación Hacia Adelante (FFNN)

- Procesan datos en una única dirección.
- Útiles para regresión y predicción numérica.
- No funcionan bien con imágenes, texto o sonido.

#### 2. Redes Neuronales Convolucionales (CNN)

- Especializadas en procesamiento de imágenes.
- Detectan, clasifican y segmentan objetos automáticamente.
- Ejemplos: **YOLO, VGG, ResNet, Inception**.

#### 3. Redes Neuronales Recurrentes (RNN)

- Procesan datos secuenciales, permitiendo la memoria en el tiempo.
- Aplicaciones en procesamiento de lenguaje natural y series temporales.

---

## Conclusión

Existen tres tipos de aprendizaje en ML:

1. **Supervisado:** Cuando tenemos etiquetas y queremos que el modelo aprenda a responder preguntas.
2. **No supervisado:** Cuando queremos explorar grandes cantidades de datos sin etiquetas.
3. **Por refuerzo:** Cuando el modelo aprende por sí mismo a optimizar decisiones.

El **Deep Learning** resalta por su capacidad de resolver problemas complejos mediante redes neuronales avanzadas, posicionándose como una de las herramientas más poderosas en IA moderna.
