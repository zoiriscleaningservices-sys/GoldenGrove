$irvingContent = [System.IO.File]::ReadAllText('irving-tx\index.html', [System.Text.Encoding]::UTF8)
$hasBadOG = $irvingContent.Contains('midland-tx-cleaning-services')
$hasGoodOG = $irvingContent.Contains('/irving-tx/')
Write-Host "Irving - has midland OG URL: $hasBadOG"
Write-Host "Irving - has irving-tx OG URL: $hasGoodOG"
$lines = $irvingContent -split "`n"
foreach ($line in $lines) { if ($line -match 'og:url') { Write-Host "Irving OG URL: $($line.Trim())" } }

$dallasContent = [System.IO.File]::ReadAllText('dallas-tx\index.html', [System.Text.Encoding]::UTF8)
Write-Host ""
Write-Host "Dallas - has FAQPage: $($dallasContent.Contains('FAQPage'))"
Write-Host "Dallas - has irving-tx link: $($dallasContent.Contains('/irving-tx/'))"
Write-Host "Dallas - has fort-worth link: $($dallasContent.Contains('/fort-worth-tx/'))"
Write-Host "Dallas - has midland bad OG: $($dallasContent.Contains('midland-tx-cleaning-services'))"
foreach ($line in ($dallasContent -split "`n")) { if ($line -match 'og:url') { Write-Host "Dallas OG URL: $($line.Trim())" } }
