# Final cleanup pass - fix remaining OG URL issues and ensure all city pages have DFW links
$cities = @("irving-tx","fort-worth-tx","plano-tx","garland-tx","arlington-tx","denton-tx","carrollton-tx","mesquite-tx","richardson-tx","grand-prairie-tx","lewisville-tx","frisco-tx","mckinney-tx","flower-mound-tx","mansfield-tx","desoto-tx","cedar-hill-tx","duncanville-tx","rowlett-tx","lancaster-tx")

foreach ($slug in $cities) {
    $f = "$slug\index.html"
    if (-not (Test-Path $f)) { continue }
    $c = Get-Content $f -Raw -Encoding UTF8

    # Fix OG URL - replace any remaining midland or wrong URL
    $c = $c -replace 'content="https://www\.goldengrovecleaning\.com/midland-tx-cleaning-services\.html"', "content=`"https://www.goldengrovecleaning.com/$slug/`""
    $c = $c -replace 'content="https://www\.goldengrovecleaning\.com/[^/]+-cleaning-services\.html"', "content=`"https://www.goldengrovecleaning.com/$slug/`""

    # Ensure nearby cities section exists - check with different pattern
    $hasDFWLinks = ($c -match '/dallas-tx/' -or $c -match '/irving-tx/' -or $c -match '/fort-worth-tx/')
    $hasNearbySection = ($c -match 'Serving All of Dallas-Fort Worth|Nearby DFW Cities|dallas-fort worth.*cities')

    if (-not $hasNearbySection) {
        $nearbySection = @"

        <!-- NEARBY DFW CITIES -->
        <section class="py-16 bg-brand-sand">
            <div class="max-w-7xl mx-auto px-5">
                <h2 class="text-3xl font-bold text-brand-green mb-4 text-center">Serving All of Dallas-Fort Worth</h2>
                <p class="text-center text-gray-600 mb-10">Golden Grove Cleaning serves the entire DFW Metroplex with top-rated professional cleaning.</p>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    <a href="/dallas-tx/" class="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange text-sm"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange text-sm transition-colors">Dallas, TX</span></a>
                    <a href="/irving-tx/" class="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange text-sm"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange text-sm transition-colors">Irving, TX</span></a>
                    <a href="/fort-worth-tx/" class="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange text-sm"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange text-sm transition-colors">Fort Worth, TX</span></a>
                    <a href="/plano-tx/" class="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange text-sm"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange text-sm transition-colors">Plano, TX</span></a>
                    <a href="/garland-tx/" class="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange text-sm"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange text-sm transition-colors">Garland, TX</span></a>
                    <a href="/arlington-tx/" class="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange text-sm"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange text-sm transition-colors">Arlington, TX</span></a>
                    <a href="/carrollton-tx/" class="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange text-sm"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange text-sm transition-colors">Carrollton, TX</span></a>
                    <a href="/mckinney-tx/" class="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange text-sm"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange text-sm transition-colors">McKinney, TX</span></a>
                </div>
            </div>
        </section>
"@
        # Try multiple injection points
        if ($c -match '</main>') {
            $c = $c -replace '</main>', "$nearbySection`r`n    </main>"
        }
    }

    Set-Content $f $c -Encoding UTF8 -NoNewline
    Write-Host "CLEANUP: $f"
}

# Now fix Dallas FAQ - it exists as inline schema but verification checks for "@type": "FAQPage"
# Dallas already has the FAQ schema inserted via fix_dallas_body.ps1 - re-verify
$df = Get-Content 'dallas-tx\index.html' -Raw -Encoding UTF8
if ($df -match 'FAQPage') {
    Write-Host "Dallas FAQ schema CONFIRMED OK"
} else {
    # Add it
    $faqDallas = @'

    <!-- FAQ Schema -->
    <script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What cleaning services does Golden Grove offer in Dallas, TX?","acceptedAnswer":{"@type":"Answer","text":"Golden Grove Cleaning offers house cleaning, deep cleaning, move-in/move-out cleaning, post-construction cleaning, commercial janitorial, carpet cleaning, window cleaning, Airbnb turnover, luxury estate cleaning, and more throughout Dallas, TX and the DFW Metroplex."}},{"@type":"Question","name":"How much does house cleaning cost in Dallas, TX?","acceptedAnswer":{"@type":"Answer","text":"House cleaning in Dallas, TX starts at $120-$180. Deep cleaning starts at $200+. Call (432) 218-1700 for a free quote."}},{"@type":"Question","name":"Does Golden Grove serve Irving TX and surrounding DFW cities?","acceptedAnswer":{"@type":"Answer","text":"Yes! We serve Irving, Fort Worth, Plano, Garland, Arlington, Carrollton, Mesquite, Richardson, Grand Prairie, Lewisville, Frisco, McKinney, and all DFW cities."}},{"@type":"Question","name":"What is the best cleaning company in Dallas TX?","acceptedAnswer":{"@type":"Answer","text":"Golden Grove Cleaning is rated #1 in Dallas TX with a 4.9-star rating across 127+ reviews."}}]}
    </script>
'@
    $df = $df.Replace('</head>', "$faqDallas`r`n</head>")
    Set-Content 'dallas-tx\index.html' $df -Encoding UTF8 -NoNewline
    Write-Host "Dallas FAQ schema ADDED"
}

Write-Host "`n=== FINAL CLEANUP COMPLETE ==="
