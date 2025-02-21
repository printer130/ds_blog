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

# Algoritmos de Selección y Descripción Automática de Características

Existen dos algoritmos principales de selección y descripción automática de características, ambos patentados. Sin embargo, requieren muchas operaciones que no funcionan en tiempo real.

## SIFT (Scale-Invariant Feature Transform)

En 1999, David Lowe creó el algoritmo SIFT para extraer automáticamente características y detectar objetos sin intervención manual. Este algoritmo es robusto frente a cambios de escala, rotación, ruido y variaciones de contraste.

SIFT busca características en bordes, esquinas y líneas, suavizándolas con un filtro gaussiano para determinar su estabilidad frente al ruido. Para permitir que el algoritmo identifique y busque estas características en otras imágenes, es necesario describirlas.

Para ello, se utiliza el **Histograma de Gradientes Orientados (HOG)**, un descriptor de características que traduce la información a modelos o sistemas futuros. HOG funciona de manera similar al filtro de Sobel, pero además analiza la orientación del gradiente en las zonas donde previamente se han detectado características relevantes. Aunque HOG no es un algoritmo inteligente como SIFT o SURF, es un estándar ampliamente utilizado para la descripción de regiones.

<!-- ![SIFT](https://cdn.educalms.com/VUh1QVEyeGJQMnFTeXV2VmdJRE4lMkZRJTNEJTNE-1721386114.png?Expires=1740192437&Signature=NmfLuQBRIKmMbQAss4Gwxz2epVQuqskvVLFBlIeeZjWu6yo0SE7gDL~QmgFApg5i90ANjj9mZcndMgXrOaZw1LN6Ry5Be4qJ3vJafXiSvKNgOS3d~JrBt3WQ-caputkVduTcYUiX1Z0LyeUISLFV9ZNizyj0WDX0tDIOIA~FDyvfSNuKbdnN-rN1mvIkHzCiW8UGHqBiR9Vv0pff8ceVhPlRegrdOOIZ8D3kSaMfbHF11wk6m3AK9RAVRBIu8u9W9t5xnVHqgtCnsxCTb7IkkLVpZQPLGw0dt9WZMANnv2DsQ2XxDxqrXxpxNVwt~jtEKRKTEjdQBCDDSZIiRSIqQQ__&Key-Pair-Id=K2XVTQ1784SQT0) -->

## SURF (Speeded Up Robust Features)

SURF, desarrollado en 2006, surge como una mejora de SIFT con un enfoque en la velocidad y eficiencia.

- Es más rápido en la detección de características.
- Utiliza el **Hessian Detector** basado en el operador de Sobel para detectar contornos.
- Aplica un suavizado gaussiano para reducir el ruido y evaluar la estabilidad de las características seleccionadas.
- Realiza cambios de escala para garantizar la invariabilidad de sus características.
- Emplea la **Ondícula de Haar** para describir las características, similar a HOG. Divide la imagen en una cuadrícula y analiza la orientación del gradiente dentro de cada celda.

<!-- ![SURF](https://cdn.educalms.com/NHBYUmN4ZXpWeVg2ZFdJaWNTSGZoZyUzRCUzRA==-1721386115.png?Expires=1740193227&Signature=KBSeaSUCdGVIB5FB0umzLoIxWKoFyW7Qgcy6rsli-NHd0MzvZjQSTlielF9cauL5QraVh2Y3YSvrByru9XhhgB2PynRyMBANGP~8Jj5K5MdmHJ~Wk3d0G8i13on1Shg22UJ3zaCqQyCv56mky4dyZWJ12Jm4k4UcdRdXNRIiBbbWGVRBqEqrPp9jUuZxib7hrkHProrM~Gch90--M~G9K5oJJE3EJRDO4pNawdoD8hab4z7eKwxmCQ6UQPjFuXNzvCBbqS5GuRu~8fdxCPZrjh4w4sg30-My4xWLmM4P3qO0Kge025ORLH5eK6TrV7o1TWNlujlywOkD2wDlvDVmwQ__&Key-Pair-Id=K2XVTQ1784SQT0) -->

## ORB (Oriented FAST and Rotated BRIEF)

ORB, desarrollado en 2011, es un algoritmo eficiente que funciona en tiempo real y ofrece resultados comparables a SIFT y SURF. Su funcionamiento se basa en:

- **FAST (Features from Accelerated Segment Test)** para la detección de esquinas invariante a escala.
- **BRIEF (Binary Robust Independent Elementary Features)** para la descripción de características.

Estos métodos clásicos permiten completar proyectos sin necesidad de recurrir al deep learning, evitando así la necesidad de GPU y datasets de entrenamiento. Ajustando la gamma, aplicando suavizado, detectando características y utilizando técnicas de **feature matching**, es posible alcanzar una calidad similar a las redes neuronales con menor tiempo y costo.

## Feature Matching y reconocimiento de objetos con ORB

![Feature Matching](https://cdn.educalms.com/NnJZTlNGN2dKMWc5YjRqdEJ5aHZpZyUzRCUzRA==-1721386119.png?Expires=1740195494&Signature=HC6OuaU2fNOieg45IYovpwcKALpEHkzNSCcW8MBfFk~U1ZBY7RjV4KjIBK1R4ajSTs6~paH2njKBu4zWixxZ5EHyKPEaD9yCBF5oNLHV8Epw0T6YY8iwQzn-EaJvWuYzwqRYm0Enbdvcew45HWzi2057ZRcT-K6OkyBnmseBXzzxZezgcAhGC1w5HjC2nxvAqIs0bbDv6EuNAt8kacX8Z~1C5qm9ty9oBjni~G-okMh7YzpA8fmZKN9uZhPADoYZdDeRLeKZ4Yvfg-VzgXmcUcpK16YEeSRfcV2qNn~cPjtxyDKaqSocGCAcMYi14Gs75fEHniJ2SnfWoKpAJmyQqQ__&Key-Pair-Id=K2XVTQ1784SQT0)

En la primera imagen se ejecutó un detector de características y en la segunda se intentó encontrar estas mismas características. Debido al movimiento de la cámara, las características se han desplazado. Este proceso se conoce como **Feature Matching**.

### Matching por fuerza bruta

Extraemos las características de ambas imágenes y las comparamos con todos los descriptores de la segunda imagen. La característica más parecida se asume como un _match_. Para evitar emparejamientos incorrectos, se aplica **Cross Check**, comparando la segunda imagen con la primera. De esta manera, se extraen solo las características compartidas entre ambas imágenes.

### Reconocimiento de objetos con ORB y Brute Force Matching: Homografía

Un algoritmo de **homografía** trata de encontrar el cambio de perspectiva que relaciona una serie de puntos entre dos imágenes. Nuestro cerebro realiza este proceso de forma natural. Si observamos nuestras dos imágenes, podemos imaginar una representación en 3D y visualizar las rotaciones necesarias para que un objeto, como una caja de galletas, se vea en la misma posición en ambas imágenes.
