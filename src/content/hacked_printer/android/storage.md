---
title: 'Storage'
description: ''
pubDate: 'May 12 2023'
heroImage: ''
slug: 'android/storage'
---

El file system de Android se parece a Linux, y conceptualmente se divide en dos areas de storage en interno y externo.

### Storage interno

Las apps son instaladas por defecto en el directorio _/data/app_, las apps del sistema estan en _/system/app_ o _/system/priv-app_ (read-only), no se pueden acceder al menos que tu dispositivo este root o uses un emulador.

### Device Administrator API

Permite instalar una app android en el dispositivo ya que las companias necesitan asegurarse que estan manteniendo una medida de control para proteger potencialmente la data sensible, estos suites que permiten el manejado del mobil y sus politicas asociadas son llamados Mobile Device Management(MDM).

- (Mass360)[https://www.ibm.com/products/maas360/mobile-security]

- (AirWatch)[https://www.vmware.com/products/workspace-one.html]

- (MobileIron)[https://www.ivanti.com/company/history/mobileiron?miredirect]

Las capacidades de estos MDM exeden lo proveido por el Device Administrator API, ya que incluye x.509 certificados controlando que software esta instalado o manejando la habilidad del cliente para recibir email o la _deteccion de root_

### Device tracking

Los desarrolladores suelen optar por intentar rastrear a los usuarios mediante el uso de identificadores de hardware permanentes, estos identificadores unicos pueden incluir _Mac addresses_, _IMEI_, _ESN_, _MEID_, _IMSI_, _Serial Number_
, _Android ID_
