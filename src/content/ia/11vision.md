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

Aquí tienes una versión optimizada y concisa para tu blog profesional de IA:

---

### Conditional GAN y la Traducción de Imágenes

Las Conditional GAN (cGAN) generan imágenes bajo una condición específica, a diferencia de las primeras GAN (2014), que partían de valores aleatorios. En este caso, la entrada es una imagen o un mapa de segmentación que guía al generador, permitiendo mantener características espaciales y obtener resultados más precisos.

Para lograrlo, el generador adopta una arquitectura encoder-decoder, como en **pix2pix**, que utiliza U-Net. Primero, la imagen se procesa hasta un mapa de características que luego se decodifica mediante convoluciones traspuestas para generar una nueva imagen. Esto posibilita aplicaciones como el _style transfer_ o la conversión de bocetos en imágenes realistas.

La principal limitación de pix2pix es su dependencia de pares de imágenes etiquetadas para el entrenamiento(una con la imagen real y otra segmentada ), lo que aumenta significativamente el esfuerzo necesario para crear datasets adecuados.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1740512516/Screenshot_20250225_154122_joojil.webp">
