# Reference: https://www.pyimagesearch.com/2018/04/09/how-to-quickly-build-a-deep-learning-image-dataset/

from requests import exceptions
import argparse
import requests
#import cv2
import os
import csv
import time

from pathlib import Path

def pull_from_bing(query, output):
    with open('apiKey.txt', 'r') as apiKeyFile:
        API_KEY = apiKeyFile.read()
    MAX_RESULTS = 50
    GROUP_SIZE = 50

    URL= "https://api.bing.microsoft.com/v7.0/images/search"

    EXCEPTIONS = set([IOError, FileNotFoundError, exceptions.RequestException, exceptions.HTTPError, exceptions.ConnectionError, exceptions.Timeout])

    # store the search term in a convenience variable then set the
    # headers and search parameters
    term = query
    headers = {"Ocp-Apim-Subscription-Key" : API_KEY}
    params = {"q": term, "offset": 0, "count": GROUP_SIZE}

    # make the search
    print("[INFO] searching Bing API for '{}'".format(term))
    time.sleep(10)
    search = requests.get(URL, headers=headers, params=params)
    search.raise_for_status()

    # grab the results from the search, including the total number of
    # estimated results returned by the Bing API
    results = search.json()
    estNumResults = min(results["totalEstimatedMatches"], MAX_RESULTS)
    print("[INFO] {} total results for '{}'".format(estNumResults, term))

    # initialize the total number of images downloaded thus far
    total = 0

    # Create dir to output
    os.makedirs(output, exist_ok=True)

    # loop over the estimated number of results in `GROUP_SIZE` groups
    for offset in range(0, estNumResults, GROUP_SIZE):
        # update the search parameters using the current offset, then
        # make the request to fetch the results
        print("[INFO] making request for group {}-{} of {}...".format(offset, offset + GROUP_SIZE, estNumResults))
        params["offset"] = offset
        search = requests.get(URL, headers=headers, params=params)
        search.raise_for_status()
        results = search.json()
        print("[INFO] saving images for group {}-{} of {}...".format(offset, offset + GROUP_SIZE, estNumResults))

        for v in results["value"]:
            try:
                # make request to download image
                print("[INFO] fetching: {}".format(v["contentUrl"]))
                r = requests.get(v["contentUrl"], timeout=30)

                # build path to output image
                ext = v["contentUrl"][v["contentUrl"].rfind("."):]
                p = os.path.sep.join([output, "{}{}".format(str(total).zfill(8), ext)])

                # write image to disk
                f = open(p, "wb")
                f.write(r.content)
                f.close()

            except Exception as e:
                if type(e) in EXCEPTIONS:
                    print("[INFO] skipping: {}".format(v["contentUrl"]))
                    continue
            total += 1

#pull_from_bing("Vegiemon", "./Digimon/Test")


def scrapeDigimonCsv():
    nameIndex = 1
    stageIndex = 2
    with open('DigiDB_digimonlist.csv') as csvfile:
        lines = csvfile.readlines()
        for row in lines[143:]:
            rowArr = row.split(",")
            name = rowArr[nameIndex]
            stage = rowArr[stageIndex]
            print("=======================\n\n\n")
            print(name)
            print("\n\n\n=======================")
            pull_from_bing(name, os.path.sep.join(["Digimon",stage,name.split(" ")[0]]))


def scrapePokemonCsv():
    nameIndex = 2
    isSubLegendIndex = 6
    isLegendIndex = 7
    isMythicIndex = 8

    with open('pokedex_(Update.04.20).csv') as csvfile:
        lines = csvfile.readlines()
        for row in lines[1:]:
            rowArr = row.split(",")
            name = rowArr[nameIndex]
            legendaryStatus = False
            if (rowArr[isSubLegendIndex] == '1'):
                legendaryStatus = "Sub_Legendary"
            elif (rowArr[isLegendIndex] == '1'):
                legendaryStatus = "Legendary"
            elif(rowArr[isMythicIndex] == '1'):
                legendaryStatus = "Mythic"
            if (legendaryStatus != False):
                #print(name + " : " + legendaryStatus)
                print("=======================\n\n\n")
                print(name)
                print("\n\n\n=======================")
                pull_from_bing(name, os.path.sep.join(["Pokemon",legendaryStatus,name.split(" ")[0]]))

scrapeDigimonCsv()