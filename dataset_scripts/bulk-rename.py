# bulk rename the pictures in a hardcoded directory
# with their md5 hash as filename
from asyncore import file_dispatcher
import os


# for each file in folder
inputDir = 'datasets/first_1000_new_bgs'

# if os.path.exists(sys.argv[1]):
#     voxmonWithBgDir = os.path.abspath(sys.argv[1])
# if os.path.exists(sys.argv[2]):
#     voxmonWithoutBgDir = os.path.abspath(sys.argv[2])

def rename_in_place():
    for file in os.listdir(inputDir):
        if file.endswith(".png"):
            currentName = str(file)
            newName = file[:32] + ".png"
            print(currentName + " to " + newName)
            os.rename(inputDir+os.sep+file, inputDir+os.sep+newName)

rename_in_place()