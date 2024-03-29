---
title: 'APIs abuse'
description: 'Wrong handling of APIs, it’s performed with the help of bots, phishing attacks, or manual insertion of malicious code.'
pubDate: 'Jul 08 2022'
slug: 'vuln/apis'
---

### How to Attack

- DDoS Attacks
- Sensitive Data Exposure
- Injection Attacks

### Tools

- BurpSuite
- FFUF
- Arjun
- Postman
- Seclist

### How to protect

- Use security tools such as firewalls
- Monitor and manage API calls coming from bots
- Stop using obsolete and insecure authentication methods
- Implement measures to prevent API access by sophisticated human-like bots
- Deploy token-based rate limiting equipped with features to limit API access based on the number of IPs, sessions, and tokens
- Comprehensively log all system requests and responses
- Scan incoming requests for malicious intent
- Support clustered API implementation to handle fault tolerance
- Track the usage and paths taken by API calls to find anomalies

```powershell
# Palabra FUZZ en el archivo usersearch.req

ffuf -request usersearch.req -request-proto http -w <( seq 0 100 ) -fs 3
```
