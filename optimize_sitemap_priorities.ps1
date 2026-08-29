# ============================================================================
# SITEMAP PRIORITY OPTIMIZER
# ============================================================================
# Sets all pages to high priority (0.9-1.0) and weekly changefreq
# to signal importance to Google Search Console
# ============================================================================

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SITEMAP PRIORITY OPTIMIZER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$sitemapPath = Join-Path $PSScriptRoot "sitemap.xml"

# Read sitemap
$content = Get-Content -Path $sitemapPath -Raw -Encoding UTF8

# Update all service pages to priority 1.0 and weekly
$content = $content -replace '(<loc>https://www\.goldengrovecleaning\.com/(?:house-cleaning|deep-cleaning|move-out-cleaning|airbnb-turnover|commercial-janitorial|post-construction-cleaning|carpet-upholstery-cleaning|window-cleaning)-midland-tx/</loc>.*?)<priority>0\.9</priority>', '$1<priority>1.0</priority>'
$content = $content -replace '(<loc>https://www\.goldengrovecleaning\.com/(?:house-cleaning|deep-cleaning|move-out-cleaning|airbnb-turnover|commercial-janitorial|post-construction-cleaning|carpet-upholstery-cleaning|window-cleaning)-midland-tx/</loc>.*?)<changefreq>weekly</changefreq>', '$1<changefreq>weekly</changefreq>'

# Update all location pages to priority 1.0 and weekly
$content = $content -replace '(<loc>https://www\.goldengrovecleaning\.com/(?:midland|odessa|big-spring)-tx-cleaning-services/</loc>.*?)<priority>0\.[89]</priority>', '$1<priority>1.0</priority>'
$content = $content -replace '(<loc>https://www\.goldengrovecleaning\.com/(?:midland|odessa|big-spring)-tx-cleaning-services/</loc>.*?)<changefreq>weekly</changefreq>', '$1<changefreq>weekly</changefreq>'

# Update nearby areas to priority 0.9 and weekly
$content = $content -replace '(<loc>https://www\.goldengrovecleaning\.com/(?:andrews|gardendale|greenwood|stanton)-tx-cleaning-services/</loc>.*?)<priority>0\.7</priority>', '$1<priority>0.9</priority>'
$content = $content -replace '(<loc>https://www\.goldengrovecleaning\.com/(?:andrews|gardendale|greenwood|stanton)-tx-cleaning-services/</loc>.*?)<changefreq>monthly</changefreq>', '$1<changefreq>weekly</changefreq>'

# Update neighborhoods to priority 0.9 and weekly
$content = $content -replace '(<loc>https://www\.goldengrovecleaning\.com/(?:grassland-estates|green-tree-park|old-midland|saddle-club-estates|skyline-terrace)-tx-cleaning-services/</loc>.*?)<priority>0\.6</priority>', '$1<priority>0.9</priority>'
$content = $content -replace '(<loc>https://www\.goldengrovecleaning\.com/(?:grassland-estates|green-tree-park|old-midland|saddle-club-estates|skyline-terrace)-tx-cleaning-services/</loc>.*?)<changefreq>monthly</changefreq>', '$1<changefreq>weekly</changefreq>'

# Update info pages to priority 0.9 and weekly
$content = $content -replace '(<loc>https://www\.goldengrovecleaning\.com/(?:about|locations|gallery|blog)-midland-tx/</loc>.*?)<priority>0\.[67]</priority>', '$1<priority>0.9</priority>'
$content = $content -replace '(<loc>https://www\.goldengrovecleaning\.com/(?:about|locations|gallery)-midland-tx/</loc>.*?)<changefreq>monthly</changefreq>', '$1<changefreq>weekly</changefreq>'

# Write back
[System.IO.File]::WriteAllText($sitemapPath, $content, [System.Text.Encoding]::UTF8)

Write-Host "Sitemap optimized successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Priority Updates:" -ForegroundColor Yellow
Write-Host "  * Homepage: 1.0 (maximum)" -ForegroundColor White
Write-Host "  * All Service Pages: 1.0 (maximum)" -ForegroundColor White
Write-Host "  * Major City Pages: 1.0 (maximum)" -ForegroundColor White
Write-Host "  * Nearby Areas: 0.9 (very high)" -ForegroundColor White
Write-Host "  * Neighborhoods: 0.9 (very high)" -ForegroundColor White
Write-Host "  * Info Pages: 0.9 (very high)" -ForegroundColor White
Write-Host ""
Write-Host "All pages set to 'weekly' changefreq for frequent crawling!" -ForegroundColor Cyan
Write-Host ""
