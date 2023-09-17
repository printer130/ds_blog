---
title: 'Fundamentales'
description: 'Apps android fundamentals'
pubDate: 'Sep 14 2023'
heroImage: ''
slug: 'android/fundamentals'
---

1. [Intents](#intents)
2. [Implicit Intents](#implicit-intents)

### Intents

Son medios de comunicación para las apps android entre componentes y otras apps.

Estos mensajes también pueden cargart datos como las peticiónes GET y POST de HTTP

Es comunmente usado para invokar una serie de acciones

### Implicit Intents

Especifica una action a tomar y permiten a cualquier app recibir y procesar la **intent**

Una action es un string que especifica una accion a realizar
descrito por su configuración

Estan especificados por una ACTION_X donde X describe una accion a realizar como VIEW o SEND

```java
Intent email = new Intent(Intent.ACTION_SEND, Uri.parse("mailto:"));

```

Esta accion es necesario que tenga un componente en el manifest.xml que machee nuestra accion

El destinatario de un implicit intent no esta especificado por el envio de solicitud, quiere decir que puede ser robado por una applicación maliciosa :)

El proceso de **intent resolution** es usado para ver que apps son capaces de manejar en intent basado en category, action y type

Tambien considera la prioridad de los atributos que van hacer especificados en el intent-filter para un componente.

La app con mayor prioridad sera seleccionada si encuentra multiples matches

**Una vulnerabilidad en 2013** permitia a los ladrones completar compras sin recargar ningun dinero. Los ladrones construinar una app que macheara la Play Billing Library's intent-filter, y especificarian una mayor o igual prioridad.
