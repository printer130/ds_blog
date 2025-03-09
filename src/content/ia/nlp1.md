---
title: 'NLP 1: Introducción al NLP'
description: ''
pubDate: 'Nov 08 2022'
heroImage: '/placeholder-hero.jpg'
url: '/ia'
---

## ¿Qué es el NLP?

Transforma información no estructurada procedente de lenguaje natural en información estructurada.

Los Procesadores de lenguaje están basados en Teoría de Autómatas y Lenguajes Formales, sencillamente recopilando sus reglas lógicas y codificarlas para obtener un Procesador de lenguaje. No requiriendo IA.

## Objetivos y arquitectura básica de un NLP

1. Un objetivo es comprender el lenguaje natural (NLU-Natural Languaje Understanding).

Usa la sintaxis referenciando la estructura gramatical de la oración, y la semántica como estudiar el significado de cada una de sus palabras. Tratando de encontrar entidades reconocibles y las relaciones que en el texto se establecen entre ellas, igual que los humanos.

2. Otro objetivo es generar contenido en lenaguaje natural (NLG)

Deben comprender la sintaxis y semántica del lenguaje, para así poder planificar los textos y oraciones que se generan en base a la entrada dada.

En NLP actual tiene esta serie de objetivos:

1. _Preprocesado del texto:_ Previo procesado del texto para poder trabajarlo.
2. _Parts of Speech tagging (POS):_ Trata de clasificar la sintáctica de las palabras (nombre,verbo,adverbio,preposición,conjunción), para analizar el significado semántico de la frase.
3. _Vectorización, Word Embedding:_ Convierte las palabras de un corpus en un conjunto de vectores formados por números reales, genera un espacio vectorial numérico que represente las palabras, para luego analizarlos gramaticalmente, sintácticamente, de contenido o semántico.
4. _Autocorrección y autocompletado:_ Detectan errores de escritura para ayudar las personas.
5. _Identificación de lengua:_ Reconoce el idioma del input.
6. _Named Entity Recognition (NER):_ Clasifica las palabras de nuestro corpus que pertenezcan a alguna de las entidades para las que ha sido entrenado(ybicación,nombre,hora,divisa).
7. _Análisis de sentimientos:_ Identifican cualidades subjetivas(tono, emocion,ironía, confusión,duda).
8. _Traducción automática:_ Convierten el texto a otro lenguaje manteniendo el significado y sintaxis.
9. _Word Sense Disambiguation (WSD):_ Métodos para desambiguar el significado de una palabra porque pueden tener varios significados.
10. _Correferencia o coindexación:_ Es un fenómeno en el que en una oración se hace referencia a una entidad que ha aparecido previamente en la misma, y así no perder el significado de las oraciones.
11. _Resumen de documentos y descubrimiento de temas(Topic Discovery):_ No tratan de resumir el texto en lenguaje natural, sino extraer una serie de temas que se han tratado en el texto.

## Antecedentes del NLP

En 1957, siete años después de que Alan Turing propusiera su test, Noam Chomsky identificó un reto clave para los sistemas que buscaban superarlo. En su obra _Estructuras sintácticas_, demostró que las frases gramaticalmente correctas pero sin sentido representan un problema fundamental. Sostuvo que la sintaxis (estructura gramatical) y la semántica (significado de las palabras) son independientes, permitiendo analizar una gramática desde una perspectiva sintáctica sin que la semántica afecte la calidad de la teoría.

A partir de esta publicación, el campo del NLP se dividió en dos corrientes:

1. **Simbólicos**

Intentaban generar algoritmos basados en gramáticas formales y reglas definidas. Algunos hitos clave incluyen:

- **Experimento de Georgetown**: Primera traducción automática de ruso a inglés.
- **ELIZA**: Primer chatbot basado en reglas.
- **ALPAC (1966)**: Concluyó que la traducción automática era inviable en ese momento.
- **Ontologías conceptuales (años 70)**: Intento de formalizar el conocimiento humano y la semántica dentro del lenguaje natural.
- **Algoritmo de Lesk**: Buscaba desambiguar palabras en un contexto.

A pesar de estos avances, los enfoques simbólicos no lograron resolver completamente el problema del NLP.

2. **Estocásticos**

Basados en estadística y _Machine Learning_, esta corriente se impuso con el avance del cómputo. Se utilizaron grandes volúmenes de texto, como documentos oficiales de países multilingües, donde las frases estaban naturalmente relacionadas. Este enfoque permitió avances significativos en la traducción automática y el procesamiento del lenguaje natural.
