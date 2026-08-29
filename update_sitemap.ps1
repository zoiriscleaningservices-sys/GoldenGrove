# Update sitemap dates
$sitemapPath = Join-Path $PSScriptRoot "sitemap.xml"
$content = Get-Content -Path $sitemapPath -Raw -Encoding UTF8
$content = $content -replace '<lastmod>2026-02-16</lastmod>', '<lastmod>2026-02-17</lastmod>'
[System.IO.File]::WriteAllText($sitemapPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Sitemap updated successfully!" -ForegroundColor Green
