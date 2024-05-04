---
title: ''
description: ''
pubDate: 'May 12 2023'
slug: 'master'
---

## Búsqueda de personas usando redes sociales

cupp y crunch, para crear diccionarios

• Pipl (https://pipl.com/)
• Intelius (https://www.intelius.com/)
• Been Verified (https://www.beenverified.com/)
• Spokeo (https://www.spokeo.com/)

LinkedIn, un atacante puede usar herramientas como InSpy

## Monitorización y alerta

• Google Alerts (https://www.google.es/alerts)
• Twitter Alerts (https://twitter.com/fema/alerts)
• Giga Alert (http://www.gigaalert.com/)
• TalkWalker Alerts (https://www.talkwalker.com/alerts)

## Búsqueda de dispositivos y sistemas operativos

Netcraft (https://www.netcraft.com/)
• Shodan (https://www.shodan.io/). Permite encontrar dispositivos conectados a in-
ternet, tales como router, IoT, servidores, etc.) y, además, incorpora una multitud
de filtros.
• Censys (https://censys.io/). Permite encontrar host y redes alojados a lo largo de
internet. Realiza escaneos -activos- usando Znmap y Zgrab y reporta los resultados
para la consulta, por lo que la no existe interacción con el objetivo (pasivo).

## Footprinting web

• Burp Suite
• Zaproxy
• Paros Proxy
• Website Informer
• Firebug
Simplemente observado las cabeceras de los paquetes HTML se pude obtener informa-
ción como estado de la conexión y content-type, los Accept-Ranges y Last-Modified, la
información X-Powered y versión del servidor web.

### Mirroring: copiar la web e análisarla offline

• HTTrack Web Site Copier (https://www.httrack.com/)
• NCollector Studio (http://www.calluna-software.com/)
• GNU Wget (https://www.gnu.org/software/wget/)
• Pavuk (http://www.pavuk.org/)

### Crawler and spiders

• Web Data Extractor (http://www.webextractor.com/)
• SpiderFoot (http://www.spiderfoot.net/)
• Scrapy (https://scrapy.org/)
• Visual SEO Studio (https://visual-seo.com/)
• WildShark SEO Spider Tool (https://wildshark.co.uk/spider-tool/)
• Beam Us Up SEO Spider SEO (http://beamusup.com/)

• https://archive.org/ -> ver versiones antiguas que ya no estan online

Por otro lado, el atacante puede querer que se le notifique cuando el contenido web de
una organización cambie, para ellos podemos definir alertas, usando, por ejemplo, las herramientas:

• WebSite Watcher (https://www.aignes.com/)
• Visual Ping (https://visualping.io/)
• Follow That Page (https://www.followthatpage.com/)
• WatchThatPage (http://www.watchthatpage.com/)

## Extracción de información a través de metadatos

• Metagoofil (https://tools.kali.org/information-gathering/metagoofil)
• FOCA (https://www.elevenpaths.com/es/labstools/foca-2/index.html)
• Exiftool (https://www.sno.phy.queensu.ca/~phil/exiftool/)
• ExtracMetadata (https://www.extractmetadata.com/es.html)

## Seguimiento comunicaciones email

• eMailTrackerPro (http://www.emailtrackerpro.com/)
• Yesware (https://www.yesware.com/)
• ContactMonkey (https://www.contactmonkey.com/)
• PoliteMail (https://politemail.com/)
• Trace Email (https://whatismyipaddress.com/trace-email)
• Email Lookup – Free Email Tracker (https://www.ip2location.com/free/email-tracer)

## Inteligencia competitiva

El proceso de generar esa inteligencia competitiva pasar por resolver las siguientes preguntas:
• ¿Cómo empezó?
• ¿Cómo han desarrollado su producto?
• ¿Quién lo dirige?
• ¿Dónde está situados?

Respuestas:
• EDGAR Database (https://www.sec.gov/edgar.shtml)
• Hoovers (http://www.hoovers.com/)
• LexisNexis (https://www.lexisnexis.com/en-us/gateway.page)
• Business Wire (https://www.businesswire.com/portal/site/home/)
• FACTIVA (https://www.dowjones.com/products/factiva/)

cuáles son los planes a futuro de la compañia
• MarketWatch (https://www.marketwatch.com/)
• The Wall Street Transcript (https://www.twst.com/)
• Alexa (https://www.alexa.com/)
• Euromonitor (https://www.euromonitor.com/)

opinión de expertos acerca de la compañía
• Copernic Tracker (http://www.copernic.com/en/products/tracker/)
• SEMrush (https://www.semrush.com/)
• AttentionMeter (http://www.attentionmeter.com/)
• ABI/INFORM Global (https://www.proquest.com/products-services/abi_inform_global.html)
• SimilarWeb (https://www.similarweb.com/)

## Monitorización del tráfico y reputación

• Web-Stat (https://www.web-stat.com/)
• Alexa (https://www.alexa.com/)
• Monitis (https://www.monitis.com/)

http://cochabamba.bo.prostats.org/

reputación online de cierta empresa (ORM):
• Trackur (http://www.trackur.com/)
• Brand24 (https://brand24.com/)
• Social Mention (http://socialmention.com/)
• Rankur (https://rankur.com/)

## Geo-localizar dicha información de whois

https://www.ip2location.com/demo/189.28.81.28
• IP Location Finder (https://www.iplocation.net/)
• IP Address Geographical Location Finder (https://www.ipfingerprints.com/)
• IP Location (https://www.iplocation.net/)
• GeoIP Lookup Tool (https://www.ultratools.com/tools/geoIp)

## Extraer información de los DNS

• DNS Stuff(https://dnsdumpster.com)
• DNS Stuff (https://www.dnsstuff.com/)
• DIG (http://www.kloth.net/services/dig.php)
• myDNSTools (http://www.mydnstools.info/)
• Domain Dossier (https://centralops.net/co/)
• DNSDataView (https://www.nirsoft.net/)
• Domains Tools (https://www.domaintools.com/)
• Fierce (https://tools.kali.org/information-gathering/fierce)

## Localización de los rangos de red

Usando la aplicación web que conecta con el servicio de la base de datos American Registry for Internet Numbers (ARIN), se puede consultar el rango de IPs a partir del Regional Internet Registry (RIR) de, por ejemplo, Microsoft, en: https://www.arin.net/knowledge/rirs.html

Otra opción interesante, son las herramientas que implementan traceroute; que, usando el campo Time To Live (TTL) en las cabeceras de los paquetes ICMP es capaz de determinar los router o saltos que hay entre un origen y un destino. Además, es capaz de determinar si los router intermedios disponen de entradas DNS, el nombre de éstos y su afiliación de red. Incluso también rastrear geolocalizaciones, detectar problemas de red y métricas de rendimiento. Algunas herramientas que implementan el servicio tracerouter son:

• Path Analyzer Pro (https://www.pathanalyzer.com/)
• VisualRoute (http://www.visualroute.com/)
• Magic NetTrace (http://www.tialsoft.com/mnettrace/)
• Traceroute Tool (https://tools.keycdn.com/traceroute)

Ejemplo: Queremos calcular los saltos o router que existe entre la localización actual del atacante y un posible objetivo, Microsoft.

## OSINT

• Maltego (https://www.paterva.com/web7/). Sin lugar a duda, la herramienta de
OSINT más potente
• Recon-ng (https://kali-linux.net/article/recon-ng/). Centrada para el reconoci-
miento en aplicaciones web
• Foca (https://www.elevenpaths.com/es/labstools/foca-2/index.html). Más centra-
da en el ámbito de los metadatos
• Recon-dog (https://github.com/s0md3v/ReconDog)
• OSRFramework (https://tools.kali.org/information-gathering/osrframework). He-
rramienta de OSINT con la particularidad de que incluye la deep web en las bús-
quedas
• Low Hanging Fuit (https://github.com/blindfuzzy/LHF)
• Aquatone (https://github.com/michenriksen/aquatone)
• Reconnoitre (https://github.com/codingo/Reconnoitre)

## Escaneos de red

• Hosts activos, sus IPs y puertos abiertos
• Determinar los sistemas operativos de dichos host y la arquitectura del computa-
dor
• Descubrir los servicios que están corriendo en dichos puertos
• Investigar en vulnerabilidades o fallos en dichos servicios/aplicaciones

El procedimiento sigue el bien conocido protocolo three-way handshake que consiste en que, cuando un cliente quiere establecer una conexión con un servidor (éste está siempre a la espera de conexiones) envía un paquete IP (capa 3) con las IPs origen y destino, encapsulado en un paquete TCP (capa 4) con el bit SYN activo. Cuando el servidor recibe este paquete, le devuelve un paquete TCP con los bits SYN/ACK activos, para que el emisor, una vez recibido este paquete cierre el inicio de conexión con un paquete final, el tercero, con el bit ACK activo. En ese momento ya se puede enviar la información que requiera la aplicación. Además, en el establecimiento se genera un número de secuencia que identifica cada paquete y se debe especificar a qué puerto debe ir dicho paquete y, donde debe estar escuchando el servidor. La conexión se termina cuando cualquiera de las dos partes envía un mensaje con el bit FIN o RST activos y, la otra parte, después de reconocer los paquetes pendientes (ACK activo y número de secuencia) envía también la petición de FIN.

hping que ofrece una funcionalidad similar a nmap, con algunas diferencias, como la de detectar el tamaño de MTU de la red, traceroute avanzado, envío de ficheros usando canales encubiertos, permite encapsular tráfico en otros protocolos, identifica la actividad de la red, permite auditoría de la pila TCP/IP del host destino, etc.

### Escaneo ICMP

```bash
icmpush -vv -tstamp 192.168.0.2

icmpush -vv -rts 192.168.0.2

# -sn (escaneo ping), -PE (ping hecho) y -PA para ACK sobre toda los host de la subred (192.168.0.0/24):
nmap -sn -PE -PA 192.168.0.0/24

```

### Escaneo TCP / full open

```bash
# completa el proceso de three-way handshake.
nmap -sT -v 192.168.0.2
```

### Escaneo Sigiloso / half open

```bash
# reinicia abruptamente la conexión entre cliente y servidor antes de que ésta termine de completar el protocolo de establecimiento de conexión three-way handshake, de ahí, que se denomine semi-abierto porque realmente no termina de establecerse
# bypass las reglas del firewall
# deja menos rastro puesto que la conexión no llega a completarse y, por tanto, no se generan logs
# es capaz de ocultarse dentro del tráfico usual de la red.
nmap -sS -v 192.168.0.3
```

### Escaneo TCP inverso

```bash
# Consiste en enviar paquetes TCP con los flag FIN, URG, PSH activos (alguno de ellos o los tres a la vez, denominado Xmas) o, incluso sin ningún flag activado y, observar cómo responde el servidor. Si éste no responde, implica que el puerto está abierto y, si éste responde con un paquete con el flag RST activo, implicaría que está cerrado. Este escaneo tiene la ventaja de ser capaz de saltar más medidas de protección (reglas firewall, por ejemplo) ya que muchos dispositivos de red, filtrar paquetes con flags SYN, ACK a puertos sensibles o reservados. Este escaneo es ideal para sistemas basados en UNIX ya que este sistema operativo responde a este tipo de paquete, por el contrario, los sistemas Windows, por defecto, no responden (ignoran) estos paquetes.
nmap -sF 192.168.0.34
nmap -sN 192.168.0.34

### Escaneo Xmas esta dentro del TCP inverso

# Envía un paquete TCP al servidor y objetivo con los flags FIN, URG y PUSH activos. Al igual que el anterior, si el puerto está abierto, el sistema no responderá y, si está cerrado, notificará al cliente con un paquete con el bit RST activo. Es una técnica eficiente en el sentido que, con un único paquete el atacante es capaz de determinar si el puerto está abierto o no. Solo funciona con sistemas que cumplen la norma RFC 793 e implementan toda la pila TCP/IP, como los sistemas basados en UNIX.
nmap -sX 192.168.0.34
```

### Escaneo ACK

```bash
# Envia un paquete TCP con el bit ACK activo a un servidor; la respuesta del servidor es RST puesto que no se ha establecido la conexión previamente. Podemos analizar el paquete RST y sus cabeceras, por ejemplo, el valor TTL del paquete de respuesta del servidor es menor que 64, el puerto estará abierto. O, si el valor del campo WINDOW tiene valor distinto de cero, el puerto estará abierto.

nmap -sA -p22 192.168.0.44
```

### Escaneo IDLE/IPID

```bash
# Cada paquete dispone de un número de identificador de fragmento (IPID), los sistemas operativos incrementan el valor IPID por cada paquete enviado y, por tanto, explorando el valor IPID un atacante puede conocer el número de paquetes envidos desde la última sonda
# Si, una máquina recibe un paquete SYS/ACK no solicitado -que no está dentro de una conexión establecida responde con un paquete RST y un paquete RST no solicitado, es ignorado.

#El atacante envía un paquete SYN/ACK a un host zombi (es un host cualquiera de la red) para comprobar su identificador IPID. El host zombi no espera el paquete en cuestión y enviará un paquete RST, descubriendo su IPID.

nmap -sI 192.168.0.4(zombie) 192.168.0.1(target)
```

### Escaneo UDP

```bash
# se puede determinar es si un puerto está cerrado, no abierto. Si esta cerrado respondera (ICMP -de notificación- de tipo port unreachable). Los que no notifiquen con el paquete ICMP es porque estan abiertos
# si hay muchos puertos cerrados, el número de paquetes ICMP en la red puede exceder al escenario TCP, en los sistemas Windows, no tiene limitado la ratio de paquetes ICMP.
nmap -sU 192.168.0.10 -v
```

### Escaneo SSDP

```bash
# Simple Service Discovery trabaja juntamente con UPnP para detectar dispositivos plug and play
# Existen vulnerabilidades derivadas del protocolo UPnP, tipo Buffer Overflow o de DoS. Por tanto, aprovechando este matiz, si la máquina es vulnerable a exploits de UPnP.

service postgresql start
msfconsole
use auxiliary/scanner/upnp/ssdp_msearch
```

### Escaneo Lista

Escaneo de host se basa en lista todas las IPs de una subred y, en lugar de realizar un ping sobre ellos para determinar si están activos o no, lo que se persigue es realizar una resolución DNS inversa para descubrir cuáles de esas IPs tiene un nombre asociado y, por tanto, son hosts existentes y, posiblemente, estén activos.

## Técnicas de evasión

Contrarestar lo anterior mencionado:

- Configurar cortafuegos o sistemas de detección de intrusiones
- Realizar escaneos frente a sus máquinas, para ver qué información sensible de obtiene
- Chequear que todos los protocolos de enrutamiento y reglas de filtrado no se pueden saltar
- Asegurarse que los firmwares de los dispositivos de red estén actualizados
- Usar reglas de filtrado comunes para bloquear el tráfico de red y bloquear puertos no usados
- Filtrar paquetes ICMP en la entrada de los firewalls
- Configurar reglas anti-escanero y anti spoofing

### Fragmentación de paquetes

```bash
nmap -f 12 target
```

### Source Routing

Cambiar la ruta de los paquetes, para ello, envía un paquete al destino especificando una nueva ruta (parcial o total) en la que no incluya su paso por firewall o IDS con el fin de que los paquetes no sean examinados.

### IP decoy

La IP origen -del atacante- cambia en cada escaneo para no levantar sospechas.

### IP Spoofing

IP Spoofing se refiere a cambiar/falsear la IP origen para que, el ataque provenga de una IP diferente de la real.

Técnicas para detectar los ataques de Spoofing:

• Pruebas TTL. Simplemente comprobando el campo TTL del paquete, si el campoTTL del paquete spoofeado que envía el atacante no coincide con el campo TTL de la respuesta de la IP spoofeada, es muy posible que el host que responde no haya enviado la petición inicial y, por tanto, se esté intentando usurpar su IP. Esta
técnica es útil cuando el atacante está en diferente subred.
• Número de identificación IP. Es similar al anterior, pero con el campo ID, simplemente comparando el identificador del paquete inicial (el que envía el atacante) con la respuesta que envía la IP spoofeada, si ambos ID no son “cercanos”, ese tráfico es propenso de ser tráfico spoofeado dentro de un ataque o un posible escaneo. Esta técnica es útil cuando el atacante está en la misma subred.
• Control de flujo TCP. En la misma línea, con esta técnica se comprueba el campo de control de flujo, la ventana de congestión que dispone el protocolo TCP. Puesto que los atacantes no recibirán los paquetes de confirmación, ACK/SYN, el atacante no controlará la ventana de congestión y, por tanto, si el objetivo sigue recibiendo paquetes aún después de que se haya sobrepasado la ventana de congestión es muy probable que estemos en un contexto de paquetes spoofeados.
• Usando comunicaciones cifradas, se evitan los ataques de spoofing, usando protocolos como ssh, TLS, IPSec, HTTPS, etc.
• Introduciendo múltiples firewalls e IDS – lo que se denomina defensa en profundidad, introduciendo varias capas/niveles de protección-
• No usar autentificación basada en IP -claro, esta se puede spoofear- y, usar valores aleatorios de para el número de secuencia IP.
• Controlar, configurar y monitorizar las reglas de tráfico del firewall, tanto del tráfico saliente como entrante. Por ejemplo, revisar que no entren paquetes a la red con IP internas o, evitando que salgan paquetes con IPs que no pertenecen al rango de IPs de la red interna.

### Servidores Proxy

- Es capaz de evadir ciertas restricciones de filtrado de firewall e IDS
- Permite llegar a intranets o web que estaban fuera de los límites
- Oculta la dirección IP origen, puesto que aparecerá como dirección origen, la IP del servidor proxy
- En caso de que la víctima detecte el origen de todas las peticiones y quiera blo quearlas, sólo podrá identificar la IP del servidor proxy
- Permite anonimizar las búsquedas y visitas web
- Además, para hacer más difícil el rastreo se pueden anidar múltiples conexiones proxy entre varios servidores, lo que se denomina proxy chains. La figura siguiente representa este concepto, donde se aprecia como en cada salto las direcciones IP cambian y, además en cada servidor se requiere un proceso de autentificación.

Servidores proxy gratuitos:

- Proxy switcher (https://www.proxyswitcher.com/)
- Proxy workbench (http://proxyworkbench.com/)
- CyberGhost (https://www.cyberghostvpn.com/es_ES/free-proxy)
- Protoport Proxy Chain (http://www.protoport.com/index.proxy)
- Tor (https://www.torproject.org/projects/torbrowser.html.en?)

### Anonimato

Actúa como un proxy y éste elimina la información sensible del usuario como la IP y permite navegación privada y anónima con el tráfico http, FPT y servicios de internet.

Esta técnica permite garantizar la privacidad del contenido visitado, acceder a contenido restringido (por ejemplo, por gobiernos), protegerse frente ataques online e, incluso, ser capaz de evadir firewall e IDS. Existe dos tipos de anonyzers: 1) basados en red (similar a un proxy chains) y 2) single-point (similar a un proxy -único-).

- Alkasir (https://alkasir.com/en/index.html)
- Tails (https://tails.boum.org/)
- Whonix (https://www.whonix.org/)
- I2p (https://geti2p.net/es/)
- TunnelBear (https://www.tunnelbear.com/)

### Banner Grabbing

El objetivo es determinar la versión y arquitectura del sistema operativos, chequear si existen vulnerabilidades para el sistema en cuestión y exploit que pueden actuar frente a dicho sistema. Se pueden realizar de manera activa o pasiva.

## Enumeración

### Enumeración NetBIOS

El nombre NetBIOS es una cadena de texto de 16 caracteres ASCII y se utiliza para identificar dispositivos de red sobre TCP/IP 15 (únicamente en IPv4). De los 16 caracteres, 15 son para identificar el nombre y el último se reserva para tipo. Un atacante, por tanto, puedes listar (enumerar) la relación de computadores que pertenecen a cierto dominio, la lista de recursos compartidos de host en el dominio e, incluso, políticas y contraseñas.

- Hyena (https://www.systemtools.com/hyena/)
- Nsauditor Network Security Auditor (http://www.nsauditor.com/)
- NetScanTool Pro (https://www.netscantools.com/nstpromain.html)
- NetBIOS enumerator (http://nbtenum.sourceforge.net/)

### Enumeración SNMP

Un atacante puede usar esos nombres de comunidad por defecto para extraer información acerca de un dispositivo y los recursos de red, tales como host, routers, etc. e información de red como tablas ARP, tablas de rutas, tráfico, etc.

Un componente esencial de SNMP es la Management Information Base (MIB) que es una base de datos que contiene una descripción formal de todos los objetos de red (dispositivos) y que es la clave en la gestión de SNMP. Es una base de datos jerárquica, donde cada objeto se direcciona a través de identificador de objeto (OIDs) que no es más que una cadena de texto. Además, cada OID tiene unos atributos de acceso, tipo, rango, etc.

```bash
msfvenom
auxiliary/scanner/snmp/snmp_enum

```

### Enumeración LDAP

Un atacante puede realizar consultas a los servicios LDAP manipulando estos protocolos para obtener información como usuarios válidos, emails, detalles de la lógica departamental, etc.

- Softerra LDP Administrator (https://www.ldapadministrator.com/)
- LDAP Admin Tool (http://www.ldapadmin.org/)
- LDAP Account Manager (https://www.ldap-account-manager.org/lamcms/)
- JXplorer (http://jxplorer.org/)

### Enumeración NTP

Network Time Protocol (NTP) está dctados, direcciones IPs, sistemas operativos.
Diseñado para sincronizar la hora y fecha entre dispositivos de red, bajo el protocolo UDP/123. Es muy preciso y permite mantener un sincronismo del orden de milisegundos. Un atacante puede realizar consultas al servidor NTP para conocer la lista de host conectados, direcciones IPs, sistemas operativos.

Un ataque (delorean) derivado del protocolo NTP consiste en spoofear los mensajes NTP para cambiar las fechas de los sistemas y, conseguir por ejemplo que expiren certificados digitales o las entradas HSTS del navegador, y poder acceder a comunicaciones sin cifrar.

```bash
curl -k -i paypal.com
HTTP/1.1 301 Moved Permanently
Server: Varnish
Retry-After: 0
Location: https://www.paypal.com/
cache-control: max-age=86400
Via: 1.1 varnish
Strict-Transport-Security: max-age=300 -> Aquí ocurre la magia
```

### Enumeración SMTP

Se compone sobre 3 comandos:

- VRFY para validar usuarios
- EXPN para conocer las listas de emails
- RCPT TO para definir los receptos del email

Los servidores SMTP responden de manera diferente a estos comandos si el usuario existe o no y, por tanto, nos permite determinar usuarios válidos en el sistema.

### Enumeración DNS

El atacante intenta recuperar una copia entera -haciéndose pasar por un cliente- de la zona para un dominio desde un servidor DNS. Éste solicita una petición de transferencia de zona al servidor y éste le reenvía la base de datos al atacante.

### Enumeración IPSec

IPsec utiliza Encapsulation Security Payload (ESP), Authentication Header (AH) y Internet Key Exchange (IKE) para fortificar las comunicaciones a través de una red privada virtual (VPN) entre dos puntos. La mayoría de las VPNs basadas en IPSec usen Internet Security Association and Key Management Protocol (ISAKMP) como parte de IKE para estabilizar, negociar, modificar y eliminar las Asociaciones de Seguridad (AS) y claves criptográficas en el entorno VPN.

En un simple escaneo del puerto UDP/500 es posible determinar la existencia de un extremo VPN y, un atacante puede usar herramientas para enumerar información sensible como algoritmos de cifrado, de hash, tipos de autentificación, algoritmos de distribución de claves, duración de las Asociaciones de Seguridad, etc.

### Enumeración VoIP

VoIP utiliza Session Initiation Protocol (SIP) para habilitar las llamadas IP de voz y vídeo, generalmente sobre los puertos TCP/UDP 2000, 2001, 5050, 5061. La enumeración sobre estos puertos y servicios ofrece información como servidores VoIP, sistemas IP-PBX, software utilizado, dispositivos VoIP, direcciones IP y extensiones de usuario. Esta información puede ser usada por un atacante para realizar ataques de DoS, robo de sesiones, Spoofing de llamadas, escucha disimilada de información, envío de spam sobre Telefonía Spamming over Internet Telephony (SPIT), phising sobre VoIP, etc. Los servicios escuchan normalmente en los puertos TCP/UDP 111. La enumeración RCP permite a los atacantes identificar y lista servicios vulnerables.

### Enumeración RCP

Remote Procedure Call (RPC) permite a los clientes y servidores comunicarse en programas cliente/servidor distribuidos.

### Enumeración usuarios Unix/Linux

Con los comandos rusers, rwho, finger es posible listar los usuarios de un sistema basado en UNIX junto con detalles como nombre, nombre del host y fechas de inicio y fin de sesión, etc.

## Sniffing

ICMP Router Discovery Protocol (IRDP) es un protocolo de rutas que permite a los hosts descubrir la IP de router activos en su subred, escuchando mensajes de advertencia de los router y enviando ellos mensajes de solicitud.

Capturan el tráfico sin modificarlo, pero con cierta lógica que le permite analizar el tráfico, e identificar tráfico malicioso en base a ciertas reglas. Ejemplos de estos analizadores de protocolos son:

- N2X N5540A Agilent Protocol Analyzer
- Keysight E2960B
- RADCOM PrismLite Protocol Analyzer
- STINGA Protocol Analyzer

## Técnicas

### MAC Flooding

Inundación de direcciones MAC, el fin es saturar la tabla CAM y, poder ver tramas o paquetes que, si ésta no estuviera llena, el atacante no podría ver.

```bash
# Permite saturar a peticiones a un switch con el fin de desbordar la tabla CAM.
macof -u eth0 -d 192.168.0.1

# Una variante de este ataque es el MAC Spoofing/Duplicating que consiste en que un atacante esnifea la red, y detecta direcciones MAC válidas y activas y, las reusa con el fin de interceptar el tráfico asociado a esa dirección, incluso podría ganar acceso a la red con la identidad de otro host.

ifconfig eth0 hw ether 00:11:22:33:44:55

```

- [Technitium MAC Address Changer(TMAC)](https://technitium.com/tmac/)
- [MAC Addres Changer ](https://www.thewindowsclub.com/free-mac-address-changer-tools-windows)
- [Spoof-Me-Now ](https://sourceforge.net/projects/spoof-me-now/)

### Switch port stealing

Las técnicas de sniffing switch port stealing se basa en MAC flooding para esnifar paquetes. El atacante inunda el switch con paquetes ARP falsos en con la MAC del host a atacar y su propia MAC (la del atacante) como destino. Al producirse el desbordamiento de la tabla CAM a consecuencia del MAC flooding y, en ese momento los paquetes que vayan al host objetivo (a su MAC) serán distribuidos por su interfaz y éste será capaz de capturarlos. En ese momento, si el atacante es rápido, puede asociar la MAC del objetivo a su interfaz/puerto con un paquete ARP reply y, de ahí, el nombre de robo de puerto (port stealing) porque viene a indicar que, aunque el atacante esté en una interfaz/puerto diferente es capaz de capturar tráfico de otra MAC. Además, el atacante puede mejorar este ataque realizando una DoS al host objetivo para que éste no se haga notar en otra interfaz de red e intente restaurar la situación normal.

```bash
# Para prevenir este ataque en un switch ciso
interface fa0/1
switchport mode access
switchport port-security
switchport port-security mac-address 00D0.BC9A.42DC
switchport port-security maximum 1
switchport port-security violation shotdown
exit
exit
```

### DHCP Starvation

El ataque DHCP starvation es un ataque de DoS al servidor DHCP en el que el atacante realiza múltiples peticiones DHCP (request) e intenta gastar todas las direcciones disponibles por el servidor. Por tanto, cuando un usuario legítimo quiere conectarse a la red y solicita por DHCP la configuración de red, éste no obtiene respuesta del servidor puesto que éste no dispone direcciones libres para él.

Para hacer este ataque:

- [Yersinia](http://sectools.org/tool/yersinia/)
- [Hyenae](https://www.systemtools.com/hyena/)
- [Dhcpstarv](http://dhcpstarv.sourceforge.net/)
- [Gobbler](http://gobbler.sourceforge.net/)
- [DHCPig](https://github.com/kamorin/DHCPig)

### Rouge DHCP

Un atacante puede introducir un servidor rouge (falso) DHCP que responda a las peticiones DHCP (request) con direcciones IP falsas. Este ataque se suele desplegar en conjunción con el anterior, DHCP starvation; una vez el servidor ha sido neutralizado (DHCP starvation), se suplanta por el nuevo y falso (rouge DHCP).

```bash
# Configurar DHCP snooping en un router cisco para mitigar los ataques derivados del protocolo DHCP.
```

### ARP Spoofing

El ataque ARP Spoofing se basa en construir peticiones ARP falsas -muchas de ellas- para sobrecargar el switch, y que este se comporte como un hub y poder ver el tráfico de otras interfaces; este ataque lo denominamos MAC flodding (inundación de peticiones MAC) para conseguir un ARP caché poisoning (envenenamiento de la tabla CAM).

El atacante inyecta paquetes de tipo ARP REPLY con la IP de un host al que pretende comprometer, pero, respondiendo como si la MAC asociada a esa IP fuera la suya, la del host del atacante. Con esta situación, se produce que todos los hosts que escuchan ese paquete broadcast con la IP de la víctima y la MAC del atacante actualizan sus tablas de rutas y, cuando algún host quiera enviar tráfico legítimo a la IP de víctima, lo enviará a la MAC del atacante y, de esta manera, podría esnifar el tráfico. Si además, el atacante reenviara el tráfico a la IP correcta, la de la víctima, se produciría un ataque de tipo MiTM.

Con este ataque, se puede realizar:

- Esnifado de paquetes
- Robo de Sesión
- Robo de llamadas VoIP (tapping)
- Manipulación de datos
- MiTM
- Intercepción de datos
- Robo de conexiones
- Reinicio de conexiones
- Robo de contraseñas
- Denegación de Servicio

Herramientas:

- [Ufasof snif](http://ufasoft.com/sniffer/)
- [BetterCAP](https://www.bettercap.org/)
- [Ettercap](https://www.ettercap-project.org/)
- [ArpSpoofTool](https://su2.info/doc/arpspoof.php)
- [MiTMf](https://github.com/byt3bl33d3r/MITMf)
- [Cain & Abel](http://www.oxid.it/cain.html)

A demas de DAI(Dynamic ARP Inspection)Otras técnicas se basan en programas software que monitorizan la tabla ARP y, si detec-
tan un cambio en el par IP, MAC, alertan y eliminan el paquete ARP. Algunsa de estas
herramientas son:

- [Xarp](http://www.xarp.net/)
- [Capsa Network Analyzer ](https://www.colasoft.com/capsa-free/)
- [ArpON](http://arpon.sourceforge.net/)
- [ARP AntiSpoofer](https://sourceforge.net/projects/arpantispoofer/)
- [ARPStraw](https://github.com/he2ss/arpstraw)
- [shARP](https://github.com/europa502/shARP) Y, por supuesto introducir dispositivos como IDS o herramientas que detecten cuando un host esté en modo promiscuo.

Y, por supuesto introducir dispositivos como IDS o herramientas que detecten cuando un host esté en modo promiscuo.

### IRDP Spoofing

ICMP Router Discovery Protocol (IRDP) es un protocolo de rutas que permite a los hosts descubrir la IP de router activos en su subred, escuchando mensajes de advertencia de los router y enviando ellos mensajes de solicitud. Un atacante puede spooferar estos mensajes, los que envía el router a los hosts, con el fin de cambiar la dirección IP del router a la dirección que el atacante desee. Con este ataque se podrían esnifar conexiones, recopilar información sensible de los paquetes para realizar ataques de MiTM, DoS o esnifado pasivo.

```bash
#La tecnología de seguridad en el puerto IEEE 801.1X que es un protocolo de control de acceso a la red (NetWork Access Control -PNAC) que obliga a la autentificación de cada dispositivo antes incluso de poder enviar cualquier tipo de trama. Este protocolo se implementa junto con las tecnologías Authentication, Authorization y Accounting (AAA) para que el proceso de autentificación, autorización se pueda hacer distribuido, usando protocolos como RADIUS o TACACS+, y además todo esté contabilizado o registrado para fines de auditoría.

# Como configurar la tecnología 802.1x en un switch CISCO
aaa new-model
radius-server host 10.1.1.50 auth-port 1812 key xyz123
aaa authentication dot1x default group radius
dot1x system-auth-control
interface fa0/1
description Access Port
switchport mode access
dot1x port-control auto
```

### DNS Poisoning

- Simplemente escuchando las DNS request y manipulándolas para que, la IP del dicho paquete sea la IP falseada.
- Con el protocolo ARP y la técnica de ARP Spoofing para que el cliente asocie la IP del servidor DNS con la MAC del atacante o de un servidor falso que controle el atacante.

Mitigar:

- Implementando la versión segura basada en certificados digitales DNSSec
- Usando cifrado en las comunicaciones, por ejemplo, con SSL
- Para protegernos de ataques externo, forzar todas las consultas a DNS internos
- Para protegernos de ataques internos, forzar todas las consultas a DNS externos
- Configurar los firewalls para restringir peticiones externas DNS lookup
- Introducir sistemas de detección de intrusiones
- Restringiendo el servicio recursivo DNS, total o parcial, sólo a usuarios autorizados
- Limitando el uso de las extensiones DNS (NXDOMAIN)
- Fortificando los endpoint
- Usando tablas IP y ARP estáticas
- Auditar los servidores DNS para eliminar y corregir vulnerabilidades
- Obteniendo la dirección MAC directamente de la tarjeta NIC en lugar desde el Sistema Operativo

```bash
# cat hosts.conf
# 192.168.0.163 google.com\n192.168.0.162 facebook.com
bettercap -I eth0 -G 192.168.0.1 -T 192.168.0.162 --dns hosts.conf
```

## Session Hijacking

Los ataques de robo de sesión basados en red residen en apoderarse de la sesión desde el punto de vista de los protocolos de transporte e IP.

1. El primero es encontrar y seguir la comunicación, usando, por ejemplo, sniffer y escáneres para buscar objetivos con un contexto vulnerable, por ejemplo, con números de secuencia TCP predecibles. Una vez, identificada la víctima y la comunicación, el atacante se dedicará a capturar la comunicación.

2. Es desincronizar la conexión, es decir, el atacante, una vez que ya está dentro de la sesión, quiera eliminar de ésta al usuario legítimo. Esto lo puede lograr, por ejemplo, introducir números de secuencia (SEQ/ACK) erróneos, enviando el flag RST, y otras alternativas.

3. Una vez que el atacante ha interrumpido la sesión legítima, intentará introducir o inyectar tráfico para participar activamente en la comunicación.

Herramientas para realizar estos ataques:

- Burp Suite (https://portswigger.net/burp)
- OWASP ZAP (https://owasp.org/www-project-zap/)
- BetterCAP (https://www.bettercap.org/)
- Netool toolkit (https://github.com/r00t-3xp10it/netool-toolkit)
- WebSploit Framework (https://sourceforge.net/projects/websploit/)
- Sslstrip (https://github.com/moxie0/sslstrip)
- Hamster (https://tools.kali.org/sniffingspoofing/hamster-sidejack)

### Técnicas de nivel de aplicación

Robo de sesión --- Predicción --- Fuerza Bruta

### Usando un sniffer y predicción

Un atacante usa un sniffer para capturar un token o id de sesión válido y ahí puede hacer varias cosas.

### Usando Ataques MiTM

El ataque sslstrip es un ataque de tipo MitM a nivel de aplicación, aunque, previamente en necesario realizar un ataque de tipo MitM a nivel de red, por ejemplo usando la técnica arp spoofing. Lo que hace sslstrip es engañar al servidor y convertir todo el HTTPS de una web en HTTP (sin cifrar). El script solo puede “engañar” cuando la víctima llega a la web en cuestión mediante una redirección o un LINK.

Zbot es un malware, especialmente diseñado para colocarse en medio entre el usuario y el navegador web; de tal manera que, cuando el usuario navega por ciertas páginas, el malware hace que el navegador realmente visite otras webs o cargue otros contenidos. Incluso, puede cargar otros certificados digitales.

### Usando Ataques basado en cliente

- Cross-Site Scripting (XSS)
- Código JavaScript Maliciosos
- Troyanos

### Usando Ataques Session Replay

En los ataques de session replay, el atacante escucha y captura la conversación entre el cliente y el servidor. Dentro de esa captura está la clave de sesión y, aunque el atacante no accede a ella, simplemente reutiliza esa comunicación (replay) para autentificarse él frente al servidor.

### Usando Session Fixation

El atacante trata de atraer a un usuario para que se autentifique con unos ID de sesión predefinido -conocido por el atacante- y, después de ello, el atacante -que dispone del ID puede acceder a la sesión validada por el usuario.

### Usando Servidores Proxy

Capturamos el tráfico con Wireshark en la red y posterioemente abrimos la captura con ferret y luego ejecutamos hamster

- Ferret
- Wireshark
- Hámster

```bash

ferret -r capture.pcap
hamster
```

### Usando Ataque CRIME

Compression Ratio Info-Leak Made Easy (CRIME) es un ataque basado en cliente que explota vulnerabilidades presentes en la característica de compresión de datos presente en protocolos como SSL/TLS, SPDY y HTTPS.

El atacante lo que persigue es descifrar / desencriptar las cookies de sesión y, con esta información ser capaz de crear una nueva sesión con la aplicación web.

### Usando Ataque Prohibido

1. TLS Handshake durante el establecimiento de la conexión HTTPS
2. Sniff el tráfico
3. Usar nonce para hijack la sesión
4. El tráfico del servidor y la victima fluye a traves del atacante
5. Injecta codigo malicioso y contenido falso
6. La victima revela información sensible

## Técnicas de nivel de Red

El robo de la sesión se hace en capas inferiores, a veces incluso se usa para ataques de robo de sesión de nivel de aplicación.

La dificultad de este tipo de ataques reside en predecir o calcular el valor de ISN(Initial Sequence Number) que es el identificador para que tanto cliente como servidor vayan reconociéndose la entrega correcta de los paquetes, ya que éste es diferente en cada sesión.

### TCP/IP Hijacking

Usa paquetes falsificados para tomar el control de una comunicación entre víctima y máquina objetivo. En este escenario, la conexión de la víctima se cuelga, y el atacante es capaz de comunicarse con el host objetivo. Para realizar este tipo de ataques, el atacante debe estar en la misma red que la víctima; en cambio, el objetivo puede estar localizado donde fuera.

### IP Spoofing: Source Routed

El atacante falsifica la dirección IP del host con la que el servidor tiene una sesión. Los paquetes son source-routed, es decir el atacante especifica la ruta por la que los paquetes deben ir, desde origen hasta el destino.

El siguiente paso, es cuando el atacante altera los números de secuencia y ACKs. Una vez que un identificador se cambia, el atacante puede inyectar paquetes falsos en la sesión TCP antes de que el cliente responda. Esto producirá una desincronización del usuario mientras que el atacante, con el ISN válido, mantendrá la comunicación.

### RST Hijacking

Este ataque consiste en inyectar paquetes RST (finalización de la conexión TCP) auténticos, con la IP origen falsa (la IP del servidor) y, prediciendo el número de ACK. Si este número es correcto, el atacante puede cerrar la conexión con la víctima y ésta creería que la ha cerrado el propio servidor, pero realmente, éste no ha cerrado la conexión, en este punto, el atacante se puede hacer pasar por la víctima y mantener la conexión establecida.

- [Este ataque se puede realizar: ](https://www.colasoft.com/packet_builder/)

### Blind Hijacking

Si un atacante puede inyectar datos especialmente manipulaos o comandos en las comunicaciones TCP interceptadas. En este punto, el atacante puede enviar datos o comandos, pero no tiene acceso a la respuesta, de ahí ciegas o blind. En cualquier caso, el paquete manipulado debería.

### UDP Hijacking

El atacante envía una respuesta UDP falsa del servidor a la víctima, antes de que llegue la auténtica enviada por el propio servidor. Por tanto, el atacante puede tomar el control de la sesión, simplemente limitando o restringiendo los paquetes UDP auténticos del servidor. UDP no usa número de secuencia ni sincronismo,
por lo que es más fácil de realizar.

### MiTM: Packet Sniffer

Se puede usar el ataque arp spoofing para realizar un MiTM entre ambas máquinas.

Otra opción es usar el protocolo ICMP y los mensajes de error, para direccionar el tráfico entre víctima y a servidor hacia el host del atacante. Los mensajes de error indican problemas de red o de procesado de paquetes en la conexión original y sugieren otra ruta alternativa por el host del atacante.

A partir de aquí, se puede realizar múltiples opciones, por ejemplo, usar la herramienta ettercap y sus filtros para realizar robo de información:

- http://blog.pepelux.org/2012/01/05/jugando-con-los-filtros-para-ettercap/

```bash
mitmf --spof --arp --target 192.168.0.12 --gateway 192.168.0.1 -i eth0
```

- Capturar el tráfico con wireshark y buscar: <i>(filtro: http contains cookie)</i>

## Ingeniería social

No hay ningún mecanismo de seguridad que permita protegerse frente a técnicas de ingeniería social, salvo educar a los trabajadores y usuarios para reconocer y responder a estos ataques o minimizar el impacto de éstos.

Un ataque de ingeniería social se compone de 4 etapas:

- Investigación del objetivo, En esta fase, se realiza una recopilación de información acerca del objetivo(s), usando técnicas de dumpster diving, sitios web, empleados, etc.
- Selección de la víctima. Identificar el empleado o personal más susceptible o apropiado
- Establecer la relación con el usuario elegido
- Explotar dicha relación para obtener la información deseada
