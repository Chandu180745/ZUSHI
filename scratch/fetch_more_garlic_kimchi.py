import urllib.request, json, ssl, time, os
from PIL import Image

ctx = ssl._create_unverified_context()
HEADERS = {'User-Agent': 'ZushiFineDining/1.0 (culinary_menu_curation; contact@zushi.com)'}

def get_thumb_url(title):
    url = f'https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json'
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, context=ctx) as r:
            data = json.loads(r.read().decode())
            pages = data['query']['pages']
            for p in pages.values():
                info = p.get('imageinfo', [{}])[0]
                return info.get('thumburl') or info.get('url')
    except Exception as e:
        print(f"Error fetching {title}: {e}")
    return None

def download_and_crop(title, out_path):
    thumb = get_thumb_url(title)
    if not thumb:
        return False
    req = urllib.request.Request(thumb, headers=HEADERS)
    tmp = out_path + ".tmp"
    try:
        with urllib.request.urlopen(req, context=ctx) as r, open(tmp, "wb") as f:
            f.write(r.read())
        
        with Image.open(tmp) as img:
            img = img.convert("RGB")
            iw, ih = img.size
            target_ar = 4.0 / 3.0
            cur_ar = iw / ih
            if cur_ar > target_ar:
                new_w = int(ih * target_ar)
                left = (iw - new_w) // 2
                box = (left, 0, left + new_w, ih)
            else:
                new_h = int(iw / target_ar)
                top = (ih - new_h) // 2
                box = (0, top, iw, top + new_h)
            cropped = img.crop(box)
            resized = cropped.resize((800, 600), Image.Resampling.LANCZOS)
            resized.save(out_path, quality=92)
        if os.path.exists(tmp):
            os.remove(tmp)
        print(f"Success: {out_path}")
        return True
    except Exception as e:
        print(f"Failed {title}: {e}")
        if os.path.exists(tmp):
            os.remove(tmp)
        return False

more_candidates = [
    ("File:Garlic rice, at Steak Miya (2018-11-25).jpg", "scratch/rice_candidates/garlic_rice_miya.jpg"),
    ("File:Garlic rice, at Ikinari! Steak (2019-04-13).jpg", "scratch/rice_candidates/garlic_rice_ikinari.jpg"),
    ("File:A mound of chahan.jpg", "scratch/rice_candidates/chahan_mound.jpg"),
    ("File:Chahan (dish) Japanese fried rice.jpg", "scratch/rice_candidates/chahan_dish.jpg"),
    ("File:Yakimeshi Houhi.jpg", "scratch/rice_candidates/yakimeshi_houhi.jpg"),
    ("File:Kimchi chahan.jpg", "scratch/rice_candidates/kimchi_chahan.jpg"),
    ("File:Kimchi fried rice 2.jpg", "scratch/rice_candidates/kimchi_fried_rice_2.jpg"),
]

for title, out in more_candidates:
    download_and_crop(title, out)
    time.sleep(1.2)

print("Done!")
