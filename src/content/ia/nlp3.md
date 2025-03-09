---
title: 'NLP 3: Categorización, autocorreción y autocompletado de texto'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

## Autocorrección y Algoritmos de Estimación de Distancia

La **autocorrección** es una aplicación avanzada de NLP que corrige palabras mal escritas y sugiere la versión correcta. Presente en la mayoría de los sistemas de mensajería, su funcionamiento se basa en cuatro pasos principales:

1. Identificación de palabras fuera del vocabulario.
2. Búsqueda de palabras similares dentro del vocabulario conocido.
3. Sustitución de la palabra errónea por la más adecuada.
4. Evaluación del contexto para determinar la mejor corrección posible.

## 1 - Estimación de la Distancia entre Palabras

La **distancia de edición** mide cuántas modificaciones se requieren para transformar una palabra en otra. Se basa en cuatro operaciones fundamentales:

- **Inserción (Insert)**: Añadir una letra.
- **Eliminación (Delete)**: Quitar una letra.
- **Intercambio (Switch)**: Reordenar letras contiguas.
- **Sustitución (Replace)**: Reemplazar una letra por otra.

El algoritmo **Minimum Edit Distance (MED)** calcula la menor cantidad de cambios necesarios asignando un costo a cada operación.

### **Ejemplo**

Transformar _"casa"_ en _"osa"_ requiere:

1. Eliminación de _"c"_ → _"asa"_.
2. Sustitución de _"a"_ por _"o"_ → _"osa"_.

El costo total es **2**, indicando una distancia de edición de **2**.

## 2 - Filtrado de Candidatos y Estimación de Probabilidad

Para optimizar el procesamiento, se utiliza un enfoque probabilístico en lugar de un modelo basado en segmentación.

La probabilidad de que una palabra aparezca en un corpus se estima como:

\[
P(w) = \frac{C(w)}{V}
\]

Donde:

- **P(w)** es la probabilidad de la palabra en el corpus.
- **C(w)** es la cantidad de veces que la palabra aparece.
- **V** es el total de palabras en el corpus.

La palabra con mayor probabilidad se selecciona como la mejor opción para la autocorrección.

---

## Categorización de Palabras (Part of Speech Tagging)

El **Part of Speech Tagging (POS Tagging)** es el proceso de clasificar palabras según su función gramatical dentro de un texto. Este proceso asigna automáticamente etiquetas a cada token, facilitando el análisis lingüístico en tareas de procesamiento de lenguaje natural (NLP).

### **Clases léxicas en NLP**

En NLP, las categorías léxicas se dividen en dos tipos:

#### **Open Classes (Clases Abiertas)**

Son aquellas que evolucionan constantemente con la lengua y admiten la incorporación de nuevas palabras:

- **Sustantivos**: Designan entidades fijas o conceptos concretos.
- **Adjetivos**: Expresan cualidades o características de un sustantivo.
- **Verbos**: Representan acciones, procesos o estados.
- **Adverbios**: Modifican verbos, adjetivos u otros adverbios, indicando lugar, tiempo, modo o cantidad.

#### **Closed Classes (Clases Cerradas)**

Estas categorías son más estables y no suelen incorporar nuevos elementos:

- Pronombres
- Preposiciones
- Conjunciones
- Determinantes
- Interjecciones

### **Desambiguación en POS Tagging**

Un desafío clave del POS tagging es la desambiguación de palabras con múltiples funciones gramaticales. Algunos ejemplos:

- **"bajo"** puede ser una preposición ("bajo el cielo") o un adjetivo ("el piso de abajo").
- **"ante"** puede actuar como preposición ("ante él") o como sustantivo ("prendas de ante").

### **Modelos de POS Tagging y Evaluación**

El objetivo es desarrollar modelos más precisos que el enfoque basado en la **Most Frequent Class Baseline**, que simplemente asigna la categoría más común según un corpus etiquetado. Este método tiene una precisión del **92%**, mientras que un modelo más avanzado debe alcanzar al menos un **97%** de precisión para ser competitivo.

