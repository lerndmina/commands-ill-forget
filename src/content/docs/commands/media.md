---
title: Media
description: Commands for editing multimedia files.
---
Welcome to the 'Media' section! This is your one-stop shop for commands specifically tailored for editing multimedia files. Whether you're dealing with audio, video, or image files, the commands listed here will help you manipulate and manage them with ease. No more sifting through endless search results - everything you need is right here. Happy editing!
> -GPT4


### H264 Conversion With FFMPEG
This is a bash command that converts all MKV video files in the current directory to H.264 format using the ffmpeg tool.
```bash
mkdir h264vids
for f in *.mkv; do ffmpeg -i "$f" -map 0 -c copy -c:v libx264 -crf 23 -preset medium h264vids/"${f%.*}.mkv"; done;
```
Here's a step-by-step breakdown:

1. `mkdir h264vids`: This command creates a new directory named `h264vids` in the current directory.

2. `for f in *.mkv; do ...; done`: This is a loop that iterates over every MKV file in the current directory.

3. `ffmpeg -i "$f" -map 0 -c copy -c:v libx264 -crf 23 -preset medium h264vids/"${f%.*}.mkv"`: This is the command that gets executed for each MKV file. It uses ffmpeg to convert the video to H.264 format.

- `-i "$f"`: This specifies the input file.
-map 0: This tells ffmpeg to include all streams from the input file in the output.
- `-c copy`: This copies all the codecs from the original file.
- `-c:v libx264`: This sets the video codec to H.264.
- `-crf 23`: This sets the Constant Rate Factor to 23, which is a good balance between quality and file size.
- `-preset medium`: This sets the encoding speed to 'medium'. Faster encoding speeds result in larger file sizes, and slower speeds result in smaller file sizes.
- `h264vids/"${f%.*}.mkv"`: This is the output file. It's placed in the `h264vids` directory and has the same name as the input file, but with the extension changed to `.mkv`.