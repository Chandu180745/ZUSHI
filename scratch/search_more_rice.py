import urllib.request, json, ssl, time, os
from PIL import Image

ctx = ssl._create_unverified_context()
HEADERS = {
    'User-Agent': 'ZushiFineDiningApp/2.0 (culinary_menu_curation; contact@zushirestaurant.com)'
}

def search_commons(query, limit=10):
    url = f'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&srnamespace=6&srlimit={limit}&format=json'
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, context=ctx) as r:
        data = json.loads(r.read().decode())
        return [item['title'] for item in data.get('query', {}).get('search', [])]

def get_image_info(title):
    url = f'https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url|size|mime&format=json'
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, context=ctx) as r:
        data = json.loads(r.read().decode())
        pages = data.get('query', {}).get('pages', {})
        for p in pages.values():
            info = p.get('imageinfo', [{}])[0]
            return info.get('url'), info.get('width'), info.get('height')
    return None, 0, 0

queries = [
    "File:kimchi fried rice",
    "File:kimchi bokkeumbap",
    "File:garlic fried rice",
    "File:garlic rice chahan",
    "File:teriyaki chicken rice",
    "File:teriyaki don",
    "File:teriyaki chicken bowl",
    "File:schezwan fried rice",
    "File:chinese fried rice wok",
    "File:manchow fried rice",
    "File:vegetable fried rice bowl"
]

results = {}
for q in queries:
    print("Searching:", q)
    titles = search_commons(q, 5)
    results[q] = titles
    time.sleep(1)

with open("scratch/rice_search_results.json", "w") as f:
    json.dump(results, f, indent=2)

print("Search complete!")
