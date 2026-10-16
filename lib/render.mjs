// Render pipeline for template-backed pages.
//
// Every HTML response goes through renderRoute(), which applies, in order:
//   1. localizeTemplate()        – Midland-based shared templates -> target city (city/service pages)
//   2. rewriteInternalLinks()    – canonicalize legacy/duplicate links; drop links to generated neighborhoods
//   3. injectNearby()            – replace hardcoded "nearby"/"neighborhood" blocks with real nearby places
//   4. normalizeClaims()         – remove conflicting review counts, unverified prices, "#1" superlatives
//   5. normalizeStructuredData() – one consistent business entity; no fake addresses, ratings, or reviews
//   6. normalizeHead()           – single canonical, policy-driven robots, og:url, description
//   7. ensureFailsafe()          – favicon + animation visibility safety net (pre-existing behavior)
//
// Bump RENDER_VERSION whenever the output of this pipeline changes meaningfully; it feeds the
// sitemap <lastmod> manifest (scripts/content-dates.mjs).
import fs from 'node:fs';
import { getBusiness, getCityMap, getServiceMap, getPolicy } from './data.mjs';
import { SITE_URL, CITY_CORE_COPIES, SERVICE_ALIASES, canonicalUrl, policyFor, neighborhoodParents, STATIC_REDIRECTS, resolvePath } from './routes.mjs';
import { haversineMiles } from './geo.mjs';

export const RENDER_VERSION = '2026-10-15.1';

const HOME_MARKET_RADIUS_MI = 150; // "West Texas / Permian Basin" wording is only accurate near Midland.
const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const ROBOTS_NOINDEX = 'noindex, follow';

// ---------------------------------------------------------------------------------------------
// Template loading
// ---------------------------------------------------------------------------------------------
const templateCache = new Map();
export function loadTemplate(file) {
  const mtime = fs.statSync(file).mtimeMs;
  const hit = templateCache.get(file);
  if (hit && hit.mtime === mtime) return hit.html;
  const html = fs.readFileSync(file, 'utf8');
  templateCache.set(file, { mtime, html });
  return html;
}

// ---------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const SEGMENT_RE = /<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi;

/** Apply fn to HTML outside <script>/<style> blocks (markup, attributes, and visible text). */
function mapMarkup(html, fn) {
  let out = '';
  let last = 0;
  for (const m of html.matchAll(SEGMENT_RE)) {
    out += fn(html.slice(last, m.index)) + m[0];
    last = m.index + m[0].length;
  }
  return out + fn(html.slice(last));
}

