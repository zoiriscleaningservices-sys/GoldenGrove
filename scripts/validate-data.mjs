#!/usr/bin/env node
// Automated validation for all structured data files.
// Checks:
// - Texas boundary constraints for all coordinates
// - Slug uniqueness across cities and services
// - Valid placeType values ('city' | 'town' | 'CDP' | 'village' | 'unverified')
// - Nearby targets exist and distances match haversine calculation
// - Service templates exist on disk for all catalog services
// - Business facts integrity
// - Synced scripts (--check for build-geo and content-dates)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { getCities, getServices, getBusiness, getPolicy, getGeoSupplement } from '../lib/data.mjs';
import { haversineMiles, inTexas } from '../lib/geo.mjs';

const failures = [];
function assert(condition, message) {
  if (!condition) failures.push(message);
}

console.log('Running data validation suite...');

// 1. Validate cities.json
const cities = getCities();
const citySlugs = new Set();
const VALID_PLACE_TYPES = new Set(['city', 'town', 'CDP', 'village', 'unverified']);

for (const c of cities) {
  assert(c.slug && typeof c.slug === 'string', `City missing slug: ${JSON.stringify(c)}`);
  assert(!citySlugs.has(c.slug), `Duplicate city slug: ${c.slug}`);
  citySlugs.add(c.slug);

  assert(c.name && typeof c.name === 'string', `City ${c.slug} missing name`);
  assert(c.state === 'TX', `City ${c.slug} state is ${c.state}, expected TX`);
  assert(c.county && typeof c.county === 'string', `City ${c.slug} missing county`);
  assert(typeof c.lat === 'number' && typeof c.lng === 'number', `City ${c.slug} invalid coordinates`);
  assert(inTexas(c), `City ${c.slug} coordinates out of Texas bounds (${c.lat}, ${c.lng})`);
  assert(VALID_PLACE_TYPES.has(c.placeType), `City ${c.slug} invalid placeType: ${c.placeType}`);

  if (Array.isArray(c.nearby)) {
    assert(c.nearby.length >= 3, `City ${c.slug} has fewer than 3 nearby places (${c.nearby.length})`);
    for (const n of c.nearby) {
      assert(n.slug !== c.slug, `City ${c.slug} lists itself in nearby`);
      assert(typeof n.dist === 'number', `City ${c.slug} nearby ${n.slug} missing distance`);
    }
  }
}

// 2. Validate nearby cross-references and distances
const cityMap = new Map(cities.map((c) => [c.slug, c]));
for (const c of cities) {
  for (const n of c.nearby || []) {
    const target = cityMap.get(n.slug);
    assert(target, `City ${c.slug} references non-existent nearby slug: ${n.slug}`);
    if (target) {
      const calc = Math.round(haversineMiles(c, target) * 10) / 10;
      const diff = Math.abs(calc - n.dist);
      assert(diff <= 1.0, `City ${c.slug} -> ${n.slug} distance mismatch: listed ${n.dist} vs calc ${calc}`);
    }
  }
}

// 3. Validate services.json
const services = getServices();
const serviceSlugs = new Set();
for (const s of services) {
  assert(s.slug && typeof s.slug === 'string', `Service missing slug`);
  assert(!serviceSlugs.has(s.slug), `Duplicate service slug: ${s.slug}`);
  serviceSlugs.add(s.slug);

  const staticTpl = path.join(process.cwd(), 'templates', 'static_pages', s.slug, 'index.html');
  const cityServiceTpl = path.join(process.cwd(), 'templates', 'city_services', s.slug, 'index.html');
  assert(fs.existsSync(staticTpl), `Missing static page template for service: ${s.slug} (${staticTpl})`);
  assert(fs.existsSync(cityServiceTpl), `Missing city_services template for service: ${s.slug} (${cityServiceTpl})`);
}

// 4. Validate business.json
const b = getBusiness();
assert(b.name === 'Golden Grove Cleaning', `Business name mismatch: ${b.name}`);
assert(b.telephone === '+14322181700', `Business telephone mismatch: ${b.telephone}`);
assert(b.phoneDisplay === '(432) 218-1700', `Business phoneDisplay mismatch: ${b.phoneDisplay}`);
assert(b.email === 'info@goldengrovecleaning.com', `Business email mismatch: ${b.email}`);
assert(cityMap.has(b.homeMarket), `Business homeMarket ${b.homeMarket} not found in cities`);
assert(b.streetAddress === null, `Business streetAddress should be null until verified`);
assert(b.reviewCount === null, `Business reviewCount should be null until verified`);
assert(b.ratingValue === null, `Business ratingValue should be null until verified`);

// 5. Validate seo-policy.json
const policy = getPolicy();
assert(Array.isArray(policy.priorityMarkets) && policy.priorityMarkets.includes('midland-tx'), 'Policy priorityMarkets must include midland-tx');
for (const type of ['home', 'core', 'service', 'cityHub', 'cityHubUnverified', 'cityServicePriority', 'cityService']) {
  assert(policy.routeTypes[type], `Policy missing routeType configuration for: ${type}`);
}

// 6. Validate script --check execution
try {
  execFileSync('node', ['scripts/build-geo.mjs', '--check'], { stdio: 'pipe' });
} catch (e) {
  failures.push(`scripts/build-geo.mjs --check failed: ${e.message}`);
}
try {
  execFileSync('node', ['scripts/content-dates.mjs', '--check'], { stdio: 'pipe' });
} catch (e) {
  failures.push(`scripts/content-dates.mjs --check failed: ${e.message}`);
}

if (failures.length > 0) {
  console.error(`Validation failed with ${failures.length} errors:`);
  for (const f of failures.slice(0, 20)) console.error(`  - ${f}`);
  if (failures.length > 20) console.error(`  ... and ${failures.length - 20} more errors`);
  process.exit(1);
}

console.log(`Validation PASSED: ${cities.length} cities, ${services.length} services, business data, and geo relationships verified.`);
