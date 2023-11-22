---
title: Add A Sudo User
description: How to add a sudo user to a Linux Server
sidebar:
  hidden: false
---

#### Before We Get Started
Depending on if you are using the **root** account or not, you may need to prefix all commands with `sudo`. For example, `adduser <USERNAME>` becomes `sudo adduser <USERNAME>`

## Debian / Ubuntu
### Adding the user
```bash title="Terminal"
adduser <USERNAME>
```
The `adduser` command is a utility for adding users to a system. It's a more user-friendly alternative to the `useradd` command, and is the preferred command on some systems. When you run `adduser`, it will prompt you to enter a password and other information such as the full name of the user, room number, work phone, home phone, and other details. These details are optional and can be skipped if they're not needed.

The `<USERNAME>` in the command should be replaced with the username for the new user. For example, if you wanted to create a new user named `admin`, you would replace `<USERNAME>` with `admin`.

So, if you were to run `adduser admin` in the terminal, it would start the process to create a new user named `admin`, and prompt you to enter a password and other optional details for the user.
### Maing them sudo
```bash title="Terminal"
usermod -aG sudo <USERNAME>
```
The `usermod` command is a utility for modifying user accounts. The `-aG` option tells `usermod` to add the user to the supplementary group(s) specified. In this case, the group is `sudo`.

The `<USERNAME>` in the command should be replaced with the username of the user you want to add to the `sudo` group. For example, if you wanted to add a user named `admin` to the `sudo` group, you would replace `<USERNAME>` with `admin`.

---
## Arch
### Adding the admin user
```bash title="Terminal"
useradd -m -g users -G wheel <USERNAME>
```
The `useradd` command is a low-level utility for adding users to a system. Here's what each part of the command does:

- `-m`: This option tells `useradd` to create a home directory for the new user. The location of the home directory will depend on your system's configuration, but it's typically a directory with the same name as the user in the `/home` directory.
- `-g users`: This sets the new user's primary group to users. A group is a way of organizing users that can be used to control their access to files.
- `-G wheel`: This adds the new user to the `wheel` group in addition to their primary group. On many systems, members of the `wheel` group are allowed to use the `sudo` command to perform actions as the root user.
- `<USERNAME>`: This should be replaced with the username for the new user. For example, if you wanted to create a new user named admin, you would replace <USERNAME> with admin.
So, if you were to run useradd -m -g users -G wheel admin in the terminal, it would create a new user named admin, create a home directory for them, set their primary group to users, and add them to the wheel group.

## All
### Adding an ssh key
```bash title="Terminal"
ssh-copy-id -i /path/to/public/key user@remote_server
```
Here's a breakdown of the command:

`ssh-copy-id`: This is a command-line utility that's included with many Unix-like operating systems. It's used to install your public key in a remote machine's authorized keys.

`-i /path/to/public/key`: The `-i` option tells `ssh-copy-id` to use the public key located at `/path/to/public/key`. You should replace `/path/to/public/key` with the actual path to your public key.

`user@remote_server`: This is the username and hostname (or IP address) of the remote server where you want to copy your public key. You should replace user with your username on the remote server, and remote_server with the hostname or IP address of the remote server.