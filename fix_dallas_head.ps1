$f = 'dallas-tx\index.html'
$c = Get-Content $f -Raw -Encoding UTF8

# Fix meta description
$c = $c.Replace(
    'content="Premier cleaning services in Dallas, TX. Trusted by outstanding local homeowners for excellence in house cleaning, maid service, and janitorial solutions."',
    'content="Golden Grove Cleaning offers professional cleaning services in Dallas, TX. #1 rated house cleaning, deep cleaning, commercial janitorial &amp; maid service in Dallas. Call (432) 218-1700 for a free quote today!"'
)

# Fix meta keywords  
$c = $c.Replace(
    'content="cleaning services midland tx, house cleaning midland tx, maid service midland tx, commercial cleaning midland tx, office cleaning midland, window cleaning midland, deep cleaning midland texas"',
    'content="cleaning services Dallas TX, house cleaning Dallas TX, maid service Dallas TX, commercial cleaning Dallas TX, office cleaning Dallas, deep cleaning Dallas, move out cleaning Dallas, janitorial services Dallas, cleaning company Dallas, professional cleaners Dallas, residential cleaning Dallas, post construction cleaning Dallas, carpet cleaning Dallas TX, cleaning services near me Dallas, Irving TX cleaning, Fort Worth cleaning services"'
)

# Fix geo meta
$c = $c.Replace('content="32.996848;-96.792113"', 'content="32.7767;-96.7970"')
$c = $c.Replace('content="32.996848, -96.792113"', 'content="32.7767, -96.7970"')

# Fix OG title
$c = $c.Replace(
    'content="#1 cleaning services in Dallas TX | Golden Grove Cleaning"',
    'content="#1 Professional Cleaning Services in Dallas TX | Golden Grove Cleaning"'
)

# Fix OG description
$c = $c.Replace(
    'content="The most trusted local cleaning company in Dallas, TX. Residential and commercial services tailored to your needs."',
    'content="Dallas most trusted professional cleaning company. House cleaning, maid service, commercial janitorial and more. Serving all of Dallas-Fort Worth. Free quotes!"'
)

# Fix OG URL
$c = $c.Replace(
    'content="https://www.goldengrovecleaning.com/midland-tx-cleaning-services.html"',
    'content="https://www.goldengrovecleaning.com/dallas-tx/"'
)

# Fix geo schema coords
$c = $c.Replace('"latitude": 32.996848,', '"latitude": 32.7767,')
$c = $c.Replace('"longitude": -96.792113', '"longitude": -96.7970')

# Fix areaServed - replace old neighborhood list with DFW cities
$oldAreaServed = @'
      "areaServed": [
        {
          "@type": "City",
          "name": "Dallas",
          "sameAs": "https://en.wikipedia.org/wiki/Dallas,_Texas"
        },
        {
          "@type": "Neighborhood",
          "name": "Old Dallas"
        },
        {
          "@type": "Neighborhood",
          "name": "Grassland Estates"
        },
        {
          "@type": "Neighborhood",
          "name": "Green Tree Park"
        },
        {
          "@type": "Neighborhood",
          "name": "Saddle Club Estates"
        },
        {
          "@type": "Neighborhood",
          "name": "Skyline Terrace"
        }
      ]
    }
  ]
}
'@

$newAreaServed = @'
      "areaServed": [
        {"@type": "City", "name": "Dallas", "sameAs": "https://en.wikipedia.org/wiki/Dallas,_Texas"},
        {"@type": "City", "name": "Irving", "sameAs": "https://en.wikipedia.org/wiki/Irving,_Texas"},
        {"@type": "City", "name": "Fort Worth", "sameAs": "https://en.wikipedia.org/wiki/Fort_Worth,_Texas"},
        {"@type": "City", "name": "Plano"},
        {"@type": "City", "name": "Garland"},
        {"@type": "City", "name": "Arlington"},
        {"@type": "City", "name": "Denton"},
        {"@type": "City", "name": "Carrollton"},
        {"@type": "City", "name": "Mesquite"},
        {"@type": "City", "name": "Richardson"},
        {"@type": "City", "name": "Grand Prairie"},
        {"@type": "City", "name": "Lewisville"},
        {"@type": "City", "name": "Frisco"},
        {"@type": "City", "name": "McKinney"},
        {"@type": "Neighborhood", "name": "Downtown Dallas"},
        {"@type": "Neighborhood", "name": "Uptown Dallas"},
        {"@type": "Neighborhood", "name": "North Dallas"},
        {"@type": "Neighborhood", "name": "South Dallas"},
        {"@type": "Neighborhood", "name": "Deep Ellum"},
        {"@type": "Neighborhood", "name": "Preston Hollow"}
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Professional Cleaning Services Dallas TX",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "House Cleaning Dallas TX"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Deep Cleaning Dallas TX"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Commercial Cleaning Dallas TX"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Move Out Cleaning Dallas TX"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Post Construction Cleaning Dallas TX"}}
        ]
      }
    }
  ]
}
'@

$c = $c.Replace($oldAreaServed, $newAreaServed)

Set-Content $f $c -Encoding UTF8 -NoNewline
Write-Host "Dallas head fixes applied successfully"
