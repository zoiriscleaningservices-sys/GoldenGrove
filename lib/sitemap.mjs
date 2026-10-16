// Sitemap builders. Only routes whose policy says { index: true, sitemap: true } are listed, so
// the sitemap can never contain redirects, 404s, noindex pages, or invalid city/service pairs.
import crypto from 'node:crypto';
import fs from 'node:fs';
import { allPageRoutes, policyFor, canonicalUrl, SITE_URL } from './routes.mjs';
import { getCityMap, getContentDates, getBusiness, getPolicy, getServiceMap } from './data.mjs';
import { RENDER_VERSION } from './render.mjs';

export const SITEMAPS = {
  pages: (r) => ['home', 'core', 'service'].includes(r.kind),
  cities: (r) => r.kind === 'cityHub',
  'city-services': (r) => r.kind === 'cityService',
};

export function sitemapRoutes() {
  return allPageRoutes().filter((r) => policyFor(r).sitemap);
}

/** Hash of every input that affects a page's rendered content (used for honest <lastmod>). */
export function contentHash(route) {
  const h = crypto.createHash('sha256');
  h.update(RENDER_VERSION);
  h.update(fs.readFileSync(route.template));
  h.update(JSON.stringify(getBusiness()));
  h.update(JSON.stringify(getPolicy().nearby));
  if (route.city) {
    const city = getCityMap().get(route.city);
    h.update(JSON.stringify({ name: city.name, county: city.county, nearby: city.nearby }));
  }
  if (route.service) h.update(JSON.stringify(getServiceMap().get(route.service)));
  return h.digest('hex').slice(0, 16);
}

const xmlEscape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export function buildUrlset(name) {
  const filter = SITEMAPS[name];
  if (!filter) return null;
  const dates = getContentDates().entries || {};
  const urls = sitemapRoutes()
    .filter(filter)
    .map((r) => {
      const lastmod = dates[r.path]?.lastmod;
      return `  <url>\n    <loc>${xmlEscape(canonicalUrl(r.path))}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
    });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

export function buildIndex() {
  const dates = getContentDates().entries || {};
  const routes = sitemapRoutes();
  const parts = Object.entries(SITEMAPS)
    .map(([name, filter]) => {
      const mods = routes.filter(filter).map((r) => dates[r.path]?.lastmod).filter(Boolean).sort();
      if (!routes.some(filter)) return null;
      const lastmod = mods.length ? mods[mods.length - 1] : null;
      return `  <sitemap>\n    <loc>${SITE_URL}/sitemaps/${name}.xml</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </sitemap>`;
    })
    .filter(Boolean);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${parts.join('\n')}\n</sitemapindex>\n`;
}

export const XML_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
};
