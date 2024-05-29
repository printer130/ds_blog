---
title: 'Técnicas de phishing'
description: ''
pubDate: 'May 12 2023'
slug: 'social-eng-attack-vectors/phishing_techniques'
---

<h2>CSRF y Open Redirect</h2>

[caso estudio](https://www.seancassidy.me/), vamos a localizar un open redirect usado en la web para nuestra campaña de phishing como "feature"/vulnerability en google.

Para aprovecharnos de esta vulnerabilidad de google:

- Creamos un dir <i>\_ah</i> en nuestro dominio y dentro un dir <i>conflogin</i>

- Colocamos nuestra pagina de phishing dentro de <i>conflogin</i> en <i>index.html o index.php</i>

- Enviamos el siguiente enlace a nuestro objetivo <i>https://accounts.google.com/ServiceLogin?continue=https%3A%2F%2Fappengine.google.com%2F_ah%2Fconflogin%3Fcontinue%3Dhttps%3A%2F%2Fattacker.domain%2F&service=ah</i>

Despues de poner sus credenciales como de costumbre se redirigira a nuestra pagina, luego podemos recolectar credenciales, servir un HTA malicioso o usar BeEF

<h2>Creación de formularios de redireccionamiento confiables</h2>

Si quisiéramos ir a por los usuarios de PayPal:

- Correr tan pronto como el formulario HTML este cargado

- Interceptar todas las peticiones hechas a Paypal

- Routear todas las peticiones a un servidor remoto bajo nuestro control miestras su navegador intenta comunicarse con la pagina oficial de PayPal

Entendiendo programaticamente:

- [capture_redirect.js](https://gist.github.com/anonymous/3bf8342c76eba4da3f660cbffa24f5d8)

- [PayPal phishing HTML form](https://gist.github.com/anonymous/75b5eb6578bbc5bfcabe44e8fbb952ea)

- [jquery.ba-hashchange.min.js](https://gist.github.com/anonymous/950a70cdebd3e78b6e88312fa7d93250)

<h2>Técnicas de suplantación de URL</h2>

Los <mediatype> son una de las tipos de media de MIME descrito en RFC 2046. Fueron creadas originalmente para email pero tambien son usadas para describir todo el contenido de internet.

[El procedimiento empiza por una landing page](https://gist.githubusercontent.com/anonymous/907cc8e9dcc43c6a4412e682e5d5c2cd/raw/1e370d920c462b993b2ee467ecfe671a29d0408f/gistfile1.txt). Esta parte puede ser <i>data:text/html;base64,[base64 encoded HTML source]</i> luego podemos aplicar tres capas de ofuscación para la [primera capa](http://www.webtoolhub.com/tn561359-html-encrypter.aspx) para la [segunda capa](http://javascriptobfuscator.com/) para la [tercera capa](https://gist.github.com/anonymous/315be2adc72603005d7c7b176c163ed7) usaremos una encriptacion AES, finalmente ponemos el AES encriptado a la variable <i>to_aes_decrypt</i> del siguiente HTML, [este HTML](https://gist.github.com/anonymous/e749f1b8fcbdb08b9d709eb1df8b9575) es el que enviaremos a nuestro objetivo.

Aqui hay una lista de tecnicas de ofuscacion para buscarlas en google:

- Dotless IP addresses and URL Obfuscation

- Out of Character: Use of Punycode and Homoglyph Attacks to Obfuscate URLs for Phishing

- How to Obscure Any URL

- Bypassing the patch to continue spoofing the address bar and the Malware Warning (IE)

- Unicode Domains are bad

- Phishing with Unicode Domains

<h2>Casos de uso BeEF</h2>

xss + sameorigin + autocomplete = admin credentials

xss -> CSRF bypass -> Admin level access

https://gist.github.com/anonymous/1b369a11090f1991d88356578fc58b61

https://gist.github.com/anonymous/ba135bd318b49224707f1fcad5826714

<h2>Mimicking DYRE banking trojan’s spread method</h2>

https://www.xorrior.com/phishing-on-the-inside/

---

https://www.mail-tester.com/not-received?id=test-9shjmef5h

---

https://github.com/outflanknl/Scripts/blob/master/shellcode_to_sylk.py
