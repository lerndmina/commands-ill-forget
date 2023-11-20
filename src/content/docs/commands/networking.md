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
ip link add vip0 type dummy &&
sudo ip addr add 10.0.0.1/16 brd + dev vip0 label vip0:0
```

1. `ip link add vip0 type dummy`: Creates a new dummy network interface named `vip0`.
2. `sudo ip addr add 10.0.0.1/16 brd + dev vip0 label vip0:0`: Assigns the IP address `10.0.0.1` with a subnet mask of `16` to the `vip0` interface. The `brd +` option sets the broadcast address to the default value. The `label vip0:0` option assigns a label to the interface.


### Figure Out What Is Using A Specific Port
```bash
sudo lsof -i :PORT
```
- `sudo`: This runs the following command with root privileges, which are often required to inspect network activity.

- `lsof -i :PORT`: lsof is a command meaning 'list open files', and the `-i` option tells it to list files using Internet addresses. `:PORT` should be replaced with the port number you're interested in. For example, `:80` would list all processes using port `80`.

### Check the certificate of a smtp server
```bash
openssl s_client -connect <ip/hostname>:587 -starttls smtp
```
- `openssl s_client`: This starts the OpenSSL client.

- `-connect <ip/hostname>:587`: This tells the client to connect to the SMTP server at the specified IP address or hostname on port 587. Replace <ip/hostname> with the actual IP address or hostname of the server.

- `-starttls smtp`: This tells the client to use the STARTTLS command to upgrade a plaintext connection to an encrypted (TLS or SSL) connection before issuing any SMTP commands.

### Generate a standalone certificate:
```bash
sudo certbot certbot --standalone -d <dns-name>
```
- `certbot certbot --standalone`: Runs Certbot in standalone mode, which means it will temporarily start a web server for the certificate validation process.
- `-d <dns-name>`: Specifies the domain name for which the certificate should be issued. Replace `<dns-name>` with your domain name.