La mejora en POS tagging es clave para aplicaciones de NLP como la traducción automática, el análisis de sentimientos y la extracción de información, donde una correcta clasificación gramatical es fundamental.

---

## Cadenas de Markov Ocultas y el Algoritmo Viterbi

Los **Hidden Markov Models (HMM)** son modelos probabilísticos utilizados para predecir la transición entre diferentes estados en un sistema. Un ejemplo común es la predicción del clima:

- **Probabilidad de que mañana sea lluvioso** si hoy está nublado: **50%**.
- **Probabilidad de que mañana siga nublado**: **30%**.
- **Probabilidad de que mañana sea soleado**: **20%**.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741379424/markov_vbmvak.jpg" alt="Modelo de Markov">

### Aplicación en POS Tagging

En **etiquetado de partes del discurso (POS tagging)**, se utiliza una cadena de Markov para modelar la probabilidad de transición entre categorías gramaticales.

Por ejemplo, si una palabra es un **sustantivo**, la siguiente palabra tiene un **60% de probabilidad** de ser un **adjetivo**.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741379866/markov0_f1caue.jpg alt="Transición de categorías" />

### Hidden Markov Models (HMM)

En un HMM, el sistema trabaja con:

- **Estados ocultos**: Las categorías gramaticales (**sustantivos, verbos, adjetivos, etc.**) que el modelo intenta inferir.
- **Estados observables**: Las palabras del corpus, cuya categoría no es directamente conocida.

Para entrenar un **POS tagger basado en HMM**, es necesario calcular:

- **Matriz de transición:** Probabilidad de pasar de una categoría a otra.
- **Matriz de emisión:** Probabilidad de que una palabra pertenezca a una categoría específica.

Permitiendo encontrar la secuencia de etiquetas más probable para una oración, mejorando la precisión del etiquetado gramatical.

Para el método de generación de matrices, tenemos el siguiente ejemplo:

> Hoy[ADV] ha[VER] muerto[VER] mamá[NOM] o[CONJ] quizá[ADV] ayer[ADV]. No[ADV] lo[PRON] sé[VER]. Recibí[VER] un[DET] telegrama[NOM] del[PREP|ART] asilo[NOM].

#### Matriz de Transición

Para calcular la **matriz de transición**, analizamos la transición de **ADVERBIO** a **VERBO**. Esto se hace sumando la cantidad de veces que ocurre la transición de ADV a VER y dividiéndola entre el total de transiciones que parten de ADV hacia otro estado en el corpus.

En nuestro ejemplo, encontramos 1 transición de ADV a VER de entre 4 transiciones posibles:

```math
P(ADV, VER) = 1/4 = 0.25
```

De **ADV** a **ADV**, tenemos 2 transiciones:

```math
P(ADV, ADV) = 2/4 = 0.50
```

De **ADV** a **PRON**, tenemos 1 transición:

```math
 P(ADV, PRON) = 1/4 = 0.25
```

Al calcular estas probabilidades para todas las posibles transiciones entre categorías gramaticales, obtendremos la **tabla de probabilidades de transición**, que indica la probabilidad de pasar de un estado no observable a otro estado no observable.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741381945/matriztransicion_mtynmd.jpg" alt="Matriz de transición">

#### Matriz de Emisión

La **matriz de emisión** representa las probabilidades de pasar desde un estado oculto (una categoría gramatical) hacia un estado visible (una palabra concreta). En las columnas, tendremos las palabras de nuestro corpus y, en las filas, las categorías gramaticales.

Para calcular la probabilidad de emisión desde el estado oculto **NOM** (nombre) hasta la palabra concreta **mamá**, contamos cuántas veces una etiqueta **nombre** tiene como palabra asociada **mamá** y la dividimos entre el total de las palabras etiquetadas como **nombre**.

Por ejemplo:

```math
C(NOM, 'mamá') = 1/3 = 0.33
C(NOM, 'asilo') = 1/3 = 0.33
C(NOM, 'telegrama') = 1/3 = 0.33
```

