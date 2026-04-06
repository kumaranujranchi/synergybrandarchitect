import urllib.request
import ssl

url = "https://i.imgur.com/8j3VafC.png"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
req = urllib.request.Request(url, headers=headers)
context = ssl._create_unverified_context()

try:
    with urllib.request.urlopen(req, context=context, timeout=10) as response:
        with open('client/public/images/synergy-logo.png', 'wb') as out_file:
            data = response.read()
            out_file.write(data)
            print("Successfully downloaded", len(data), "bytes")
except Exception as e:
    print("Error:", e)
