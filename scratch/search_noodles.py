import urllib.request, json, ssl, time
ctx = ssl._create_unverified_context()
HEADERS = {'User-Agent': 'ZushiFineDining/1.0 (culinary_menu_curation; contact@zushi.com)'}

def search_commons(q, limit=6):
    url = f'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q)}&srnamespace=6&srlimit={limit}&format=json'
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, context=ctx) as r:
        data = json.loads(r.read().decode())
        return [item['title'] for item in data.get('query', {}).get('search', [])]

def search_flickr(tag):
    url = f'https://www.flickr.com/services/feeds/photos_public.gne?tags={urllib.parse.quote(tag)}&format=json&nojsoncallback=1'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, context=ctx) as r:
            data = json.loads(r.read().decode())
            return data.get('items', [])
    except Exception as e:
        print(f'Flickr error {tag}: {e}')
        return []

# Commons searches
queries = {
    'schezuan_noodles': ['File:schezwan noodles', 'File:hakka noodles', 'File:chow mein'],
    'drunken_noodles': ['File:pad kee mao', 'File:drunken noodles thai basil'],
    'japchae': ['File:japchae', 'File:잡채'],
    'pad_thai': ['File:pad thai'],
    'butter_garlic': ['File:garlic noodles', 'File:butter garlic noodles', 'File:aglio olio']
}

results = {}
for dish, qs in queries.items():
    results[dish] = []
    for q in qs:
        titles = search_commons(q, 5)
        results[dish].extend(titles)
        time.sleep(0.5)

# Flickr
flickr_tags = {
    'schezuan': 'schezwannoodles,hakkanoodles',
    'padthai': 'padthai',
    'japchae': 'japchae',
    'drunkennoodles': 'padkeemao,drunkennoodles',
    'garlicnoodles': 'garlicnoodles'
}
flickr_results = {}
for key, tag in flickr_tags.items():
    items = search_flickr(tag)
    flickr_results[key] = [(i['title'], i['media']['m'].replace('_m.jpg', '_b.jpg')) for i in items[:5]]
    time.sleep(0.5)

with open('scratch/noodle_search.json', 'w') as f:
    json.dump({'commons': results, 'flickr': flickr_results}, f, indent=2)

for dish, titles in results.items():
    print(f'=== {dish} (Commons: {len(titles)}) ===')
    for t in titles[:4]:
        print(f'  {t}')

for key, items in flickr_results.items():
    print(f'=== {key} (Flickr: {len(items)}) ===')
    for t, u in items[:3]:
        print(f'  {t}')

