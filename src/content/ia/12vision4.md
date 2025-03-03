---
title: 'Visión 12: Machine vision. Instrumentación para la visión'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

## Elementos básicos de un dispositivo de captura

### El sensor

Hay un campo dedicado a la captura en visión artificial, llamado machine vision. Donde hay investigadores y empresas dedicadas a diseñar, desarrollar y producir los distintos dispositivos de captura para proyectos de visión artificial

Se emplean 2 sensores a color empleados en imagen digital:

CCD (charge-coupled device): Generan poco ruido al capturar imágenes ya que la señal se manipula al final y se conserva su integridad durante una mayor cantidad de tiempo. Tienen un gran rango dinámico y su respuesta es más uniforme y constante, lo que implica que si exponemos el sensor dos veces a la misma fuente de luz, la respuesta será idéntica.

CMOS (Complementary metal-oxide-semiconductor): Son más robustos y flexibles ante fallos, pero tiene la mitad de rango dinámico que uno CCD, genera más ruido y que la señal se procesa tantas veces como píxeles tiene el sensor, también la imagen variará si tomamos dos fotos en el mismo escenario

### El objetivo o la lente

Distancia focal: Distancia en milimetros entre el lente y el sensor.
Campo de visión (FOV): Esta relacionado con la distancia focal.
Apertura del diafragma. La profundidad de campo: Su funcion es variar la intensidad de luz que llega al sensor controlando la apertura, no es más que abrir o cerrar la apertura por el que pasa la luz.

Profundidad de campo: Cuanto más cerrado esta el diafragma más profundidad está enfocada.

### Tipos de lentes

Objetivos estándar: Solo debe procesarse un área determinada de información y en aquiellos en los que se evita en todo momento posibles deformaciones en la imagen.

Grandes angulares: Mejores campos de visión sin renunciar a la calidad de imagen.

Ojos de pez: Dan mucha info enfocada al sensor.

Teleobjetivos: Extraño verlo en proyectos de visión artificial.

### El obturador y el tiempo de exposición

El obturador controla la cantidad de tiempo durante la cual la luz incide sobre el sensor fotosensible, si el diagragma controla la cantidad de luz modificando la apertura, el obturador lo hace controlando el tiempo durante el que esta llega al sensor.

La velocidad de obturación define el tiempo que permanece abierto un obturador es este valor el que determina el tiempo de exposición, una obturación rapida es de 1/60s y puede ir a minutos o horas para fotos del espacio.

### Global shutter

Todos los pixeles del sensor son esxpuestos a la misma luz en el mismo momento, sin embargo el computo es mayor.

### Rolling shutter

La imagen es una concatenación de momentos en el tiempo ya que dezplaza la luz a lo largo del sensor línea a línea de pixeles.

### Frame rate

El proyectos en que tengamos que procesar objetos que se mueven muy rápido necesitamos una gran cantidad de imágenes por segundo, lo que se traduce en un tiempo de exposición muy corto y por tanto necesidad de diagramas muy abiertos y seguramente de global shutter. Sin embargo, si capturamos vídeo en entornos controlados con poco movimiento, con tomar 30 imágenes por segundo será suficiente, y no necesitaremos tanta luz, podremos usar global shutter y, además, los archivos de vídeo seran menos pesados.

## Tipología de dispositivos de captura

Todos los dispositivos de captura están formados por un sensor, un obturador, un objetivo y una cierta electrónica, hay variedad se sensores que dan información diferente.

### Cámaras lineales

Capturan una línea de píxeles, la transfieren, y capturan la siguiente, de forma continua, son cámaras con mayor rango dinámico existente, y con un precio realmente asequible.

### Cámaras matriciales

Importa el tipo de obturador por que se puede deformar la imágen en movimiento, menor rango dinámico y frame rate disponible y además se pueden producir superposiciones de objetos entre las distintas capturas, sin embargo podemos obtener un imágen matricial directamente para trabajar.

### Cámaras estereoscópicas y 3D

Cada ojo persive ligeramente una imágen, el cerebro puede triangular los objetivos en función de la diferencia de percepción entre un ojo y el otro, y así calcular distancias en tres dimensiones.

Se emplea para robótica y orientación en el espacio, para control de calidad relativo a cotas, tamaños y formas de distintos objetos de producción, control de aforos y conteo de personas.

### Cámaras infrarrojas y termográficas

Además de poder capturar en 3D sin la necesidad de calibrar previamente, la radiación infrarroja es una radiación electromagnética así cerca de nuestro espectro visible se encuentran dos tipos de ondas, una ultravioleta y las ondas infrarrojas(1mm>700nm).

Cámaras infrarrojas: Se puede iluminar una escena con luz infrarroja para que una cámara infrarroja pueda percibirla, sin generar luz desde nuestro punto de vista, se usa para videovigilancia, seguridad.

Cámaras termográfica(térmica): Todos los cuerpos emiten radiación infrarroja relacionada con la temperatura así segun la intensidad de los píxeles, podemos asociar un valor de temperatura.

### Cámaras multiespectrales e hiperespectrales

Una cámara infrarroja indica la intensidad de cualquier onda entre 700 nm y 1mm, pero no especifica de qué longitudes de onda concretas procede esta radiación.

En función de su composición molecular absorberá unas longitudes de onda u otras de forma única, ayudandonos a clasificar materiales y moléculas.

Por ejemplo una de estas cámaras puede captar la intensidad de la onda en un rango muy pequeño de longitudes de onda denominados "bandas" una cámara puede procesar tres bandas 700-799nm,800-899nm,900-999 su OUTPUT sería una matriz tridimensional igual que RGB, sin embargo no harian referencia al color sino a las bandas. Pueden llegar a capturar 224 bandas y así podemos desarrollar redes neuronales de clasificación, detección o segmentación de objetos, cuanto más bandas tenga la cámara, más continua será la firma espectral que obtengamos, y más sencillo será clasificar materiales y moléculas.

Se usa en agricultura, calidad de alimentos, reciclaje de materiales, además estos rangos de onda están clasificados en la cámara que van desde el espectro ultravioleta, la luz visible, el espectro cercano a la luz visible NIR(near infra red), infrarrojos de onda corta (SWIR), infrarrojos de onda media(MWIR) e infrarrojos de onda larga(LWIR). Cada uno detecta ciertas características de los materiales.

## Origen de la captura

Para tomar un proyecto:

1. ¿Me basta con el espectro de la luz visible?
2. ¿Necesito medir distancias en tres dimensiones?
3. ¿La uniformidad, constancia y falta de ruido son un requisito indispensable? SI: CCV; NO:CMOS
4. ¿A qué distancia se encuentra el objeto que deseo capturar?
5. ¿Qué campo de visión necesito?
6. ¿Qué profundidad de campo requiero?
7. ¿Cuánta luz dispongo?
8. ¿Se mueven los objetos?
