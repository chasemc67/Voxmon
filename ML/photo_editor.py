#!/usr/bin/python
import pwd
from PIL import Image
import os, sys

path = pwd
dirs = os.listdir( path )

def resize():
    for item in dirs:
        if os.path.isfile(path+item):
            try:
                im = Image.open(path+item)
                f, e = os.path.splitext(path+item)
                print("file", f)
                imResize = im.resize((1024,1024), Image.ANTIALIAS)
                imResize.save(f + '.png')
            except:
                pass

resize()