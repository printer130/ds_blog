---
title: 'Detección de Contornos, Bordes, Rectas y Esquinas'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

La extracción de características en imágenes es fundamental para identificar formas, estructuras, objetos y cambios de iluminación. Entre estas características, los bordes son clave, ya que permiten definir la tipología y ubicación de los objetos.

Un borde es una región en la que la intensidad cambia abruptamente, presentando discontinuidades. Para detectarlos, se pueden utilizar técnicas como convoluciones y el algoritmo de Canny.

## Detección de Bordes con Kernels

Se pueden aplicar filtros para detectar bordes en diferentes direcciones:

- **Bordes verticales:** Se analizan píxeles contiguos en dirección vertical.
- **Bordes horizontales:** Se examinan píxeles en una línea horizontal.
- **Bordes diagonales:** Se comparan píxeles en diagonales opuestas.

Los tres kernels más utilizados para esta tarea son:

- **Sobel** y **Prewitt**: Identifican los máximos y mínimos de la intensidad en cada eje.
- **Laplaciano**: Busca bordes en ambas dimensiones simultáneamente, aunque es sensible al ruido. Para optimizar su rendimiento, se recomienda aplicar primero filtros como el Gaussiano y el Median Filter.

## Detección de Bordes con Canny

El algoritmo de Canny sigue varios pasos antes de identificar los bordes:

1. Aplicación de un filtro de reducción de ruido mediante un filtro gaussiano con kernel 5x5, seguido de Sobel.
2. Uso del algoritmo **Non-Maximum Suppression** para refinar la detección de bordes.
3. Aplicación de **Hysteresis Thresholding** para seleccionar únicamente los bordes con valores dentro de un rango definido.

## Detección de Contornos

Un contorno es un borde cerrado y se extrae considerando la jerarquía entre los elementos de la imagen. Existen dos métodos principales:

1. **Sin aproximación en cadena:** Se agrupan bordes cercanos con intensidades similares.
2. **Con aproximación en cadena:** Se reducen los contornos a sus puntos clave, lo que optimiza el procesamiento.

## Detección de Rectas y Círculos

El método más utilizado para detectar rectas es la **Transformada de Hough**, desarrollada en 1962. Funciona sobre imágenes de profundidad 1 bit y evalúa todas las rectas posibles que pasan por un punto, comparándolas con los demás puntos para identificar las líneas más probables.

## Detección de Esquinas

Las esquinas ayudan a delimitar objetos en imágenes y son fundamentales para el seguimiento en videos, ya que permanecen invariantes ante cambios de tamaño, intensidad y posición.

El método de **Harris**, desarrollado en 1988 por Chris Harris y Mike Stephens, clasifica las regiones de la imagen en:

1. **Zonas planas:** Sin cambios significativos de intensidad.
2. **Bordes:** Cambios de intensidad en un solo eje (vertical u horizontal), detectados con Sobel.
3. **Esquinas:** Variaciones de intensidad en ambas direcciones (X e Y).

<!-- ![Ejemplo de detección de esquinas](https://cdn.educalms.com/MWtWcW02RTRXWEtmNkpZMmFTRnVsdyUzRCUzRA==-1721386111.png?Expires=1740117365&Signature=NZgFK2mAAVSUQeoHiS6i6g-IhoPNorMcl1aRKoeAzRuOAcTIpp1z-izLBp8jJwcjSDoNGau8aAHx9UJpYgkdOTFf-7bYWA38qTRDNW4zMyVbDm3Q1~0YyHQRElUwAt-eBgbwjmgSUCZwxBh7uLt2ztcH7hD9vGS7dKF9sXC~b61q0OjwYdHmCNd19Rzv2M70yO6pLoTyfP0C-ciD-wF86YWoNB-DDZQOHqWxA12VswH0Xi0J8MBaZGIpxtf1S7MqAJ0ucV1ZFkD92XHBJkV4JD8aY~4aZhMAbHCLDqajc7PuL3sDCI8qUxo4auOubPYYB~-c05ths0ztIg2FXbephw__&Key-Pair-Id=K2XVTQ1784SQT0) -->

En 1994, el método fue mejorado con el algoritmo **Shi-Tomasi** (_Good Features To Track_), que identifica esquinas relevantes para el seguimiento en videos. A diferencia de Harris, este algoritmo selecciona características estables ante cambios de rotación y escala.
