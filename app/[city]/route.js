import fs from 'fs';
import path from 'path';
import cities from '@/data/cities.json';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 hours ISR cache on Vercel Edge

const FAILSAFE_CSS = `
    <style id="zero-blank-screen">
        [data-aos], 
        html.aos-init [data-aos],
        html.aos-init [data-aos]:not(.aos-animate),
        [data-aos^=fade], [data-aos^=zoom], [data-aos^=slide], [data-aos^=flip],
        [data-aos^=fade][data-aos^=fade], [data-aos^=zoom][data-aos^=zoom], [data-aos^=slide][data-aos^=slide],
        html [data-aos], body [data-aos] {
            opacity: 1 !important;
            transform: none !important;
            visibility: visible !important;
            filter: none !important;
        }
    </style>
`;

const FAVICON_HTML = `
    <!-- Favicon & App Icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png">
    <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico">
    <link rel="shortcut icon" type="image/x-icon" href="/favicon/favicon.ico">
    <link rel="manifest" href="/favicon/site.webmanifest">
`;

function ensureFailsafe(html) {
  let res = html;
  // Eliminate any CSS rule that sets opacity: 0 on aos-init
  res = res.replace(/html\.aos-init\s+\[data-aos\]\s*\{[^}]*opacity:\s*0[^}]*\}/gi, 'html.aos-init [data-aos] { opacity: 1 !important; }');
  
  if (!res.includes('id="zero-blank-screen"')) {
    if (res.includes('</head>')) {
      res = res.replace('</head>', `${FAILSAFE_CSS}</head>`);
    } else {
      res = `${FAILSAFE_CSS}${res}`;
    }
  }

  // Ensure favicon on every page
  res = res.replace(/<link[^>]*rel=["'](?:apple-touch-icon|icon|shortcut icon|manifest)["'][^>]*>\s*/gi, '');
  if (res.includes('</head>')) {
    res = res.replace('</head>', `${FAVICON_HTML}\n</head>`);
  } else if (res.includes('<head>')) {
    res = res.replace('<head>', `<head>\n${FAVICON_HTML}`);
  }

  const safetyScript = `<script>
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('[data-aos]').forEach(function(el) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
      });
    });
  </script>`;
  if (res.includes('</body>')) {
    res = res.replace('</body>', `${safetyScript}</body>`);
  }

  return res;
}

function sanitizeHtml(html, city, serviceSlug = null) {
  let res = html;
  const cityName = city.name;
  const citySlug = city.slug;
  const lat = city.lat || 31.9686;
  const lng = city.lng || -99.9018;
  const zip = city.zip || '79701';

  // 1. Canonical Link
  const targetUrl = serviceSlug
    ? `https://www.goldengrovecleaning.com/${citySlug}/${serviceSlug}/`
    : `https://www.goldengrovecleaning.com/${citySlug}/`;

  res = res.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']+["']\s*\/?>/i, `<link rel="canonical" href="${targetUrl}" />`);

  // 2. OpenGraph & Schema URLs
  res = res.replaceAll('https://www.goldengrovecleaning.com/Template/midland-tx-cleaning-services/', targetUrl);
  res = res.replaceAll('https://www.goldengrovecleaning.com/midland-tx/', `https://www.goldengrovecleaning.com/${citySlug}/`);
  res = res.replaceAll('/midland-tx/', `/${citySlug}/`);

  // 3. Geographic Meta Tags
  res = res.replace(/<meta\s+name=["']geo\.placename["']\s+content=["'][^"']+["']\s*\/?>/i, `<meta name="geo.placename" content="${cityName}">`);
  res = res.replace(/<meta\s+name=["']geo\.position["']\s+content=["'][^"']+["']\s*\/?>/i, `<meta name="geo.position" content="${lat};${lng}">`);
  res = res.replace(/<meta\s+name=["']ICBM["']\s+content=["'][^"']+["']\s*\/?>/i, `<meta name="ICBM" content="${lat}, ${lng}">`);

  // 4. Schema Coordinates & Locality
  res = res.replace(/"addressLocality":\s*"[^"]+"/g, `"addressLocality": "${cityName}"`);
  if (zip) {
    res = res.replace(/"postalCode":\s*"[^"]+"/g, `"postalCode": "${zip}"`);
  }
  res = res.replace(/"latitude":\s*[\d.-]+/g, `"latitude": ${lat}`);
  res = res.replace(/"longitude":\s*[\d.-]+/g, `"longitude": ${lng}`);

  // 5. Silo Insulation: Localize Desktop and Mobile Home links
  res = res.replace(/href="\/"(\s*)class="contact-button text-lg">Home<\/a>/g, `href="/${citySlug}/"$1class="contact-button text-lg">Home</a>`);
  res = res.replace(/onclick="location\.href=['"]\/['"]"/g, `onclick="location.href='/${citySlug}/'"`);
  res = res.replace(/href="\/"(\s*)class="block px-4 py-4 text-xl font-medium text-white/g, `href="/${citySlug}/"$1class="block px-4 py-4 text-xl font-medium text-white`);

  // 6. Text content replacements
  res = res.replaceAll('Midland TX', `${cityName} TX`);
  res = res.replaceAll('Midland, TX', `${cityName}, TX`);
  res = res.replaceAll('Midland Texas', `${cityName} Texas`);
  res = res.replaceAll('Midland', cityName);
  res = res.replaceAll('midland', cityName.toLowerCase());

  // 7. Localize Header Locations Dropdown with authentic city nearby locations
  const cityFilePath = path.join(process.cwd(), 'templates', 'cities', `${citySlug}.html`);
  let dropdownReplaced = false;

  if (fs.existsSync(cityFilePath)) {
    try {
      const cityHtml = fs.readFileSync(cityFilePath, 'utf8');
      const deskMatch = cityHtml.match(/<!-- Locations Dropdown -->[\s\S]*?(?=\s*<a\s+href="[^"]*(?:\/about\/|\/blog\/|\/gallery\/|#quote|#about))/i);
      if (deskMatch) {
        res = res.replace(/<!-- Locations Dropdown -->[\s\S]*?(?=\s*<a\s+href="[^"]*(?:\/about\/|\/blog\/|\/gallery\/|#quote|#about))/i, deskMatch[0]);
        dropdownReplaced = true;
      }
      const mobMatch = cityHtml.match(/<!-- Mobile Locations Dropdown Accordion -->[\s\S]*?(?=\s*<a\s+href="[^"]*(?:\/about\/|\/blog\/|\/gallery\/|#quote|#about))/i);
      if (mobMatch) {
        res = res.replace(/<!-- Mobile Locations Dropdown Accordion -->[\s\S]*?(?=\s*<a\s+href="[^"]*(?:\/about\/|\/blog\/|\/gallery\/|#quote|#about))/i, mobMatch[0]);
      }
    } catch (e) {}
  }

  if (!dropdownReplaced && city.nearby && Array.isArray(city.nearby) && city.nearby.length > 0) {
    const topNearby = city.nearby.slice(0, 8);
    
    // Desktop dropdown items
    const desktopLocHtml = topNearby.map(nb => {
      const nbName = nb.name.endsWith(', TX') ? nb.name : `${nb.name}, TX`;
      return `                                <a href="/${nb.slug}/" class="block px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-brand-orange hover:bg-orange-50 rounded transition-colors">• ${nbName}</a>`;
    }).join('\n');

    // Mobile dropdown items
    const mobileLocHtml = topNearby.map(nb => {
      const nbName = nb.name.endsWith(', TX') ? nb.name : `${nb.name}, TX`;
      return `                        <a href="/${nb.slug}/" class="block py-1.5 px-3 text-sm font-semibold text-gray-700 hover:text-brand-orange hover:bg-orange-50 rounded-lg transition-colors">• ${nbName}</a>`;
    }).join('\n');

    res = res.replace(
      /(<!-- Locations Dropdown -->[\s\S]*?<div class="bg-white[^"]*"[^>]*>)[\s\S]*?(<div class="pt-2[^"]*border-t)/i,
      `$1\n<div class="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">Nearby Locations</div>\n<div class="space-y-0.5 max-h-[380px] overflow-y-auto">\n${desktopLocHtml}\n</div>\n                                $2`
    );

    res = res.replace(
      /(<!-- Mobile Locations Dropdown Accordion -->[\s\S]*?<div class="mobile-panel[^>]*>)[\s\S]*?(<a href="\/locations\/")/i,
      `$1\n${mobileLocHtml}\n                        $2`
    );
  }

  // Update Footer Service Areas column with nearby cities
  if (city.nearby && Array.isArray(city.nearby) && city.nearby.length > 0) {
    const topNearby = city.nearby.slice(0, 5);
    const footerNearbyHtml = topNearby.map(nb => {
      const nbName = nb.name.endsWith(', TX') ? nb.name : `${nb.name}, TX`;
      return `                        <li><a href="/${nb.slug}/" class="text-gray-400 hover:text-brand-orange transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span> ${nbName}</a></li>`;
    }).join('\n');

    res = res.replace(
      /(<h3[^>]*>[\s\S]*?Service Areas<\/h3>\s*<ul[^>]*>)[\s\S]*?(<\/ul>)/i,
      `$1\n${footerNearbyHtml}\n                    $2`
    );
  }

  // 8. Footer Order Failsafe: Ensure CTA section is ALWAYS before </main>
  const ctaTagStart = '<!-- BOOK NOW CTA SECTION -->';
  const ctaTagEnd = '<!-- END BOOK NOW CTA SECTION -->';
  const ctaS = res.indexOf(ctaTagStart);
  const ctaE = res.indexOf(ctaTagEnd);
  if (ctaS !== -1 && ctaE !== -1) {
    const ctaBlock = res.slice(ctaS, ctaE + ctaTagEnd.length);
    res = res.slice(0, ctaS) + res.slice(ctaE + ctaTagEnd.length);
    const mEnd = res.indexOf('</main>');
    if (mEnd !== -1) {
      res = res.slice(0, mEnd) + '\n\n' + ctaBlock + '\n\n' + res.slice(mEnd);
    }
  }

  return res;
}

function resolveSpintax(str) {
  let res = str;
  const regex = /\{([^{}]+)\}/g;
  let it = 0;
  while (regex.test(res) && it < 20) {
    res = res.replace(regex, (m, choices) => choices.includes('|') ? choices.split('|')[0].trim() : m);
    it++;
  }
  return res;
}

export async function GET(request, { params }) {
  const { city: slug } = await params;
  if (!slug) {
    return new Response('Not Found', { status: 404 });
  }

  const s0 = slug.toLowerCase();

  // 1. Is it a curated static page (e.g. locations, texas-service-areas, about, house-cleaning, etc.)?
  const staticPath = path.join(process.cwd(), 'templates', 'static_pages', s0, 'index.html');
  if (fs.existsSync(staticPath)) {
    const rawHtml = fs.readFileSync(staticPath, 'utf-8');
    const html = ensureFailsafe(resolveSpintax(rawHtml));
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }

  // 2. Is it a Texas city hub page (e.g. midland-tx, dallas-tx, houston-tx)?
  const city = cities.find((c) => c.slug === s0);
  if (city) {
    // A. Check dedicated compiled city file in templates/cities/${s0}.html
    const cityFilePath = path.join(process.cwd(), 'templates', 'cities', `${s0}.html`);
    if (fs.existsSync(cityFilePath)) {
      const rawHtml = fs.readFileSync(cityFilePath, 'utf-8');
      const html = ensureFailsafe(resolveSpintax(rawHtml));
      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    // B. Fallback to personalized city_hub template
    const templatePath = path.join(process.cwd(), 'templates', 'city_hub.html');
    if (fs.existsSync(templatePath)) {
      const rawHtml = fs.readFileSync(templatePath, 'utf-8');
      const html = ensureFailsafe(resolveSpintax(sanitizeHtml(rawHtml, city)));
      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }
  }

  // 3. 404 Not Found
  return new Response('<!doctype html><html><head><title>404 Not Found</title></head><body style="font-family:sans-serif;text-align:center;padding:100px;"><h1>404 - Page Not Found</h1><p><a href="/">Return Home</a></p></body></html>', {
    status: 404,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
