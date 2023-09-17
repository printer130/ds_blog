---
title: 'Reversing APKs'
description: 'Me escuese el culo'
pubDate: 'Sep 14 2023'
heroImage: ''
slug: 'android/rev'
---

1. [APKTool](#apktool)
2. [Dex2jar](#dex2jar)
3. [JD-Gui](#jd-gui)
4. [Smali-Backsmali](#smalibaksmali)
5. [Obfuscation](#obfuscation)
6. [Additional APK Contents](#additional-apk-contents)
7. [Hardware Optimization](#hardware-optimization)
8. [OEM Apps](#oem-apps)

### APKTool

Descargar esta herramienta usada para [reversing](https://apktool.org/)

```powershell
# Crea los arvhivos respectivos del binario, Proceso de decoding
# En el codigo fuente es seguido encontrar muchos archivos AndroidManifest.xml en vez de uno que son combinados en uno al final del APK, hacer reversing a la app final  es mejor para examinar el archivo AndroidManifest.xml
java -jar apktool_2.4.4.jar d example.apk
```

### Dex2jar

La herramienta [dex2jar](https://github.com/pxb1988/dex2jar) es usado para trabajar archivos <i>.dex</i> y <i>.class</i> para nuestro proposito de convertir classes.dex a archivos .jar

```powershell
# Obtenemos codigo similar al original
d2-dex2jar.sh ../example.apk -o output_file.jar
# convertimos classes.dex a .jar y lo abrimos con JD-GUI
d2-dex2jar.sh classes.dex

```

### JD-Gui

[JD-Gui](https://java-decompiler.github.io/) es una herramienta capaz de decompilar código jar y navegar a travez del código fuente de archivos .class.

Luego abrimos el .jar creado <i>output_file.jar</i>

### Smali/Baksmali

**Smali** y **baksmali** estan referenciados como a bytecode disassembler y assembler, lenguaje ensamblador
Para android, el bytecode esta en formato .dex cuando desassembled por baksmali produce un lenguaje ensamblador que es común referenciado como **smali code**

```powershell
# Para disassemble un archivo .dex pordemos usar:
java -jar baksmali-2.9.4.jar classes.dex
#con smali podemos hacer reverse, coje código smali y crea un archivo .dex, combinando ambos nos permite desmontar una app, modificarla y luego montarla de nuevo, ojo que la firma no sera igual
java -jar smale-2.9.4.jar source/

# Para instalar una app
adb.exe install your_drive:\path_of_extracted_zip\LocatingSecrets\app\build\outputs\apk\app-debug.apk

# DECODE AND DECOMPILE la app
apktool d your_drive:\path_of_extracted_zip\LocatingSecrets\app\build\outputs\apk\app-debug.apk

# decompilar la app y buscar info
d2j-dex2jar.bat your_drive:\path_of_extracted_zip\LocatingSecrets\app\build\outputs\apk\app-debug.apk –o out_LocatingSecrets.jar

```

### Obfuscation

Es el proceso para hacer que el código sea mas dificil de leer, mientras lo hace que sea mas dificil reversing la app no garantiza ninguna seguridad contra determinados metodos de reversing.

### Additional APK Contents

El resultado de apktool puede variar dependiendo la app algunos directorios comunes son:

- original
- smali
- apktool.yml
- unknown

### Hardware optimization

Algunas veces cuando haces reverse de una app no vas a encontrar classes.dex, si la app es una app pre-instalada es probable encontrar archivos .odex, que es especifico de tu plataforma.

```powershell
# Para prevenir que clases.dex sea desmontado
java -jar apktool_2.0.3.jar d test.apk -s
```

### OEM Apps

Hay 3 fuentes para aplicaciones pre-instaladas.

- Enviado con AOSP (Android Open Source Project) ROM
- Agregado por el fabricante de tu dispositivo (OEM - Original Equipment Manufacturer)
- Añadido por el proveedor de télefono, si el dispositivo fue comprado de ellos

Estas son las apps mas vulnerables porque en la mayoria de los casos corren como root
