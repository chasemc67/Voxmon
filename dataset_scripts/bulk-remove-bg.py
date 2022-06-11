import os
import fnmatch

count = 0
for root, dir, files in os.walk("./Pokemon"):
    print ("root: " + root)
    print ("")
    if len(fnmatch.filter(files, "*")) > 0:
        newPath = os.path.sep.join(["nobg", root])
        os.makedirs(newPath, exist_ok=True)
        print("python3 ~/dev/image-background-remove-tool/main.py -i " + root + " -o " + newPath + " -m u2net -prep bbd-fastrcnn -postp rtb-bnb")
        
