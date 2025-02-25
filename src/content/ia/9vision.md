---
title: 'Visión 9: Detección de objetos mediante deep learning'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

Consta de dos tareas principales:

1. **Localización de objetos**: Identificar todos los objetos de interés en la imagen, sin importar su clase.
2. **Clasificación**: Asignar una categoría a cada objeto localizado, representándolos mediante rectángulos (_bounding boxes_).

Las arquitecturas de detección de objetos devuelven resultados en formato JSON, con coordenadas de la esquina superior izquierda y la esquina inferior derecha de cada _bounding box_.

---

### R-CNN

En 2014 surgieron las **Region-based Convolutional Neural Networks (R-CNN)**. Utilizaban algoritmos clásicos de visión artificial para detección de bordes mediante _kernels_, buscando regiones de interés (_ROIs_). Se extraían alrededor de 2000 regiones por imagen, las cuales pasaban por una CNN para clasificarlas.

R-CNN combinaba una localización de objetos "tradicional" con una clasificación "inteligente" mediante redes neuronales. Como resultado, generaba una clase _background_ para filtrar las regiones irrelevantes. La arquitectura inicial utilizaba **AlexNet**.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740430402/Screenshot_20250224_165124_ef3ra2.webp" alt="R-CNN de AlexNet" >

---

### Fast R-CNN

Para mejorar el rendimiento, **Fast R-CNN** propuso ejecutar la CNN una sola vez y extraer las _feature maps_ antes de buscar las _ROIs_. Su proceso:

1. La imagen pasa por capas convolucionales para obtener _feature maps_.
2. Se detectan las _ROIs_ sobre los _feature maps_.
3. Cada región propuesta se analiza con una capa completamente conectada para su clasificación.

---

### Faster R-CNN

**Faster R-CNN** introdujo la **Region Proposal Network (RPN)**, una CNN que no calcula una clasificación en su última capa, sino coordenadas de los objetos (_bounding boxes_). Esto permitió entrenar en un solo paso la localización de _ROIs_ y la clasificación de objetos, optimizando la detección.

Esta arquitectura puede integrar cualquier modelo de CNN de clasificación en el estado del arte.

---

### YOLO (_You Only Look Once_)

**YOLO** revolucionó la detección de objetos al procesar una imagen en una única pasada. Además, fue la primera arquitectura en alcanzar 60 FPS. Su lógica:

1. Divide la imagen en una cuadrícula (normalmente 7x7).
2. Calcula un mapa de probabilidades de clase en cada celda.
3. Determina si hay objetos en cada celda y coordina con las celdas vecinas para generar _bounding boxes_.
4. Combina los _bounding boxes_ con el mapa de probabilidades para dar el resultado en formato JSON.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740431901/Screenshot_20250224_171752_jhi35v.webp" alt="YOLO Algoritmo" >

---

### Otros Modelos

Existen otras arquitecturas basadas en deep learning para detección de objetos:

- **R-FCN** (_Region-based Fully Convolutional Network_)
- **SSD** (_Single Shot Multibox Detector_)
- **RetinaNet**
- **EfficientDet** (_Scalable and Efficient Object Detection_)

Los principales datasets para evaluar la precisión de estos modelos son:

- **PASCAL VOC**
- **COCO**

Estos datasets permiten una comparación justa al evaluar todos los modelos bajo las mismas condiciones.
