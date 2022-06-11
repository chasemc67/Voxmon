import json
import glob
import shutil

imageHashes = []
all_image_clusters_input_path = "./datasets/outputs_with_originals_making_up_final_collection"
images_on_site_outputs_path = "./datasets/outputs_making_up_final_collection"

with open('datasets/database_backup.txt') as json_file:
    print("reading data...")
    data = json.load(json_file)
    for metadata in data:
        imageHashes.append(metadata["image"].split('/')[-1].split('.')[0])


counter = 0
for imageHash in imageHashes:
    print("Searching for hash: " + imageHash)
    # find image in folder which includes hash in name
    # search for image hash in folder

    # and copy into new folder
    imageHit = glob.glob(all_image_clusters_input_path + "/**/*" + imageHash + "*", recursive=True)
    if len(imageHit) == 0:
        print("Miss for hash: " + imageHash)
    else: 
        shutil.copy(imageHit[0], images_on_site_outputs_path)

