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
    print(f"Downloading {title} -> {out_path}...")
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

candidates = [
    # Kimchi Rice
    ("File:Korean cuisine-Kimchi bokkeumbap.jpg", "scratch/rice_candidates/kimchi_bokkeumbap.jpg"),
    ("File:Kimchi-bokkeumbap, Kimchi Fried Rice.jpg", "scratch/rice_candidates/kimchi_fried_rice_close.jpg"),
    # Manchow / Wok Fried Rice
    ("File:Veg Chinese Fried Rice Recipe By Sonia Goyal.jpg", "scratch/rice_candidates/veg_chinese_fried_rice.jpg"),
    ("File:Wok Tossed Rice with chicken.jpg", "scratch/rice_candidates/wok_tossed_rice.jpg"),
    ("File:Schezwan fried rice.jpg", "scratch/rice_candidates/schezwan_fried_rice.jpg"),
    # Teriyaki Rice
    ("File:Chicken Teriyaki Don - J-Pub Shogun AUD11 (3428018378).jpg", "scratch/rice_candidates/teriyaki_don_shogun.jpg"),
    ("File:Teriyaki Chicken Rice Bowl from Botejyu (2024-12-21).jpg", "scratch/rice_candidates/teriyaki_rice_botejyu.jpg"),
    ("File:Osaka Teriyaki Rice Bowl.jpg", "scratch/rice_candidates/osaka_teriyaki_bowl.jpg"),
    ("File:Teriyaki chicken meal (with extra chicken) with white rice and vegetables, and a side order of California roll with wasabi and ginger, at Sarku Japan.jpg", "scratch/rice_candidates/teriyaki_sarku.jpg"),
    # Niniku Yakishimi (Garlic Rice)
    ("File:Garlic fried rice (4196994684).jpg", "scratch/rice_candidates/garlic_fried_rice.jpg"),
    ("File:Sinangag Recipe (Garlic Fried Rice).jpg", "scratch/rice_candidates/garlic_sinangag.jpg"),
    # Nasi Goreng
    ("File:Nasi goreng indonesia.jpg", "scratch/rice_candidates/nasi_goreng_indonesia.jpg"),
    ("File:Gili Meno Island, Nasi goreng, Fried rice with juice, Indonesia.jpg", "scratch/rice_candidates/nasi_goreng_gili.jpg")
]

for title, out in candidates:
    download_and_crop(title, out)
    time.sleep(1.2)

print("Finished candidate downloads!")
