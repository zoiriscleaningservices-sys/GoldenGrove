
import os

file_path = "c:/Users/lucia/OneDrive/Desktop/GoldenGrove/about-midland-tx/index.html"
target_css = 'href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"'

print(f"Searching in {file_path}...")

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "font-awesome" in line:
        print(f"Line {i+1}: {line.strip()}")
