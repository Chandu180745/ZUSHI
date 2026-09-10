import urllib.request, json, ssl, os
from PIL import Image

ctx = ssl._create_unverified_context()
os.makedirs("scratch/flickr_rice", exist_ok=True)

def search_flickr(tag):
    url = f'https://www.flickr.com/services/feeds/photos_public.gne?tags={urllib.parse.quote(tag)}&format=json&nojsoncallback=1'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, context=ctx) as r:
            data = json.loads(r.read().decode())
            return data.get('items', [])
    except Exception as e:
        print(f"Error {tag}: {e}")
        return []

def download_and_crop(url, out_path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
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
        print(f"Saved: {out_path}")
        return True
    except Exception as e:
        print(f"Failed {out_path}: {e}")
        if os.path.exists(tmp):
            os.remove(tmp)
        return False

# Kimchi fried rice
kimchi_items = search_flickr('kimchifriedrice')
for i, item in enumerate(kimchi_items[:4]):
    img_url = item['media']['m'].replace('_m.jpg', '_b.jpg')
    download_and_crop(img_url, f"scratch/flickr_rice/kimchi_flickr_{i+1}.jpg")

# Garlic fried rice
garlic_items = search_flickr('garlicfriedrice')
for i, item in enumerate(garlic_items[:4]):
    img_url = item['media']['m'].replace('_m.jpg', '_b.jpg')
    download_and_crop(img_url, f"scratch/flickr_rice/garlic_flickr_{i+1}.jpg")

# Chinese fried rice / wok
wok_items = search_flickr('chinesefriedrice')
for i, item in enumerate(wok_items[:4]):
    img_url = item['media']['m'].replace('_m.jpg', '_b.jpg')
    download_and_crop(img_url, f"scratch/flickr_rice/wok_flickr_{i+1}.jpg")

