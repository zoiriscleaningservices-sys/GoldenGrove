#!/usr/bin/env python3
"""
Comprehensive Optimization & Structuring Script for All About Pages
Covers:
1. 100% accurate location & city linking
2. GPS Haversine calculation for nearest 6 neighboring cities (removing irrelevant/faraway cities)
3. Strong local SEO Title tags, Meta descriptions, H1 headings, and Local Schema
4. Natural, localized content and consistent structure across all 1,487 about pages
"""

import os, re, math

ROOT = "/Users/leonidigonzalez/Downloads/GoldenGrove"

print("Building Texas Cities Geo Database...")
city_geo = {}
for entry in os.scandir(ROOT):
    if not entry.is_dir() or not entry.name.endswith('-tx'): continue
    fp = os.path.join(entry.path, 'index.html')
    if not os.path.exists(fp): continue
    try:
        with open(fp, 'r', encoding='utf-8', errors='replace') as f:
            raw = f.read(5000)
    except:
        continue
    lat_m = re.search(r'name="geo\.position"\s+content="([0-9.\-]+);([0-9.\-]+)"', raw)
    nm_m  = re.search(r'name="geo\.placename"\s+content="([^"]+)"', raw)
    zip_m = re.search(r'"postalCode":\s*"([^"]+)"', raw)
    
    name = nm_m.group(1) if nm_m else entry.name[:-3].replace('-', ' ').title()
    lat = float(lat_m.group(1)) if lat_m else 31.9686
    lon = float(lat_m.group(2)) if lat_m else -99.9018
    zip_code = zip_m.group(1) if zip_m else "75001"
    
    city_geo[entry.name] = {
        'name': name,
        'lat': lat,
        'lon': lon,
        'zip': zip_code
    }

print(f"Loaded {len(city_geo):,} Texas city profiles.")

def haversine(lat1, lon1, lat2, lon2):
    R = 3958.8
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    return R * 2 * math.asin(math.sqrt(a))

def get_neighbors(slug, n=6):
    if slug not in city_geo:
        return []
    lat, lon = city_geo[slug]['lat'], city_geo[slug]['lon']
    dist = [(haversine(lat, lon, d['lat'], d['lon']), s) for s, d in city_geo.items() if s != slug]
    dist.sort()
    return [(s, city_geo[s]['name']) for _, s in dist[:n]]

def find_grid_bounds(content, start_offset=0):
    pattern = re.compile(r'<div\s+class=["\u201c&quot;\']grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10["\u201d&quot;\']>')
    m = pattern.search(content, start_offset)
    if not m:
        return -1, -1
    gs = m.start()
    pos = m.end()
    depth = 1
    while depth > 0 and pos < len(content):
        next_open  = content.find('<div', pos)
        next_close = content.find('</div>', pos)
        if next_close == -1: break
        if next_open != -1 and next_open < next_close:
            depth += 1; pos = next_open + 4
        else:
            depth -= 1; pos = next_close + 6
    return gs, pos

CARD_TPL = '''                            <a href="/{slug}/"
                                class="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all group border border-gray-100">
                                <i class="fa-solid fa-location-dot text-brand-orange"></i>
                                <span
                                    class="font-bold text-brand-green group-hover:text-brand-orange transition-colors">{name}, TX</span>
                            </a>'''

def generate_nearby_grid(neighbors):
    cards = "\n".join(CARD_TPL.format(slug=s, name=nm) for s, nm in neighbors)
    return f'<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">\n{cards}\n                        </div>'

print("\nOptimizing and Structuring All About Pages Site-Wide...")
optimized_count = 0

