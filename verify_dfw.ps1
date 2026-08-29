$checks = @("irving-tx","fort-worth-tx","dallas-tx","plano-tx","garland-tx","arlington-tx")
foreach ($slug in $checks) {
    $f = "$slug\index.html"
    if (-not (Test-Path $f)) { Write-Host "MISSING: $f"; continue }
    $c = Get-Content $f -Raw -Encoding UTF8
    Write-Host "--- $slug ---"
    if ($c -match '<title>([^<]+)</title>') { Write-Host "  TITLE: $($Matches[1])" }
    if ($c -match '"@type": "FAQPage"') { Write-Host "  FAQ SCHEMA: OK" } else { Write-Host "  FAQ SCHEMA: MISSING" }
    if ($c -match 'irving-tx|fort-worth-tx|dallas-tx') { Write-Host "  DFW INTERNAL LINKS: OK" } else { Write-Host "  DFW INTERNAL LINKS: MISSING" }
    if ($c -notmatch 'cleaning services midland tx') { Write-Host "  MIDLAND KEYWORDS: CLEANED" } else { Write-Host "  MIDLAND KEYWORDS: STILL PRESENT" }
    if ($c -notmatch 'midland-tx-cleaning-services') { Write-Host "  BAD OG URL: FIXED" } else { Write-Host "  BAD OG URL: STILL PRESENT" }
    if ($c -match 'Dallas-Fort Worth') { Write-Host "  FOOTER DFW: OK" } else { Write-Host "  FOOTER DFW: CHECK" }
}
Write-Host "`nVerification complete."
