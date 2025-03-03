---
title: 'Visión 11: GANs (redes generativas adversarias)'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

Compuesto por dos modelos una el generador capaz de generar datos nuevos y el descriminador capaz de discernir datos realies de datos sintéticos en un determinado dominio, al enfrentarlas se consiguen imágenes verosímiles y creíbles.

- El _modelo generador_ es una red neuronal que recibe un determinado input y genera una imagen de dimensiones dadas. El objetivo de este elemento dentro de una GAN es que las imagenes que se produzcan sean cada vez mas realistas, y por tanto, que sea mas probable que el discriminador clasifique los datos que genera como reales.

- El _modelo discriminador_ son en escencia clasificadores decidiendo acerca de la adecuación de los datos.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740511063/Screenshot_20250225_151726_qpnwdk.webp" alt="GANs">

El discriminador en una GAN es una CNN de clasificacion de objetos con una arquitectura habitualmente conocida que dependera del articulo al que acudamos. En algunos casos sera una ResNet, una Inception, una VGG...

El objetivo principal del generador es aprender la distribución espacial del dominio en el que se esté entrenando la GAN. Digamos queremos entrenar una GAN para que produzca imágenes de autobuses, el objetivo de nuestra GAN no es "hacer imágenes parecidas a autobuses", ya que no tiene comprensión acerca de qué es un autobús. Su objetivo real es aprender la distribución espacial de los píxeles que consiguen pasar por imágenes reales ante su adversario, el discriminador

En una convulcion obtengo un único valor a partir de una ventana multiplicada por un kernel, en una convolución transpuesta haremos la misma operación en sentido contrario. Partiremos de un único valor en nuestro input, lo pasaremos por un kernel en sentido contrario, y obtendremos una ventana de tamaño mucho mayor que pasará a formar parte del output de nuestra capa transpuesta en el generador. Entonces partiendo de una entrada de tamaño reducido y mediante convoluciones traspuestas y upscaling seremos capaces de obtener imágenes de tamaño completo, con la misma distribución espacial que un set de imágenes de muestra que nuestra red nunca verá.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740511109/Screenshot_20250225_151809_sdyjpc.webp" alt="GANs">

Paralas imágenes de muestra el generador se basará en la salida del discriminador, gracias a la retropropagación ajustará los pesos de sus capas convolucionales traspuestas, hasta generar imágenes adecuadas.

### Conditional GAN: PIX2PIX

Las Conditional GAN (cGAN) generan imágenes bajo una condición específica, a diferencia de las primeras GAN (2014), que partían de valores aleatorios. En este caso, la entrada es una imagen o un mapa de segmentación que guía al generador, permitiendo mantener características espaciales y obtener resultados más precisos.

Para lograrlo, el generador adopta una arquitectura encoder-decoder, como en **pix2pix**, que utiliza U-Net. Primero, la imagen se procesa hasta un mapa de características que luego se decodifica mediante convoluciones traspuestas para generar una nueva imagen. Esto posibilita aplicaciones como el _style transfer_ o la conversión de bocetos en imágenes realistas.

La principal limitación de pix2pix es su dependencia de pares de imágenes etiquetadas para el entrenamiento(una con la imagen real y otra segmentada ), lo que aumenta significativamente el esfuerzo necesario para crear datasets adecuados.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740512516/Screenshot_20250225_154122_joojil.webp">

### CycleGAN

Este modelo de deep learning emplea dos CycleGAN y dos discriminadores, con esto se consigue que las imágenes no estén pareadas, ya que los generadores solo son evaluados por su resultado, y no por la relación de su resultado con la entrada que reciben. Pero entonces, ¿cómo conseguir que relacionen el otput con el input?. Mediante la función de objetivo de estos elementos. Y esta función objetivo esta en ciclo.

La arquitectura de los generadores es similar a pix2pix y está basada en la filosofía de encoder-decoder empleando convoluciones en la primera parte - para extraer características del input - y convoluciones transpuestas en la segunda parte - para generar el output - apoyadas por funciones de downsampling y upsampling respectivamente.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740692102/Screenshot_20250227_173418_wr8jih.webp">

### StyleGAN

El principal problema de los modelos de arriba es que el dev no puede controlar el OUTPUT de las GAN, tenemos un concepto nuevo llamado "Mapping Network" genera un vector codificado para diferenciar distintas características visuales a distintas escalas. Refiriéndonos a features de caras humanas por ejemplo tenemos:

1. Grandes: Afectan a la pose, el estilo de pelo, la forma de la cara, etc.
2. Medianas: Afectan a features faciales, estilo de ojos, nariz y boca, forma del pelo.
3. Pequeñas: Están relacionadas con el mapa de colores(ojos, boca, piel, pelo) y con pequeñas features(pecas, granos, cicatrices).

Para hacer esto se introdujeros 8 capas de fully-conected para determinar todas estas features en un vector de salida que condensara toda la información relevante a los tres tipos de features. ESta red se ejecuta en primer lugar, antes que ningún otro módulo de la GAN. El resultado se denomina style mapping array "W" ya que es el que determina las distintas features de la imagen de salida.
