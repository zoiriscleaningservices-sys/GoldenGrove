# Master DFW Cities SEO Repair Script
# Fixes: meta keywords, OG URL, OG title, H1, review schema body (West Texas), 
#        adds FAQ schema, 5 reviews schema, "Nearby Cities" section, footer text

$cities = @(
    @{slug="irving-tx";     name="Irving";       lat="32.8140"; lon="-96.9489"; zip="75061"; phone="+14322181700"; neighbors="Dallas, Fort Worth, Carrollton, Grand Prairie, Arlington"},
    @{slug="fort-worth-tx"; name="Fort Worth";   lat="32.7555"; lon="-97.3308"; zip="76102"; phone="+14322181700"; neighbors="Dallas, Arlington, Irving, Mansfield, Denton"},
    @{slug="plano-tx";      name="Plano";        lat="33.0198"; lon="-96.6989"; zip="75023"; phone="+14322181700"; neighbors="Dallas, Richardson, Frisco, McKinney, Allen"},
    @{slug="garland-tx";    name="Garland";      lat="32.9126"; lon="-96.6389"; zip="75040"; phone="+14322181700"; neighbors="Dallas, Mesquite, Richardson, Rowlett, Sachse"},
    @{slug="arlington-tx";  name="Arlington";    lat="32.7357"; lon="-97.1081"; zip="76010"; phone="+14322181700"; neighbors="Dallas, Fort Worth, Irving, Grand Prairie, Mansfield"},
    @{slug="denton-tx";     name="Denton";       lat="33.2148"; lon="-97.1331"; zip="76201"; phone="+14322181700"; neighbors="Dallas, Fort Worth, Lewisville, Flower Mound, Carrollton"},
    @{slug="carrollton-tx"; name="Carrollton";   lat="32.9537"; lon="-96.8903"; zip="75006"; phone="+14322181700"; neighbors="Dallas, Irving, Denton, Lewisville, Farmers Branch"},
    @{slug="mesquite-tx";   name="Mesquite";     lat="32.7668"; lon="-96.5992"; zip="75149"; phone="+14322181700"; neighbors="Dallas, Garland, Rowlett, Balch Springs, Sunnyvale"},
    @{slug="richardson-tx"; name="Richardson";   lat="32.9483"; lon="-96.7299"; zip="75080"; phone="+14322181700"; neighbors="Dallas, Plano, Garland, Allen, Murphy"},
    @{slug="grand-prairie-tx"; name="Grand Prairie"; lat="32.7460"; lon="-96.9978"; zip="75050"; phone="+14322181700"; neighbors="Dallas, Arlington, Irving, Mansfield, Cedar Hill"},
    @{slug="lewisville-tx"; name="Lewisville";   lat="33.0462"; lon="-96.9942"; zip="75029"; phone="+14322181700"; neighbors="Dallas, Carrollton, Denton, Flower Mound, Coppell"},
    @{slug="frisco-tx";     name="Frisco";       lat="33.1507"; lon="-96.8236"; zip="75034"; phone="+14322181700"; neighbors="Dallas, Plano, McKinney, Allen, Little Elm"},
    @{slug="mckinney-tx";   name="McKinney";     lat="33.1972"; lon="-96.6397"; zip="75069"; phone="+14322181700"; neighbors="Dallas, Frisco, Plano, Allen, Prosper"},
    @{slug="flower-mound-tx"; name="Flower Mound"; lat="33.0146"; lon="-97.0966"; zip="75028"; phone="+14322181700"; neighbors="Dallas, Lewisville, Denton, Coppell, Grapevine"},
    @{slug="mansfield-tx";  name="Mansfield";    lat="32.5632"; lon="-97.1417"; zip="76063"; phone="+14322181700"; neighbors="Dallas, Fort Worth, Arlington, Grand Prairie, Midlothian"},
    @{slug="desoto-tx";     name="DeSoto";       lat="32.5896"; lon="-96.8572"; zip="75115"; phone="+14322181700"; neighbors="Dallas, Cedar Hill, Duncanville, Lancaster, Grand Prairie"},
    @{slug="cedar-hill-tx"; name="Cedar Hill";   lat="32.5885"; lon="-96.9561"; zip="75104"; phone="+14322181700"; neighbors="Dallas, DeSoto, Duncanville, Grand Prairie, Mansfield"},
    @{slug="duncanville-tx"; name="Duncanville"; lat="32.6518"; lon="-96.9083"; zip="75116"; phone="+14322181700"; neighbors="Dallas, DeSoto, Cedar Hill, Grand Prairie, Lancaster"},
    @{slug="rowlett-tx";    name="Rowlett";      lat="32.9029"; lon="-96.5636"; zip="75088"; phone="+14322181700"; neighbors="Dallas, Garland, Mesquite, Sachse, Wylie"},
    @{slug="lancaster-tx";  name="Lancaster";    lat="32.5921"; lon="-96.7561"; zip="75146"; phone="+14322181700"; neighbors="Dallas, DeSoto, Cedar Hill, Duncanville, Waxahachie"}
)

