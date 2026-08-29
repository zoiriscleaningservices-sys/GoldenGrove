$slugs = @('irving-tx','fort-worth-tx','plano-tx','garland-tx','arlington-tx','denton-tx','carrollton-tx','mesquite-tx','richardson-tx','grand-prairie-tx','lewisville-tx','frisco-tx','mckinney-tx','flower-mound-tx','mansfield-tx','desoto-tx','cedar-hill-tx','duncanville-tx','rowlett-tx','lancaster-tx')

$badUrl = 'content="https://www.goldengrovecleaning.com/midland-tx-cleaning-services.html"'

foreach ($slug in $slugs) {
    $f = Join-Path $slug 'index.html'
    if (-not (Test-Path $f)) { continue }
    $c = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
    $goodUrl = 'content="https://www.goldengrovecleaning.com/' + $slug + '/"'
    if ($c.Contains($badUrl)) {
        $c = $c.Replace($badUrl, $goodUrl)
        [System.IO.File]::WriteAllText($f, $c, [System.Text.Encoding]::UTF8)
        Write-Host "OG URL fixed: $slug"
    } else {
        Write-Host "OG URL already clean: $slug"
    }
}

# Also verify Dallas FAQ - check actual string
$df = [System.IO.File]::ReadAllText('dallas-tx\index.html', [System.Text.Encoding]::UTF8)
if ($df.Contains('"@type": "FAQPage"') -or $df.Contains('"@type":"FAQPage"')) {
    Write-Host "Dallas FAQ schema: CONFIRMED PRESENT"
} else {
    Write-Host "Dallas FAQ: NOT FOUND - adding now"
    $faq = '    <script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What cleaning services does Golden Grove offer in Dallas TX?","acceptedAnswer":{"@type":"Answer","text":"We offer house cleaning, deep cleaning, move-out, commercial janitorial, office cleaning, post-construction, carpet cleaning, Airbnb turnover and more throughout Dallas TX and DFW."}},{"@type":"Question","name":"How much does cleaning cost in Dallas TX?","acceptedAnswer":{"@type":"Answer","text":"House cleaning starts at $120-$180. Deep cleaning starts at $200+. Call (432) 218-1700 for a free quote."}},{"@type":"Question","name":"Does Golden Grove serve Irving TX?","acceptedAnswer":{"@type":"Answer","text":"Yes! We serve Irving TX, Fort Worth, Plano, Garland, Arlington, Carrollton, Mesquite, Richardson, Grand Prairie, Lewisville, Frisco, McKinney and all DFW cities."}},{"@type":"Question","name":"What is the best cleaning company in Dallas TX?","acceptedAnswer":{"@type":"Answer","text":"Golden Grove Cleaning is rated #1 in Dallas TX with a 4.9-star rating across 127+ reviews."}}]}</script>'
    $df = $df.Replace('</head>', $faq + "`r`n</head>")
    [System.IO.File]::WriteAllText('dallas-tx\index.html', $df, [System.Text.Encoding]::UTF8)
}

Write-Host "`nAll done!"
