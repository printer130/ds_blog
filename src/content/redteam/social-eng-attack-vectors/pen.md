---
title: ''
description: ''
pubDate: 'May 12 2023'
slug: 'master'
---

Existen cinco tipos de ataques a las contraseñas:

1. Ataques no informáticos
   No requieren conocimientos técnicos, y se basan en ingeniería social.

2. Ataques activos / online
   Interactúa de manera directa contra la interfaz de autentificación real. Usando en diccionario, Usando la fuerza bruta, Usando reglas, Adivinando las contraseñas, Contraseñas por defecto, Malware, Bad-USB, Inyección de hash, Falsificación LLMNR/NBT-NS

```bash

# Bad-USB
1. Descargamos la herramienta PassView
2. Copiamos el .exe en el directorio del USB
3. Creamos un fichero de texto, pero que renombramos como autorun.inf
4. En dicho fichero, debe contener:
[autorun]
en=launch.bat
start pspv.exe/stext pspv.txt
5. En cuanto el Usuario inserte el USB, se ejectuará el archivo autorun y, este ejecutará el malware


# Falsificación LLMNR/NBT-NS
#En los sistemas Windows, hay dos resoluciónes de nombres presentes en un mismo segmento de red, y son LLMNR y NBT-NS.
# Cuando la resolución DNS falla, el host envía paquetes UDP sin autenticar en modo broadcast preguntando a todos los hosts de la red si alguien conoce el nombre del host en cuestión. Puesto que dichas peticiones van sin autenticar, un atacante puede responder a dichas peticiones UDP, haciéndose pasar por el host requerido.
#Después de aceptar la petición, el atacante puede apoyarse de herramientas para reenviar la petición a un falso servidor/dominio solicitado para realizar el proceso de autentificación.
# Durante dicho proceso, el atacante adquiere un hash NTLMv2 que viene del host víctima y lo envía servidor falso; el atacante puede ahora, intentar crackear dicho hash usando herramientas como hascat o John the ripper.
```

3. Ataques pasivos / online
   Únicamente escucha y captura el tráfico que es enviado por él.

```bash
# 1. Snifeamos
# 2. MiTM
# 3. Session Replay -> usuarios, contraseñas, se reutiliza o se reinyecta
# 4. Autenticación satisfactoria.
```

4. Ataques offline
   Éste observa como se almacenan en un fichero con permisos de lectura.

```bash
# Ataques a la tabla Rainbow.

# Ataques de red distribuidos.
# .1 Se utiliza para recuperar contraseñas a partir de hashes o ficheros protegidos usando la potencia de cálculo no usada de las máquinas en una red, para descifrar las contraseñas.
```

5. Microsoft

Los OS de Microsoft disponen de tres protocolos para la autentificació de usuarios:

- Bases de datos Security Accounts Manager (SAM).
  Windows obtiene el fichero de registro, durante el proceso de auth. El fichero SAM utiliza una función SYSKEY que encripta parcialmente las contraseñas hash.

- Autentificación NTLM (NT LAN Manager).
  En windows, se apoya en dos protocolos: NTLM y LM y así alamcena y hashea las pass en la SAM.

- Autentificación Kerberos.
  Emplea un centro de distribución de claves,Key Distribution Center (KDC).
