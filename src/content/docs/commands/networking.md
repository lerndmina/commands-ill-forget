---
title: Networking
description: General weird networking commands.
---
```md
TODO: Add description
```

### Create a dummy networking interface
This command creates a dummy network interface and assigns it an IP address.
```bash
ip link add <interface_name> type dummy &&
sudo ip addr add <cidr> brd + dev <interface_name> label <interface_name>:0
```
[interface_name]: <> (placeholder=vip0 validation="regex [a-z\d]+" desc="The name of the interface to create")
[cidr]: <> (placeholder="10.0.0.1/16" validation="regex ([0-9]{1,3}\.){3}[0-9]{1,3}(\/(([0-9]|[12][0-9]|3[0-2])))")
1. `ip link add <interface_name> type dummy`: Creates a new dummy network interface named `<interface_name>`. Replace `<interface_name>` with the name you want for the interface, one example being `vip0`.
2. `sudo ip addr add <cidr> brd + dev <interface_name> label <interface_name>:0`: Assigns the cidr `<cidr>` to the interface `<interface_name>`, the cidr should be in the format of `<ip>/<subnetmask>`. Please replace the `<cidr>` with the one that fits your network. The `brd +` option sets the broadcast address to the default value. The `label <interface_name>:0` option assigns a label to the interface.


### Figure Out What Is Using A Specific Port
Prints out all applications running on a certain port
```bash
sudo lsof -i :<PORT>
```
[PORT]: <> (placeholder=80 validation="regex (6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]\d{4}|[1-9]\d{0,3})" desc="Portnumber that should be checked")
- `sudo`: This runs the following command with root privileges, which are often required to inspect network activity.

- `lsof -i :<PORT>`: lsof is a command meaning 'list open files', and the `-i` option tells it to list files using Internet addresses. `:<PORT>` should be replaced with the port number you're interested in. For example, `:80` would list all processes using port `80`.

### Check the certificate of a smtp server
Connects to a smtp server using openssl
```bash
openssl s_client -connect <ip/hostname>:587 -starttls smtp
```
[ip/hostname]: <> (placeholder=mail.gmail.com validation="regex (([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])|(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])" desc="The ip/hostname of the server to connect to using smtp")
- `openssl s_client`: This starts the OpenSSL client.

- `-connect <ip/hostname>:587`: This tells the client to connect to the SMTP server at the specified IP address or hostname on port 587. Replace <ip/hostname> with the actual IP address or hostname of the server.

- `-starttls smtp`: This tells the client to use the STARTTLS command to upgrade a plaintext connection to an encrypted (TLS or SSL) connection before issuing any SMTP commands.

### Generate a standalone certificate
Generates a standalone certificate using certbot.
```bash
sudo certbot certonly --standalone -d <dns-name>
```
[dns-name]: <> (placeholder=example.org validation="regex (([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])" desc="The domain/subdomain to generate a certificate for")
- `certbot certonly --standalone`: Runs Certbot in standalone mode, which means it will temporarily start a web server for the certificate validation process.
- `-d <dns-name>`: Specifies the domain name for which the certificate should be issued. Replace `<dns-name>` with your domain name.