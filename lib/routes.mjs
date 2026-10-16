// Route registry: the single place that decides whether a URL is a page, a redirect, or a 404,
// what its canonical URL is, and what its indexation policy is. Metadata, rendering, sitemaps,
// and tests all consume this module so they can never disagree.
import fs from 'node:fs';
import { getCityMap, getServiceMap, getPolicy, getGeoSupplement, getCities, getServices, projectPath } from './data.mjs';

export const SITE_URL = 'https://www.goldengrovecleaning.com';

/** Global (non-city) informational pages served from templates/static_pages/<slug>/index.html. */
export const CORE_PAGES = ['about', 'locations', 'book-now', 'gallery', 'blog', 'privacy-policy', 'terms-and-conditions', 'texas-service-areas'];

/** Thin legacy pages that only meta-refreshed elsewhere; now real 301s. */
export const STATIC_REDIRECTS = { privacy: '/privacy-policy/', terms: '/terms-and-conditions/' };

/** City-prefixed copies of global pages (e.g. /abbott-tx/about/) that duplicated the global page. */
export const CITY_CORE_COPIES = ['about', 'blog', 'gallery', 'locations'];

/** Legacy duplicate service slugs -> canonical service slug. */
export const SERVICE_ALIASES = {
  'gym-cleaning': 'gym-fitness-center-cleaning',
  'airbnb-cleaning': 'airbnb-turnover',
  'medical-dental-cleaning': 'medical-dental-facility-cleaning',
  'carpet-cleaning': 'carpet-upholstery-cleaning',
  'office-cleaning': 'office-janitorial-services',
  'move-in-move-out-cleaning': 'move-out-cleaning',
  'commercial-janitorial-services': 'commercial-janitorial',
};

const NEIGHBORHOOD_PATTERN = /^(downtown|north|south|east|west|old|central|uptown)-|-(heights|estates)$/;

export const neighborhoodParents = () => {
  const { neighborhoodRedirects = {} } = getGeoSupplement();
  return Object.fromEntries(Object.entries(neighborhoodRedirects).filter(([k]) => !k.startsWith('_')));
};

export const cityBase = (citySlug) => citySlug.replace(/-tx$/, '');

/**
 * True for generated "neighborhood" slugs such as /abbott-tx/abbott-heights/ or
 * /abbott-tx/downtown-abbott/. These were produced by pattern, not from verified places.
 */
export function isGeneratedNeighborhood(citySlug, seg) {
  const base = cityBase(citySlug);
  return seg.includes(base) || NEIGHBORHOOD_PATTERN.test(seg);
}

const page = (kind, pathName, extra = {}) => ({ type: 'page', kind, path: pathName, ...extra });
const redirect = (location) => ({ type: 'redirect', status: 301, location });
const notFound = () => ({ type: 'notfound' });

function templateFor(kind, { slug, city, service }) {
  switch (kind) {
    case 'home':
      return projectPath('templates', 'index.html');
    case 'core':
    case 'service':
      return projectPath('templates', 'static_pages', slug, 'index.html');
    case 'cityHub': {
      const dedicated = projectPath('templates', 'cities', `${city}.html`);
      return fs.existsSync(dedicated) ? dedicated : projectPath('templates', 'city_hub.html');
    }
    case 'cityService':
      return projectPath('templates', 'city_services', service, 'index.html');
    default:
      return null;
  }
}

function withTemplate(route, args) {
  const template = templateFor(route.kind, args);
  if (!template || !fs.existsSync(/*turbopackIgnore: true*/ template)) return notFound();
  return { ...route, template, localized: route.kind === 'cityService' || template.endsWith('city_hub.html') };
}

