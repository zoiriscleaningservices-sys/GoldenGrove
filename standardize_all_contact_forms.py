#!/usr/bin/env python3
"""
Global Contact Form & Quote Section Standardizer for Golden Grove Cleaning
Replaces all legacy or inconsistent contact form sections across all 51,181 pages
with the single best, modern, responsive, 2-column LeadConnector embed design.
"""

import os, re

ROOT = "/Users/leonidigonzalez/Downloads/GoldenGrove"

STANDARD_QUOTE_SECTION = """        <!-- MODERN QUOTE & CONTACT FORM -->
        <section id="quote"
            class="py-16 md:py-24 bg-gradient-to-br from-orange-50 via-orange-100/70 to-white relative overflow-hidden">
            <!-- Decorative blurred blobs -->
            <div class="absolute inset-0 pointer-events-none">
                <div
                    class="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 animate-pulse-slow">
                </div>
                <div
                    class="absolute bottom-0 left-0 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 animate-pulse-slow delay-1000">
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative">
                <div class="text-center mb-12 md:mb-16 animate-fade-in-up">
                    <h2 class="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">
                        Get Your <span class="text-orange-600">Free Quote</span>
                    </h2>
                    <p class="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                        Fast &amp; professional cleaning services • No obligation • Quick response
                    </p>
                </div>

                <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <!-- LEFT – OFFICIAL LEADCONNECTOR EMBED FORM -->
                    <div
                        class="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-orange-100/60 animate-fade-in-left hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                        
                        <div class="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                            <h3 class="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <i class="fa-solid fa-clipboard-list text-brand-orange"></i>
                                Request a Free Quote
                            </h3>
                            <span class="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">Instant Response</span>
                        </div>

                        <!-- OFFICIAL LEADCONNECTOR EMBED FORM -->
                        <iframe
                          src="https://api.leadconnectorhq.com/widget/form/Qw27XO1tcXra7A4hA2hy"
                          style="width:100%;height:100%;min-height:600px;border:none;border-radius:16px;"
                          id="inline-Qw27XO1tcXra7A4hA2hy" 
                          data-layout="{'id':'INLINE'}"
                          data-trigger-type="alwaysShow"
                          data-trigger-value=""
                          data-activation-type="alwaysActive"
                          data-activation-value=""
                          data-deactivation-type="neverDeactivate"
                          data-deactivation-value=""
                          data-form-name="CBC - Contact Us - A2P Verified"
                          data-height="715"
                          data-layout-iframe-id="inline-Qw27XO1tcXra7A4hA2hy"
                          data-form-id="Qw27XO1tcXra7A4hA2hy"
                          title="CBC - Contact Us - A2P Verified"
                          class="w-full"
                        >
                        </iframe>
                        <script src="https://link.msgsndr.com/js/form_embed.js"></script>
                    </div>

                    <!-- RIGHT – CONTACT INFO & TRUST -->
                    <div class="space-y-8">
                        <div
                            class="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-orange-100/60 animate-fade-in-right hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            <h3 class="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
                            <div class="space-y-6">
                                <div class="flex items-center gap-4 animate-fade-in-up" style="animation-delay: 0.1s">
                                    <div
                                        class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
                                        📞</div>
                                    <div>
                                        <p class="font-medium text-gray-700">Phone</p>
                                        <a href="tel:+14322181700"
                                            class="text-lg text-gray-900 font-bold hover:text-orange-700 transition-colors">(432) 218-1700</a>
                                    </div>
                                </div>
                                <div class="flex items-center gap-4 animate-fade-in-up" style="animation-delay: 0.15s">
                                    <div
                                        class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-2xl">
                                        ✉️</div>
                                    <div>
                                        <p class="font-medium text-gray-700">Email</p>
                                        <a href="mailto:info@goldengrovecleaning.com"
                                            class="text-lg text-gray-900 font-bold hover:text-orange-700 transition-colors break-all">
                                            info@goldengrovecleaning.com
                                        </a>
                                    </div>
                                </div>
                                <div class="flex items-center gap-4 animate-fade-in-up" style="animation-delay: 0.2s">
                                    <div
                                        class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                                        🕒</div>
                                    <div>
                                        <p class="font-medium text-gray-700">Hours</p>
                                        <p class="text-gray-900 font-bold">Mon - Sat: 7:00 AM - 7:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8 pt-8 border-t border-gray-100">
                                <a href="/book-now/" class="w-full py-4 px-6 bg-brand-green hover:bg-brand-green/90 text-white text-center text-lg font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-3" style="background-color:#1F3D36;color:#ffffff;">
                                    <i class="fa-solid fa-calendar-check text-brand-orange"></i>
                                    <span>Or Book Online in 60 Seconds</span>
                                </a>
                            </div>
                        </div>

                        <!-- Trust Badge Box -->
                        <div
                            class="bg-brand-sand rounded-3xl p-8 border border-gray-100 space-y-4">
                            <h4 class="text-lg font-bold text-brand-green flex items-center gap-2">
                                <i class="fa-solid fa-shield-halved text-brand-orange"></i>
                                Golden Grove Guarantee
                            </h4>
                            <p class="text-sm text-gray-600">
                                Fully bonded, insured, and background-checked cleaning pros serving communities across Texas with our 100% 24-hour satisfaction warranty.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>"""

quote_section_regex = re.compile(r'<section\s+[^>]*id=[\"\']quote[\"\'][^>]*>.*?</section>', re.DOTALL | re.I)

print("Starting Global Contact Form Standardization across all 51k+ pages...")
total_checked = 0
standardized_count = 0

for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != 'Template']
    for fname in filenames:
        if not fname.endswith('.html'): continue
        if fname in ['404.html']: continue
        total_checked += 1
        fp = os.path.join(dirpath, fname)
        rel = os.path.relpath(fp, ROOT)
        
        # Don't touch book-now page (dedicated interactive BookingKoala widget)
        if rel in ['book-now/index.html']: continue
        
        try:
            with open(fp, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
        except:
            continue
            
        orig = content
        
        if quote_section_regex.search(content):
            content = quote_section_regex.sub(STANDARD_QUOTE_SECTION.strip(), content)
        elif '<!-- SITE-WIDE BOOK NOW & FREE QUOTE CTA BANNER -->' in content:
            content = content.replace(
                '<!-- SITE-WIDE BOOK NOW & FREE QUOTE CTA BANNER -->',
                f'{STANDARD_QUOTE_SECTION}\n\n        <!-- SITE-WIDE BOOK NOW & FREE QUOTE CTA BANNER -->'
            )
            
        if content != orig:
            try:
                with open(fp, 'w', encoding='utf-8') as f:
                    f.write(content)
                standardized_count += 1
            except Exception as e:
                print(f"Error saving {rel}: {e}")

print(f"\n✅ Contact Form Standardization Completed!")
print(f"  Total HTML pages audited:       {total_checked:,}")
print(f"  Pages updated to standard form: {standardized_count:,}")
