---
title: 'Visión 10: Segmentación de objetos mediante deep learning'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

Segmentar es analizar cada pixel de una imagen y clasificarlo si en la clasificacion categorizabamos la imagen en su conjunto, y en la deteccion clasificabamos ROIs previamente detectadas, en la segmentacion clasificamos todos y cada uno de los pixeles de la imagen(Segmentación semántica), si queremos detectar objetos dada la clasificacion de los pixeles, estamos hablando de segmentación de instancias.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740491790/Screenshot_20250225_095523_nf2mxs.webp" alt=''>

### Redes de convolucion y descovolucion (ENCODER-DECODER)

En 2015 J.Long propuso la primera arquitectura entrenable de punto a punto para segmentar objetos conocida como FCN, donde las capas fully-connected son cambiadas por capas convolucionales con una feature especial: funcionan al revés reconstruyendo feature maps hasta alcanzar la dimensión original de la imagen:

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740492269/Screenshot_20250225_100354_o42dqv.webp" alt="">

Simplificacion de esta arquitectura:

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740492867/Screenshot_20250225_101410_b7s9af.webp" alt="">

Comenzamos con las capas convolucionales y de pooling reduciendo las dimensiones a medida que extraen features, luego tenemos feature maps de 7x7 como clases objeto.

Luego hacemos la deconvolucion consiguiendo una matriz del mismo alto y ancho la profundidad sera el numero de clases, ya que para cada clase se genera un feature map con las predicciones de esa clase para cada pixel: Tenemos 4 clases, entonces la matriz de salida sera 4 con probabilidades de cada una de las clases. Para obtener el resultado basta con quedarse con la clase mas probable para tener nuestra imnagen definitivamente segmentada.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740493352/Screenshot_20250225_102205_r2ojtz.webp" alt="">

U-Net es una arquitectura de deep learning basada en FCN, diseñada para segmentación de imágenes microscópicas. Su innovación clave es la conexión entre capas convolucionales y deconvolucionales mediante atajos, permitiendo una mejor recuperación de detalles. Su diseño en forma de "U" refleja la fase de contracción y expansión de la red. Al no usar capas totalmente conectadas, reduce significativamente los parámetros, facilitando el entrenamiento con menos datos. Esto ha permitido abordar problemas con conjuntos de imágenes limitados, como el caso original de U-Net, que se entrenó con solo 30 imágenes.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740494321/Screenshot_20250225_103811_mvprbo.webp" alt="">

PSPNet, presentada en 2016, es una evolución de U-Net con modificaciones en el número y tamaño de capas, además de nuevos atajos. Introduce un módulo piramidal con convoluciones adicionales y upsampling, logrando un 85.4% de precisión en PASCAL VOC 2012. Su alto rendimiento impulsó su adopción en proyectos de visión artificial más allá del ámbito académico.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740494706/Screenshot_20250225_104435_uhrjyy.webp" alt="">

Todos estos modelos contienen pequeños cambios, pero al mismo tiempo un nombre distinto para resaltar su novedad. Sin embargo, la primera arquitectura realmente novedosa fue Mask R-CNN:

### Mask R-CNN

Mask R-CNN, presentado en 2017 por K. He, mejoró significativamente la precisión en COCO al expandir Faster R-CNN con una tercera salida: la máscara de segmentación. Además de detectar objetos y sus bounding boxes, utiliza una CNN adicional llamada "Mask Classifier" para segmentar cada ROI a nivel de píxel, diferenciando instancias individuales. Esto supera el enfoque pixel a pixel de modelos previos, ofreciendo mayor precisión y más información útil para aplicaciones avanzadas.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740496064/Screenshot_20250225_110731_zr95ak.webp" alt="">

### La familia deeplab

DeepLab, desarrollado en 2017 por L.-C. Chen en Google, introdujo las atrous convolutions (dilated convolutions) para procesar características a distintas escalas sin aumentar la cantidad de parámetros. Su técnica clave, atrous spatial pyramid pooling (ASPP), ejecuta varias convoluciones en paralelo con diferentes rates para detectar patrones a múltiples escalas, mejorando la segmentación y el contexto espacial de la red neuronal.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740497753/Screenshot_20250225_113528_zlgbfs.webp" alt="">

DeepLab incorpora un módulo llamado fully connected conditional random field (CRF), que utiliza filtros bilaterales y gaussianos para refinar la segmentación y mejorar la nitidez. Sin embargo, esto hace que la arquitectura no sea completamente entrenable de extremo a extremo, reduciendo su flexibilidad. La segmentación resultante es puramente semántica, sin detección de objetos o instancias, solo identificando estructuras a distintas escalas.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740498569/Screenshot_20250225_114854_xn4spe.jpg" alt="" >

La familia DeepLab evolucionó hacia arquitecturas más precisas, destacando DeepLab v3 y v3+, que mejoran la calidad de los bordes en la segmentación. Estas versiones incorporan dos fases: extracción de características y ampliación mediante deconvoluciones y unpooling. Aunque adoptan estructuras similares a U-Net, mantienen las capas atrous convolution en la fase de extracción. Además, emplean atrous spatial pyramid pooling (DCNN) para capturar patrones a distintas escalas.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740497850/Screenshot_20250225_113701_1_vj3ivo.webp" alt="">
