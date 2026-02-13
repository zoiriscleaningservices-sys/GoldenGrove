
import os

root_dir = "c:/Users/lucia/OneDrive/Desktop/GoldenGrove"
target_css = 'href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"'

print("Auditing HTML files for Font Awesome...")

for root, dirs, files in os.walk(root_dir):
    if ".git" in root or "node_modules" in root: continue
    
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                has_link = target_css in content
                print(f"{'OK' if has_link else 'MISSING'}: {file}")
            except Exception as e:
                print(f"ERROR reading {file}: {e}")
