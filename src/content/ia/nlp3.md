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

### Hidden Markov chains y el algoritmo Viterbi

Trata de modelar situaciones en las que es necesario predecir la probabilidad de pasar de un estado a otro en un sistema dado (clima), con esto estamos tratando de implementar un algoritmo para clasificar parted del discurso, o un POS tagger, que nuestro algoritmo trabajara con palabras a las que tendra que asociar clases lexicas.

Los estados se representan como circulo:

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741379424/markov_vbmvak.jpg" alt="markov">

De nublado a lluvioso hay 50%, de nublado a nublado hay 30%, de nublado a soleado hay 20% que se cumpla el clima para mañana.

En una cadena de Markov para POS tagging definiremos la probabilidad de transicion desde una categoria de palabra hasta otra, por ejemplo vemos si estamos en nombre la siguiente palabra sea un adjetivo con 60%:

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741379866/markov0_f1caue.jpg" alt="Markov">

Con esto aparecen lo Hidden Markov Models(HMM) donde el sistema desconoce las etiquetas de las palabras, entonces no puede saber el estado, por otro lado estan los estados observables los que conoce el sistema y son las palabras de nuestro corpus, y los no observables que son las categorias del part of speech (verbos,nombres,adjetivos,adverbios) dado que no se pueden conocer sencillamente observando la palabra.

Entonces tenemos dado un corpus de entrenamiento con el que deseemos generar nuestro algoritmo de POS tagging, tendremos que calcular la matriz de emision y la matriz de transicion de dicho corpus para generar entonces un Hidden Markov Model que represente nuestro corpus y sus categorias lexicas y palabras.

-

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

Con estos datos, el **algoritmo de Viterbi** permite encontrar la secuencia de etiquetas más probable para una oración, mejorando la precisión del etiquetado gramatical. 🚀

-

Para el metodo de generacion de matrices tenemos este ejemplo:

Hoy[ADV] ha[VER] muerto[VER] mama[NOM] o[CONJ] quiza[ADV] ayer[ADV]. No[ADV] lo[PRON] se[VER]. Recibi[VER] un[DET] telegrama[NOM] del[PREP|ART] asilo[NOM]

Para la _matriz de transicion_ calculamos ADVERBIO á VERBO, sera sumar la cantidad de veces que sucede la transicion de ADV á VER y dividirla entre el total de transiciones partiendo de ADV hacia otro en nuestro corpus:

Encontramos 1 transicion ADV á VER de entre 4 transiciones: P(ADV,VER) = 1/4 = .25

De ADV á ADV tenemos 2 transiciones: P(ADV, ADV)= 2/4 = .5

De P(ADV, PRON) = 1/4 = .25

Haciendo esto para todas las posibles transiciones desde cuaquier categoria a cualquier categoria tendremos la tabla de probabilidades de transicion que indica la probabilidad de pasar de un estado no observable hasta otro estado no observable.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741381945/matriztransicion_mtynmd.jpg" alt="Matriz de transición">

Para la _matriz de emisión_ que es la que representa las probabilidades de pasar desde un estado oculto(categoria de palabra) hacia un estado visible (una palabra concreta), para las columnas tendremos las palabras de nuestro corpus y en las filas volveran a estar las categorias, entonces para calcular la probabilidad de emision desde el estado oculto NOM hasta la palabra contreta mama, vemos cuantas veces una etiqueta 'nombre' tiene como palabra asociada 'mama' y dividirlo entre el total de las palabras etiquetadas como nombre:

```math
C(NOM, 'mama') = 1/3 = .33
C(NOM, 'asilo') = 1/3 = .33
C(NOM, 'telegrama') = 1/3 = .33
```

Con este corpus pequeño no se obtienen resultados con sentido, pero nos ayuda a entender como pasar de un corpus etiquetado a una matriz de transicion y a una matriz de emision, que son importantes para un sistema de Parts of Speech Taggin mediante Hidden Markov Model.

Para clasificar palabras basandonos en esto tenemos el _algoritmo de viterbi_ que trabaja con HMM y trata de encontrar la secuencia mas probable de estados ocultos, lo que llamamos camino de Viterbi. En nuestro ejemplo trata de estimar la secuencia mas probable de categorias de palabras dada una frase.

Funciona así en cada estado multiplica la probabilidad de pasar del estado actual a cualquiera de los estados ocultos que pueden llegar a emitir el estado visible. Luego seleccionará el estado oculto futuro que más probabilidad alcance.

```math
P(estado_actual, estado_futuro) x C(estado_futuro, estado_visible)
```

En este caso es la probabilidad de que desde una categoría de palabra pasemos a otra multiplicada por la probabilidad de que la siguiente palabra de la frase pertenezca a esta nueva categoría.

Partiendo de nuestras 2 matrices podemos estimar las categorías de las palabras de una frase. Así conocemos el estado en el que estamos (la categoría de la palabra anterior de la frase) y la palabra actual. Tendremos que encontrar el estado futuro (la categoría de la palabra actual) en base a nuestras dos matrices de probabilidades que han sido extraídas de un corpus empleando un HMM.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741388363/markov1_kowl2f.webp" alt="Markov">

Empezamos por la primera palabra de "coto privado de caza"

La matriz de arriba es la **matriz de transición**, la probabilidad de moverse de un estado a otro.  
La matriz inferior es la **matriz de emisión**, indica la probabilidad de que un estado o etiqueta (como NOM, VERB, etc.) genere una palabra en la oración.

**Entonces para cálcular "coto"**:

1. **Transición desde el estado inicial (Estado 0) a NOM (Sustantivo)**:

   - **P(Estado 0 → NOM) = 0.5** (tomado de la primera fila de la matriz de transición)

