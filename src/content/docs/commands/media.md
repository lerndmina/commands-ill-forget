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

### Convert Images And Compress
Converts images and compresses them
```bash
convert <from> -quality 70 <to>
```
<!-- 
[from]: <> (placeholder=img.png validation="file image/.+" desc="The filename of the source file")
[to]: <> (placeholder=output.png validation="regex (.+)\.(.+)" desc="The filename of the destination file with its file extension")
 -->
This uses the `convert` utility from [ImageMagick](https://www.imagemagick.org/) to convert an image file `<from>` another file named `<to>`, while also compressing the image quality to `70%`.

### Crop transparent background from image
This command is using the `convert` command from the [ImageMagick](https://www.imagemagick.org/) software suite to crop away the transparent background.
```bash
convert <from> -trim +repage <to>
```
<!-- 
[from]: <> (placeholder=img.png validation="file image/.+" desc="The filename of the source file")
[to]: <> (placeholder=output.png validation="regex (.+)\.(.+)" desc="The filename of the destination file with its file extension")
 -->
1. `convert <from>`: This initiates the conversion process using the ImageMagick `convert` command, and it specifies the input file as `<from>`.

2. `-trim`: This option instructs ImageMagick to trim away any surrounding transparent or near-transparent pixels from the edges of the image, effectively removing the transparent background.

3. `+repage`: This option resets the virtual canvas information of the image. After trimming, the image may have a smaller size, and `+repage` ensures that the image's virtual canvas is adjusted to match its actual dimensions.

4. `<to>`: This specifies the output filename for the resulting image with the trimmed transparent background.

So, in summary, this command takes an input image (`<from>`), removes the transparent background through trimming, adjusts the virtual canvas, and then saves the result as `<to>`.

### Crop image to create favicon
This command crops an image and removes its near transparent pixels in order to create a favicon for a website.
```bash
convert <from> -trim +repage -resize 180x180 <to>.ico
```
<!-- 
[from]: <> (placeholder=favicon.png validation="file image/.+" desc="The filename of the source file")
[to]: <> (placeholder=favicon validation="regex (.+)" desc="The filename of the .ico file without the .ico part")
 -->
1. `convert <from>`: This initiates the conversion process using the ImageMagick `convert` command and specifies the input file as `<from>`, replace `<from>` with the name of the file you are trying to crop and convert.

2. `-trim`: This option instructs ImageMagick to trim away any surrounding transparent or near-transparent pixels from the edges of the image, effectively removing the transparent background.

3. `+repage`: This option resets the virtual canvas information of the image. After trimming, the image may have a smaller size, and `+repage` ensures that the image's virtual canvas is adjusted to match its actual dimensions.

4. `-resize 180x180`: This option resizes the image to a width of 180 pixels and a height of 180 pixels. This is commonly used for creating favicons, which are small icons used to represent websites.

5. `<to>.ico`: This specifies the output filename for the resulting image with the trimmed transparent background and resized dimensions. The file is saved in the ICO (Icon) format, which is often used for favicons. Replace `<to>` with the name of the file without extensions.

So, in summary, this command takes an input image (`<from>`), removes the transparent background through trimming, adjusts the virtual canvas, resizes the image to 180x180 pixels, and then saves the result as `<to>.ico`.

