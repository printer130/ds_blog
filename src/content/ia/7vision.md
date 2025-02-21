---
title: 'Aplicación de Objetos y Deep Learning'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

En este documento exploramos el enfoque del Machine Learning (ML) con técnicas de visión artificial y redes neuronales convolucionales (CNN). Compararemos sus ventajas y desventajas en distintos casos de uso.

### SVM y K-Nearest Neighbors (KNN)

_Lógica de estos algoritmos_

1. Utilizamos datos etiquetados con sus características extraídas.
2. Entrenamos el modelo con estas descripciones numéricas.

Ambos algoritmos tienen bajo costo computacional.

**SVM (Support Vector Machine)** resuelve problemas de clasificación y regresión, buscando una frontera que divida los datos en el espacio. Esto permite clasificar cualquier nuevo punto en una de las clases predeterminadas.

Ejemplo:

1. Recopilamos 100 imágenes de vasos clasificados como "OK" y "NOK".
2. Extraemos sus características usando ORB y generamos un vector de características.
3. Entrenamos un modelo SVM con estas características y sus respectivas etiquetas.
4. Para una nueva imagen, extraemos sus características con ORB y usamos SVM para inferir su clase.

**KNN (K-Nearest Neighbors)** asume que los objetos similares están próximos en el espacio de datos. Calcula distancias entre los datos de entrenamiento y clasifica un nuevo punto según los "K" vecinos más cercanos.

Ejemplo:

- Si tomamos características como "largo de pétalo" y "ancho de pétalo" en flores de distintas especies (Setosa, Versicolor, Virginica), KNN separaría el espacio de tal forma que podría clasificar nuevas flores según sus dimensiones.

### Elección del Algoritmo

Se recomienda probar distintos modelos de ML para determinar cuál se ajusta mejor a la clasificación de objetos según la superficie de decisión generada.

Este enfoque es ideal en entornos controlados, como una línea de producción donde:

- La cámara está fija.
- Los objetos tienen velocidad constante.
- La iluminación es uniforme.
- Se mantiene la misma perspectiva.

### Árboles de Decisión

Los modelos KNN y SVM son clasificadores lineales, es decir, buscan una única línea de decisión para separar clases. Sin embargo, en problemas complejos, una frontera única no es suficiente.

**Árboles de decisión** generan subdivisiones basadas en características de los datos. En cada nivel de decisión, se filtran las características hasta llegar a una clasificación final.

Ejemplo:

- Si una imagen contiene un barco, avión, bicicleta, motocicleta, auto, camión o autobús, un modelo lineal podría no separar correctamente estas clases. Un árbol de decisión toma decisiones anidadas para refinar la clasificación.

Pese a su flexibilidad, los árboles de decisión dependen de las condiciones del entorno y pueden generar sobreajuste si no se manejan adecuadamente.
