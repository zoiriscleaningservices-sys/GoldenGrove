#!/usr/bin/env python3
"""
Ensure all 1,486 city about pages have a dedicated, beautiful
'Areas We Serve Near {City}, TX' section linking to the 6 GPS-calculated nearest neighbor cities.
"""

import os, re, math

ROOT = "/Users/leonidigonzalez/Downloads/GoldenGrove"

print("Loading Texas Geo database...")
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
    
    name = nm_m.group(1) if nm_m else entry.name[:-3].replace('-', ' ').title()
    lat = float(lat_m.group(1)) if lat_m else 31.9686
    lon = float(lat_m.group(2)) if lat_m else -99.9018
    
    city_geo[entry.name] = {
        'name': name,
        'lat': lat,
        'lon': lon
    }

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

def build_nearby_section(city_name, neighbors):
    cards = "\n".join([
        f'''                    <a href="/{s}/" class="flex items-center gap-4 p-5 bg-brand-sand rounded-2xl hover:bg-orange-50 hover:shadow-md transition-all group border border-gray-100">
                        <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-orange shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-colors">
                            <i class="fa-solid fa-location-dot"></i>
                        </div>
                        <div>
                            <span class="font-bold text-gray-900 group-hover:text-brand-orange transition-colors block">{nm}, TX</span>
                            <span class="text-xs text-gray-500">Professional Maid &amp; Cleaning Services</span>
                        </div>
                    </a>'''
        for s, nm in neighbors
    ])
    
    return f"""        <!-- NEARBY COMMUNITIES & SERVICE AREAS -->
        <section id="nearby-areas" class="py-16 sm:py-20 bg-white border-t border-gray-100">
            <div class="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                <div class="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
                    <span class="inline-block px-4 py-1.5 bg-orange-50 text-brand-orange font-bold text-sm tracking-widest uppercase rounded-full mb-4">
                        Local Coverage
                    </span>
                    <h2 class="text-3xl sm:text-4xl font-bold text-brand-green">
                        Areas We Serve Near <span class="text-brand-orange">{city_name}, TX</span>
                    </h2>
                    <p class="mt-4 text-gray-600">
                        In addition to {city_name}, our background-checked cleaning technicians proudly serve neighboring communities across the region.
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="100">
{cards}
                </div>
            </div>
        </section>"""

print("Injecting / Updating Dedicated Nearby Communities Section across All City About Pages...")
updated_count = 0

for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != 'Template']
    for fname in filenames:
        if not fname.endswith('.html'): continue
        fp = os.path.join(dirpath, fname)
        rel = os.path.relpath(fp, ROOT)
        if not ('/about/' in rel or dirpath.endswith('/about')): continue
        if rel == 'about/index.html': continue
        
        parts = rel.split(os.sep)
        city_slug = parts[0] if parts[0].endswith('-tx') else None
        if not city_slug or city_slug not in city_geo: continue
        
        city_name = city_geo[city_slug]['name']
        neighbors = get_neighbors(city_slug, 6)
        if not neighbors: continue
        
        with open(fp, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
            
        nearby_sec = build_nearby_section(city_name, neighbors)
        
        if 'id="nearby-areas"' in content:
            content = re.sub(
                r'<!-- NEARBY COMMUNITIES.*?<!-- MODERN QUOTE',
                f'{nearby_sec}\n\n        <!-- MODERN QUOTE',
                content,
                flags=re.DOTALL
            )
        else:
            if '<!-- MODERN QUOTE & CONTACT FORM -->' in content:
                content = content.replace(
                    '<!-- MODERN QUOTE & CONTACT FORM -->',
                    f'{nearby_sec}\n\n        <!-- MODERN QUOTE & CONTACT FORM -->'
                )
            elif '<section id="quote"' in content:
                content = re.sub(
                    r'<section\s+id=[\"\']quote[\"\']',
                    f'{nearby_sec}\n\n        <section id="quote"',
                    content,
                    count=1
                )
                
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(content)
        updated_count += 1

print(f"\n✅ Dedicated Nearby Communities Section successfully embedded in {updated_count:,} city about pages!")
