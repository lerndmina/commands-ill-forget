---
title: Misc
description: Stuff I don't have a place for yet.
---
```md
TODO: Add description
```

### Nextcloud unencrypt all files for a user with SSE (Server Side Encryption)
This is a command for decrypting all files for a user when using SSE in Nextcloud.
```bash
sudo -u www-data php occ encryption:decrypt-all <USERNAME>
```
<!-- 
[USERNAME]: <> (placeholder=username validation="regex .+" desc="The username of the Nextcloud user to decrypt all files for")
 -->
Here's a breakdown:

- `sudo -u www-data`: This runs the following command as the `www-data` user, which is typically the user that runs the web server and has the necessary permissions to access Nextcloud's files.

- `php occ encryption:decrypt-all <USERNAME>`: This is the command that actually performs the decryption.

  - `php occ`: This runs Nextcloud's command line interface. occ stands for 'ownCloud console', as Nextcloud is a fork of ownCloud.

  - `encryption:decrypt-all <USERNAME>`: This is the command to decrypt all files. `<USERNAME>` should be replaced with the username of the user whose files you want to decrypt.

### MySQL Reset The Root Password (You idiot.)
This command stops the mysql server and starts a new one locally, it then logs you in as root and allows you to change the password.
```bash
sudo systemctl stop mysql
sudo mysqld_safe --skip-grant-tables --skip-networking &
mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '<new_password>'; FLUSH PRIVILEGES;"
sudo killall -QUIT mysql mysqld_safe mysqld
sudo systemctl start mysql
```
<!-- 
[new_password]: <> (type=password validation="regex .{8,}" desc="The new password for the user 'root'@'localhost'")
 -->
1. `sudo systemctl stop mysql`: This command stops the MySQL service. It's necessary to stop the service before we can start it in safe mode.

2. `sudo mysqld_safe --skip-grant-tables --skip-networking &`: This command starts the MySQL service in safe mode. The `--skip-grant-tables` option allows us to connect to the database without a password and with all privileges, and `--skip-networking` prevents other clients from connecting to the database.

3. `mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '<new_password>'; FLUSH PRIVILEGES;`: This command connects to the MySQL database as the root user. It then changes the password to `<new_password>`, replace `<new_password>` with the new password you want to use for the root user.

4. `sudo killall -QUIT mysql mysqld_safe mysqld`: This command tells the mysql server running to stop.

5. `sudo systemctl start mysql`: This command starts the MySQL service again.

### Change The System Timezone
These commands are for setting your timezone
```bash
sudo timedatectl list-timezones
sudo timedatectl set-timezone <timezone>
sudo timedatectl
```
<!-- 
[timezone]: <> (placeholder="Europe/Stockholm" desc="The timezone to set your computer to") 
-->
1. `sudo timedatectl list-timezones`: This command lists all available timezones.

2. `sudo timedatectl set-timezone <timezone>`: This command sets the system timezone to some timezone. One example of a timezone is `Europe/Stockholm`.

3. `sudo timedatectl`: This command displays the current date and time settings, including the newly set timezone.

### Make all minecraft servers in a directory "online-mode=false"
A bash command to set all minecraft servers in child directories to offline mode.
```bash
sudo sed -i 's/online-mode=true/online-mode=false/g' $( sudo find . -type f | grep server.properties)
```
- `sudo sed -i 's/online-mode=true/online-mode=false/g'`: This command uses `sed`, the stream editor, to find and replace all instances of `online-mode=true` with `online-mode=false` in a file. The `-i` option tells `sed` to edit files in-place (i.e., change the original file).

- `$( sudo find . -type f | grep server.properties)`: This command is used to find all files named `server.properties` in the current directory and its subdirectories. The `find . -type f` command finds all files in the current directory, and `grep server.properties` filters for files named server.properties. The output of this command (a list of file paths) is passed as an argument to the `sed` command.

In the context of a Minecraft server, `online-mode` determines whether the server should authenticate players with Minecraft's account system. Setting `online-mode` to `false` allows players with unofficial Minecraft clients to join the server.

### Combine Markdown Files Into One
This bash script combines all Markdown files in each subdirectory into a single Markdown file named after the subdirectory. It loops through each subdirectory, concatenates all Markdown files in it using `cat`, and outputs the result to a new Markdown file.
```bash
for dir in */; do
    # Trim the trailing slash to get the directory name
    dirname="${dir%/}"
    # Combine all Markdown files into one, with the directory name as the filename
    cat "$dir"*.md > "${dirname}.md"
done
```

### Find unique values for a field in a bunch of json files
Lists all unique values for fields in all json files in the current directory.
```bash
find . -type f -name "*.json" | xargs cat {} | jq .<name_of_the_field> -c | sort | uniq
```
<!-- 
[name_of_the_field]: <> (placeholder=status desc="The path to a field in the json file")
-->
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

### Allow Docker Commands Without Sudo
This procedure grants the current user privileges to run Docker commands without using `sudo`.
```bash title="Bash"
sudo usermod -aG docker $USER
```

1. `sudo usermod -aG docker $USER`: Adds the current user to the `docker` group to enable the execution of Docker commands without the need for `sudo`.

   - `-aG`: Appends (does not replace) the user to the supplementary groups mentioned by `-G`. This option is used to make sure that the current user is added to the group without affecting their membership in other groups.
   - `docker`: Specifies the group name that the user is being added to, which is the `docker` group.
   - `$USER`: An environment variable that represents the current logged-in user. This user gets the permission to run Docker commands without using `sudo`.

### Store git credentials
This command stores your git credentials in the git config file.
```bash
git config --global credential.helper store
```
1. `git config`: This command is used to configure Git. It can be used to set configuration variables that control the behavior of Git.
2. `--global`: This option tells Git to use the global configuration file. This file is located at `~/.gitconfig` on Linux and macOS, and `%USERPROFILE%\.gitconfig` on Windows.
3. `credential.helper store`: This command configures Git to use the `store` credential helper. The credential helper is a program that stores credentials for Git. The `store` credential helper stores credentials in a plain-text file on disk, which is not secure. It is recommended to use a more secure credential helper, such as the `cache` credential helper, which stores credentials in memory for a configurable amount of time.

