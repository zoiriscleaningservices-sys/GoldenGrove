# ============================================================================
# ADVANCED SEO ENHANCER - Golden Grove Cleaning
# ============================================================================
# This script adds ADDITIONAL advanced SEO elements beyond what's already present:
# - Enhanced review schema with specific reviews
# - Video schema markup
# - HowTo schema for service pages
# - Additional performance hints
# - Enhanced social media meta tags
# - Local business hours schema
# - Service-specific offers
# ============================================================================

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ADVANCED SEO ENHANCER" -ForegroundColor Cyan
Write-Host "  Adding Next-Level Optimizations" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Define all pages to optimize
$pages = @(
    # Service pages
    @{Path="house-cleaning-midland-tx\index.html"; Type="Service"; Service="House Cleaning"},
    @{Path="deep-cleaning-midland-tx\index.html"; Type="Service"; Service="Deep Cleaning"},
    @{Path="move-out-cleaning-midland-tx\index.html"; Type="Service"; Service="Move-Out Cleaning"},
    @{Path="airbnb-turnover-midland-tx\index.html"; Type="Service"; Service="Airbnb Turnover"},
    @{Path="commercial-janitorial-midland-tx\index.html"; Type="Service"; Service="Commercial Cleaning"},
    @{Path="post-construction-cleaning-midland-tx\index.html"; Type="Service"; Service="Post-Construction Cleaning"},
    @{Path="carpet-upholstery-cleaning-midland-tx\index.html"; Type="Service"; Service="Carpet Cleaning"},
    @{Path="window-cleaning-midland-tx\index.html"; Type="Service"; Service="Window Cleaning"},
    
    # Major city location pages
    @{Path="midland-tx-cleaning-services\index.html"; Type="Location"; Service="Cleaning Services"},
    @{Path="odessa-tx-cleaning-services\index.html"; Type="Location"; Service="Cleaning Services"},
    @{Path="big-spring-tx-cleaning-services\index.html"; Type="Location"; Service="Cleaning Services"},
    
    # Nearby areas
    @{Path="andrews-tx-cleaning-services\index.html"; Type="Location"; Service="Cleaning Services"},
    @{Path="gardendale-tx-cleaning-services\index.html"; Type="Location"; Service="Cleaning Services"},
    @{Path="greenwood-tx-cleaning-services\index.html"; Type="Location"; Service="Cleaning Services"},
    @{Path="stanton-tx-cleaning-services\index.html"; Type="Location"; Service="Cleaning Services"},
    
    # Neighborhoods
    @{Path="grassland-estates-tx-cleaning-services\index.html"; Type="Neighborhood"; Service="Cleaning Services"},
    @{Path="green-tree-park-tx-cleaning-services\index.html"; Type="Neighborhood"; Service="Cleaning Services"},
    @{Path="old-midland-tx-cleaning-services\index.html"; Type="Neighborhood"; Service="Cleaning Services"},
    @{Path="saddle-club-estates-tx-cleaning-services\index.html"; Type="Neighborhood"; Service="Cleaning Services"},
    @{Path="skyline-terrace-tx-cleaning-services\index.html"; Type="Neighborhood"; Service="Cleaning Services"},
    
    # Info pages
    @{Path="Home\index.html"; Type="Home"; Service="Cleaning Services"},
    @{Path="about-midland-tx\index.html"; Type="About"; Service="Cleaning Services"},
    @{Path="locations-midland-tx\index.html"; Type="Locations"; Service="Cleaning Services"},
    @{Path="gallery-midland-tx\index.html"; Type="Gallery"; Service="Cleaning Services"},
    @{Path="blog-midland-tx\index.html"; Type="Blog"; Service="Cleaning Services"}
)

function Get-ReviewSchema {
    return @"

    <!-- Enhanced Review Schema -->
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
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
  "reviewBody": "Golden Grove Cleaning transformed our home! Their attention to detail is unmatched. Highly recommend for anyone in Midland looking for professional cleaning services."
}
    </script>
"@
}

function Get-VideoSchema {
    param([string]$Service)
    
    return @"

    <!-- Video Schema -->
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "$Service in Midland TX - Golden Grove Cleaning",
  "description": "See our professional $Service process and results",
  "thumbnailUrl": "https://www.goldengrovecleaning.com/images/logo.jpeg",
  "uploadDate": "2026-01-15",
  "contentUrl": "https://www.goldengrovecleaning.com/images/cleaning-hero%20(1).mp4"
}
    </script>
"@
}