Con este corpus pequeño no se obtienen resultados con sentido, pero nos ayuda a entender cómo pasar de un corpus etiquetado a una matriz de transición y una matriz de emisión, que son fundamentales para un sistema de **Parts of Speech Tagging** mediante **Hidden Markov Model**.

Para clasificar palabras basándonos en esto, utilizamos el **algoritmo de Viterbi**, que trabaja con HMM y trata de encontrar la secuencia más probable de estados ocultos, lo que conocemos como el **camino de Viterbi**. En nuestro ejemplo, el algoritmo estima la secuencia más probable de categorías de palabras dada una frase.

El funcionamiento es el siguiente: en cada estado, el algoritmo multiplica la probabilidad de pasar del estado actual a cualquiera de los estados ocultos que puedan generar el estado visible. Luego, seleccionará el estado oculto futuro que tenga la mayor probabilidad.

```math
P(estado_actual, estado_futuro) x C(estado_futuro, estado_visible)
```

En este caso es la probabilidad de que desde una categoría de palabra pasemos a otra multiplicada por la probabilidad de que la siguiente palabra de la frase pertenezca a esta nueva categoría.

Partiendo de nuestras 2 matrices podemos estimar las categorías de las palabras de una frase. Así conocemos el estado en el que estamos (la categoría de la palabra anterior de la frase) y la palabra actual. Tendremos que encontrar el estado futuro (la categoría de la palabra actual) en base a nuestras dos matrices de probabilidades que han sido extraídas de un corpus empleando un HMM.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741388363/markov1_kowl2f.webp" alt="Markov">

- La matriz de arriba es la **matriz de transición**, la probabilidad de moverse de un estado a otro.

- La matriz inferior es la **matriz de emisión**, indica la probabilidad de que un estado o etiqueta (como NOM, VERB, etc.) genere una palabra en la oración.

Empezamos por la primera palabra de "coto privado de caza", entonces para cálcular "coto" tenemos:

1. **Transición desde el estado inicial (Estado 0) a NOM (Sustantivo)**:

   - **P(Estado 0 → NOM) = 0.5** (tomado de la primera fila de la matriz de transición)

2. **Emisión de "coto" desde NOM**:

   - **C(NOM, "coto") = 1.0** (porque en la matriz de emisión, la suma de probabilidades de cada columna debe ser 1, y no hay otras etiquetas emitiendo "coto")

3. **Multiplicación de probabilidades**:
   ```math
   P(Estado_0, NOM) \times C(NOM, "coto") = 0.5 \times 1 = 0.5
   ```

Entonces, hemos calculado la probabilidad de que el primer tag sea **[NOM]** y de que este **[NOM]** emita nuestra palabra, "coto". La probabilidad se ha asignado a **[NOM]**, ya que no hay más opciones, definiendo así nuestro **camino de Viterbi**.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741477795/viterbipath_ujjxod.jpg" alt="Definiendo el camino de Viterbi">

Nuestro estado pasa a **[NOM]** y conocemos el siguiente estado visible, "privado". Para determinar el siguiente movimiento, analizamos las probabilidades de pasar desde el estado **[NOM]** hacia cualquiera de los estados ocultos asociados a la palabra "privado". El algoritmo de Viterbi multiplicará la probabilidad de pasar de **[NOM]** a cada una de las categorías seleccionadas por la probabilidad de que "privado" sea emitido por esas categorías.

```math
P(NOM, NOM) x C(NOM, "privado") = 0.1 x .3 = .03
P(NOM, VER) x C(VER, "privado") = 0.3 x .1 = .03
P(NOM, ADJ) x C(ADJ, "privado") = 0.4 x .7 = .28
P(NOM, ADV) x C(ADV, "privado") = 0.1 x .1 = .01
```

Dado el contexto de la frase, el resultado será **[ADJ]**. Entonces, el algoritmo de Viterbi avanzará un estado a: "de", en el estado **[ADJ]**. Es importante también que multiplicará la probabilidad del tag anterior por la de cada uno de estos caminos, donde nuestro primer tag era **[NOM]** con 0.5.

