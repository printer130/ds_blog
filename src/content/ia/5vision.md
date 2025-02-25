---
title: 'Visión 5: Procesamiento de imagénes'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

## Espacio de color CIELAB

El espacio de color LAB fue desarrollado en 1940 por Richard Hunter para emular la percepción humana del color. Posteriormente, la Comisión Internacional de Iluminación (CIE) lo estandarizó como CIELAB.

Este modelo tiene tres canales:

- **L (Lightness):** Indica la luminosidad, de 0 (negro) a 100 (blanco).
- **A:** Representa la escala rojo-verde. Valores negativos indican verde, positivos indican rojo. Rango: -128 a 127.
- **B:** Representa la escala azul-amarillo. Valores negativos indican azul, positivos indican amarillo. Rango: -128 a 127.

<!--
![CIELAB](https://cdn.educalms.com/YzFjeHYlMkJlVEcxaEM3QVdIaE5HajhRJTNEJTNE-1721386079.png?Expires=1740020431&Signature=kW5S7-SgzhZFWCrjwjdyB7GozA0FEpxMf7gr8blomrU-JUzqcE4sRhuS1NxdL5SE7lNYHava5HkSq~E1SCamvMtDDD2Ey968ON4SOFETSzaTU2RYJPKggLVPLeF8~-jBn-2TSjBp0ouL4X~qgjWTQ8YlSF8k~9RqFCGuopWWL8eU94G5Gjy6195h~fejv7o93dPyvHUKU40v-nW4OLMUfv2ie22rLdhBbGnPUW5a6pBlsIjfEaSB1hl9r9MFpSnkvxfm~A0nioVOxcJMuI~ZfzhnbzEEWYRnVARnK0fdANYEdwTwO13Dj6jwZf6fIWRMMJD-ReBl~~Wkyu5OSMAfYg__&Key-Pair-Id=K2XVTQ1784SQT0)   -->

---

## Espacio de color HSV

El modelo **HSV (Hue, Saturation, Value)** se diseñó como una alternativa a **RGB**, ya que refleja mejor la forma en que el ojo humano percibe los colores. En lugar de procesar tres canales de color, el cerebro reacciona principalmente a la saturación y el brillo.

**Componentes:**

- **H (Hue – Tono):** Se mide en grados dentro de un círculo de 360°.
  - Rojo: 0° - 60°
  - Amarillo: 61° - 120°
  - Verde: 121° - 180°
  - Cian: 181° - 240°
  - Azul: 241° - 300°
  - Magenta: 301° - 360°
- **S (Saturation – Saturación):** Indica la cantidad de gris en el color.
  - 100%: Color puro.
  - 0%: Gris puro.
- **V (Value – Valor):** Define la intensidad del color.
  - 0%: Negro.
  - 100%: Color con máxima intensidad.

<!-- ![HSV](https://cdn.educalms.com/YjJuNXhGNHlQeiUyQkZMaG8lMkJ0Z0c5a2clM0QlM0Q=-1721386074.png?Expires=1740013245&Signature=azcrPnOgIxPeKxmgeFCKFRqPfSss4b1PeiyfakDO6ZqrhklLRfkjGWWL7iszmvUCLr9aOVre1761yAcO8LYsS6LF1c2k6vgOxJnrTA2VUeZPCBUMhQtMeGvTXFLIM70bFkSzVAy1uPX6Ityc-QP3K0s95awdt8QxC6SOUaeTiUAuHVVM-mrnNAZgwFEGvWoroqDmujObBW4DSna0xTa2WIPdYAlckV8Km3uD5G~3M7qVTG3kA7mMCf4JCiM~z3biADnh2ojilfF7V7Z17UJEzDwYdhUw8ek3ZepAd5o7e6IUwB-f8jbwVK-mi11MLklfJFfHQ-xWDOIRyTe2K05TEw__&Key-Pair-Id=K2XVTQ1784SQT0)
 -->

## Representación de imágenes

### Histograma de intensidades

Le preguntamos a cada píxel qué intensidad tiene (valor numérico). Con esto sacamos el histograma y podemos emplearlo para diferenciar imágenes oscuras o con fondo negro de imágenes claras o con fondo blanco de forma automática.

---

## Transformación de imágenes

Manipular las imágenes antes de que ingresen al modelo de inteligencia artificial es un punto importante.

### Transformaciones en intensidad

Manipulan el contraste y el gamma de la imagen.

### Transformaciones geométricas

Modifican la relación espacial entre los distintos píxeles de la imagen. Deformando, rotando o comprimiendo ciertas zonas de la imagen, obtenemos imágenes transformadas desde las originales.

Esto se encuentra dentro del "Preprocesado de imagen".

---

Captura -> Preprocesado de imagen -> Extracción de features -> Aplicación del objetivo -> Decisión y reporte

---

## Transformaciones en intensidad

Son las que realizan los softwares de edición fotográfica cuando manipulamos el contraste, el brillo y el gamma, entre otros.

### 1. Negativos

Es el más sencillo y se trabaja en escala de grises. La idea es que los máximos se conviertan en mínimos y viceversa.

Con OpenCV se usa la función `cv2.bitwise_not(img)`, que niega los píxeles para obtener su valor opuesto.

### 2. Corrección de gamma

Emplea operaciones lineales. Si no aplicamos corrección gamma, estamos malgastando los píxeles más brillantes y más oscuros de la imagen, en los que el ser humano no percibe nada, mientras maximizamos la información almacenada en los valores intermedios de intensidad.

Nos permite observar correctamente ciertos detalles de las imágenes que pasan desapercibidos para el interés de nuestro modelo.

### 3. Mejora del contraste

- **Ecualización del histograma**: Se emplea cuando hay poca variación de intensidad entre los píxeles (todos muy claros o todos muy oscuros). Si todos los píxeles tienen valores entre 0 y 20, entonces 235 valores no se usan, lo que podría ayudarnos a distinguir mejor los detalles de la imagen.

- **Ecualización local del histograma**: Dividimos la imagen en una serie de regiones llamadas teselas o "tiles". En cada una de estas regiones ejecutamos la "ecualización del histograma" para no afectar al resto. Luego de ecualizar todas las regiones, se aplica el algoritmo de interpolación para evitar bordes artificiales, llamados "artifacts".

- **Umbralización (thresholding)**: Segmenta imágenes y cae en la extracción de características. Consiste en etiquetar cada píxel de la imagen para comprender su tipología. De acuerdo con el thresholding, pintaremos los píxeles de blanco o negro.

Se puede configurar de forma automática:

1. **Umbralizado basado en histograma**: Se usa la forma del histograma para decidir puntos críticos como picos o valles.
2. **Umbralizado global automático**: Selecciona el valor medio entre la intensidad máxima y la mínima para seleccionar el umbral de división.
3. **Umbralizado de Otsu**: Maximiza la varianza entre la clase 0 y la clase 1.
4. **Umbralizado local adaptativo**: Cada imagen se divide en pequeñas subregiones para umbralizar cada una por separado.

## Transformaciones geométricas

Manipulan el espacio entre píxeles, modificando la ubicación de cada píxel. No son muy empleadas en visión artificial.

- **Distancia entre píxeles**: Si la distancia entre píxeles se mantiene, estamos tratando con transformaciones geométricas rígidas. Estas incluyen:

  - Traslación
  - Rotación

- **Ángulos entre píxeles**: Son transformaciones geométricas semejantes.

  - **Escalado**: Amplía o reduce la imagen, generando o destruyendo píxeles, pero manteniendo la relación de aspecto original entre ellos.
  - **Afinidad entre píxeles**: Deforma las imágenes, pero mantiene la ubicación relativa de los elementos, estirándolas o achatándolas.

- **Colinealidad entre píxeles**: Cambia la perspectiva de la imagen.
  - **Transformación proyectiva**: Se usa para rectificar o deformar en función de un punto de fuga.

## Operaciones morfológicas

Se aplican a imágenes binarias y monocromáticas sobre formas y estructuras. Nos ayudan a hacer los objetos más grandes o pequeños, aumentar o reducir el espacio entre ellos.

Las operaciones morfológicas emplean un _structuring element_ para definir la zona analizada alrededor de cada píxel y aplicar la función morfológica deseada.

1. **Erosión**: Las zonas con píxeles negros (0) se convierten en negro (0). Se usa un _structuring element_ con la forma deseada (cuadrada, circular, etc.).

2. **Dilatación**: Contraria a la erosión. Si hay un píxel blanco, todos los píxeles en la zona se convierten en blanco.

3. **Apertura (open)**: Erosión seguida de dilatación. Elimina las zonas pequeñas, pero luego agranda las que se han mantenido.

4. **Cierre (close)**: Contrario a la apertura. Aplica dilatación seguida de erosión, cerrando agujeros en los objetos y reduciendo los pequeños puntos negros que pueden entorpecer los algoritmos.

---

# Filtrado: Desenfoque, Nitidez y Suavizado

Los **kernels de convolución** aplican operaciones matemáticas sobre una imagen para lograr efectos como **desenfoque, suavizado o aumento de nitidez**.

Convolucionar un kernel implica multiplicar una matriz \( M \times N \) por los píxeles de la imagen mediante una **ventana deslizante** (_sliding window_).

<!-- ![Ejemplo de convolución](https://cdn.educalms.com/MWRMZmpMcTl5ZXY1dzNSSVBjbmExQSUzRCUzRA==-1721386093.png?Expires=1740092976&Signature=dKtVF5dksYmLgBpn~Te45hBfhE-h11EX4js6EyMe5lSmMsvmJXqb0B8N-HU9FxkhO-2fLMPCYG02cGxixX9jHRp25TJUuU7Msd66577F7VROTACpEnJas5IxM5jDKMLecN6YBTP1xp-OV5ys8plm4tf8ckm9Te8KSKs9VtPRZO8rZLLesfE6DJiW2NEk6~e-QEEvTzNlehbCN-lSHlIp-rnwgJ~1k6RiRY8zvXlOoRFYBxQYDNhYEenN81vOP8E-uiS42SorQDMzIX-fR2KNMwG1Skrpt8xBAGMA3ndCL5vy~Gb-VOncPLxfVQPtlQEMEXaXPC7ckMxQc4OuTtcUsA__&Key-Pair-Id=K2XVTQ1784SQT0) -->

Un **kernel 3×3** se multiplica por una región de **3×3 píxeles** en la imagen original (_input_), generando un nuevo píxel en la imagen de salida (_output_). Dependiendo del kernel utilizado, el resultado será **suavizado, nitidez o filtrado**.

### 1️⃣ Desenfoque (_Blurring_) y Eliminación de Ruido (_Denoising_)

🔹 **Averaging Blurring**  
El kernel contiene valores iguales, promediando los píxeles para suavizar la imagen.

<!-- ![Ejemplo de averaging blurring](https://cdn.educalms.com/U01aeVlOTnl1bVVTQlpJeHRBazdvQSUzRCUzRA==-1721386094.png?Expires=1740109861&Signature=BflBjvnWk7xyJGDpyMM~Uqg1PaF1AvFGhpQn1pYQJX9ifuQEqpakjPmbfZqPm7pf-d-EhQVeS9mOd7fCcKPXfdsASugg5J7QvnKYEMuiRAhPQpdEIFSMgZOq2ZaC2ab5qNtUhrX4yrOJNFfy8joGMez7iYnxPvYVdK6~G9IQA5t4rKrwpBX-QeQZiY2NL9YgW4jp5~ETy8rrGGQvxZDtg4ZUKX8rad~5TNSKjAmDkdlEY-bNGeVooMdc6Ij2s7xR8t902kkFI3eE7OAmYdZNbXVXc7eSgmWWSpgvaUUmlp~lAd0bkRrO2qYJYG8trr16bLAg6IkhdYd1xcqArPNKLg__&Key-Pair-Id=K2XVTQ1784SQT0)   -->

🔹 **Gaussian Blurring**  
Asigna mayor peso al píxel central, luego a los adyacentes y menor a las esquinas.

<!-- ![Ejemplo de Gaussian blurring](https://cdn.educalms.com/WVBKR29VcERvNTJQQVBINTdYQVJMUSUzRCUzRA==-1721386095.png?Expires=1740109861&Signature=FWf4Mly7oRvwLc4fY5onaqp5ofBLXlIeAAidENMPlGIhwKBuDxx98j~i0f3zsIIUtW82zCTicakwCV33-Sq7g6V5CkxdRQB31xKfjGDy3jNFnOAYGURpJe23nkJCPUjhWnm3iFXcpb4QpBzy7XstHhTlVg9~OH-TTyFWWu0qKO62vFAh2EPCvFnEzwYrbzRjMtWCqnDEGXh812ZnGL5jqk4AsYcUDkCXqo9auNRpr7UBfukHH0FVBAUxtMDsj3K24fHb-KNf0SB1IyJXkefrIptqyGeFWBzK-4HPVX~OsKU9Cu2umZfL-2KL0FKzPhBqMkOrmmC0PcxIrmc4kKr2oQ__&Key-Pair-Id=K2XVTQ1784SQT0)   -->

🔹 **Median Blurring**  
Sustituye cada píxel por la mediana de los valores en su vecindad.

<!-- ![Ejemplo de Median Blurring](https://cdn.educalms.com/eHdmYkExczJBRVp4YzQ0QkJrYTYzUSUzRCUzRA==-1721386096.png?Expires=1740109861&Signature=uoJvnOJF5XPNuQzabVEi2qTNy1Q3WfTRXVqLcTKpHaKrGIxAe9BL7LNALjHhrc3M6fqnMo56IiMptxhWVaenkauaTRNYZ7vD37-svWlzAQqcYRRFZagDiOVozoGPx1GosYqMPRc2SzyY9PLxlxUPc5aGTCpaMItkJ5yqpDEmD5PjY05aDUdCpecLYwrUW6Lf4xTs7g6ZZoCqbKe1TkH8bSyacgL75nm1sMdNZISoTvq0EqVlAH4n4rBrvtfE38AaDhu~yyu0jtV4TSy5f0-Ua5sTwNSQ~1d4L~3ptjZE4Op2glntL6lhyK1oLnL-tdqPeZbPlMQH905f6hFGm3qfgA__&Key-Pair-Id=K2XVTQ1784SQT0)   -->

### 2️⃣ Aumento de Nitidez (_Sharpening_)

🔹 Realza los bordes y el contraste en la imagen.

<!-- ![Ejemplo de sharpening](https://cdn.educalms.com/SEE4VWVWRFVMQ2M5VW85TmRMWU44QSUzRCUzRA==-1721386097.png?Expires=1740110532&Signature=C24IhVMXON7shEtV9RybAQQnNzfNVvKc-P4J-uTxMSopQb6ans8iNvRHjO4V6TOW5KjhvPMpsUkaAuBrGNlSH8BCO6iOEnLU4cygJkt2Vs0OvL-v4VHJD0QmW2JAnfGlOCBaQVJZPQ9ixk88dFfMYdzxKhen9czIwChDZRzXzS1IHYXzP2EH-7jM9zMWFjwsyjpznw8gKLnYraMWzmo48dqts6aomwU4fFtghXOSxvU8ef4X5BP7rHwC4YP45EROBKhJRa847eznZmMrH-RxoAyn1IvWU6WufY8iCwZTO8AadeMD5oAcqp9KIlUh3MvlUjAq7I9XyIqBGPIqMVao5g__&Key-Pair-Id=K2XVTQ1784SQT0)
 -->

---

## Detección de Contornos, Bordes, Rectas y Esquinas

La extracción de características en imágenes es fundamental para identificar formas, estructuras, objetos y cambios de iluminación. Entre estas características, los bordes son clave, ya que permiten definir la tipología y ubicación de los objetos.

Un borde es una región en la que la intensidad cambia abruptamente, presentando discontinuidades. Para detectarlos, se pueden utilizar técnicas como convoluciones y el algoritmo de Canny.

### Detección de Bordes con Kernels

Se pueden aplicar filtros para detectar bordes en diferentes direcciones:

- **Bordes verticales:** Se analizan píxeles contiguos en dirección vertical.
- **Bordes horizontales:** Se examinan píxeles en una línea horizontal.
- **Bordes diagonales:** Se comparan píxeles en diagonales opuestas.

Los tres kernels más utilizados para esta tarea son:

- **Sobel** y **Prewitt**: Identifican los máximos y mínimos de la intensidad en cada eje.
- **Laplaciano**: Busca bordes en ambas dimensiones simultáneamente, aunque es sensible al ruido. Para optimizar su rendimiento, se recomienda aplicar primero filtros como el Gaussiano y el Median Filter.

### Detección de Bordes con Canny

El algoritmo de Canny sigue varios pasos antes de identificar los bordes:

1. Aplicación de un filtro de reducción de ruido mediante un filtro gaussiano con kernel 5x5, seguido de Sobel.
2. Uso del algoritmo **Non-Maximum Suppression** para refinar la detección de bordes.
3. Aplicación de **Hysteresis Thresholding** para seleccionar únicamente los bordes con valores dentro de un rango definido.

### Detección de Contornos

Un contorno es un borde cerrado y se extrae considerando la jerarquía entre los elementos de la imagen. Existen dos métodos principales:

1. **Sin aproximación en cadena:** Se agrupan bordes cercanos con intensidades similares.
2. **Con aproximación en cadena:** Se reducen los contornos a sus puntos clave, lo que optimiza el procesamiento.

### Detección de Rectas y Círculos

El método más utilizado para detectar rectas es la **Transformada de Hough**, desarrollada en 1962. Funciona sobre imágenes de profundidad 1 bit y evalúa todas las rectas posibles que pasan por un punto, comparándolas con los demás puntos para identificar las líneas más probables.

### Detección de Esquinas

Las esquinas ayudan a delimitar objetos en imágenes y son fundamentales para el seguimiento en videos, ya que permanecen invariantes ante cambios de tamaño, intensidad y posición.

El método de **Harris**, desarrollado en 1988 por Chris Harris y Mike Stephens, clasifica las regiones de la imagen en:

1. **Zonas planas:** Sin cambios significativos de intensidad.
2. **Bordes:** Cambios de intensidad en un solo eje (vertical u horizontal), detectados con Sobel.
3. **Esquinas:** Variaciones de intensidad en ambas direcciones (X e Y).

<!-- ![Ejemplo de detección de esquinas](https://cdn.educalms.com/MWtWcW02RTRXWEtmNkpZMmFTRnVsdyUzRCUzRA==-1721386111.png?Expires=1740117365&Signature=NZgFK2mAAVSUQeoHiS6i6g-IhoPNorMcl1aRKoeAzRuOAcTIpp1z-izLBp8jJwcjSDoNGau8aAHx9UJpYgkdOTFf-7bYWA38qTRDNW4zMyVbDm3Q1~0YyHQRElUwAt-eBgbwjmgSUCZwxBh7uLt2ztcH7hD9vGS7dKF9sXC~b61q0OjwYdHmCNd19Rzv2M70yO6pLoTyfP0C-ciD-wF86YWoNB-DDZQOHqWxA12VswH0Xi0J8MBaZGIpxtf1S7MqAJ0ucV1ZFkD92XHBJkV4JD8aY~4aZhMAbHCLDqajc7PuL3sDCI8qUxo4auOubPYYB~-c05ths0ztIg2FXbephw__&Key-Pair-Id=K2XVTQ1784SQT0)
 -->

En 1994, el método fue mejorado con el algoritmo **Shi-Tomasi** (_Good Features To Track_), que identifica esquinas relevantes para el seguimiento en videos. A diferencia de Harris, este algoritmo selecciona características estables ante cambios de rotación y escala.