const NON_LD_SCRIPT_RE = /<script\b(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi;

/** Apply fn to HTML outside executable <script> and <style> blocks (JSON-LD is included). */
function mapContent(html, fn) {
  let out = '';
  let last = 0;
  for (const m of html.matchAll(NON_LD_SCRIPT_RE)) {
    out += fn(html.slice(last, m.index)) + m[0];
    last = m.index + m[0].length;
  }
  return out + fn(html.slice(last));
}

/** Apply fn(parsedJson) to each JSON-LD block; fn returns new value or null to drop the block. */
function mapJsonLd(html, fn, warnings) {
  return html.replace(/<script\b([^>]*type=["']application\/ld\+json["'][^>]*)>([\s\S]*?)<\/script>/gi, (whole, attrs, body) => {
    let data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      warnings.push(`invalid JSON-LD: ${e.message}`);
      return whole;
    }
    const next = fn(data);
    if (next == null) return '';
    return `<script type="application/ld+json">\n${JSON.stringify(next, null, 2).replace(/</g, '\\u003c')}\n</script>`;
  });
}

function resolveSpintax(str) {
  let res = str;
  const regex = /\{([^{}]+)\}/g;
  let it = 0;
  while (regex.test(res) && it < 20) {
    res = res.replace(regex, (m, choices) => (choices.includes('|') ? choices.split('|')[0].trim() : m));
    it++;
  }
  return res;
}

/** Nearby places to display, from data/cities.json (computed from coordinates by build-geo.mjs). */
export function selectNearby(city) {
  const { maxListed, maxDistanceMiles, minListed } = getPolicy().nearby;
  const cities = getCityMap();
  const valid = (city.nearby || []).filter((n) => cities.has(n.slug));
  const close = valid.filter((n) => n.dist <= maxDistanceMiles).slice(0, maxListed);
  return close.length >= minListed ? close : valid.slice(0, minListed);
}

function inHomeMarket(city) {
  const home = getCityMap().get(getBusiness().homeMarket);
  return Boolean(home && haversineMiles(city, home) <= HOME_MARKET_RADIUS_MI);
}

// ---------------------------------------------------------------------------------------------
// 1. Localization of the shared Midland-based templates
// ---------------------------------------------------------------------------------------------
function localizeTemplate(html, city, serviceSlug) {
  let res = html;
  const name = city.name;
  const target = serviceSlug ? canonicalUrl(`/${city.slug}/${serviceSlug}/`) : canonicalUrl(`/${city.slug}/`);
  const isHome = city.slug === getBusiness().homeMarket;

  // Drop the template's own generated Midland "neighborhood" links before any text substitution,
  // otherwise "Midland Heights" becomes a fictional "<City> Heights".
  res = rewriteInternalLinks(res);
  return mapContent(res, (part) => localizeText(part, city, target, isHome));
}

function localizeText(text, city, target, isHome) {
  let res = text;
  const name = city.name;
  res = res.replaceAll(`${SITE_URL}/Template/midland-tx-cleaning-services/`, target);
  res = res.replaceAll(`${SITE_URL}/midland-tx/`, `${SITE_URL}/${city.slug}/`);
  res = res.replaceAll('/midland-tx/', `/${city.slug}/`);

  if (!isHome) {
    res = res.replace(/\s*\(79701\)/g, '');
  }
  if (!inHomeMarket(city)) {
    const region = `${city.county} County`;
    res = res.replace(/\s*We handle the West Texas dust so you don(?:'|&#39;|’)t have to\./g, '');
    res = res.replace(/West Texas (?:&amp;|&) Permian Basin/g, region);
    res = res.replace(/Permian Basin/g, region);
    res = res.replace(/West Texas/g, region);
  }

  res = res.replaceAll('Midland TX', `${name} TX`);
  res = res.replaceAll('Midland, TX', `${name}, TX`);
  res = res.replaceAll('Midland Texas', `${name} Texas`);
  res = res.replace(/\bMidland\b/g, name);
  return res;
}

// ---------------------------------------------------------------------------------------------
// 2. Internal links
// ---------------------------------------------------------------------------------------------
function isDeadCityLink(citySlug, seg) {
  const cities = getCityMap();
  const services = getServiceMap();
  if (!cities.has(citySlug)) return false;
  return !services.has(seg) && !SERVICE_ALIASES[seg] && !CITY_CORE_COPIES.includes(seg) && !cities.has(seg) && !neighborhoodParents()[seg];
}

export function rewriteInternalLinks(html) {
  const cities = getCityMap();
  const parents = neighborhoodParents();
  let res = html;

  // City-prefixed copies of global pages -> the global page.
  res = res.replace(/(https:\/\/www\.goldengrovecleaning\.com)?\/([a-z0-9-]+-tx)\/(about|blog|gallery|locations)\/(?=[#"'?\s<])/g, (m, host, city, core) =>
    cities.has(city) ? `${host || ''}/${core}/` : m,
  );
  // Duplicate service slugs -> canonical service slug.
  const aliasRe = new RegExp(`\\/([a-z0-9-]+-tx)\\/(${Object.keys(SERVICE_ALIASES).join('|')})\\/`, 'g');
  res = res.replace(aliasRe, (m, city, alias) => `/${city}/${SERVICE_ALIASES[alias]}/`);
  // /city-a/city-b/ -> /city-b/
  res = res.replace(/\/([a-z0-9-]+-tx)\/([a-z0-9-]+-tx)\/(?=[#"'?\s<])/g, (m, a, b) => (cities.has(a) && cities.has(b) ? `/${b}/` : m));
  // Legacy neighborhood "cities" -> parent city.
  res = res.replace(/href="\/([a-z0-9-]+-tx)\/"/g, (m, s) => (parents[s] ? `href="/${parents[s]}/"` : m));
  // Thin legacy pages.
  for (const [from, to] of Object.entries(STATIC_REDIRECTS)) res = res.replaceAll(`href="/${from}/"`, `href="${to}"`);

  // Remove links to generated neighborhood pages (/abbott-tx/abbott-heights/ etc.); they never
  // described verified places and now 301 to the city hub.
  res = res.replace(/<li>\s*<a\s+href="\/([a-z0-9-]+-tx)\/([a-z0-9-]+)\/"[^>]*>[\s\S]*?<\/a>\s*<\/li>/g, (m, a, b) => (isDeadCityLink(a, b) ? '' : m));
  res = res.replace(/<a\s+href="\/([a-z0-9-]+-tx)\/([a-z0-9-]+)\/"[^>]*>[\s\S]*?<\/a>/g, (m, a, b) => (isDeadCityLink(a, b) ? '' : m));
  return res;
}

// ---------------------------------------------------------------------------------------------
// 3. Nearby places (replaces hardcoded Midland-area lists and generated neighborhoods)
// ---------------------------------------------------------------------------------------------
const DOT = '<span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>';

function injectNearby(html, city) {
  const nearby = selectNearby(city);
  if (!nearby.length) return html;
  let res = html;

  // Desktop dropdown cards labelled "Nearby Service Area".
  res = res.replace(
    /(?:<a href="\/[a-z0-9-]+\/" class="(flex items-center gap-3 p-2\.5[^"]*)">\s*<div[^>]*>\s*<i class="fa-solid fa-location-dot"><\/i>\s*<\/div>\s*<div>\s*<div class="font-bold text-gray-900 text-sm">[^<]*<\/div>\s*<div class="text-xs text-gray-500">Nearby Service Area<\/div>\s*<\/div>\s*<\/a>\s*)+/,
    (m, cls) =>
      nearby
        .map(
          (n) => `<a href="/${n.slug}/" class="${cls}">
<div class="w-9 h-9 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center text-sm"><i class="fa-solid fa-location-dot"></i></div>
<div><div class="font-bold text-gray-900 text-sm">${escapeHtml(n.name)}, TX</div><div class="text-xs text-gray-500">${n.dist} mi from ${escapeHtml(city.name)}</div></div>
</a>
`,
        )
        .join(''),
  );

  // Mobile accordion list of location links.
  res = res.replace(
    /(?:<a href="\/[a-z0-9-]+-tx\/" class="(flex items-center gap-3 py-2 px-3 text-sm[^"]*)">\s*<i class="fa-solid fa-location-dot text-brand-orange w-5"><\/i>[^<]*<\/a>\s*)+/,
    (m, cls) =>
      nearby.map((n) => `<a href="/${n.slug}/" class="${cls}">\n<i class="fa-solid fa-location-dot text-brand-orange w-5"></i> ${escapeHtml(n.name)}, TX\n</a>\n`).join(''),
  );

  // Hub navigation "Local Neighborhoods" groups -> real nearby places.
  res = res.replace(/Local Neighborhoods(\s*<\/div>\s*<div[^>]*>)([\s\S]*?)(<\/div>)/g, (m, open, inner, close) => {
    const cls = (inner.match(/<a [^>]*class="([^"]*)"/) || [])[1] || 'block py-1 hover:text-brand-orange transition-colors';
    const links = nearby.map((n) => `<a href="/${n.slug}/" class="${cls}">&bull; ${escapeHtml(n.name)}, TX</a>`).join('\n');
    return `Nearby Cities${open}\n${links}\n${close}`;
  });

  // Footer "Service Areas" column.
  res = res.replace(
    /(<h3[^>]*>(?:(?!<\/h3>)[\s\S]){0,400}?)((?:West Texas (?:&amp;|&) Permian Basin |[A-Z][A-Za-z ]+ County )?Service Areas)(\s*<\/h3>\s*<ul[^>]*>)([\s\S]*?)(<\/ul>)/,
    (m, open, label, mid, inner, close) => {
      const cls = (inner.match(/<li>\s*<a [^>]*class="([^"]*)"/) || [])[1] || 'text-gray-400 hover:text-brand-orange transition-colors flex items-center gap-2 group';
      const items = nearby.map((n) => `<li><a href="/${n.slug}/" class="${cls}">${DOT} ${escapeHtml(n.name)}, TX</a></li>`);
      items.push(`<li><a href="/locations/" class="${cls}">${DOT} All Texas locations</a></li>`);
      return `${open}Service Areas Near ${escapeHtml(city.name)}${mid}\n${items.join('\n')}\n${close}`;
    },
  );
  return res;
}

// ---------------------------------------------------------------------------------------------
// 3b. Geographic accuracy: prevent Permian/Midland/Odessa wording from leaking into distant cities
// ---------------------------------------------------------------------------------------------
function normalizeGeo(html, city) {
  let res = html;
  const isHome = city.slug === getBusiness().homeMarket;
  const isPermian = inHomeMarket(city);

  if (city.slug !== 'midland-tx' && city.slug !== 'odessa-tx') {
    res = res.replace(/in\s+([A-Za-z\s]+?)\s*&(?:amp;)?\s*Odessa,\s*TX/gi, (m, c) => `in ${c.trim()}, TX`);
  }
  if (!isHome) {
    res = res.replace(/\s*\(79701\)/g, '');
  }
  if (!isPermian) {
    const region = `${city.county} County`;
    res = res.replace(/\s*We handle the West Texas dust so you don(?:'|&#39;|’)t have to\./gi, '');
    res = res.replace(/\banyone in West Texas looking for\b/gi, 'anyone in Texas looking for');
    res = res.replace(/West Texas (?:&amp;|&) Permian Basin/gi, region);
    res = res.replace(/Permian Basin/gi, region);
    res = res.replace(/West Texas/gi, region);
  }
  return res;
}

// ---------------------------------------------------------------------------------------------
// 4. Claims: review counts, prices, superlatives
// ---------------------------------------------------------------------------------------------
const BEST_COMPANY_ANSWER =
  'The right cleaning company depends on the services you need, your schedule, and your budget. Compare providers on insurance, background checks, exactly what each visit includes, and how re-cleans are handled.';

function priceSentenceRe() {
  // A sentence containing a dollar amount. Periods inside numbers ($0.10) do not end the sentence.
  return /(?:[^.!?<>"{}]|\.(?=\d))*\$\d(?:[^.!?<>"{}]|\.(?=\d))*[.!?]?/g;
}

export function normalizeClaimsText(text) {
  const { pricingStatement } = getBusiness();
  let t = text;
  // Review / rating claims (counts conflicted across pages: 94, 98, 127, 143, 148).
  t = t.replace(/Golden Grove Cleaning is rated (?:the )?#1[^.]*?\d+\+?\s*reviews\./g, BEST_COMPANY_ANSWER);
  t = t.replace(/Rated 4\.9 stars by \d+\+? happy customers across\s*/g, 'Feedback from Golden Grove Cleaning customers across ');
  t = t.replace(/\d+\+?\s+five-star reviews from satisfied customers across\s+Texas(?:\s+and\s+West\s+Texas)?/g, 'Reviews from satisfied customers across Texas');
  t = t.replace(/4\.9 out of 5\s*(?:•|&bull;)\s*\d+\+?\s*verified reviews/g, 'Read customer reviews');
  t = t.replace(/\b\d{2,4}\+?\s+Reviews\b/g, 'Customer Reviews');
  t = t.replace(/\b\d{2,4}\+?\s+(?:verified\s+|five-star\s+|5-star\s+|Google\s+)?reviews\b/g, 'customer reviews');
  t = t.replace(/4\.9\s*\/\s*5 Rating/g, 'Satisfaction Guarantee');
  t = t.replace(/4\.9★ Rated/g, 'Satisfaction Guarantee');
  t = t.replace(/4\.9-Star Rated Service/g, 'Satisfaction-Guaranteed Service');
  // Unsupported "#1" superlatives.
  t = t.replace(/#1 Rated\s*(?:•|&bull;)\s*/g, '');
  t = t.replace(/\s*\|\s*#1 Rated\b/g, ' | Golden Grove Cleaning');
  t = t.replace(/#1\s+/g, '');
  // Unverified, conflicting prices -> one consistent statement.
  t = t.replace(priceSentenceRe(), (s) => {
    const lead = s.match(/^\s*/)[0];
    return `${lead}${pricingStatement}`;
  });
  const dup = new RegExp(`(${escapeRe(pricingStatement)})(?:\\s*${escapeRe(pricingStatement)})+`, 'g');
  t = t.replace(dup, '$1');
  return t;
}

function normalizeClaims(html) {
  let res = html.replace(/<meta\s+name=["']keywords["'][\s\S]*?>\s*/gi, '');
  return mapMarkup(res, normalizeClaimsText);
}

// ---------------------------------------------------------------------------------------------
// 5. Structured data
// ---------------------------------------------------------------------------------------------
const BUSINESS_TYPES = new Set(['LocalBusiness', 'CleaningService', 'HouseCleaningService', 'HomeAndConstructionBusiness', 'ProfessionalService', 'Organization']);
const typesOf = (node) => (Array.isArray(node['@type']) ? node['@type'] : [node['@type']]).filter(Boolean);

function businessEntity() {
  const b = getBusiness();
  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: b.name,
    url: `${SITE_URL}/`,
    telephone: b.telephone,
    email: b.email,
    image: b.logo,
    logo: b.logo,
    description: b.description,
    address: { '@type': 'PostalAddress', addressRegion: b.addressRegion, addressCountry: b.addressCountry },
  };
}

function normalizeNode(node, ctx) {
  if (Array.isArray(node)) return node.map((n) => normalizeNode(n, ctx)).filter((n) => n != null);
  if (typeof node === 'string') return normalizeClaimsText(node);
  if (!node || typeof node !== 'object') return node;

  const types = typesOf(node);
  if (types.includes('Review') || types.includes('AggregateRating')) return null;
  if (types.includes('Neighborhood')) return null;

  const out = {};
  for (const [k, v] of Object.entries(node)) {
    if (['aggregateRating', 'review', 'reviews'].includes(k)) continue;
    out[k] = normalizeNode(v, ctx);
  }
  if (types.includes('Offer')) {
    delete out.price;
    delete out.priceCurrency;
    delete out.priceSpecification;
  }

  if (types.some((t) => BUSINESS_TYPES.has(t))) {
    const isPrimary = !out['@id'] || out['@id'] === `${SITE_URL}/#business`;
    const areaServed = out.areaServed;
    if (isPrimary) {
      const entity = businessEntity();
      for (const keep of ['openingHoursSpecification', 'priceRange', 'sameAs', 'hasOfferCatalog']) if (out[keep]) entity[keep] = out[keep];
      if (areaServed) entity.areaServed = areaServed;
      return entity;
    }
    // A page-specific entity (e.g. ".../house-cleaning/#service") is a Service, not a second business.
    const service = {
      '@type': 'Service',
      '@id': out['@id'],
      name: out.name,
      serviceType: ctx.serviceName || out.name,
      description: out.description,
      url: out.url || ctx.canonical,
      provider: { '@id': `${SITE_URL}/#business` },
    };
    if (areaServed) service.areaServed = areaServed;
    if (out.hasOfferCatalog) service.hasOfferCatalog = out.hasOfferCatalog;
    return Object.fromEntries(Object.entries(service).filter(([, v]) => v != null));
  }
  return out;
}

function normalizeStructuredData(html, ctx) {
  return mapJsonLd(
    html,
    (data) => {
      const next = normalizeNode(data, ctx);
      if (next == null) return null;
      if (Array.isArray(next['@graph']) && next['@graph'].length === 0) return null;
      return next;
    },
    ctx.warnings,
  );
}

// ---------------------------------------------------------------------------------------------
// 6. Head: canonical, robots, og:url, description
// ---------------------------------------------------------------------------------------------
function defaultDescription(route) {
  const b = getBusiness();
  const city = route.city ? getCityMap().get(route.city) : null;
  const service = route.service ? getServiceMap().get(route.service) : null;
  if (city && service) return `${service.name} in ${city.name}, TX (${city.county} County) from ${b.name}. Request a free quote or call ${b.phoneDisplay}.`;
  if (city) return `House, deep, move-out, and commercial cleaning in ${city.name}, TX (${city.county} County) from ${b.name}. Request a free quote or call ${b.phoneDisplay}.`;
  return b.description;
}

function normalizeHead(html, route, policy) {
  const canonical = canonicalUrl(route.path);
  let res = html;
  res = res.replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '');
  res = res.replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, '');
  const robots = policy.index ? ROBOTS_INDEX : ROBOTS_NOINDEX;
  const headTags = `<meta name="robots" content="${robots}">\n<link rel="canonical" href="${canonical}" />\n`;
  res = /<\/title>/i.test(res) ? res.replace(/<\/title>/i, `</title>\n${headTags}`) : res.replace(/<\/head>/i, `${headTags}</head>`);

  if (/<meta\s+property=["']og:url["']/i.test(res)) {
    res = res.replace(/<meta\s+property=["']og:url["'][^>]*>/gi, `<meta property="og:url" content="${canonical}">`);
  } else {
    res = res.replace(/<\/head>/i, `<meta property="og:url" content="${canonical}">\n</head>`);
  }

  const desc = res.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (!desc || !desc[1].trim()) {
    res = res.replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, '');
    res = res.replace(/<\/title>/i, `</title>\n<meta name="description" content="${escapeHtml(defaultDescription(route))}">`);
  }
  // Collapse whitespace inside <title>.
  res = res.replace(/<title>([\s\S]*?)<\/title>/i, (m, t) => `<title>${t.replace(/\s+/g, ' ').trim()}</title>`);
  return res;
}

// ---------------------------------------------------------------------------------------------
// 7. Pre-existing safety net (favicons + animation visibility)
// ---------------------------------------------------------------------------------------------
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
  res = res.replace(/html\.aos-init\s+\[data-aos\]\s*\{[^}]*opacity:\s*0[^}]*\}/gi, 'html.aos-init [data-aos] { opacity: 1 !important; }');
  if (!res.includes('id="zero-blank-screen"')) {
    res = res.includes('</head>') ? res.replace('</head>', `${FAILSAFE_CSS}</head>`) : `${FAILSAFE_CSS}${res}`;
  }
  res = res.replace(/<link[^>]*rel=["'](?:apple-touch-icon|icon|shortcut icon|manifest)["'][^>]*>\s*/gi, '');
  if (res.includes('</head>')) res = res.replace('</head>', `${FAVICON_HTML}\n</head>`);
  else if (res.includes('<head>')) res = res.replace('<head>', `<head>\n${FAVICON_HTML}`);
  const safetyScript = `<script>
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('[data-aos]').forEach(function(el) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
      });
    });
  </script>`;
  if (res.includes('</body>')) res = res.replace('</body>', `${safetyScript}</body>`);
  return res;
}

// ---------------------------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------------------------
export function renderRoute(route) {
  const city = route.city ? getCityMap().get(route.city) : null;
  const service = route.service ? getServiceMap().get(route.service) : null;
  const policy = policyFor(route);
  const ctx = { warnings: [], canonical: canonicalUrl(route.path), serviceName: service?.name };

  let html = loadTemplate(route.template);
  if (route.localized && city) html = localizeTemplate(html, city, route.kind === 'cityService' ? route.service : null);
  html = resolveSpintax(html);
  html = rewriteInternalLinks(html);
  if (city) html = injectNearby(html, city);
  if (city) html = normalizeGeo(html, city);
  html = normalizeClaims(html);
  html = normalizeStructuredData(html, ctx);
  html = normalizeHead(html, route, policy);
  html = ensureFailsafe(html);
  return { html, policy, warnings: ctx.warnings };
}

const HTML_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  // Cache at the CDN for a day, serve stale while revalidating; browsers always revalidate.
  'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
};

export function htmlResponse(route) {
  const { html, policy } = renderRoute(route);
  const headers = { ...HTML_HEADERS };
  if (!policy.index) headers['X-Robots-Tag'] = ROBOTS_NOINDEX;
  return new Response(html, { status: 200, headers });
}

export function redirectResponse(location, status = 301) {
  return new Response(null, { status, headers: { Location: location, 'Cache-Control': 'public, max-age=3600' } });
}

export function notFoundResponse() {
  const b = getBusiness();
  const body = `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Page Not Found | ${b.name}</title>
<style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;margin:0;padding:80px 20px;text-align:center;color:#1f2937;background:#faf7f2}a{color:#c2410c;font-weight:600}h1{font-size:2rem;margin-bottom:.5rem}ul{list-style:none;padding:0;line-height:2}</style></head>
<body><h1>Page not found</h1><p>The page you requested does not exist or has moved.</p>
<ul><li><a href="/">Home</a></li><li><a href="/locations/">Texas service areas</a></li><li><a href="/house-cleaning/">House cleaning</a></li><li><a href="/book-now/">Book a cleaning</a></li><li><a href="tel:${b.telephone}">Call ${b.phoneDisplay}</a></li></ul></body></html>`;
  return new Response(body, { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' } });
}

/** Shared GET implementation for all template-backed route handlers. */
export async function handlePath(pathname) {
  const route = resolvePath(pathname);
  if (route.type === 'redirect') return redirectResponse(route.location, route.status);
  if (route.type === 'notfound') return notFoundResponse();
  return htmlResponse(route);
}