```math
P(estado_0, NOM, NOM) = 0.03 x .5 = .015
P(estado_0, NOM, VER) = 0.03 x .5 = .015
P(estado_0, NOM, ADJ) = 0.28 x .5 = .14
P(estado_0, NOM, ADV) = 0.01 x .5 = .0015
```

Entonces tenemos en cada tag la probabilidad de que un determinado camino llegue hasta ellos, pero sin abandonar los otros

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741481046/viterbipath1_mcvdyo.jpg">

Ahora toca la palabra "de", sin embargo, puede ser la cuarta letra del abecedario también, por lo que computará 8 nuevas ramas.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741482306/viterbi_zyhuf4.webp">

Y el diagrama será:

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741482358/viterbi1_n3wz7e.webp">

Aquí, el algoritmo de Viterbi ve que tenemos dos estados posibles con 4 ramas cada una, por lo que podará las menos probables:

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741482548/viterbi2_roiixa.png">

Ahora es el turno de "caza":

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741482608/viterbi3_nvvcjx.webp">

Nos quedamos con la rama más probable **[PREP] -> [NOM]**, así decidimos cuál es nuestro **camino de Viterbi**, permitiéndonos tomar decisiones precisas y óptimas en tareas donde la información real está oculta, como en el lenguaje, el sonido y la genética.

- El camino de Viterbi nos permite tomar decisiones precisas y óptimas en tareas donde la información real está oculta, como en el lenguaje, el sonido y la genética.
- En reconocimiento de voz, hay muchas interpretaciones posibles, y Viterbi ayuda a elegir la más coherente.
- Nos permite asignar etiquetas correctas a palabras ambiguas, mejorando tareas como la traducción automática o la generación de texto.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741483011/viterbi4_ka6kvo.webp">

## N-GRAMS - Autocompletado de texto

Estos modelos ayudan a asignar distintas probabilidades a cada una de las posibles secuencias que puede generar cada uno de ellos (n). Aunque existen modelos más avanzados como las RNN y los Transformers.

Dada una frase "s", el siguiente token será la palabra "w", es decir: P(w|s).

Si tenemos "la mesa está" = "s", podemos ver en nuestro corpus y calcular una probabilidad para que el resultado sea "rota", pero esto es imposible de hacer para encontrar todas las frases posibles y además que sea estadísticamente significativo.

Un modelo de 2-gram empleará la última palabra de la frase para predecir la siguiente palabra, es decir, P(rota | La mesa del salón está). Un modelo 2-gram calculará P(rota | está) buscando en nuestro corpus donde "está" sea la primera palabra.

**Regla de la cadena:** Para saber la probabilidad de que mañana haga calor y esté soleado P(calor, soleado), podemos calcular la probabilidad de que, al hacer calor, esté soleado P(soleado | calor) y multiplicar la probabilidad de que haga calor P(calor), quedando así: P(calor, soleado) = P(soleado | calor) × P(calor).

Para hacer la predicción en frases completas como "hoy compré 2 pantalones":

P(hoy, compré, pantalones) = P(hoy) × P(compré | hoy) × P(dos | hoy compré) × P(pantalones | hoy compré dos). Se buscará cuántas veces la palabra "compré" aparece después de la palabra "hoy", lo dividirá entre todas las ocurrencias de la palabra "hoy", y eso será P(compré | hoy). Lo mismo sucederá con las probabilidades del siguiente trigrama y tetragrama para obtener la probabilidad completa de la frase.

Sin embargo, nuestras frases no siempre aparecerán en nuestro corpus, es aquí donde los 2-grams tienen sentido. Añadiendo un símbolo al principio y al final de la frase, como: **P(hoy | <\s>)** y **P(</s> | hoy)**. Con estos símbolos, los modelos pueden estimar la probabilidad de frases completas teniendo en cuenta la probabilidad de que la frase **comience** con una palabra determinada y también **termine** con una palabra determinada.

