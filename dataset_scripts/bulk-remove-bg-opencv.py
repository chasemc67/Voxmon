import os
import sys
import cv2

def show(img):
    cv2.imshow('image', img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def remove_bg(image):
    # find a pixel color that doesn't exist in the image
    # and use it as the background color
    bg_color = (255, 155, 155)
    foundColor = False
    while(foundColor == False):
        for i in range(image.shape[0]):
            for j in range(image.shape[1]):
                if image[i,j,0] == bg_color[0] and image[i,j,1] == bg_color[1] and image[i,j,2] == bg_color[2]:
                    bg_color[2] += 1
        foundColor = True

    diff = (50,50,50)

    cv2.floodFill(image, None, (1, 1), bg_color, loDiff=diff, upDiff=diff, flags=cv2.FLOODFILL_FIXED_RANGE)
    #show(image)

    # add alpha channel
    image = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)

    #iterate over image pixels with opencv
    for i in range(image.shape[0]):
        for j in range(image.shape[1]):
            if image[i,j,0] == bg_color[0] and image[i,j,1] == bg_color[1] and image[i,j,2] == bg_color[2]:
                image[i,j,0] = 0
                image[i,j,1] = 0
                image[i,j,2] = 0
                image[i,j,3] = 0
    return image

def addBackground():
    background = cv2.imread("background.png", cv2.IMREAD_UNCHANGED)
    foreground = cv2.imread("overlay.png", cv2.IMREAD_UNCHANGED)

    # normalize alpha channels from 0-255 to 0-1
    alpha_background = background[:,:,3] / 255.0
    alpha_foreground = foreground[:,:,3] / 255.0

    # set adjusted colors
    for color in range(0, 3):
        background[:,:,color] = alpha_foreground * foreground[:,:,color] + \
            alpha_background * background[:,:,color] * (1 - alpha_foreground)

    # set adjusted alpha and denormalize back to 0-255
    background[:,:,3] = (1 - (1 - alpha_foreground) * (1 - alpha_background)) * 255

    # display the image
    cv2.imshow("Composited image", background)
    cv2.waitKey(0)


# for each file in folder
voxmonWithBgDir = 'datasets/clustered_images_jan29_1024'
voxmonWithoutBgDir = 'datasets/clustered_images_jan29_1024_noBG'

# if os.path.exists(sys.argv[1]):
#     voxmonWithBgDir = os.path.abspath(sys.argv[1])
# if os.path.exists(sys.argv[2]):
#     voxmonWithoutBgDir = os.path.abspath(sys.argv[2])


# make dir if it doesn't exist
if not os.path.exists(voxmonWithoutBgDir):
    os.makedirs(voxmonWithoutBgDir)

fileNumber = 1
dirLength = len(os.listdir(voxmonWithBgDir))
for file in os.listdir(voxmonWithBgDir):
    if file.endswith(".png"):
        print("" + file + " : " + str(fileNumber) + "/" + str(dirLength)) 
        fileNumber = fileNumber + 1
        try:
            # read image
            image = cv2.imread(os.path.sep.join([voxmonWithBgDir, file]))
            image = remove_bg(image)
            # write image
            cv2.imwrite(os.path.sep.join([voxmonWithoutBgDir, file]), image)
        except:
            print("Error removing background from file: " + file)