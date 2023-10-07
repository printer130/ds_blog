---
title: 'Analisis de codigo '
description: ''
pubDate: 'May 12 2023'
heroImage: ''
slug: 'android/static_code_analysis'
---

## Analisis de codigo Estatico

Para las apps android se empieza enumerando los componentes exportados que no esten muy protegidos y rastreando _intents_ y _extas_ a travez de la app.

Esto se hace revisando el archivo _AndroidManifest.xml_ ahi estan definidos los _intents_ y _extras_ que son aceptados como input por nuestras apps de otras apps en el dispositivo, tambien define el comportamiento del _WebView_, _file storage_ y que componentes son expuestos a ataques.

### SQLI

Revisar los proveedores de [contenido](https://developer.android.com/guide/topics/providers/content-provider-basics) tambien es un a buena opcion _strings classes.dex | grep 'content://'_.

Es importante notar que estas vulnerabilidades son manifestadas en el Content Provider en las apps Android

### Directory traversal

Si la app permite leer archivos sin permisos especificos otras apps pueden explotar esta vulnerabilidad.

### Vulnerable Activities

Si una _activitiy_ en el xml no tiene seteado los permisos, esto permite a cualquier app enviar un _intent_ a esta app y generar esta _activity_

```java
...
...
Intent intentMessage = new Intent();

intentMessage.putExtra("SECRET", secret);

setResult(3, intentMessage);
// log.v("SUCCESS", intentMessage.getStringExtra("SECRET"));
finish();

```

### Vulnerable Receivers

El receiver no tiene permisos seteado

```
<receiver android:name='.VulnerableReceiver'>
<intent-filter>
  <action android:name="com.elearnsecurity.vulnerablereceiver.CHANGEPASSWORD">
<intent-filter>
```

### Shared Preferences

Una manera de almacenar datos localmente, para almacenar los pares clave-valor de las preferencias de la aplicación esta en _/data/data/package_name/shared_prefs_ , solo la app que creo los archivos puede acceder

### Local Databases

Muchas apps almacenan su informacion usando archivos de base de datos, _/databases_ subdirectorio del folder padre de la app, para interactuar podemos usar _sqlite3_ que esta en _/system/xbin_

### Herramientas

- QARK
- adb
- Drozer

## Analisis de codigo dinamico

Es el proceso por el cual el codigo es revisado por vulnerabilidades y ejecutando partes o todo el codigo.

### ADB

Consiste en 3 componentes una server, cliente y un daemon, mietras que el cliente y el server corren en tu computadora el daemon corre en el dispositivo o emulador.

```bash
# lista de comandos utiles
adb devices
adb shell
pm list packages
pm path <package name>

# activity manager
am start
am startservice
# am startservice -m com.tatak.sillyservice/.SIll
am broadcast

```

_Herramientas_

- Busybox
