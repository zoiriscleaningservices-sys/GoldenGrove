
import os

root_dir = "c:/Users/lucia/OneDrive/Desktop/GoldenGrove"
# Exact string to check for
target_css = 'href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"'
# String to inject
full_link_tag = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">'

print("Strictly Checking and fixing Font Awesome links...")

files_fixed = 0

for root, dirs, files in os.walk(root_dir):
    if ".git" in root or "node_modules" in root: continue
    
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # STRICT CHECK: Only if the link matches
            if "cdnjs.cloudflare.com/ajax/libs/font-awesome" not in content:
                 # Inject before </head>
                if "</head>" in content:
                    new_content = content.replace("</head>", f"    {full_link_tag}\n</head>")
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Fixed: {file_path}")
                    files_fixed += 1
                else:
                    print(f"Skipped (no </head>): {file_path}")

print(f"Done. Fixed {files_fixed} files.")
