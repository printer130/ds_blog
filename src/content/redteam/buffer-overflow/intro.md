---
title: 'finding - fuzzing - offset'
description: ''
pubDate: 'Jul 08 2022'
slug: 'buffer-overflow/intro'
---

### Finding Buffer Overflows

This tools can check your code for posibles overflows.

- splint.org
- Cppcheck
- cloud-fuzzing

Almost 50% of vulnerabilities are not exploitable, but they may lead to DOS or cause other side-effects.

**Fuzzing** is a software testing technique that provides invalid data, unexpected or random data as input to a program. Input can be in any form such as:

- Command line
- Parameters
- Network data
- File input
- Databases
- Shared memory regions
- Keyboard/mouse input
- Environment variables.

### Fuzzing tools and frameworks:

- Peach Fuzzing Platform
- Sulley
- Sfuzz
- FileFuzz

### After having the correct offset

Overwrite the eip with the value so that value will be used be the ret instruction to return to our shellcode.

Shellcode is stored at the memory address pointed by ESP the problem is that the address changes dynamically, so we cannot use it to build the exploit.

Just find a JMP ESP or CALL ESP instruction that is in a fixed location of memory.

One technique is disassemble the .dll and then search for instruction and then load it into immunity debugger and search for CALL ESP or JMP ESP.

```bash
# funciones vulnerables
- strcpy
- strcat
- gets
- fgets
- scanf
- fscanf
- vsprintf
- printf
- memcpy
```
