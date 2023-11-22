---
title: Misc
description: Stuff I don't have a place for yet.
---
```md
TODO: Add description
```

### Nextcloud unencrypt all files for a user with SSE (Server Side Encryption)
```bash
sudo -u www-data php occ encryption:decrypt-all {USERNAME}
```
Here's a breakdown:

- `sudo -u www-data`: This runs the following command as the `www-data` user, which is typically the user that runs the web server and has the necessary permissions to access Nextcloud's files.

- `php occ encryption:decrypt-all {USERNAME}`: This is the command that actually performs the decryption.

  - `php occ`: This runs Nextcloud's command line interface. occ stands for 'ownCloud console', as Nextcloud is a fork of ownCloud.

  - `encryption:decrypt-all {USERNAME}`: This is the command to decrypt all files. `{USERNAME}` should be replaced with the username of the user whose files you want to decrypt.

### MySQL Reset The Root Password (You idiot.)
```bash
sudo systemctl stop mysql
sudo mysqld_safe --skip-grant-tables --skip-networking &
mysql -u root

FLUSH PRIVILEGES;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```
1. `sudo systemctl stop mysql`: This command stops the MySQL service. It's necessary to stop the service before we can start it in safe mode.

2. `sudo mysqld_safe --skip-grant-tables --skip-networking &`: This command starts the MySQL service in safe mode. The `--skip-grant-tables` option allows us to connect to the database without a password and with all privileges, and `--skip-networking` prevents other clients from connecting to the database.

3. `mysql -u root`: This command connects to the MySQL database as the root user.

4. `FLUSH PRIVILEGES;`: This is a MySQL command that reloads the grant tables in the database, applying the changes we're about to make.

5. `ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';`: This is the MySQL command that changes the password. Replace `'new_password'` with the new password you want to use for the root user. After running this command, the root password will be reset.

### Change The System Timezone
```bash
sudo timedatectl list-timezones
sudo timedatectl set-timezone Europe/Stockholm
sudo timedatectl
```
1. `sudo timedatectl list-timezones`: This command lists all available timezones.

2. `sudo timedatectl set-timezone Europe/Stockholm`: This command sets the system timezone to `Europe/Stockholm`. You can replace `Europe/Stockholm` with any timezone from the list produced by the first command.

3. `sudo timedatectl`: This command displays the current date and time settings, including the newly set timezone.

### Make all minecraft servers in a directory "online-mode=false"
```bash
sudo sed -i 's/online-mode=true/online-mode=false/g' $( sudo find . -type f | grep server.properties)
```
- `sudo sed -i 's/online-mode=true/online-mode=false/g'`: This command uses `sed`, the stream editor, to find and replace all instances of `online-mode=true` with `online-mode=false` in a file. The `-i` option tells `sed` to edit files in-place (i.e., change the original file).

- `$( sudo find . -type f | grep server.properties)`: This command is used to find all files named `server.properties` in the current directory and its subdirectories. The `find . -type f` command finds all files in the current directory, and `grep server.properties` filters for files named server.properties. The output of this command (a list of file paths) is passed as an argument to the `sed` command.

In the context of a Minecraft server, `online-mode` determines whether the server should authenticate players with Minecraft's account system. Setting `online-mode` to `false` allows players with unofficial Minecraft clients to join the server.

### Combine Markdown Files Into One
```bash
for dir in */; do
    # Trim the trailing slash to get the directory name
    dirname="${dir%/}"
    # Combine all Markdown files into one, with the directory name as the filename
    cat "$dir"*.md > "${dirname}.md"
done
```
This bash script combines all Markdown files in each subdirectory into a single Markdown file named after the subdirectory. It loops through each subdirectory, concatenates all Markdown files in it using `cat`, and outputs the result to a new Markdown file.

### Find unique values for a field in a bunch of json files
```bash
find . -type f -name "*.json" | xargs cat {} | jq .<name_of_the_field> -c | sort | uniq
```

The command is a pipeline of several commands:
1. `find . -type f -name "*.json"`: This command searches for all JSON files in the current directory and its subdirectories. The `.` specifies the current directory as the starting point for the search. `-type f` restricts the search to files, and `-name "*.json"` matches any file that ends with `.json`.
2. `xargs cat {}`: This command reads items from the standard input (in this case, the list of JSON files found by the `find` command), and executes the `cat` command for each item. The `cat` command concatenates and prints the contents of the files.
3. `jq .<name_of_the_field> -c`: This command uses `jq`, a command-line JSON processor, to extract the values of the specified field from the JSON data. Replace `<name_of_the_field>` with the name of the field you're interested in. The `-c` option tells `jq` to output each JSON object on a single line.
4. `sort`: This command sorts its input lines. In this case, it sorts the values extracted by `jq`.
5. `uniq`: This command filters out adjacent duplicate lines from its input. In this case, it removes duplicate values from the sorted list of field values.

#### Example
```bash
find . -type f -name "*.json" | xargs cat {} | jq .status -c | sort | uniq
```

### Installing docker
The code snippet provided demonstrates the installation process for Docker, a popular platform for containerization. It showcases a command written in the Bash scripting language that utilizes the `curl` utility to download a script from the specified URL and execute it.
```bash title="Bash"
curl -sSL https://get.docker.com/ | CHANNEL=stable bash
```

Let's break down the code:

The command begins with `curl -sSL`, where `curl` is a command-line tool used for making HTTP requests. The `-sSL` options passed to `curl` instruct it to work silently (`-s`) and follow redirects (`-L`) while downloading the script.

The URL `https://get.docker.com/` points to the Docker installation script. This script is responsible for setting up the necessary components and dependencies required for Docker to run on the system.

The pipe symbol (`|`) is used to redirect the output of the `curl` command to the next command in the pipeline. In this case, the output is passed to the `bash` command.

The `bash` command executes the downloaded script, which installs Docker on the system. The `CHANNEL=stable` part is an environment variable assignment that sets the installation channel to "stable". This ensures that the stable version of Docker is installed.