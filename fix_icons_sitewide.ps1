# ============================================================
# SITE-WIDE ICON FIX SCRIPT
# 1. Removes duplicate Font Awesome 6.4.0 CDN link from all HTML files
# 2. Ensures Font Awesome 6.5.1 is present on every page
# 3. Replaces fa-sparkles (Pro icon) with fa-soap (Free icon)
# 4. Replaces any other commonly broken icon names
# ============================================================

$root = '.'
$htmlFiles = Get-ChildItem -Path $root -Recurse -Filter 'index.html' | Select-Object -ExpandProperty FullName

$bad640 = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">'
$good651 = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">'

# Icon replacements: fa-sparkles -> fa-soap (reliable free icon for deep cleaning)
$iconFixes = @{
    'fa-sparkles'      = 'fa-soap'
    'fa-broom-wide'    = 'fa-broom'
    'fa-mop'           = 'fa-broom'
    'fa-vacuum'        = 'fa-broom'
    'fa-cleaning-kit'  = 'fa-bucket'
}

$fixed = 0
$skipped = 0

foreach ($file in $htmlFiles) {
    $c = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
    $original = $c
    $changed = $false

    # 1. Remove duplicate 6.4.0 link
    if ($c.Contains($bad640)) {
        $c = $c.Replace($bad640, '')
        $changed = $true
    }

    # 2. Make sure 6.5.1 is present (add if missing entirely)
    if (-not $c.Contains('font-awesome/6.5.1')) {
        if ($c.Contains('font-awesome/6.4.0')) {
            # Upgrade 6.4.0 to 6.5.1
            $c = $c.Replace(
                'href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"',
                'href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"'
            )
            $changed = $true
        } elseif ($c.Contains('</head>')) {
            # Inject FA 6.5.1 before </head>
            $c = $c.Replace('</head>', "    $good651`r`n</head>")
            $changed = $true
        }
    }

    # 3. Fix broken icon class names
    foreach ($key in $iconFixes.Keys) {
        if ($c.Contains("fa-$key") -or $c.Contains($key)) {
            $c = $c.Replace("fa-$key", "fa-$($iconFixes[$key])")
            $c = $c.Replace($key, $iconFixes[$key])
            $changed = $true
        }
    }

    # Specifically fix fa-sparkles -> fa-soap
    if ($c.Contains('fa-sparkles')) {
        $c = $c.Replace('fa-sparkles', 'fa-soap')
        $changed = $true
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($file, $c, [System.Text.Encoding]::UTF8)
        $fixed++
    } else {
        $skipped++
    }
}

Write-Host "=== ICON FIX COMPLETE ==="
Write-Host "Files fixed:   $fixed"
Write-Host "Files skipped: $skipped"
Write-Host "Total scanned: $($htmlFiles.Count)"
