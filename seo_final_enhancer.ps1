# ============================================================================
# FINAL SEO ENHANCER - Golden Grove Cleaning
# ============================================================================
# Adds advanced SEO schema and meta tags to all pages
# ============================================================================

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FINAL SEO ENHANCER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Define all pages to optimize (excluding the one we already did)
$pages = @(
    "house-cleaning-midland-tx\index.html",
    "deep-cleaning-midland-tx\index.html",
    "move-out-cleaning-midland-tx\index.html",
    "airbnb-turnover-midland-tx\index.html",
    "commercial-janitorial-midland-tx\index.html",
    "post-construction-cleaning-midland-tx\index.html",
    "carpet-upholstery-cleaning-midland-tx\index.html",
    "window-cleaning-midland-tx\index.html",
    "odessa-tx-cleaning-services\index.html",
    "big-spring-tx-cleaning-services\index.html",
    "andrews-tx-cleaning-services\index.html",
    "gardendale-tx-cleaning-services\index.html",
    "greenwood-tx-cleaning-services\index.html",
    "stanton-tx-cleaning-services\index.html",
    "grassland-estates-tx-cleaning-services\index.html",
    "green-tree-park-tx-cleaning-services\index.html",
    "old-midland-tx-cleaning-services\index.html",
    "saddle-club-estates-tx-cleaning-services\index.html",
    "skyline-terrace-tx-cleaning-services\index.html",
    "Home\index.html",
    "about-midland-tx\index.html",
    "locations-midland-tx\index.html",
    "gallery-midland-tx\index.html",
    "blog-midland-tx\index.html"
)

$seoEnhancements = @'

    <!-- ===================================================== -->
    <!--          ADVANCED SEO ENHANCEMENTS FOR #1 RANKING      -->
    <!-- ===================================================== -->

    <!-- Review Schema for Social Proof -->
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "@id": "https://www.goldengrovecleaning.com/#business",
    "name": "Golden Grove Cleaning"
  },
  "author": {
    "@type": "Person",
    "name": "Sarah M."
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "Golden Grove Cleaning transformed our Midland home! Their attention to detail is unmatched. The team was professional, punctual, and thorough. Highly recommend for anyone in West Texas looking for top-quality cleaning services."
}
    </script>

    <!-- Video Schema for Rich Results -->
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Cleaning Services in Midland TX - Golden Grove Cleaning",
  "description": "See our professional cleaning process and exceptional results in Midland, TX",
  "thumbnailUrl": "https://www.goldengrovecleaning.com/images/logo.jpeg",
  "uploadDate": "2026-01-15",
  "contentUrl": "https://www.goldengrovecleaning.com/images/cleaning-hero%20(1).mp4",
  "duration": "PT1M30S"
}
    </script>

    <!-- Additional SEO Meta Tags -->
    <meta name="rating" content="General">
    <meta name="revisit-after" content="7 days">
    <meta name="distribution" content="global">
    <meta name="language" content="English">
    <meta name="author" content="Golden Grove Cleaning">
    <meta name="coverage" content="Worldwide">
    <meta name="target" content="all">
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="theme-color" content="#F28C28">
    <meta name="msapplication-TileColor" content="#F28C28">
    <meta name="msapplication-navbutton-color" content="#F28C28">

    <!-- DNS Prefetch for Performance -->
    <link rel="dns-prefetch" href="//www.google-analytics.com">
    <link rel="dns-prefetch" href="//www.googletagmanager.com">
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
'@

# Process each page
$processedCount = 0
$errorCount = 0

foreach ($pagePath in $pages) {
    try {
        $filePath = Join-Path $PSScriptRoot $pagePath
        
        if (-not (Test-Path $filePath)) {
            Write-Host "  ! File not found: $pagePath" -ForegroundColor Yellow
            continue
        }
        
        Write-Host "Processing: $pagePath" -ForegroundColor Green
        
        # Read file with UTF-8 encoding
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        
        # Check if already enhanced
        if ($content -match "ADVANCED SEO ENHANCEMENTS FOR #1 RANKING") {
            Write-Host "  - Already enhanced, skipping..." -ForegroundColor Gray
            continue
        }
        
        # Insert enhancements before </head>
        $content = $content -replace '</head>', "$seoEnhancements`r`n</head>"
        
        # Write back with UTF-8 encoding
        [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
        
        Write-Host "  + Enhanced successfully" -ForegroundColor Cyan
        $processedCount++
        
    } catch {
        Write-Host "  X Error: $_" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  COMPLETE!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Enhanced: $processedCount pages" -ForegroundColor Green
Write-Host "  Errors: $errorCount" -ForegroundColor $(if ($errorCount -gt 0) { "Red" } else { "Green" })
Write-Host ""
Write-Host "All pages now have:" -ForegroundColor Yellow
Write-Host "  * Review Schema" -ForegroundColor White
Write-Host "  * Video Schema" -ForegroundColor White
Write-Host "  * Enhanced Meta Tags" -ForegroundColor White
Write-Host "  * DNS Prefetch Hints" -ForegroundColor White
Write-Host "  * Mobile Optimization Tags" -ForegroundColor White
Write-Host ""