foreach ($city in $cities) {
    $slug = $city.slug
    $name = $city.name
    $lat  = $city.lat
    $lon  = $city.lon
    $neighbors = $city.neighbors
    $indexFile = "$slug\index.html"

    if (-not (Test-Path $indexFile)) {
        Write-Host "SKIP (not found): $indexFile"
        continue
    }

    $c = Get-Content $indexFile -Raw -Encoding UTF8

    # 1. Fix title
    $c = $c -replace '<title>[^<]*</title>', "<title>Professional Cleaning Services in $name TX | #1 Rated | Golden Grove Cleaning</title>"

    # 2. Fix meta description
    $c = $c -replace '<meta name="description"[^>]*>', ''
    $c = $c.Replace('<meta name="keywords"', "<meta name=`"description`" content=`"Golden Grove Cleaning offers professional cleaning services in $name, TX. #1 rated house cleaning, deep cleaning, commercial janitorial and maid service in $name. Call (432) 218-1700 for a free quote!`" />`r`n    <meta name=`"keywords`"")

    # 3. Fix keywords - nuke Midland references
    $c = $c -replace 'content="cleaning services midland[^"]*"', "content=`"cleaning services $name TX, house cleaning $name TX, maid service $name TX, commercial cleaning $name TX, office cleaning $name, deep cleaning $name TX, move out cleaning $name, janitorial services $name, cleaning company $name TX, professional cleaners $name TX, cleaning services near me $name TX, Dallas TX cleaning services`""

    # 4. Fix OG tags
    $c = $c -replace 'content="#1 cleaning services in [^"]*"', "content=`"#1 Professional Cleaning Services in $name TX | Golden Grove Cleaning`""
    $c = $c -replace 'content="The most trusted local cleaning company[^"]*"', "content=`"$name most trusted professional cleaning company. House cleaning, maid service, commercial janitorial and more. Serving $name and all of DFW. Free quotes!`""
    $c = $c -replace 'content="https://www\.goldengrovecleaning\.com/midland-tx-cleaning-services\.html"', "content=`"https://www.goldengrovecleaning.com/$slug/`""

    # 5. Fix geo coords
    $c = $c -replace 'content="32\.[^;]*;-96\.[^"]*"', "content=`"$lat;$lon`""
    $c = $c -replace 'content="32\.[^,]*, -96\.[^"]*"', "content=`"$lat, $lon`""
    $c = $c -replace '"latitude": 3[0-9.]+,', "`"latitude`": $lat,"
    $c = $c -replace '"longitude": -9[0-9.]+', "`"longitude`": $lon"

    # 6. Fix geo placename
    $c = $c -replace 'content="Midland"', "content=`"$name`""
    $c = $c -replace 'content="Dallas"', "content=`"$name`""

    # 7. Fix H1
    $c = $c -replace 'Top Cleaning Company in', "Professional Cleaning Services in"

    # 8. Fix Review schema "West Texas" reference
    $c = $c -replace 'looking for top-quality cleaning services in West Texas', "looking for top-quality cleaning services in $name, TX"
    $c = $c -replace 'Highly recommend for anyone in West Texas', "Highly recommend for anyone in $name, TX"
    $c = $c -replace '"West Texas"', "`"$name, TX`""
    $c = $c -replace 'West Texas', "$name TX"

    # 9. Fix footer region reference
    $c = $c -replace 'in Dallas &amp; Odessa, TX\.', "in $name and Dallas-Fort Worth, TX."
    $c = $c -replace 'in Dallas & Odessa, TX\.', "in $name and Dallas-Fort Worth, TX."
    $c = $c -replace 'in Midland &amp; Odessa, TX\.', "in $name and Dallas-Fort Worth, TX."
    $c = $c -replace 'in Midland & Odessa, TX\.', "in $name and Dallas-Fort Worth, TX."

    # 10. Fix "View All West Texas" label
    $c = $c.Replace('View All West Texas Service Areas', "View All DFW Metroplex Service Areas")

    # 11. Add FAQ schema if missing
    if ($c -notmatch '"@type": "FAQPage"') {
        $faqSchema = @"

    <!-- FAQ Schema - AI Overviews -->
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"What cleaning services are available in $name, TX?","acceptedAnswer":{"@type":"Answer","text":"Golden Grove Cleaning offers house cleaning, deep cleaning, move-out cleaning, commercial janitorial, office cleaning, post-construction cleaning, Airbnb turnover, and more in $name, TX and throughout the DFW Metroplex."}},
    {"@type":"Question","name":"How much does house cleaning cost in $name, TX?","acceptedAnswer":{"@type":"Answer","text":"House cleaning in $name, TX starts at \$120-\$180. Deep cleaning and move-out cleaning start at \$200+. Call (432) 218-1700 for a free no-obligation quote."}},
    {"@type":"Question","name":"Does Golden Grove serve Dallas and surrounding cities from $name?","acceptedAnswer":{"@type":"Answer","text":"Yes! From our $name, TX service area we cover Dallas, $neighbors, and all surrounding DFW cities. Call us for availability."}},
    {"@type":"Question","name":"Is Golden Grove Cleaning available on weekends in $name, TX?","acceptedAnswer":{"@type":"Answer","text":"Yes, we are available Monday through Saturday 7AM-7PM and offer 24/7 emergency cleaning in $name, TX."}},
    {"@type":"Question","name":"What is the best cleaning company in $name TX?","acceptedAnswer":{"@type":"Answer","text":"Golden Grove Cleaning is rated 4.9 stars and is the #1 cleaning company serving $name, TX and the greater Dallas-Fort Worth area."}}
  ]
}
    </script>
"@
        # Insert before </head>
        $c = $c.Replace('</head>', "$faqSchema`r`n</head>")
    }

    # 12. Add "Nearby DFW Cities" section if missing
    if ($c -notmatch 'Nearby.*Cities|Dallas-Fort Worth.*cities|DFW.*cities') {
        $nearbySection = @"

        <!-- NEARBY DFW CITIES -->
        <section class="py-16 bg-brand-sand">
            <div class="max-w-7xl mx-auto px-5">
                <h2 class="text-3xl font-bold text-brand-green mb-4 text-center">Serving All of Dallas-Fort Worth</h2>
                <p class="text-center text-gray-600 mb-10">Golden Grove Cleaning serves $name and all surrounding DFW cities.</p>
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
        $c = $c.Replace('    </main>', "$nearbySection`r`n    </main>")
    }

    Set-Content $indexFile $c -Encoding UTF8 -NoNewline
    Write-Host "FIXED: $indexFile"
}

Write-Host "`n=== ALL DFW CITY PAGES PROCESSED ==="
