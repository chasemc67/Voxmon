import requests
import random 
key = 'REDACTED'
secret = 'REDACTED'

auth_url = 'https://api.twitter.com/oauth2/token'

data = {'grant_type': 'client_credentials'}
auth_resp = requests.post(auth_url, auth=(key, secret), data=data)
token = auth_resp.json()['access_token']

tweet_id = '1492670186104655873'
#url = 'https://api.twitter.com/2/tweets/1492670186104655873/liking_users'
url = 'https://api.twitter.com/2/tweets/1492670186104655873/retweeted_by'
headers = {'Authorization': 'Bearer %s' % token}
retweets_resp = requests.get(url, headers=headers)
retweets = retweets_resp.json()['data']


winners = random.choices(retweets, k=10)

print(winners)