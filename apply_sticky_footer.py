#!/usr/bin/env python3
"""
Universal Sticky Footer & Zero-Blank-Screen Hardening Script
Implements modern Flexbox Sticky Footer across all 51,182 pages:
1. html: height: 100%
2. body: min-height: 100vh; min-height: 100dvh; display: flex; flex-direction: column;
3. main: flex: 1 0 auto; (expands to push footer to bottom on short pages)
4. footer: margin-top: auto; (anchors footer to viewport bottom)
"""

import os, re

ROOT = "/Users/leonidigonzalez/Downloads/GoldenGrove"

OLD_STYLE_BLOCK = """    <style>
        /* Zero-Blank-Screen & AOS Rendering Failsafe */
        [data-aos] {
            opacity: 1 !important;
            transform: none !important;
            visibility: visible !important;
        }
        html.aos-init [data-aos] {
            opacity: 0;
        }
        html.aos-init [data-aos].aos-animate {
            opacity: 1;
        }
    </style>"""

NEW_STYLE_BLOCK = """    <style>
        /* Zero-Blank-Screen & AOS Rendering Failsafe */
        [data-aos] {
            opacity: 1 !important;
            transform: none !important;
            visibility: visible !important;
        }
        html.aos-init [data-aos] {
            opacity: 0;
        }
        html.aos-init [data-aos].aos-animate {
            opacity: 1;
        }

        /* Universal Modern Sticky Footer Layout */
        html {
            height: 100%;
        }
        body {
            min-height: 100vh;
            min-height: 100dvh;
            display: flex;
            flex-direction: column;
        }
        main {
            flex: 1 0 auto;
        }
        footer {
            margin-top: auto;
        }
    </style>"""

print("Applying Universal Sticky Footer across all 51k+ pages...")
updated = 0
total = 0

for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != 'Template']
    for fname in filenames:
        if not fname.endswith('.html'): continue
        total += 1
        fp = os.path.join(dirpath, fname)
        rel = os.path.relpath(fp, ROOT)
        
        try:
            with open(fp, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
        except:
            continue
            
        modified = False
        
        if 'Universal Modern Sticky Footer Layout' in content:
            continue
            
        if '/* Zero-Blank-Screen & AOS Rendering Failsafe */' in content:
            # Replace the old style block with the new sticky footer style block
            content = re.sub(
                r'<style>\s*/\* Zero-Blank-Screen & AOS Rendering Failsafe \*/.*?</style>',
                NEW_STYLE_BLOCK.strip(),
                content,
                flags=re.DOTALL
            )
            modified = True
        else:
            if '</head>' in content:
                content = content.replace('</head>', f'{NEW_STYLE_BLOCK}\n</head>', 1)
                modified = True
                
        if modified:
            try:
                with open(fp, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated += 1
            except Exception as e:
                print(f"Error saving {rel}: {e}")

print(f"\n✅ Sticky Footer Applied Successfully across {total:,} pages!")
print(f"  Pages updated: {updated:,}")