### Matriz de recuento (count matrix)

Relaciona todas las palabras de nuestro vocabulario con todas las palabras de nuestro vocabulario para permitir a nuestros modelos generar frases y predecir palabras de forma automática.

**Paso 1. Matriz de recuento.**

El primer paso que ejecuta un modelo de lenguaje (LM) dado un corpus es generar la matriz de recuento, que consiste en generar una matriz de frecuencias acumuladas. En esta matriz, las filas y columnas representarán las palabras del corpus y su relación en términos de ocurrencias en bigramas (pares de palabras consecutivas).

Por ejemplo, para la frase "tengo mucho frío y mucho miedo, pero no tengo hambre", se construye una matriz en la que las filas representan el símbolo de principio de frase y las columnas representan el símbolo de cierre de frase. La matriz tendrá la siguiente forma, donde cada celda muestra la cantidad de veces que aparece un par de palabras consecutivas (un bigrama):

- El símbolo de inicio de frase (S) solo puede aparecer en la primera posición del bigrama (como la palabra inicial), por lo que estará en las filas.
- El símbolo de cierre de frase (</s>) solo puede aparecer en la segunda posición del bigrama, por lo que estará en las columnas.

Por ejemplo, en la frase:

> "tengo mucho frío y mucho miedo, pero no tengo hambre"

El bigrama para la primera parte podría ser:

> ```math
> - "S -> tengo"
> - "tengo -> mucho"
> - "mucho -> frío"
> - "frío -> y"
> - "y -> mucho"
> - "mucho -> miedo"
> - "miedo -> ,"
> - "pero -> no"
> - "no -> tengo"
> - "tengo -> hambre"
> - "hambre -> </s>"
> ```
>
> La matriz de recuento se llenará con la frecuencia de aparición de cada uno de estos bigramas. Esta matriz servirá para calcular las probabilidades de ocurrencia de los siguientes tokens en función de los anteriores.

Para cada par de palabras (bigramas) en el corpus, contamos cuántas veces aparece esa secuencia de palabras. Por ejemplo, si el bigrama "tengo -> mucho" aparece 2 veces en el corpus, la entrada correspondiente en la matriz de recuento será 2. Una vez que tengamos la matriz de recuento, podemos usarla para calcular las probabilidades de transición entre las palabras.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741531397/recuento_fwcpt0.webp" >

**Paso 2. Matriz de probabilidad.**

La matriz de probabilidad sencillamente calcula las probabilidades de cada uno de los bigramas en base a las frecuencias acumuladas, como se hace para normalizar, dividiendo el valor de cada celda entre la suma de todos los valores de su fila o dividiendo cada frecuencia entre el total de apariciones de una palabra en nuestro corpus, que es lo mismo.

```math
En nuestro bigrama:
P(frio|mucho) = .5
P(miedo|hambre) = .5
```

### Aplicar un modelo de lenguaje basado en N-GRAM

Nuestro modelo de lenguaje (LM) usará la matriz de probabilidades para predecir la siguiente palabra en una frase, seleccionando la palabra con mayor probabilidad en cada momento. Esto permite generar una frase comenzando con una palabra inicial y finalizando con el token "<//s>". Para mayor variabilidad, se puede introducir aleatoriedad en el proceso.

### Evaluación de modelos de lenguaje: Perplexity

La **perplexity** es una medida de la complejidad del modelo, similar a la entropía, y se utiliza para evaluar los modelos de lenguaje. Mide la variabilidad de los datos usando un porcentaje del corpus (70% a 98%) como conjunto de entrenamiento para calcular la matriz de probabilidades. En los modelos N-gram, la **perplexity** es la inversa de la probabilidad del conjunto de evaluación. Si el modelo asigna una probabilidad alta a las frases del conjunto de evaluación, significa que ha aprendido correctamente las probabilidades del lenguaje, lo que indica un buen modelo.

Un aspecto clave de los modelos basados en N-gram es la medición de la **perplexity**, que evalúa tanto la complejidad del lenguaje como la del modelo.
