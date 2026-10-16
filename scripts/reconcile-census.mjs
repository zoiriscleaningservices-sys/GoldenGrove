#!/usr/bin/env node
// Reconciles data/cities.json against official U.S. Census Bureau sources:
//   - data/sources/2023_gaz_place_48.txt        (2023 Gazetteer: official place names, type, internal point)
//   - data/sources/st48_tx_place_by_county2020.txt (2020 place-to-county codes)
// For every city it records the Census place type (city/town/village/CDP), GEOID, and the counties
// the place overlaps. Coordinates that deviate from the Census internal point by more than
// MAX_DEVIATION_MI are corrected. A county that the place does not overlap is corrected.
// Places with no Census match are reported (they may be unincorporated communities).
//
// Multi-county places get their primary county from the Census Geocoder (county containing the
// official internal point). Lookups are cached in data/sources/census-internal-point-county.json
// so the script is reproducible offline; pass --fetch to fill missing cache entries.
//
// Usage: node scripts/reconcile-census.mjs [--fetch] [--apply]
//   Writes a report to reports/census-reconciliation.json. With --apply, updates data/cities.json,
//   after which `node scripts/build-geo.mjs` must be run to recompute nearby relationships.
import fs from 'node:fs';
import path from 'node:path';
import { haversineMiles } from '../lib/geo.mjs';

const ROOT = process.cwd();
const MAX_DEVIATION_MI = 2;
// A same-named Census place outside the recorded county and farther than this is a different place.
const SAME_NAME_GUARD_MI = 25;
const COUNTY_CACHE = path.join(ROOT, 'data', 'sources', 'census-internal-point-county.json');
const countyCache = fs.existsSync(COUNTY_CACHE) ? JSON.parse(fs.readFileSync(COUNTY_CACHE, 'utf8')) : {};
const FETCH = process.argv.includes('--fetch');
const sameCounty = (a, b) => a.toLowerCase().replace(/\s+/g, '') === b.toLowerCase().replace(/\s+/g, '');

async function countyOfPoint(geoid, lat, lng) {
  if (countyCache[geoid]) return countyCache[geoid];
  if (!FETCH) return null;
  const url = `https://geocoding.geo.census.gov/geocoder/geographies/coordinates?x=${lng}&y=${lat}&benchmark=Public_AR_Current&vintage=Current_Current&layers=Counties&format=json`;
  const res = await fetch(url);
  const json = await res.json();
  const name = json?.result?.geographies?.Counties?.[0]?.NAME?.replace(/ County$/, '') || null;
  if (name) countyCache[geoid] = name;
  await new Promise((r) => setTimeout(r, 150));
  return name;
}
const CITIES = path.join(ROOT, 'data', 'cities.json');
const cities = JSON.parse(fs.readFileSync(CITIES, 'utf8'));
const supplement = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'geo-supplement.json'), 'utf8'));
const overrides = Object.fromEntries(Object.entries(supplement.countyOverrides || {}).filter(([k]) => !k.startsWith('_')));

const TYPE_SUFFIX = /\s+(city|town|village|CDP)$/;
const norm = (s) => s.toLowerCase().replace(/\./g, '').replace(/\s+/g, ' ').trim();

// --- Gazetteer ---
const gaz = new Map(); // normalized name -> [records]
const gazLines = fs.readFileSync(path.join(ROOT, 'data/sources/2023_gaz_place_48.txt'), 'utf8').split(/\r?\n/).slice(1);
for (const line of gazLines) {
  const p = line.split('\t').map((s) => s.trim());
  if (p.length < 12 || !p[3]) continue;
  const m = p[3].match(TYPE_SUFFIX);
  const name = p[3].replace(TYPE_SUFFIX, '');
  const rec = { geoid: p[1], officialName: p[3], name, placeType: m ? m[1] : 'other', funcstat: p[5], lat: Number(p[10]), lng: Number(p[11]), aland: Number(p[6]), awater: Number(p[7]) };
  const k = norm(name);
  if (!gaz.has(k)) gaz.set(k, []);
  gaz.get(k).push(rec);
}

