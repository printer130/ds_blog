---
title: 'Fundamento de entrega de mail y macros'
description: ''
pubDate: 'May 12 2023'
slug: 'social-eng-attack-vectors/email_delivery_and_macros'
---

Los ataques de phishing son usados por cibercriminales como las naciones estado

Existe un concepto erroneo sobre el phishing que es fácil de implementar y no requiere preparación.

Sin embargo existen numerosos estandares de seguridad de fortificar la entrega y prevenir suplantación de mensajes. Pero para nosotros como hackers estos estandares pueden ser traspasados.

## Entrega de mail

### Marco normativo del remitente (SPF)

Cuando enviamos un MAIL FROM en la línea de comandos, reclamamos que el mensaje es de la direccion que hemos proporcionado. El protocolo SMTP no tiene una manera de verificar este reclamo.

Cuando SPF es utilizado e intentamos transmitir un mensaje a travez del servidor de correo, el servidor de correo va a estar en la posicion de verificar el SPF registro del dominio que estamos afirmando del mensaje.

Si un registro del SPF existe y nuestro ip no esta incluido en el registro, hay chances que el servidor de mail deniegue nuestro mensaje.

SPF no verifica la cabezera del mensaje.

Para ver el registro SPF para un dominio:

```bash
dig +short TXT domain.com
```

### Correo identificado DomainKeys (DKIM)

SPF no puede verificar el contenido del mensaje sin embargo DKIM es un estandar para tal propocito. Este es utilizado para firmar un mensaje y su contenido así otros pueden confirmar que se origino de ese servidor.

Para el proceso de firmado la cabezera DKIM-Signature es usada.

Un mensaje que carezca de la cabecera DKIM-signature específica del dominio se marca como algo sospechoso.

Para ver el registro DKIM

```bash
# dig selector._domainkey.domain.com TXT
dig dkim._domainkey.twitter.com TXT
```

### DMARC

Es un estandar que habilita al dueño del dominio a realizar:

- Anunciar el uso de DKIM y SPF

- Avisar a otros servidores de mail sus acciones en caso de que un mensaje falle su registro

Para ver si un domino usa DMARC:

```bash
dig +short TXT _dmarc.domain.com
```

### Dominios aceptados

Si un servidor de mail no revisa el SPF, DKIM y DMARC y actuan contra estas medidas, los usuarios quedan expuestos a ataques de suplantación (spoofing).

### Trampas de spam

Aquí hay una una lista de componentes que son consideradas a la hora de recibir un correo y evaluadas:

- Domain's age
- Links pointing to IP addresses
- Link manipulation techniques
- Suspicious (uncommon) attachments
- Broken email content
- Values used that are different to those of the mail headers
- Existence of a valid and trusted SSL certificate
- Submission of the page to web content filtering sites

### Eludiendo defensas

Para suplantar un mensaje de otro dominio:

- Revisar si el dominio tiene un registro SPF, DKIM o DMARC
- Enviar un mensaje a un usuario no existente y analizar el aviso de no-entrega en las cabezeras
- Si suplantar no es una opcion, entonces registramos un dominio que se ajuste a tu campaña de ingenieria social y ajustar los registros SPF, DKIM y DMARC para tu dominio

## Fundamentos de MACROS

### Documentos

Al abrir un archivo xml windows validara la data antes de abrir el archivo, esta validacion esta realizada en la forma de identificacion de una estructura de datos contra el standard OfficeOpen XML.

La validacion es realizada por el componente MS Office's WWWLIB.DLL, la extension del archivo no juega ningun rol en este proceso de validacion de data.

Por ejemplo un archivo RTF no soporta macros, por el diseño, pero un DOCM renombrado a RTF va ser manejado por Microsoft Word y ejecutara la macro, el mismo mecanismo aplica a (PowerPoint, Excel, etc.).

El siguiente comando ve que archivos estan asociados con programas de Office y encuentra extensiones disponibles para ejecutar macros (no provee la lista entera)

```bash
assoc | findstr /i 'word'
assoc | findstr /i 'excel'
assoc | findstr /i 'powerp'
```

Los macros no pueden ser embebidos con archivos word por defecto. Esto fue facilitado por el estandar XML de OfficeOpen, basado en que Microsoft introdujo cuatro distintos tipos de formatos.

| Extension | Tipo                | Macros |
| --------- | ------------------- | ------ |
| DOCX      | doc comprimido      | no     |
| DOTX      | template comprimido | no     |
| DOCM      | doc comprimido      | si     |
| DOTM      | template comprimido | si     |

Archivos DOCX pueden referenciar a extensiones que ejecuten macros.

Por ejemplo con un archivo DOCX podemos referenciar templates remotos siguiendo:

File - Options - Add-ins - Manage: Templates - Go
