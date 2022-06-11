# delete item from firebase bucket
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage
import itertools
import os
import ast

#print current path
print(os.getcwd())

cred = credentials.Certificate("./serviceAccount.json")

default_app = firebase_admin.initialize_app(cred)
bucketName = "voxmon-abae5"

metaDataCollection = 'voxmonMetadata'

# def bulk_delete_files_in_bucket():
#     # get reference to firebase storage bucket
#     bucket = firebase_admin.storage.bucket(name=bucketName, app=default_app)

#     # get all items in a bucket
#     items = bucket.list_blobs()

#     for item in items:
#         print(item.name) 
#         # delete item from bucket
#         item.delete()

def add_file_to_bucket(file, bucket, id, path):
    # extract gan metadata
    fileName = file.split(".")[0]
    if fileName.split("_")[1] == 'pokemon' and fileName.split("_")[2] == "gan":
        ganType = "Mythical"
    elif fileName.split("_")[1] == 'pokemon' and fileName.split("_")[2] == "digimon":
        ganType = "Ancient"
    elif fileName.split("_")[1] == 'rudalleE':
        ganType = "Heroic"
    elif fileName.split("_")[1] == 'rudalleE' and fileName.split("_")[2] == "gan":
        ganType = "Contemporary"
    else:
        raise RuntimeError('Cannot extract ganType for '+ file)



    if (file.endswith(".png")):
        print(file)
        blob = bucket.blob(file)
        blob.metadata = {
            "customMetadata": {
                "id": id,
                "originType": ganType
            }
        }
        # upload file and then rename so hash is the filename
        blob.upload_from_filename(path)
        bucket.rename_blob(blob, file.split("_")[0]+"."+file.split(".")[1])


def add_files_to_bucket():
    bucket = firebase_admin.storage.bucket(name=bucketName, app=default_app)

    # add file to bucket
    inputDir = 'dataset/images'
    for idx, file in enumerate(os.listdir(inputDir)):
        add_file_to_bucket(file, bucket, idx+1, inputDir+os.sep+file)
       
def read_from_bucket(silent=False):
    bucket = firebase_admin.storage.bucket(name=bucketName, app=default_app)
    items = bucket.list_blobs()
    if not silent:
        for item in items:
            print(item)
    return items


def populate_metadata_collection():
    items = read_from_bucket(True)
    it1, it2 = itertools.tee(items, 2) # create as many as needed

    # validate items metadata
    ids = {}

    metaData = []
    for item in it2:
        # use metadata id if available
        metadata = ast.literal_eval(item.metadata["customMetadata"])
        id = str(metadata['id'])
        originType = metadata['originType']
        metaData.append({
            "id": id,
            "name": "Voxmon #"+str(id),
            "description": "",
            "external_url": "https://voxmon.io/voxmon/"+id,
            "attributes":[{
                "trait_type": "Origin",
                "value": originType
            }],
            "image":"https://voxmon.io/preview/"+item.name,
        })
    
    client = firestore.client()
    write = client.batch()
    numBatched = 0

    for data in metaData:
        if (numBatched == 499):
            numBatched = 0
            write.commit()

        ref = client.collection(metaDataCollection).document(str(data['id']))
        data.pop('id', None);
        write.set(ref, data)
        numBatched += 1

    if numBatched > 0:
        write.commit()


def read_metadata_collection():
    # read from metadataCollection
    client = firestore.client()
    metaData = client.collection(metaDataCollection).stream()
    for doc in metaData:
        print(doc.to_dict().toString() + ",")

read_metadata_collection()

# populate_metadata_collection()