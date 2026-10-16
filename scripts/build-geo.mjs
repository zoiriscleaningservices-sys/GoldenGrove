#!/usr/bin/env node
// Deterministic geographic data generator for data/cities.json.
//  1. Merges verified places from data/geo-supplement.json (never overwrites existing records).
//  2. Recomputes every city's `nearby` list from coordinates (great-circle distance),
//     so nearby relationships can never drift from the coordinates they claim to describe.
// Usage: node scripts/build-geo.mjs [--check]
//   --check  exit 1 if cities.json is not what this script would produce (used by CI).
import fs from 'node:fs';
import path from 'node:path';
import { haversineMiles } from '../lib/geo.mjs';

const ROOT = process.cwd();
const CITIES = path.join(ROOT, 'data', 'cities.json');
const SUPPLEMENT = path.join(ROOT, 'data', 'geo-supplement.json');
const NEARBY_COUNT = 15;

const raw = fs.readFileSync(CITIES, 'utf8');
const cities = JSON.parse(raw);
const supplement = JSON.parse(fs.readFileSync(SUPPLEMENT, 'utf8'));

const bySlug = new Map(cities.map((c) => [c.slug, c]));
for (const add of supplement.add) {
  if (bySlug.has(add.slug)) continue;
  const rec = { name: add.name, slug: add.slug, state: 'TX', county: add.county, lat: add.lat, lng: add.lng, zip: '', nearby: [] };
  cities.push(rec);
  bySlug.set(add.slug, rec);
}

for (const c of cities) {
  c.nearby = cities
    .filter((o) => o.slug !== c.slug)
    .map((o) => ({ name: o.name, slug: o.slug, dist: Math.round(haversineMiles(c, o) * 10) / 10 }))
    .sort((a, b) => a.dist - b.dist || a.slug.localeCompare(b.slug))
    .slice(0, NEARBY_COUNT);
}

const out = JSON.stringify(cities, null, 2).replace(/\n/g, '\r\n');
if (process.argv.includes('--check')) {
  if (out !== raw) {
    console.error('data/cities.json is out of date. Run: node scripts/build-geo.mjs');
    process.exit(1);
  }
  console.log(`cities.json up to date (${cities.length} places).`);
} else {
  fs.writeFileSync(CITIES, out);
  console.log(`Wrote ${cities.length} places to data/cities.json`);
}
