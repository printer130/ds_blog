---
title: 'Certificado'
description: 'Trafico de redes'
pubDate: 'Sep 14 2023'
heroImage: ''
slug: 'android/certificado'
---

### Validacion del certificado

Es depende del CA(Certificate authority, es como el notario pero no todos son confiables) verificar la identidad de la persona que esta haciendo request del firmado y autorizarlo al representante digital referido en el CSR

**¿Que es CSR?**

- Antes de poder pedir un certificado SSL, debe generar primero un CSR (Certificate Signing Request) para el servidor. La CSR es un cuerpo de texto cifrado. Su CSR contendrá información codificada específica para su compañía y el nombre de dominio, información que se conoce como un nombre completo o DN.

Una vez que el proceso de firmado esta completo y el requestor recive el certificado firmado, pueden empezar a presentar el certificado a los clientes de software que soliciten la verificacion de su identidad.

El proceso de firmado implica que el CA firma la llave publica de la organizacion con su propio certificado firmado de llave privada

Cuando una pieza del software cliente TLS necesita verificar el certificado algunas cosas deben ser verificadas como: la identidad que figura en el certificado coincida con el nombre de host dns solicitado por el cliente de red

**Exploit**

para explotar la falta de validación del hsotname, el atacante necesita tener primero una CA en la que confíe el dispositivo, que firme un certificado generado por el atacante. Dado que pueden especificar cualquier nombre de host en el CSR que envían a la CA, ésta no tendría motivos para negarse a firmarlo.

El atacante puede teoricamente registrar el dominio malicius.com, y demostrar que es de su propiedad y la CA firmaría legítimamente el certificado.

Si no es validado por el CA, el atacante puede hacer y firmar su propio certificado, porque no es necesario usar un CA, y especialmente no necesitamos considerar que CAs son confiables por el dispositivo, literalmente no hay barreras para ser explotadas.

### Proxy certificado

Mientras tenga el dominio incorrecto en el campo de burpsuite, cualquier tráfico https que vea, para un dominio, distinto del especificado, es el resultado de que la aplicación no ha validado el nombre de host en el certificado.

### Pinning certificado

Multiples certificados pueden ser publicados por un dominio simultaneamente, tambien es posible que estos certificados puedan ser publicados por multiples CA.

**Pinning** es un mecanismo en el cual la app configura solo los certificados confiables o un set especifico de certificados publicos o emisores.

Debido a la forma en que funcionan las actualizaciones de aplicaciones en Android, si su clave privada se viera comprometida, sería difícil actualizar todos sus clientes de forma segura, necesitaras rotar los certificados correspondientes y llaves publicas en tus servidores. Esto romperia el anclaje a tus apps causando que los usuarios no puedan conectarse.

Para mitigar este caso seria bueno tener una lista de llaves publicas o certificados en la app, luego si el caso de ser comprometidas la actualizacion removerian la llave de la lista.

La llave a esta estrategia es asegurarse tener un back-up de llaves o certificados y bien protegidos cuando no esten en uso.

Esto incluiria almacenarlas de forma off-line en un (air-gapped)[https://en.wikipedia.org/wiki/Air_gap_(networking)] hasta que sean necesitadas.
