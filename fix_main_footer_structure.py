#!/usr/bin/env python3
"""
Structural Clean-up Script: Ensure All Page Content Sections are INSIDE <main>
and <main> cleanly closes immediately before <footer> on 100% of pages.
"""

import os, re

ROOT = "/Users/leonidigonzalez/Downloads/GoldenGrove"

print("Standardizing <main> and <footer> boundaries across all 51k+ pages...")
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
            
        orig = content
        
        # 1. Ensure <main> starts after </header> if missing
        if '<main' not in content:
            if '</header>' in content:
                content = content.replace('</header>', '</header>\n    <main>', 1)
            elif '<body' in content:
                content = re.sub(r'(<body[^>]*>)', r'\1\n    <main>', content, count=1)
                
        # 2. Check if </main> exists before <footer
        # If there are sections between </main> and <footer, move </main> to right before <footer
        footer_idx = content.find('<footer')
        if footer_idx != -1:
            # Remove any premature </main> tags before footer
            before_footer = content[:footer_idx]
            after_footer = content[footer_idx:]
            
            if '</main>' in before_footer:
                # Remove all existing </main> before footer
                before_footer = before_footer.replace('</main>', '')
                
            # Place single </main> directly before <footer
            content = f"{before_footer.rstrip()}\n    </main>\n\n    {after_footer.lstrip()}"
            
        if content != orig:
            try:
                with open(fp, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated += 1
            except Exception as e:
                print(f"Error saving {rel}: {e}")

print(f"\n✅ Main & Footer Boundary Standardization Complete!")
print(f"  Total HTML pages audited: {total:,}")
print(f"  Pages restructured:       {updated:,}")