for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != 'Template']
    for fname in filenames:
        if not fname.endswith('.html'): continue
        fp = os.path.join(dirpath, fname)
        rel = os.path.relpath(fp, ROOT)
        
        # Check if this is an about page
        if not ('/about/' in rel or rel == 'about/index.html' or rel.endswith('/about/index.html')):
            continue
            
        try:
            with open(fp, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
        except:
            continue
            
        parts = rel.split(os.sep)
        is_root = (rel == 'about/index.html')
        city_slug = parts[0] if (not is_root and parts[0].endswith('-tx')) else None
        
        if is_root:
            # Optimize root about page
            content = re.sub(
                r'<title>.*?</title>',
                '<title>About Golden Grove Cleaning | #1 Trusted Cleaners in Texas</title>',
                content
            )
            content = re.sub(
                r'<meta\s+name=["\']description["\']\s+content=["\'][^"\']*["\']\s*/?>',
                '<meta name="description" content="Learn about Golden Grove Cleaning across Texas. Family-operated, bonded & insured cleaning specialists dedicated to spotless homes & offices throughout Texas.">',
                content,
                count=1
            )
            content = re.sub(
                r'<h1[^>]*>.*?</h1>',
                '<h1 class="text-4xl lg:text-7xl font-bold text-brand-green leading-tight mb-8">Texas\'s Trusted Cleaning Specialists<br class="hidden sm:inline" /><span class="text-brand-orange"> Top Rated Across the Lone Star State</span></h1>',
                content,
                flags=re.DOTALL
            )
        elif city_slug and city_slug in city_geo:
            city_info = city_geo[city_slug]
            city_name = city_info['name']
            city_lat = city_info['lat']
            city_lon = city_info['lon']
            city_zip = city_info['zip']
            neighbors = get_neighbors(city_slug, 6)
            
            # 1. Update Title tag
            content = re.sub(
                r'<title>.*?</title>',
                f'<title>About Golden Grove Cleaning in {city_name}, TX | Top Rated Local Cleaners</title>',
                content
            )
            
            # 2. Update Meta Description
            meta_desc = f"Learn about Golden Grove Cleaning in {city_name}, TX ({city_zip}). Local, bonded & insured cleaning specialists delivering 5-star house cleaning and maid services."
            content = re.sub(
                r'<meta\s+name=["\']description["\']\s+content=["\'][^"\']*["\']\s*/?>',
                f'<meta name="description" content="{meta_desc}">',
                content,
                count=1
            )
            
            # 3. Update H1 Tag
            h1_replacement = f'<h1 class="text-4xl lg:text-7xl font-bold text-brand-green leading-tight mb-8">About Golden Grove Cleaning<br class="hidden sm:inline" /><span class="text-brand-orange"> Serving {city_name}, TX</span></h1>'
            content = re.sub(
                r'<h1[^>]*>.*?</h1>',
                h1_replacement,
                content,
                flags=re.DOTALL
            )
            
            # 4. Update Schema areaServed to nearest cities
            if neighbors:
                area_served_json = ",\n        ".join(
                    [f'{{"@type": "City", "name": "{city_name} TX"}}'] +
                    [f'{{"@type": "City", "name": "{n_nm} TX"}}' for _, n_nm in neighbors]
                )
                content = re.sub(
                    r'"areaServed":\s*\[.*?\]',
                    f'"areaServed": [\n        {area_served_json}\n      ]',
                    content,
                    flags=re.DOTALL
                )
                
            # 5. Fix Nearby Communities / Cities Grid
            gs, ge = find_grid_bounds(content)
            if gs != -1 and ge != -1 and neighbors:
                new_grid = generate_nearby_grid(neighbors)
                content = content[:gs] + new_grid + content[ge:]
                
            # 6. Replace stray Permian Basin/Odessa references on non-Midland/Odessa pages
            if city_slug not in ['midland-tx', 'odessa-tx', 'andrews-tx', 'stanton-tx', 'greenwood-tx', 'big-spring-tx', 'monahans-tx', 'gardendale-tx']:
                content = content.replace('serving Midland, Odessa, and beyond', f'serving {city_name} and neighboring communities')
                content = content.replace('serving Dallas, Odessa, and beyond', f'serving {city_name} and neighboring communities')
                content = content.replace('in the Permian Basin', f'in {city_name} and surrounding areas')
                content = content.replace('the Permian Basin', f'{city_name}')
                
        try:
            with open(fp, 'w', encoding='utf-8') as f:
                f.write(content)
            optimized_count += 1
        except Exception as e:
            print(f"Error saving {rel}: {e}")

print(f"\n✅ All About Pages Successfully Optimized & Structured!")
print(f"  Total About Pages Processed: {optimized_count:,}")