function resolveLower(segs) {
  const cities = getCityMap();
  const services = getServiceMap();
  const parents = neighborhoodParents();

  if (segs.length === 0) return withTemplate(page('home', '/'), {});

  const [a, b, c] = segs;

  if (segs.length === 1) {
    if (STATIC_REDIRECTS[a]) return redirect(STATIC_REDIRECTS[a]);
    if (CORE_PAGES.includes(a)) return withTemplate(page('core', `/${a}/`, { slug: a }), { slug: a });
    if (services.has(a)) return withTemplate(page('service', `/${a}/`, { slug: a, service: a }), { slug: a });
    if (SERVICE_ALIASES[a]) return redirect(`/${SERVICE_ALIASES[a]}/`);
    if (cities.has(a)) return withTemplate(page('cityHub', `/${a}/`, { city: a }), { city: a });
    if (parents[a]) return redirect(`/${parents[a]}/`);
    return notFound();
  }

  if (segs.length === 2) {
    if (parents[a]) {
      // Legacy neighborhood hub -> parent city equivalent.
      const svc = services.has(b) ? b : SERVICE_ALIASES[b];
      return redirect(svc ? `/${parents[a]}/${svc}/` : `/${parents[a]}/`);
    }
    if (!cities.has(a)) return notFound();
    if (services.has(b)) return withTemplate(page('cityService', `/${a}/${b}/`, { city: a, service: b }), { city: a, service: b });
    if (SERVICE_ALIASES[b]) return redirect(`/${a}/${SERVICE_ALIASES[b]}/`);
    if (CITY_CORE_COPIES.includes(b)) return redirect(`/${b}/`);
    if (cities.has(b)) return redirect(`/${b}/`);
    if (parents[b]) return redirect(`/${parents[b]}/`);
    if (isGeneratedNeighborhood(a, b)) return redirect(`/${a}/`);
    return notFound();
  }

  if (segs.length === 3) {
    // Legacy /city/sub-area/service/ URLs from the static site.
    const root = cities.has(a) ? a : parents[a];
    if (!root) return notFound();
    const place = cities.has(b) ? b : parents[b] || null;
    const svc = services.has(c) ? c : SERVICE_ALIASES[c];
    if (svc) return redirect(`/${place || root}/${svc}/`);
    if (place) return redirect(`/${place}/`);
    if (isGeneratedNeighborhood(root, b)) return redirect(`/${root}/`);
    return notFound();
  }

  return notFound();
}

/**
 * Resolve a request pathname to { type: 'page' | 'redirect' | 'notfound', ... }.
 * Mixed-case URLs 301 to their lowercase canonical in a single hop.
 */
export function resolvePath(pathname) {
  let segs;
  try {
    segs = pathname.split('/').filter(Boolean).map((s) => decodeURIComponent(s));
  } catch {
    return notFound();
  }
  if (segs.some((s) => !/^[A-Za-z0-9-]+$/.test(s))) return notFound();
  const lower = segs.map((s) => s.toLowerCase());
  const result = resolveLower(lower);
  const changedCase = lower.some((s, i) => s !== segs[i]);
  if (changedCase && result.type !== 'notfound') {
    return redirect(result.type === 'redirect' ? result.location : result.path);
  }
  return result;
}

export const canonicalUrl = (pathName) => `${SITE_URL}${pathName}`;

/** Indexation policy for a resolved page route: { index, sitemap, tier }. */
export function policyFor(route) {
  const { routeTypes, priorityMarkets } = getPolicy();
  let tier = route.kind;
  if (route.kind === 'cityService') tier = priorityMarkets.includes(route.city) ? 'cityServicePriority' : 'cityService';
  if (route.kind === 'cityHub' && getCityMap().get(route.city)?.placeType === 'unverified') tier = 'cityHubUnverified';
  const rule = routeTypes[tier];
  return { index: Boolean(rule?.index), sitemap: Boolean(rule?.sitemap && rule?.index), tier };
}

/** Every page route the application can serve (used by sitemaps and tests). */
export function allPageRoutes() {
  const routes = [resolveLower([])];
  for (const slug of CORE_PAGES) routes.push(resolveLower([slug]));
  for (const s of getServices()) routes.push(resolveLower([s.slug]));
  for (const c of getCities()) {
    routes.push(resolveLower([c.slug]));
    for (const s of getServices()) routes.push(resolveLower([c.slug, s.slug]));
  }
  return routes.filter((r) => r.type === 'page');
}
