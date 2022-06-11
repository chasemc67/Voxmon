# bulk rename the pictures in a hardcoded directory
# with their md5 hash as filename

import os
import hashlib


# for each file in folder
inputDir = 'datasets/ganOutputNoBGFaves'

# if os.path.exists(sys.argv[1]):
#     voxmonWithBgDir = os.path.abspath(sys.argv[1])
# if os.path.exists(sys.argv[2]):
#     voxmonWithoutBgDir = os.path.abspath(sys.argv[2])


# make dir if it doesn't exist
if not os.path.exists(inputDir):
    os.makedirs(inputDir)




for file in os.listdir(inputDir):
    # read image
    m = hashlib.md5()
    data = open(inputDir+os.sep+file, 'rb').read()
    m.update(data)
    print(m.hexdigest())
    os.rename(inputDir+os.sep+file, inputDir+os.sep+m.hexdigest()+'.png')