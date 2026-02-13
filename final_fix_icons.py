
import os

root_dir = "c:/Users/lucia/OneDrive/Desktop/GoldenGrove"
target_css = 'href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"'
full_link_tag = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">'

print("Applying Final Fix for Font Awesome...")

files_fixed = 0

for root, dirs, files in os.walk(root_dir):
    if ".git" in root or "node_modules" in root: continue
    
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Use the exact same check as audit
                if target_css not in content:
                    if "</head>" in content:
                        new_content = content.replace("</head>", f"    {full_link_tag}\n</head>")
                        with open(file_path, "w", encoding="utf-8") as f:
                            f.write(new_content)
                        print(f"Fixed: {file_path}")
                        files_fixed += 1
                    else:
                        print(f"Skipped (no </head>): {file_path}")
                else:
                    # It has the link, so it should be fine. 
                    # If icons are still broken, it's not due to missing link.
                    pass
            except Exception as e:
                print(f"ERROR processing {file_path}: {e}")

print(f"Done. Fixed {files_fixed} files.")
