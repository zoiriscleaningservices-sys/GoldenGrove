$f = 'dallas-tx\index.html'
$c = Get-Content $f -Raw -Encoding UTF8

# =============================================
# 1. INSERT FAQ + Reviews schemas after BreadcrumbList schema
# =============================================
$breadcrumbEnd = '</script>

    <!-- ===================================================== -->
    <!--          ADVANCED SEO ENHANCEMENTS FOR #1 RANKING      -->
    <!-- ===================================================== -->'

$schemasToInsert = @'
</script>

    <!-- ===================================================== -->
    <!--          ADVANCED SEO ENHANCEMENTS FOR #1 RANKING      -->
    <!-- ===================================================== -->

    <!-- FAQ Schema - Targets Google AI Overviews & People Also Ask -->
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What cleaning services does Golden Grove offer in Dallas, TX?",
      "acceptedAnswer": {"@type": "Answer", "text": "Golden Grove Cleaning offers house cleaning, deep cleaning, move-in/move-out cleaning, post-construction cleaning, commercial janitorial, office cleaning, carpet cleaning, window cleaning, Airbnb turnover, luxury estate cleaning, and more throughout Dallas, TX and the entire DFW Metroplex."}
    },
    {
      "@type": "Question",
      "name": "How much does house cleaning cost in Dallas, TX?",
      "acceptedAnswer": {"@type": "Answer", "text": "House cleaning in Dallas, TX typically starts at $120-$180 for a standard clean. Deep cleaning and move-out cleaning start at $200+. Golden Grove Cleaning offers free, no-obligation quotes - call (432) 218-1700 or fill out our online form."}
    },
    {
      "@type": "Question",
      "name": "Does Golden Grove Cleaning serve Irving, TX?",
      "acceptedAnswer": {"@type": "Answer", "text": "Yes! Golden Grove Cleaning proudly serves Irving, TX and all surrounding DFW cities including Fort Worth, Plano, Garland, Arlington, Carrollton, Mesquite, Richardson, Grand Prairie, Lewisville, Frisco, McKinney, and more."}
    },
    {
      "@type": "Question",
      "name": "Are your Dallas cleaning services available on weekends?",
      "acceptedAnswer": {"@type": "Answer", "text": "Yes, Golden Grove Cleaning is available Monday through Saturday, 7:00 AM to 7:00 PM, with 24/7 emergency cleaning services available for urgent needs in Dallas, TX."}
    },
    {
      "@type": "Question",
      "name": "What is the best cleaning company in Dallas TX?",
      "acceptedAnswer": {"@type": "Answer", "text": "Golden Grove Cleaning is rated the #1 cleaning company in Dallas, TX with a 4.9-star rating across 127+ reviews. We specialize in residential and commercial cleaning throughout the Dallas-Fort Worth Metroplex."}
    },
    {
      "@type": "Question",
      "name": "Do you offer commercial cleaning services in Dallas, TX?",
      "acceptedAnswer": {"@type": "Answer", "text": "Absolutely. Golden Grove Cleaning provides full commercial janitorial services in Dallas, TX including office cleaning, medical facility cleaning, school and daycare cleaning, gym cleaning, warehouse cleaning, and more."}
    },
    {
      "@type": "Question",
      "name": "How do I get a free cleaning quote in Dallas?",
      "acceptedAnswer": {"@type": "Answer", "text": "Getting a free cleaning quote in Dallas is easy! Call us at (432) 218-1700, fill out the quote form on our website, or message us via WhatsApp. We typically respond within 30 minutes."}
    },
    {
      "@type": "Question",
      "name": "Do Dallas cleaning services include deep cleaning?",
      "acceptedAnswer": {"@type": "Answer", "text": "Yes! Our Dallas deep cleaning service covers every surface top-to-bottom: inside appliances, baseboards, window sills, ceiling fans, grout scrubbing, and more. Perfect for first-time cleans or seasonal refreshes."}
    }
  ]
}
    </script>

    <!-- 5-Star Reviews Schema for Rich Results -->
    <script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {"@type": "LocalBusiness", "@id": "https://www.goldengrovecleaning.com/#business", "name": "Golden Grove Cleaning"},
    "author": {"@type": "Person", "name": "Sarah M."},
    "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
    "datePublished": "2026-03-10",
    "reviewBody": "Golden Grove Cleaning transformed our Dallas home! Their attention to detail is unmatched. The team was professional, punctual, and thorough. Best cleaning service in Dallas, TX!"
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {"@type": "LocalBusiness", "@id": "https://www.goldengrovecleaning.com/#business", "name": "Golden Grove Cleaning"},
    "author": {"@type": "Person", "name": "James R."},
    "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
    "datePublished": "2026-02-22",
    "reviewBody": "We hired Golden Grove for our Dallas office deep cleaning and were blown away. The team arrived on time and did a spotless job. Our employees noticed the difference immediately. Highly recommended!"
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {"@type": "LocalBusiness", "@id": "https://www.goldengrovecleaning.com/#business", "name": "Golden Grove Cleaning"},
    "author": {"@type": "Person", "name": "Maria L."},
    "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
    "datePublished": "2026-01-18",
    "reviewBody": "I have tried several cleaning services in Dallas and Golden Grove is by far the best. They did an amazing move-out clean on my North Dallas apartment. Got my full deposit back!"
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {"@type": "LocalBusiness", "@id": "https://www.goldengrovecleaning.com/#business", "name": "Golden Grove Cleaning"},
    "author": {"@type": "Person", "name": "David K."},
    "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
    "datePublished": "2025-12-05",
    "reviewBody": "Outstanding post-construction cleaning in our new Downtown Dallas build. Golden Grove handled the entire cleanup professionally. Floors, windows, fixtures - everything was immaculate."
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {"@type": "LocalBusiness", "@id": "https://www.goldengrovecleaning.com/#business", "name": "Golden Grove Cleaning"},
    "author": {"@type": "Person", "name": "Priya S."},
    "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
    "datePublished": "2025-11-14",
    "reviewBody": "Incredible Airbnb turnover cleaning in the Uptown Dallas area. Golden Grove is fast, thorough, and incredibly reliable. My guests consistently leave 5-star reviews since I hired them!"
  }
]
    </script>
