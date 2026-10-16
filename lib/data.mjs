// Data access layer. All JSON data is read through here (fs-based so the same module works in
// Next.js route handlers and in plain Node scripts/tests). Files are re-read only when their
// mtime changes, so edits are picked up in development without a server restart.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const cache = new Map();

function readJson(rel) {
  const file = path.join(/*turbopackIgnore: true*/ ROOT, rel);
  const mtime = fs.statSync(file).mtimeMs;
  const hit = cache.get(file);
  if (hit && hit.mtime === mtime) return hit.value;
  const value = JSON.parse(fs.readFileSync(file, 'utf8'));
  cache.set(file, { mtime, value, derived: new Map() });
  return value;
}

/** Memoize a value derived from a JSON file until that file changes. */
function derived(rel, key, fn) {
  const value = readJson(rel);
  const entry = cache.get(path.join(/*turbopackIgnore: true*/ ROOT, rel));
  if (!entry.derived.has(key)) entry.derived.set(key, fn(value));
  return entry.derived.get(key);
}

export const getCities = () => readJson('data/cities.json');
export const getCityMap = () => derived('data/cities.json', 'map', (list) => new Map(list.map((c) => [c.slug, c])));
export const getServices = () => readJson('data/services.json');
export const getServiceMap = () => derived('data/services.json', 'map', (list) => new Map(list.map((s) => [s.slug, s])));
export const getBusiness = () => readJson('data/business.json');
export const getPolicy = () => readJson('data/seo-policy.json');
export const getGeoSupplement = () => readJson('data/geo-supplement.json');

export function getContentDates() {
  const file = path.join(/*turbopackIgnore: true*/ ROOT, 'data', 'content-dates.json');
  return fs.existsSync(file) ? readJson('data/content-dates.json') : { entries: {} };
}

export const projectPath = (...parts) => path.join(/*turbopackIgnore: true*/ ROOT, ...parts);
