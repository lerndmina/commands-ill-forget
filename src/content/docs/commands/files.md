---
title: Files
description: Commands for working with files.
---
In the "Files" page, you will find a collection of commands and information related to working with files. This page serves as a valuable resource for users who frequently interact with files.
> -GPT4

### Zipping a file into a .tar.gz
This is a command for compressing a directory or a file into a `.tar.gz` file
```bash
tar -czvf <file_name>.tar.gz <files/directories>
```
<!-- 
[file_name]: <> (placeholder=archive validation="regex [A-Za-z\d\s\-_\.]+" desc="This is the name of the archive to write without the .tar.gz part")
[files/directories]: <> (placeholder=* validation="regex .+" desc="This is a list of all files to include in the archive, the files are separated with spaces")
 -->

1. `tar`: This is the command-line utility for handling tape archives (tar). It is commonly used for bundling files and directories together.

2. `-czvf`: These are options used with the `tar` command:
   - `-c`: Create a new archive.
   - `-z`: Compress the archive using gzip.
   - `-v`: This is a optional argument to print all files being compressed. 
   - `-f`: Specify the name of the archive file.

3. `<file_name>.tar.gz`: This is the desired name for the compressed archive. Replace `<file_name>` with the actual name you want to give to the archive. The extension `.tar.gz` indicates that the archive will be in tar format and compressed using gzip.

4. `<files/directories>`: This represents the files or directories that you want to include in the archive. Replace this placeholder with the actual names of the files or directories you want to include in the archive.

So, in summary, this command creates a new compressed tar archive (`.tar.gz`) named `<file_name>.tar.gz` containing the specified files or directories.

### Unzip a .tar.gz file into the current directory
This is a command for extracting a `.tar.gz` file into the current directory.
```bash
tar -xvf <file_name>.tar.gz
```
<!--
[file_name]: <> (placeholder=archive validation="regex [A-Za-z\d\s\-_\.]+" desc="This is the name of the archive to extract without the .tar.gz part")
-->

1. `tar`: This is the command-line utility for handling tape archives (tar). It is commonly used for bundling files and directories together.

2. `-xvf`: These are options used with the `tar` command:
   - `-x`: Extract files from an archive.
   - `-v`: This is an optional argument to print all files being extracted.
   - `-f`: Specify the name of the archive file.

3. `<file_name>.tar.gz`: This is the name of the compressed archive file that you want to extract. Replace `<file_name>` with the actual name of the archive file you want to extract.

When you run this command, the specified `.tar.gz` file will be extracted into the current directory.

### Creating a symbolic link
This is a command for creating a symbolic link to a file or directory.
```bash
ln -s <target> <link_name>
```
<!--
[target]: <> (placeholder=* validation="regex .+" desc="This is the file or directory to which the symbolic link will point")
[link_name]: <> (placeholder=* validation="regex .+" desc="This is the name of the symbolic link")
-->

1. `ln`: This is the command-line utility for creating links between files. It is commonly used for creating symbolic links.
2. `-s`: This is an option used with the `ln` command. It indicates that the link to be created is a symbolic link.
3. `<target>`: This is the file or directory to which the symbolic link will point. Replace this placeholder with the actual name of the file or directory to which you want to create a symbolic link.
4. `<link_name>`: This is the name of the symbolic link. Replace this placeholder with the actual name you want to give to the symbolic link.