'@

$c = $c.Replace($breadcrumbEnd, $schemasToInsert)

# =============================================
# 2. FIX H1 TAG - Add "Professional Cleaning Services"
# =============================================
$c = $c.Replace(
    'Top Cleaning Company in<br class="sm:hidden" />',
    'Professional Cleaning Services in<br class="sm:hidden" />'
)

# =============================================
# 3. FIX BROKEN NEIGHBORHOOD LINKS
# =============================================
$c = $c.Replace('href="/old-midland-tx-cleaning-services/"', 'href="/dallas-tx/downtown-dallas/"')
$c = $c.Replace('href="/grassland-estates-tx-cleaning-services/"', 'href="/dallas-tx/north-dallas/"')
$c = $c.Replace('href="/green-tree-park-tx-cleaning-services/"', 'href="/dallas-tx/south-dallas/"')
$c = $c.Replace('href="/saddle-club-estates-tx-cleaning-services/"', 'href="/dallas-tx/dallas-heights/"')
$c = $c.Replace('href="/skyline-terrace-tx-cleaning-services/"', 'href="/dallas-tx/west-dallas-estates/"')

# Fix neighborhood span text
$c = $c.Replace('>Old' + "`r`n" + '                                    Dallas</span>', '>Downtown Dallas</span>')
$c = $c.Replace('>Grassland' + "`r`n" + '                                     Estates</span>', '>North Dallas</span>')
$c = $c.Replace('>Green' + "`r`n" + '                                     Tree Park</span>', '>South Dallas</span>')
$c = $c.Replace('>Saddle' + "`r`n" + '                                     Club Estates</span>', '>Dallas Heights</span>')
$c = $c.Replace('>Skyline' + "`r`n" + '                                     Terrace</span>', '>West Dallas Estates</span>')

# =============================================
# 4. FIX "View All West Texas" label
# =============================================
$c = $c.Replace('View All West Texas Service Areas', 'View All DFW Metroplex Service Areas')

# =============================================
# 5. FIX FOOTER - "Dallas & Odessa" to "Dallas-Fort Worth"
# =============================================
$c = $c.Replace(
    'Setting the gold standard for residential and commercial cleaning in Dallas &amp; Odessa, TX. Locally',
    'Setting the gold standard for residential and commercial cleaning in Dallas-Fort Worth, TX. Locally'
)
$c = $c.Replace(
    'Setting the gold standard for residential and commercial cleaning in Dallas & Odessa, TX. Locally',
    'Setting the gold standard for residential and commercial cleaning in Dallas-Fort Worth, TX. Locally'
)

Set-Content $f $c -Encoding UTF8 -NoNewline
Write-Host "Dallas body + schema fixes applied successfully"