2. **Emisión de "coto" desde NOM**:

   - **C(NOM, "coto") = 1.0** (porque en la matriz de emisión, la suma de probabilidades de cada columna debe ser 1, y no hay otras etiquetas emitiendo "coto")

3. **Multiplicación de probabilidades**:
   ```math
   P(Estado_0, NOM) \times C(NOM, "coto") = 0.5 \times 1 = 0.5
   ```

Entonces hemos calculado la probabilidad de que el primer tag sea [NOM] y de que este [NOM] emita nuestra palabra, "coto". La probabilidad ha sido asignada a [NOM], ya que no hay más opciones, definiendo nuestro **camino de Viterbi**

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741477795/viterbipath_ujjxod.jpg" alt="Definiendo el camino de viterbi">

Nuestro estado pasa a [NOM] y conocemos el siguiente estado visible, "privado". Para ver el siguiente movimiento el estado oculto vemos las probabiliadades de psar desde un estado [NOM] hasta cualquiera de los estados ocultos asociados a la palabra "privado". El algoritmo de Viterbi multiplicara la probabilidad de pasar desde [NOM] hasta cada una de las categorías seleccionadas por la probabilidad de que "privado" sea emitido por alguna de estas categorías.

```math
P(NOM, NOM) x C(NOM, "privado") = 0.1 x .3 = .03
P(NOM, VER) x C(VER, "privado") = 0.3 x .1 = .03
P(NOM, ADJ) x C(ADJ, "privado") = 0.4 x .7 = .28
P(NOM, ADV) x C(ADV, "privado") = 0.1 x .1 = .01
```

Dado el contexto de la frase el resultado sera [ADJ] entonces el algoritmo de VIterbi avanzará un estado a: "de", en el estado [ADJ], importante también que multiplicara la probabilidad del tag anterior por la de cada uno de estos caminos, donde nuestro primer tag era [NOM] con .5

```math
P(estado_0, NOM, NOM) = 0.03 x .5 = .015
P(estado_0, NOM, VER) = 0.03 x .5 = .015
P(estado_0, NOM, ADJ) = 0.28 x .5 = .14
P(estado_0, NOM, ADV) = 0.01 x .5 = .0015
```

ENtonces tenemos en cada tag la probabilidad de que un determinado camino llegue hasta ellos, pero sin abandonar los otros

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741481046/viterbipath1_mcvdyo.jpg">

Ahora toca la palabra "de" sin embargo puede ser la cuarta letra del abecedario también, por lo que computará 8 nuevas ramas.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741482306/viterbi_zyhuf4.webp">

Y el diagrama será:

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741482358/viterbi1_n3wz7e.webp">

Aquí el algoritmo Viterbi ve que tenemos dos estados posibles con 4 ramas cada una, entonces podara las menos probables:

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741482548/viterbi2_roiixa.png">

Ahora es el turno de "caza":

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741482608/viterbi3_nvvcjx.webp">

Nos quedamos con la rama más probable [PREP] -> [NOM], así decidimos cúal es nusetro **camino de Viterbi** permitiendonos tomar decisiones precisas y óptimas en tareas donde la información real está oculta, como en el lenguaje, el sonido y la genética.

- El camino de Viterbi nos permite tomar decisiones precisas y óptimas en tareas donde la información real está oculta, como en el lenguaje, el sonido y la genética.
- Porque en reconocimiento de voz hay muchas interpretaciones posibles, y Viterbi ayuda a elegir la más coherente.
- Porque nos permite asignar etiquetas correctas a palabras ambiguas, mejorando tareas como la traducción automática o la generación de texto.

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1741483011/viterbi4_ka6kvo.webp">

## N-GRAMS - Autocompletado de texto

Estos modelos ayudan a asignar distintas probabilidades a cada una de las posibles secuencias que puede generar cada uno de ellos (n). Aunque existen modelos más avanzados como las RNN y los Transformers.

Dado una frase "s" el siguiente token sea la palabra "w", esto es: P(w|s)

Si tenemos "la mesa esta" = "s" podemos ver en nuestro corpus y sacar una probabilidad para que el resultado sea "rota" pero esto es imposible para encontrar todas las frases posibles y ademas sea estadisticamente significativo.

UN modelo de 2-gram empleara la última palabra de la frase para predecir la siguiente palabra, P(rota | La mesa del salón está), un modelo 2-gram calculara P(rota|está) buscando en nuestro corpus que se genere siendo la palabra "esta" la primera.

**Regla de la cadena:** Para saber la probabilidad de que mañana haga calor y esté soleado P(calor, soleado), podemos calcular la probabilidad de que haciendo calor esté soleado P(soleado | calor) y multiplicar la probabilidad de que haga calor P(calor), seria como: P(calor, soleado) = P(soleado|calor) x P(calor)

Para hacer la prediccion en frases enteras como "hoy compré 2 pantalones"

P(hoy,compré, pantalores) = P(hoy) x P(compré|hoy) x P(dos|hoy compré) x P(pantalones| hoy compré dos); Buscara cuantas veces la palabra "compre" aparece despues de la palabra "hoy", lo dividira entre todas las ocurrencias de la palabra hoy y esto sera P(compre|hoy), igual pasara con las probabilidades del siguiente trigrama y del siguiente tetragrama para obtener la probabilidad completa de la frase.

Sin embargo nuestras frases no apareceran en nuestro corpus, es aquí que los 2-gram tienen sentido y añadiendo un simbolo al principio de la frase y al final tal que: **P(hoy|<\\s>)** y **P(<\/s>|hoy)** con estos simbolos los modelos pueden estimar la probabilidad de frases completas teniendo en cuenta la probabilidad de que la frase **comience** con una palabra determinada y tambien **termine** con una palabra determinada.

### Matriz de recuento (count matrix)
