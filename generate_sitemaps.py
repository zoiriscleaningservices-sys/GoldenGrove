#!/usr/bin/env python3
"""
Sitemap Generator for Golden Grove Cleaning Services
Generates complete, W3C-compliant XML sitemaps and sitemap index files
for 100% of live HTML pages across the entire site.
"""

import os, math, datetime

ROOT = "/Users/leonidigonzalez/Downloads/GoldenGrove"
DOMAIN = "https://www.goldengrovecleaning.com"
CHUNK_SIZE = 10000
TODAY = datetime.datetime.now().strftime("%Y-%m-%d")

print("Step 1: Discovering all live HTML files...")
all_urls = []

for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != 'Template']
    for fname in filenames:
        if not fname.endswith('.html'):
            continue
        if fname in ['old_index.html', '404.html']:
            continue
            
        fp = os.path.join(dirpath, fname)
        rel = os.path.relpath(fp, ROOT)
        rel_dir = os.path.dirname(rel)
        
        if rel_dir == '':
            url = f"{DOMAIN}/"
            priority = "1.0"
            changefreq = "daily"
        else:
            url = f"{DOMAIN}/{rel_dir}/"
            # Assign appropriate priority
            parts = rel_dir.split(os.sep)
            if len(parts) == 1:
                # Top level city or key page (e.g. /garland-tx/, /book-now/, /blog/, /about/)
                priority = "0.9" if rel_dir in ['book-now', 'blog', 'about', 'midland-tx', 'dallas-tx', 'houston-tx', 'austin-tx', 'san-antonio-tx'] else "0.8"
                changefreq = "weekly"
            elif len(parts) == 2:
                priority = "0.8"
                changefreq = "weekly"
            else:
                priority = "0.7"
                changefreq = "weekly"
                
        all_urls.append((url, priority, changefreq))

# Deduplicate URLs
unique_dict = {}
for url, prio, freq in all_urls:
    if url not in unique_dict:
        unique_dict[url] = (prio, freq)

# Sort URLs: root first, then by priority desc, then alphabetically
sorted_urls = sorted(unique_dict.keys(), key=lambda u: (0 if u == f"{DOMAIN}/" else 1, u))

total_urls = len(sorted_urls)
num_sitemaps = math.ceil(total_urls / CHUNK_SIZE)

print(f"  Found {total_urls:,} total unique live URLs.")
print(f"  Generating {num_sitemaps} chunked sitemaps ({CHUNK_SIZE:,} URLs per file)...")

sitemap_files = []

for i in range(num_sitemaps):
    chunk_num = i + 1
    sitemap_filename = f"sitemap_{chunk_num}.xml"
    sitemap_path = os.path.join(ROOT, sitemap_filename)
    sitemap_files.append(sitemap_filename)
    
    chunk_urls = sorted_urls[i * CHUNK_SIZE : (i + 1) * CHUNK_SIZE]
    
    lines = [
        "<?xml version='1.0' encoding='utf-8'?>",
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    
    for url in chunk_urls:
        prio, freq = unique_dict[url]
        lines.append("\t<url>")
        lines.append(f"\t\t<loc>{url}</loc>")
        lines.append(f"\t\t<lastmod>{TODAY}</lastmod>")
        lines.append(f"\t\t<changefreq>{freq}</changefreq>")
        lines.append(f"\t\t<priority>{prio}</priority>")
        lines.append("\t</url>")
        
    lines.append("</urlset>")
    
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
        
    print(f"  Saved {sitemap_filename}: {len(chunk_urls):,} URLs")

print("\nStep 2: Generating sitemap.xml and sitemap_index.xml (Sitemap Index)...")

index_lines = [
    "<?xml version='1.0' encoding='utf-8'?>",
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    f"\t<sitemap><loc>{DOMAIN}/sitemap_midland_priority.xml</loc><lastmod>{TODAY}</lastmod></sitemap>"
]

for sm in sitemap_files:
    index_lines.append(f"\t<sitemap><loc>{DOMAIN}/{sm}</loc><lastmod>{TODAY}</lastmod></sitemap>")

index_lines.append("</sitemapindex>")
index_xml_content = "\n".join(index_lines) + "\n"

# Write sitemap.xml
with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8") as f:
    f.write(index_xml_content)

# Write sitemap_index.xml
with open(os.path.join(ROOT, "sitemap_index.xml"), "w", encoding="utf-8") as f:
    f.write(index_xml_content)

print(f"  Saved sitemap.xml & sitemap_index.xml referencing {len(sitemap_files) + 1} sitemaps.")
print("✅ Complete Sitemap Generation Done!")
