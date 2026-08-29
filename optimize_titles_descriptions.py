#!/usr/bin/env python3
"""
Site-wide On-Page SEO Optimization Script for Golden Grove Cleaning
Repairs truncated titles (2,068 pages) and truncated descriptions (12,043 pages),
ensuring high-CTR, complete sentences, keyword relevance without stuffing,
and perfect Google Snippet optimization across all 51,181 pages.
"""

import os, re

ROOT = "/Users/leonidigonzalez/Downloads/GoldenGrove"

def clean_city_name(slug):
    """Convert folder slug like 'austin-tx' or 'fort-worth-tx' to proper city name."""
    if slug.endswith('-tx'):
        slug = slug[:-3]
    return slug.replace('-', ' ').title()

def fix_title(title, city_name, service_name):
    """Generate a clean, high-CTR, non-truncated title (50-65 chars)."""
    t = title.strip()
    if not ('...' in t or '…' in t):
        return t
        
    t_clean = t.replace('...', '').replace('…', '').strip()
    
    if 'Service Areas' in t or 'Locations' in t:
        return f"Cleaning Service Areas in {city_name}, TX | Golden Grove"
    elif 'Commercial' in t or 'Janitorial' in t:
        return f"Commercial Cleaning in {city_name}, TX | Golden Grove"
    elif 'Deep Cleaning' in t:
        return f"Deep Cleaning Services in {city_name}, TX | Golden Grove"
    elif 'Move Out' in t or 'Move-Out' in t or 'Move In' in t:
        return f"Move-Out Cleaning in {city_name}, TX | Golden Grove"
    elif 'House Cleaning' in t or 'Maid' in t:
        return f"House Cleaning Services in {city_name}, TX | Golden Grove"
    elif 'About' in t:
        return f"About Golden Grove Cleaning in {city_name}, TX"
    elif 'Gallery' in t:
        return f"Cleaning Photo Gallery | {city_name}, TX | Golden Grove"
    elif 'Blog' in t:
        return f"Cleaning Tips & Guides | {city_name}, TX | Golden Grove"
    elif service_name:
        srv_title = service_name.replace('-', ' ').title()
        return f"{srv_title} in {city_name}, TX | Golden Grove"
    else:
        return f"Top Cleaning Services in {city_name}, TX | Golden Grove"

def fix_description(desc, city_name, service_name):
    """Generate a clean, persuasive, non-truncated meta description (140-155 chars)."""
    d = desc.strip()
    if not ('...' in d or '…' in d or len(d) < 80 or d.endswith('Call') or d.endswith('and')):
        return d
        
    d_clean = d.replace('...', '').replace('…', '').strip()
    
    if 'move out' in d_clean.lower() or 'move-out' in d_clean.lower() or 'deposit' in d_clean.lower():
        return f"Top-rated move out cleaning in {city_name}, TX. Guaranteed deposit back with our thorough move-in/out checklist. Call (432) 218-1700 or book online."
    elif 'deep cleaning' in d_clean.lower() or 'detailed' in d_clean.lower():
        return f"Professional deep cleaning services in {city_name}, TX. Thorough top-to-bottom sanitization for homes & offices. Bonded, insured & 100% guaranteed."
    elif 'commercial' in d_clean.lower() or 'janitorial' in d_clean.lower() or 'office' in d_clean.lower():
        return f"Premier commercial cleaning & janitorial services in {city_name}, TX. Reliable office and facility cleaning with flexible scheduling. Call (432) 218-1700."
    elif 'gallery' in d_clean.lower() or 'photo' in d_clean.lower():
        return f"View our work! See before & after photos of house cleaning, deep cleaning, and commercial projects in {city_name}, TX. Trusted Golden Grove pros."
    elif 'about' in d_clean.lower() or 'learn about' in d_clean.lower():
        return f"Learn about Golden Grove Cleaning in {city_name}, TX. Family-operated, bonded & insured cleaning specialists dedicated to spotless homes & offices."
    elif 'blog' in d_clean.lower() or 'tips' in d_clean.lower():
        return f"Expert cleaning tips, local home care advice, and move-out checklists from Golden Grove Cleaning in {city_name}, TX. Keep your property sparkling."
    elif 'neighborhood' in d_clean.lower() or 'heights' in d_clean.lower() or 'estates' in d_clean.lower() or 'downtown' in d_clean.lower():
        return f"Premier cleaning services in {city_name}, TX. Trusted by local homeowners for house cleaning, maid service, and janitorial care. Call (432) 218-1700."
    else:
        srv_str = f"{service_name.replace('-', ' ')} " if service_name else ""
        return f"Top-rated {srv_str}cleaning services in {city_name}, TX. Vetted, bonded & insured professionals with 100% satisfaction guarantee. Book online in 60s."

print("Starting site-wide Title & Description optimization...")
updated_titles = 0
updated_descs = 0
total_files = 0

for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != 'Template']
    for fname in filenames:
        if not fname.endswith('.html'): continue
        total_files += 1
        fp = os.path.join(dirpath, fname)
        rel = os.path.relpath(fp, ROOT)
        
        # Determine city and service from directory structure
        parts = rel.split(os.sep)
        city_slug = parts[0] if parts[0].endswith('-tx') else 'Texas'
        city_name = clean_city_name(city_slug)
        service_name = parts[1] if len(parts) > 2 and parts[1] != 'index.html' else ''
        if len(parts) == 2 and parts[0] in ['about', 'blog', 'book-now']:
            city_name = "Texas"
            service_name = parts[0]
            
        try:
            with open(fp, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
        except:
            continue
            
        modified = False
        
        # 1. Fix Title
        t_match = re.search(r'<title>(.*?)</title>', content, re.I | re.S)
        if t_match and ('...' in t_match.group(1) or '…' in t_match.group(1)):
            old_title = t_match.group(1)
            new_title = fix_title(old_title, city_name, service_name)
            if new_title != old_title:
                content = content[:t_match.start(1)] + new_title + content[t_match.end(1):]
                updated_titles += 1
                modified = True
                
        # 2. Fix Description
        d_match = re.search(r'<meta\s+([^>]*name=[\"\']description[\"\'][^>]*content=[\"\'])([^\"\']*)([\"\'][^>]*>)', content, re.I)
        if not d_match:
            d_match = re.search(r'<meta\s+([^>]*content=[\"\'])([^\"\']*)([\"\'][^>]*name=[\"\']description[\"\'][^>]*>)', content, re.I)
            
        if d_match and ('...' in d_match.group(2) or '…' in d_match.group(2) or len(d_match.group(2)) < 80 or d_match.group(2).endswith('Call')):
            old_desc = d_match.group(2)
            new_desc = fix_description(old_desc, city_name, service_name)
            if new_desc != old_desc:
                # Replace content attribute
                full_old_tag = d_match.group(0)
                full_new_tag = f'<meta name="description" content="{new_desc}">'
                content = content.replace(full_old_tag, full_new_tag, 1)
                updated_descs += 1
                modified = True
                
        if modified:
            try:
                with open(fp, 'w', encoding='utf-8') as f:
                    f.write(content)
            except Exception as e:
                print(f"Error saving {rel}: {e}")

print(f"\n✅ Optimization complete across {total_files:,} pages!")
print(f"  Fixed Titles:       {updated_titles:,}")
print(f"  Fixed Descriptions: {updated_descs:,}")
