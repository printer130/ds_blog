---
title: 'Las expresiones regulares y la segmentación de palabras y frases'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

Los primeros agentes conversacionales estaban basados en regex, ejecutados a lo largo de un corpus y observando los resultados

## ¿Qué es una palabra?

Una palabra es todo conjunto de caracteres rodeado por espacios o signos de puntación, pero cuando trabajamos con transcipciones de conversaciones humanas tenemos:

"Ehhh bueno, yo vivo en en sidney y esto... no no me llega a convencer la cantidad de gente que hay"

A la hora de analizar palabras tenemos:

- _Tipos:_ El número de tipos de palabras es la cantidad de palabras diferentes que encontramos en un texto.
- _Tokens:_ El número total de palabras que encontramos en un texto.

La tokenización consiste en encontrar todas las palabras (que cumplan con nuetra definición de palabra como dev del sistema) y el análisis de tipos de encontrar el conjunto de palabras únicas que se emplean en un texto.

### Normalización del texto

Facilita el proceso posterior de nuestros algoritmos encontrando componentes de nuestro texto y aplicandoles una serie de procesos que nos permitan obtener una salida homogénea.

1. Tokenización
2. Normalización del formato de las palabras
3. Segmentación de frases y oraciones

### Tokenización

Es el proceso de encontrar los elementos básicos individiales de un texto, habitualmente las palabras.

Por ejemplo para la frase "Ninguna ciencia, en cianto a ciencia,engañá;el engaño está en quien no la sabe" si usamos el criterio de separar por espacios y puntuaciónes, tenemos 15 tokens en total cada uno en una fila

Esta lógica formal que persigue tokenizar palabras en cualquier idioma tiene por ejemplo este problema de los apóstrofes:

```bash
you're young -> you are young
J'aime le gateau -> Je aime le gateau
```

Uno de los algoritmos de tokenización es Penn Treebank que usa regex por su precisión y rapidez siendo simbólicos y no estadísticos por motivos de eficiencia, pero también están los basados en ML para tokenizar texto.

El español requiere mayor esfuerzo que el inglés o frances.

Los modelos puede que no sepan todas las palabras de un idioma, por lo que debemos encontrar una forma de detectar palabras que nuestros modelos no hayan procesado previamente y tokenizarlas aquí entra el concepto de _subword_ que permite detectar palabras que no han sido nunca procesadas.

Un algoritmo conocido para este fin es el _byte-pair encoding (BPE)_ de 2016, segmenta cada caracter y analiza aquellos que aparecen uno junto al otro la mayor parte de las veces. Una vez detectadas estas estructuras, sustituye estos dos tokens por el token construido por el conjunto de dos caracteres. Repitiendose hasta alcanzar a el parametro _k_.

```bash
# corpus:
escribir, estructura, partir, partición, dormir
# BPE toma todos los caracteres como vocavulario
e,s,c,r,i,b,t,u,a,p,o,d,m
# luego busca los que mas se repiten en el corpus y lo añade al vocavulario
e,s,c,r,i,b,t,u,a,p,o,d,m,ir_
# el segundo conjunto es 'es':
e,s,c,r,i,b,t,u,a,p,o,d,m,ir_, \_es
# y el corpus seria(representa salto de linea · ):
_es·c·r·i·b·ir_·,·_es·t·r·u·c·t·u·r·a·,·p·a·r·t·ir_,·p·a·r·t·i·c·i·ó·n·,·d·o·r·m·ir_
# iterando k, encontrara "_part"
e,s,c,r,i,b,t,u,a,p,o,d,m,ir_, \_es, _part

# nuestro corpus quedaria
_es·c·r·i·b·ir_·,·_es·t·r·u·c·t·u·r·a·,_part·ir_,·_part·i·c·i·ó·n·,·d·o·r·m·ir_
```

---

### Normalización del Formato de las Palabras en NLP

En el procesamiento de lenguaje natural (NLP), una misma palabra puede representarse de diferentes formas: `"monitor"`, `"Monitor"`, `"MONITOR"`. Un tokenizador ingenuo trataría cada una como un token distinto, lo que afecta la eficiencia del modelo. Para evitar esto, se aplica el **case folding**, que convierte todas las palabras a minúsculas.

Sin embargo, esta técnica no es suficiente en todos los casos. Por ejemplo, en un corpus podemos encontrar: `"democracia"`, `"democrático"`, `"demócrata"`. Dependiendo del caso de uso, puede ser conveniente unificar todos estos términos bajo un único token, como `"democracia"`. Aquí es donde entra en juego el **stemming**.

**Stemming: Raíces de las Palabras**

El stemming es un método basado en heurísticas que elimina las terminaciones derivativas más comunes para obtener la raíz de una palabra. Algunas de sus características clave son:

- Se basa en reglas predefinidas del idioma.
- No garantiza raíces lingüísticamente correctas, sino recortes funcionales.
- Su precisión depende del diseño del algoritmo y del idioma tratado.

El **stemming** funciona bien cuando los tokens comparten una misma raíz visible, pero tiene limitaciones. Por ejemplo, un stemmer no identificaría que `"fui"`, `"irán"` y `"vamos"` derivan del verbo `"ir"`. Para estos casos se utiliza una técnica más avanzada: la **lematización**.

**Lematización: Análisis Morfológico Avanzado**

A diferencia del stemming, la **lematización** no solo recorta palabras, sino que analiza su estructura morfológica y significado gramatical. Esto permite identificar correctamente las formas derivadas de una palabra.

Por ejemplo, en la palabra `"submarino"` se pueden identificar tres morfemas:

- **"sub-"** (prefijo: debajo de).
- **"mar"** (raíz: hace referencia al mar).
- **"-ino"** (sufijo: perteneciente a).

Para lograr esto, los algoritmos de lematización utilizan bases de datos lingüísticas y modelos estadísticos, analizando grandes volúmenes de texto para identificar patrones y estructuras comunes.

El stemming es más rápido pero menos preciso, la lematización ofrece una mayor exactitud a costa de mayor complejidad computacional.

La elección entre ambos métodos dependerá de las necesidades del proyecto y de los recursos disponibles. 🚀

### Segmentación de frases y oraciones
