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

1. `tar`: This is the command-line utility for handling tape archives (tar). It is commonly used for bundling files and directories together.

2. `-czvf`: These are options used with the `tar` command:
   - `-c`: Create a new archive.
   - `-z`: Compress the archive using gzip.
   - `-v`: This is a optional argument to print all files being compressed. 
   - `-f`: Specify the name of the archive file.

3. `<file_name>.tar.gz`: This is the desired name for the compressed archive. Replace `<file_name>` with the actual name you want to give to the archive. The extension `.tar.gz` indicates that the archive will be in tar format and compressed using gzip.

4. `<files/directories>`: This represents the files or directories that you want to include in the archive. Replace this placeholder with the actual names of the files or directories you want to include in the archive.

So, in summary, this command creates a new compressed tar archive (`.tar.gz`) named `<file_name>.tar.gz` containing the specified files or directories.

