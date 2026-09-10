import re
import time
from duckduckgo_search import DDGS

with open('./src/data/menu.js', 'r') as f:
    content = f.read()

ddgs = DDGS()

# Find all items
pattern = r'("name"\s*:\s*"([^"]+)"[\s\S]*?"image"\s*:\s*)"[^"]+"'

def get_image_url(dish_name):
    query = f"{dish_name} high quality food photography"
    try:
        results = ddgs.images(query, max_results=1)
        if results:
            return results[0]['image']
    except Exception as e:
        print("Error fetching", dish_name, e)
    return "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=600&auto=format&fit=crop"

def replacer(match):
    prefix = match.group(1)
    dish_name = match.group(2)
    url = get_image_url(dish_name)
    print(f"Got image for {dish_name}: {url}")
    time.sleep(0.5) # avoid rate limit
    return f'{prefix}"{url}"'

new_content = re.sub(pattern, replacer, content)

with open('./src/data/menu.js', 'w') as f:
    f.write(new_content)

print("All done!")
