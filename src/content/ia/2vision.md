---
title: 'Técnicas de Procesamiento de Imágenes y Reconocimiento Visual'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

El procesamiento de imágenes y el reconocimiento visual son fundamentales en la visión artificial. Esta disciplina abarca diversas técnicas para analizar y comprender imágenes estáticas y en movimiento.

## Visión Artificial Estática

### 1. Clasificación

Identifica el contenido global de una imagen basada en un conjunto de clases predefinidas. Sin embargo, un modelo de clasificación solo puede etiquetar una imagen con una categoría dominante, como "animales", sin distinguir múltiples objetos dentro de ella.

### 2. Localización

Determina la ubicación de uno o más objetos en una imagen sin clasificarlos. Para ello, emplea coordenadas que enmarcan el objeto dentro de un **Bounding Box**, diferenciándolo del fondo.

### 3. Detección

Combina localización y clasificación. Primero, detecta los **Bounding Boxes** y luego clasifica los objetos dentro de ellos, permitiendo identificar múltiples elementos en la misma imagen.

Para entrenar estos modelos, es necesario:

- Etiquetar imágenes.
- Dibujar los **Bounding Boxes** en torno a los objetos.
- Indicar la clase correspondiente.

### 4. Segmentación

Identifica con precisión los bordes y formas de los objetos en una imagen.

#### Segmentación Semántica

Asigna una etiqueta a cada píxel de la imagen, coloreándolos para representar distintas clases.

<!-- ![Segmentación Semántica](https://cdn.educalms.com/bTAlMkJOU2owMEJQJTJCR0lMaUs5YU8zZHclM0QlM0Q=-1721386050.png)
 -->

#### Segmentación de Instancias

Distingue objetos individuales de la misma categoría en una imagen.

<!-- ![Segmentación de Instancias](https://cdn.educalms.com/YzA0c1BYelBUMzNxSERXMkpjWnlPQSUzRCUzRA==-1721386051.png)
 -->

#### Reconocimiento de Relaciones entre Objetos

Comprende las interacciones entre los objetos detectados. Por ejemplo, en una imagen con una guitarra, una persona y una silla, el modelo puede inferir relaciones como:

- `<"persona", "sentada", "silla">`
- `<"persona", "toca", "guitarra">`

### 5. Descripción de Imágenes

Genera descripciones en lenguaje natural sobre el contenido de una imagen. Es una intersección entre **Procesamiento de Lenguaje Natural (NLP)** y visión artificial, útil para accesibilidad y etiquetado automático.

<!-- ![Descripción de Imágenes](https://cdn.educalms.com/TGIyQjlWa1AwTVpoSFpNT2FSayUyQmZ3JTNEJTNE-1721386052.png)
 -->

### 6. Restauración de Imágenes

Corrige efectos negativos como ruido, desenfoque o exposición incorrecta.

**Inpainting:** Rellena zonas deterioradas de forma coherente para el ojo humano.

<!-- ![Restauración de Imágenes](https://cdn.educalms.com/VXpGTDRjdGElMkY0YTFPTTRsaDF6cWpBJTNEJTNE-1721386053.png)
 -->

### 7. Generación de Contenido

Los modelos generativos crean imágenes realistas a partir de datos existentes.

- **Variational Autoencoders (VAE)**
- **Generative Adversarial Networks (GAN)**

## Visión Artificial Dinámica

Gracias al análisis del movimiento, los sistemas pueden percibir un mundo tridimensional con mayor precisión.

### 1. Análisis del Movimiento

Detecta y analiza el movimiento en secuencias de imágenes para estimar profundidad y reconocer acciones humanas.

Técnicas comunes:

- **Flujo óptico**
- **Diferencia de imágenes**
- **Sustracción de fondo**
- **Métodos de salto**
<!--
![Análisis del Movimiento](https://cdn.educalms.com/MHYwV21aVHlJWVozcnNqcjdrRkdLUSUzRCUzRA==-1721386054.png)
 -->
