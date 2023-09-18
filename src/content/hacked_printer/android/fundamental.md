---
title: 'Fundamentales'
description: 'Apps android fundamentals'
pubDate: 'Sep 14 2023'
heroImage: ''
slug: 'android/fundamentals'
---

1. [Intents](#intents)
2. [Implicit Intents](#implicit-intents)
3. [Explicit Intents](#Explicit-intents)
4. [Deep Links](#Deep-Links)

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

### Explicit Intents

Especifica el nombre de la clase que esta siendo objetivo del intent constructor, así se asegura la app receptora y prevee apps maliciosas que intercepten.

```powershell
Intent downloadIntent = new Intent(this, DownloadService.class);


# Ejemplo
Intent intent = new Intent();
intent.setClassName("com.other.app", "com.other.app.ServiceName");
context.startService(intent);

```

### Broadcast Intents

Pueden ser recibidos por multiples apps, cuando envias broadcast, tomar nota para no filtrar data en el proceso.

- **Normal Broadcasts:** Son asincronas y pueden ser procesadas por multiples apps en cualquier orden o simultaneamente.

- **Ordered Broadcast:** Se ejecutan de uno en uno, por la prioridad definido en el receptor elemento(AndroidManifest.xml).

- **Sticky Broadcasts:** Son similares a Broadcast en que muchas apps pueden recibir data, la diferencia es que el sistema mantiene esos broadcasts, así que pueden ser accedidos despues de que se iniciara el envío, en vez de que sea al instante como en el normal broadcast.

Esta deprecado si auditas y vez metodos como sendStickyBroadcast, sendStickyBroadcastAsUser, etc., hay que tomar medidas de seguridad

- **Pending Intents:** Permite a otras apps tomar accion en nombre de tu app, usando la identidad y permisos de la app

Desarrolladores especifican una accion a realizar si en intent no es explicito, una app maliciosa puede recibir eso y realizar una accion en nombre de la app victima

```java
mPendingIntent = PendingIntent.getBroadcast(this, 0, new Intent(), 0);
// Al crear new Intent vacio se crea un Implicit Intent (Vulnerable)
// así seria correcto
new Intent (SampleAction, SampleUri,this, Example.class);

```

### Deep Links

Permite detonar un Intent via URL, embedded in a website, esto permite pasar datos.

Necesitas configurar AndroidManifest.xml para confirmar la accion, categoria y data en el Deep Link's URL, emparejar con el intent-filter elemento para el componente receptor.

```java
// intent-filter debe incluir una categoria con el siguiente valor
android.intent.category.BROWSABLE
```
