import urllib.request, json, ssl, os
from PIL import Image

ctx = ssl._create_unverified_context()
os.makedirs("scratch/rice_candidates", exist_ok=True)

def get_image_info(title):
    url = f'https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url|size|mime&format=json'
    req = urllib.request.Request(url, headers={'User-Agent': 'ZushiApp/1.0'})
    with urllib.request.urlopen(req, context=ctx) as r:
        data = json.loads(r.read().decode())
        pages = data.get('query', {}).get('pages', {})
        for p in pages.values():
            info = p.get('imageinfo', [{}])[0]
            return info.get('url'), info.get('width'), info.get('height')
    return None, 0, 0

def download_and_crop(title, out_path):
    url, w, h = get_image_info(title)
    if not url:
        print("Failed to get url for", title)
        return False
    print(f"Downloading {title} ({w}x{h})...")
    req = urllib.request.Request(url, headers={'User-Agent': 'ZushiApp/1.0'})
    tmp_path = out_path + ".tmp.jpg"
    with urllib.request.urlopen(req, context=ctx) as r, open(tmp_path, "wb") as f:
        f.write(r.read())
    
    # Crop to 4:3 800x600
    with Image.open(tmp_path) as img:
        img = img.convert("RGB")
        iw, ih = img.size
        # target aspect ratio 4:3 = 1.3333
        target_ar = 4.0 / 3.0
        current_ar = iw / ih
        if current_ar > target_ar:
            new_w = int(ih * target_ar)
            left = (iw - new_w) // 2
            box = (left, 0, left + new_w, ih)
        else:
            new_h = int(iw / target_ar)
            top = (ih - new_h) // 2
            box = (0, top, iw, top + new_h)
        cropped = img.crop(box)
        resized = cropped.resize((800, 600), Image.Resampling.LANCZOS)
        resized.save(out_path, quality=90)
    if os.path.exists(tmp_path):
        os.remove(tmp_path)
    print(f"Saved {out_path}")
    return True

# Let's test a few promising titles
candidates = [
    ("File:Kimchi-bokkeum-bap (Kimchi fried rice) - Kogi 2023-09-11.jpg", "scratch/rice_candidates/kimchi_1.jpg"),
    ("File:Kimchi Fried Rice, Farm Egg.jpg", "scratch/rice_candidates/kimchi_2.jpg"),
    ("File:Kimchi fried rice 1.jpg", "scratch/rice_candidates/kimchi_3.jpg"),
    ("File:Nasi goreng indonesia.jpg", "scratch/rice_candidates/nasi_1.jpg"),
    ("File:Nasi goreng at warung garasi ubud bali.jpg", "scratch/rice_candidates/nasi_2.jpg"),
    ("File:Chicken Teriyaki Don - J-Pub Shogun AUD11 (3428018378).jpg", "scratch/rice_candidates/teriyaki_1.jpg"),
    ("File:Chicken Teriyaki with rice and salad - Momotaro AUD14 (3470404176).jpg", "scratch/rice_candidates/teriyaki_2.jpg"),
    ("File:Garlic fried rice (4196994684).jpg", "scratch/rice_candidates/garlic_1.jpg"),
    ("File:Garlic rice, at Steak Miya (2018-11-25).jpg", "scratch/rice_candidates/garlic_2.jpg")
]

for title, out in candidates:
    download_and_crop(title, out)