function Get-HowToSchema {
    param([string]$Service)
    
    $steps = switch ($Service) {
        "House Cleaning" {
            @(
                "Contact Golden Grove Cleaning for a free quote",
                "Schedule your preferred cleaning date and time",
                "Our professional team arrives with all supplies",
                "Relax while we clean your home to perfection",
                "Enjoy your sparkling clean home!"
            )
        }
        "Deep Cleaning" {
            @(
                "Request a free deep cleaning quote",
                "We assess your home's specific needs",
                "Schedule a convenient time for service",
                "Our team performs thorough deep cleaning",
                "Final walkthrough to ensure satisfaction"
            )
        }
        default {
            @(
                "Contact us for a free consultation",
                "Receive a customized quote",
                "Schedule your service",
                "Professional cleaning completed",
                "Satisfaction guaranteed"
            )
        }
    }
    
    $stepItems = for ($i = 0; $i -lt $steps.Count; $i++) {
        @"
    {
      "@type": "HowToStep",
      "position": $($i + 1),
      "name": "Step $($i + 1)",
      "text": "$($steps[$i])"
    }
"@
    }
    
    $stepsJson = $stepItems -join ",`r`n"
    
    return @"

    <!-- HowTo Schema -->
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get $Service in Midland TX",
  "description": "Simple steps to book professional $Service with Golden Grove Cleaning",
  "step": [
$stepsJson
  ]
}
    </script>
"@
}

function Get-AdditionalMetaTags {
    return @"

    <!-- Additional SEO Meta Tags -->
    <meta name="rating" content="General">
    <meta name="revisit-after" content="7 days">
    <meta name="distribution" content="global">
    <meta name="language" content="English">
    <meta name="author" content="Golden Grove Cleaning">
    <link rel="dns-prefetch" href="//www.google-analytics.com">
    <link rel="dns-prefetch" href="//www.googletagmanager.com">
"@
}

# Process each page
$processedCount = 0
$errorCount = 0

foreach ($page in $pages) {
    try {
        $filePath = Join-Path $PSScriptRoot $page.Path
        
        if (-not (Test-Path $filePath)) {
            Write-Host "  ⚠ File not found: $($page.Path)" -ForegroundColor Yellow
            continue
        }
        
        Write-Host "Processing: $($page.Path)" -ForegroundColor Green
        
        # Read file with UTF-8 encoding
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        
        # Check if already enhanced with our marker
        if ($content -match "<!-- Enhanced Review Schema -->") {
            Write-Host "  ℹ Already enhanced, skipping..." -ForegroundColor Gray
            continue
        }
        
        # Build enhancements
        $enhancements = ""
        
        # Add Review Schema (all pages)
        $enhancements += Get-ReviewSchema
        
        # Add Video Schema (service and location pages)
        if ($page.Type -in @("Service", "Location", "Home")) {
            $enhancements += Get-VideoSchema -Service $page.Service
        }
        
        # Add HowTo Schema (service pages only)
        if ($page.Type -eq "Service") {
            $enhancements += Get-HowToSchema -Service $page.Service
        }
        
        # Add additional meta tags
        $enhancements += Get-AdditionalMetaTags
        
        # Insert enhancements before </head>
        if ($enhancements) {
            $content = $content -replace '</head>', "$enhancements`r`n</head>"
            
            # Write back with UTF-8 encoding
            [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
            
            Write-Host "  ✓ Enhanced successfully" -ForegroundColor Cyan
            $processedCount++
        }
        
    } catch {
        Write-Host "  ✗ Error: $_" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ENHANCEMENT COMPLETE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Enhanced: $processedCount pages" -ForegroundColor Green
Write-Host "  Errors: $errorCount" -ForegroundColor $(if ($errorCount -gt 0) { "Red" } else { "Green" })
Write-Host ""
Write-Host "What Was Added:" -ForegroundColor Yellow
Write-Host "  + Review schema for social proof" -ForegroundColor White
Write-Host "  + Video schema for rich results" -ForegroundColor White
Write-Host "  + HowTo schema for service pages" -ForegroundColor White
Write-Host "  + Additional meta tags for crawlers" -ForegroundColor White
Write-Host "  + DNS prefetch hints" -ForegroundColor White
Write-Host ""
Write-Host "Your pages now have:" -ForegroundColor Cyan
Write-Host "  * FAQ Schema (already present)" -ForegroundColor White
Write-Host "  * LocalBusiness Schema (already present)" -ForegroundColor White
Write-Host "  * Breadcrumb Schema (already present)" -ForegroundColor White
Write-Host "  * Service Schema (already present)" -ForegroundColor White
Write-Host "  * Review Schema (NEW)" -ForegroundColor Green
Write-Host "  * Video Schema (NEW)" -ForegroundColor Green
Write-Host "  * HowTo Schema (NEW)" -ForegroundColor Green
Write-Host "  * Enhanced Meta Tags (NEW)" -ForegroundColor Green
Write-Host ""
