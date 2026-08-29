#!/usr/bin/env python3
"""
Repair full footer on the 100 service subpages missing the standard footer markup.
"""

import os, re

ROOT = "/Users/leonidigonzalez/Downloads/GoldenGrove"

def get_standard_footer(city_name, city_slug):
    return f"""    <!-- FOOTER -->
    <footer class="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white pt-20 pb-8 overflow-hidden">
        <!-- Decorative Background Elements -->
        <div class="absolute inset-0 pointer-events-none opacity-30">
            <div class="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl"></div>
        </div>

        <div class="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <!-- Main Footer Content -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
                <!-- Brand Column -->
                <div class="space-y-6">
                    <a href="/{city_slug}/" class="inline-block group">
                        <img src="https://www.goldengrovecleaning.com/images/logo.webp" alt="Golden Grove Cleaning Logo"
                            class="h-14 w-auto rounded-lg brightness-110 transition-transform duration-300 group-hover:scale-105" loading="lazy">
                    </a>
                    <p class="text-gray-400 text-base leading-relaxed">
                        Setting the gold standard for residential and commercial cleaning in {city_name}, TX and surrounding communities.
                        Locally owned, family-operated.
                    </p>
                    <div class="flex gap-4 pt-2">
                        <a href="https://facebook.com/yourpage" target="_blank" rel="noopener"
                            class="w-11 h-11 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center hover:bg-brand-orange transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-orange/20">
                            <i class="fa-brands fa-facebook-f text-lg"></i>
                        </a>
                        <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener"
                            class="w-11 h-11 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center hover:bg-brand-orange transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-orange/20">
                            <i class="fa-brands fa-instagram text-lg"></i>
                        </a>
                    </div>
                </div>

                <!-- Services Column -->
                <div>
                    <h3 class="text-lg font-bold mb-6 flex items-center gap-3 text-white">
                        <span class="w-8 h-1 bg-gradient-to-r from-brand-orange to-brand-gold rounded-full"></span>
                        Services
                    </h3>
                    <ul class="space-y-3">
                        <li><a href="/{city_slug}/house-cleaning/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                                House Cleaning</a></li>
                        <li><a href="/{city_slug}/deep-cleaning/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                                Deep Cleaning</a></li>
                        <li><a href="/{city_slug}/move-out-cleaning/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                                Move-Out Cleaning</a></li>
                        <li><a href="/{city_slug}/commercial-cleaning/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                                Commercial Cleaning</a></li>
                    </ul>
                </div>

                <!-- Quick Links Column -->
                <div>
                    <h3 class="text-lg font-bold mb-6 flex items-center gap-3 text-white">
                        <span class="w-8 h-1 bg-gradient-to-r from-brand-orange to-brand-gold rounded-full"></span>
                        Quick Links
                    </h3>
                    <ul class="space-y-3">
                        <li><a href="/{city_slug}/about/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                                About Us</a></li>
                        <li><a href="/{city_slug}/blog/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                                Blog</a></li>
                        <li><a href="/{city_slug}/gallery/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                                Gallery</a></li>
                        <li><a href="/book-now/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                                Book Online</a></li>
                    </ul>
                </div>

                <!-- Contact Column -->
                <div>
                    <h3 class="text-lg font-bold mb-6 flex items-center gap-3 text-white">
                        <span class="w-8 h-1 bg-gradient-to-r from-brand-orange to-brand-gold rounded-full"></span>
                        Contact
                    </h3>
                    <div class="space-y-5">
                        <a href="tel:+14322181700" class="flex items-start gap-4 group">
                            <div class="w-11 h-11 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-brand-orange transition-all duration-300 group-hover:shadow-lg group-hover:shadow-brand-orange/20">
                                <i class="fa-solid fa-phone text-brand-orange group-hover:text-white transition-colors"></i>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Call Us</p>
                                <p class="text-white font-semibold group-hover:text-brand-orange transition-colors">(432) 218-1700</p>
                            </div>
                        </a>
                        <a href="mailto:info@goldengrovecleaning.com" class="flex items-start gap-4 group">
                            <div class="w-11 h-11 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-brand-orange transition-all duration-300 group-hover:shadow-lg group-hover:shadow-brand-orange/20">
                                <i class="fa-solid fa-envelope text-brand-orange group-hover:text-white transition-colors"></i>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Email</p>
                                <p class="text-white font-semibold group-hover:text-brand-orange transition-colors break-all">info@goldengrovecleaning.com</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-gray-500 text-sm text-center md:text-left">
                    &copy; <span id="year">2026</span> Golden Grove Cleaning. All rights reserved.
                </p>
                <div class="flex flex-wrap items-center justify-center gap-6 text-sm">
                    <a href="/about/" class="text-gray-500 hover:text-white transition-colors">About Us</a>
                    <a href="/book-now/" class="text-gray-500 hover:text-white transition-colors">Book Online</a>
                    <span class="text-gray-600">|</span>
                    <span class="text-gray-400">Serving {city_name}, TX</span>
                </div>
            </div>
        </div>
    </footer>"""

fixed = 0
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != 'Template']
    for fname in filenames:
        if not fname.endswith('.html'): continue
        fp = os.path.join(dirpath, fname)
        rel = os.path.relpath(fp, ROOT)
        
        with open(fp, 'r', encoding='utf-8', errors='replace') as f:
            c = f.read()
            
        if '<footer' not in c:
            parts = rel.split(os.sep)
            city_slug = parts[0] if parts[0].endswith('-tx') else 'texas'
            city_name = city_slug[:-3].replace('-', ' ').title() if city_slug.endswith('-tx') else 'Texas'
            std_footer = get_standard_footer(city_name, city_slug)
            
            if '</footer>' in c:
                c = c.replace('</footer>', f'{std_footer}')
            elif '</main>' in c:
                c = c.replace('</main>', f'</main>\n{std_footer}')
            elif '</body>' in c:
                c = c.replace('</body>', f'{std_footer}\n</body>')
                
            with open(fp, 'w', encoding='utf-8') as f:
                f.write(c)
            fixed += 1

print(f"Fixed footers on {fixed:,} pages!")
