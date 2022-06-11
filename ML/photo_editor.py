#!/usr/bin/python
from PIL import Image
import os, sys

path = "/Users/davescott/Documents/Personal2021/voxmon_aug2021/pokemon_images_resized_background/"
dirs = os.listdir( path )

def resize():
    for item in dirs:
        if os.path.isfile(path+item):
            try:
                im = Image.open(path+item).convert('RGBA')
                f, e = os.path.splitext(path+item)
                imResize = im.resize((256,256), Image.ANTIALIAS)
                new_image = Image.new("RGBA", imResize.size, "WHITE")
                new_image.paste(imResize, mask = imResize)    
                new_image.convert('RGB').save(f + '.png', 'JPEG', quality=100)

            except:
                pass

resize()