// --- Place by county ---
const placeCounties = new Map(); // geoid -> [county names]
const pbcLines = fs.readFileSync(path.join(ROOT, 'data/sources/st48_tx_place_by_county2020.txt'), 'utf8').split(/\r?\n/).slice(1);
for (const line of pbcLines) {
  const p = line.split('|');
  if (p.length < 7) continue;
  const geoid = `48${p[4]}`;
  const county = p[3].replace(/ County$/, '');
  if (!placeCounties.has(geoid)) placeCounties.set(geoid, []);
  if (!placeCounties.get(geoid).includes(county)) placeCounties.get(geoid).push(county);
}

const report = { generated: new Date().toISOString().slice(0, 10), total: cities.length, matched: 0, unmatched: [], coordinateFixes: [], countyFixes: [], multiCounty: [], types: {} };
const typeRank = { city: 0, town: 0, village: 0, CDP: 1, other: 2 };

for (const c of cities) {
  const candidates = gaz.get(norm(c.name)) || [];
  if (!candidates.length) {
    report.unmatched.push({ slug: c.slug, name: c.name, county: c.county });
    c.placeType = 'unverified';
    delete c.geoid;
    continue;
  }
  // Prefer the candidate in the recorded county, then incorporated places, then nearest.
  const scored = candidates
    .map((r) => ({ r, inCounty: (placeCounties.get(r.geoid) || []).some((k) => sameCounty(k, c.county)), d: haversineMiles(c, r) }))
    .sort((a, b) => (b.inCounty - a.inCounty) || (typeRank[a.r.placeType] - typeRank[b.r.placeType]) || (a.d - b.d));
  const { r, d, inCounty } = scored[0];
  if (!inCounty && d > SAME_NAME_GUARD_MI) {
    report.unmatched.push({ slug: c.slug, name: c.name, county: c.county, note: `same-name Census place ${r.officialName} is ${Math.round(d)} mi away in another county` });
    c.placeType = 'unverified';
    delete c.geoid;
    continue;
  }
  report.matched++;
  report.types[r.placeType] = (report.types[r.placeType] || 0) + 1;
  c.placeType = r.placeType;
  c.geoid = r.geoid;
  // Water-dominated places (bays, lakes) have internal points that can sit far from the town.
  const waterDominated = r.awater > 0.5 * r.aland;
  const badCoords = d > MAX_DEVIATION_MI;
  if (badCoords && !waterDominated) {
    report.coordinateFixes.push({ slug: c.slug, from: [c.lat, c.lng], to: [r.lat, r.lng], deviationMi: Math.round(d * 10) / 10 });
    c.lat = r.lat;
    c.lng = r.lng;
  } else if (badCoords) {
    report.coordinateSkipped = report.coordinateSkipped || [];
    report.coordinateSkipped.push({ slug: c.slug, deviationMi: Math.round(d * 10) / 10, reason: 'water-dominated place; internal point unreliable' });
  }
  const counties = placeCounties.get(r.geoid) || [];
  const recorded = counties.find((k) => sameCounty(k, c.county));
  let target = recorded || counties[0];
  if (counties.length > 1) {
    const primary = await countyOfPoint(r.geoid, r.lat, r.lng);
    // Only replace a valid recorded county when the record was demonstrably built from bad
    // coordinates (e.g. a suburban ZIP centroid for Dallas/Houston/Austin).
    if (primary && counties.includes(primary) && (!recorded || (badCoords && !waterDominated))) target = primary;
    report.multiCounty.push({ slug: c.slug, county: c.county, primary: primary || 'unknown (run with --fetch)', counties });
  }
  if (overrides[c.slug]) target = overrides[c.slug];
  if (target && target !== c.county) {
    report.countyFixes.push({ slug: c.slug, from: c.county, to: target, counties });
    c.county = target;
  }
}
fs.writeFileSync(COUNTY_CACHE, JSON.stringify(countyCache, null, 2));

fs.mkdirSync(path.join(ROOT, 'reports'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'reports', 'census-reconciliation.json'), JSON.stringify(report, null, 2));
console.log(`matched ${report.matched}/${report.total}; unmatched ${report.unmatched.length}; coordinate fixes ${report.coordinateFixes.length}; county fixes ${report.countyFixes.length}; multi-county ${report.multiCounty.length}`);
console.log('types', report.types);
if (process.argv.includes('--apply')) {
  fs.writeFileSync(CITIES, JSON.stringify(cities, null, 2).replace(/\n/g, '\r\n'));
  console.log('Applied to data/cities.json. Now run: node scripts/build-geo.mjs');
}
