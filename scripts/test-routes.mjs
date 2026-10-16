#!/usr/bin/env node
// Automated route resolver unit tests.
import test from 'node:test';
import assert from 'node:assert/strict';
import { resolvePath, policyFor, canonicalUrl, allPageRoutes } from '../lib/routes.mjs';

test('Homepage resolution', () => {
  const r = resolvePath('/');
  assert.equal(r.type, 'page');
  assert.equal(r.kind, 'home');
  assert.equal(r.path, '/');
  assert.equal(canonicalUrl(r.path), 'https://www.goldengrovecleaning.com/');
  const pol = policyFor(r);
  assert.equal(pol.index, true);
  assert.equal(pol.sitemap, true);
});

test('Core page resolution', () => {
  for (const slug of ['about', 'locations', 'book-now', 'gallery', 'blog', 'privacy-policy', 'terms-and-conditions', 'texas-service-areas']) {
    const r = resolvePath(`/${slug}/`);
    assert.equal(r.type, 'page');
    assert.equal(r.kind, 'core');
    assert.equal(r.path, `/${slug}/`);
    const pol = policyFor(r);
    assert.equal(pol.index, true);
    assert.equal(pol.sitemap, true);
  }
});

test('Global service resolution', () => {
  const r = resolvePath('/house-cleaning/');
  assert.equal(r.type, 'page');
  assert.equal(r.kind, 'service');
  assert.equal(r.path, '/house-cleaning/');
  const pol = policyFor(r);
  assert.equal(pol.index, true);
  assert.equal(pol.sitemap, true);
});

test('Service alias redirects', () => {
  const r1 = resolvePath('/gym-cleaning/');
  assert.equal(r1.type, 'redirect');
  assert.equal(r1.location, '/gym-fitness-center-cleaning/');

  const r2 = resolvePath('/airbnb-cleaning/');
  assert.equal(r2.type, 'redirect');
  assert.equal(r2.location, '/airbnb-turnover/');
});

test('City hub resolution and policies', () => {
  // Verified city
  const dallas = resolvePath('/dallas-tx/');
  assert.equal(dallas.type, 'page');
  assert.equal(dallas.kind, 'cityHub');
  assert.equal(dallas.city, 'dallas-tx');
  const dallasPol = policyFor(dallas);
  assert.equal(dallasPol.index, true);
  assert.equal(dallasPol.sitemap, true);
  assert.equal(dallasPol.tier, 'cityHub');

  // Unverified place (not in Census gazetteer)
  const unv = resolvePath('/dominion-tx/');
  // Wait: dominion-tx is in geo-supplement redirects to san-antonio-tx
  assert.equal(unv.type, 'redirect');
  assert.equal(unv.location, '/san-antonio-tx/');

  // Other unverified place from cities.json
  const abbott = resolvePath('/abbott-tx/');
  assert.equal(abbott.type, 'page');
  assert.equal(abbott.kind, 'cityHub');
});

test('Case-insensitivity redirects (single-hop 301)', () => {
  const r1 = resolvePath('/Dallas-TX/');
  assert.equal(r1.type, 'redirect');
  assert.equal(r1.location, '/dallas-tx/');

  const r2 = resolvePath('/DALLAS-TX/HOUSE-CLEANING/');
  assert.equal(r2.type, 'redirect');
  assert.equal(r2.location, '/dallas-tx/house-cleaning/');

  const r3 = resolvePath('/Abbott-TX/About/');
  assert.equal(r3.type, 'redirect');
  assert.equal(r3.location, '/about/');
});

test('City/service resolution and priority tiering', () => {
  // Priority market (Midland)
  const midlandHc = resolvePath('/midland-tx/house-cleaning/');
  assert.equal(midlandHc.type, 'page');
  assert.equal(midlandHc.kind, 'cityService');
  assert.equal(midlandHc.city, 'midland-tx');
  assert.equal(midlandHc.service, 'house-cleaning');
  const midlandPol = policyFor(midlandHc);
  assert.equal(midlandPol.index, true);
  assert.equal(midlandPol.sitemap, true);
  assert.equal(midlandPol.tier, 'cityServicePriority');

  // Non-priority city/service
  const dallasHc = resolvePath('/dallas-tx/house-cleaning/');
  assert.equal(dallasHc.type, 'page');
  assert.equal(dallasHc.kind, 'cityService');
  const dallasPol = policyFor(dallasHc);
  assert.equal(dallasPol.index, true);
  assert.equal(dallasPol.sitemap, false);
  assert.equal(dallasPol.tier, 'cityService');
});

test('City-level duplicates and legacy redirects', () => {
  // City copies of core pages -> global page
  assert.equal(resolvePath('/abbott-tx/about/').location, '/about/');
  assert.equal(resolvePath('/dallas-tx/blog/').location, '/blog/');
  assert.equal(resolvePath('/houston-tx/locations/').location, '/locations/');
  assert.equal(resolvePath('/midland-tx/gallery/').location, '/gallery/');

  // Cross-city links -> direct city page
  assert.equal(resolvePath('/abbott-tx/odessa-tx/').location, '/odessa-tx/');

  // City service alias -> canonical city service
  assert.equal(resolvePath('/dallas-tx/gym-cleaning/').location, '/dallas-tx/gym-fitness-center-cleaning/');

  // Generated neighborhood pages -> city hub
  assert.equal(resolvePath('/abbott-tx/abbott-heights/').location, '/abbott-tx/');
  assert.equal(resolvePath('/abbott-tx/downtown-abbott/').location, '/abbott-tx/');
  assert.equal(resolvePath('/midland-tx/midland-heights/').location, '/midland-tx/');

  // Legacy static stubs
  assert.equal(resolvePath('/privacy/').location, '/privacy-policy/');
  assert.equal(resolvePath('/terms/').location, '/terms-and-conditions/');

  // Depth-3 sub-area URLs
  assert.equal(resolvePath('/austin-tx/barton-creek-tx/deep-cleaning/').location, '/barton-creek-tx/deep-cleaning/');
});

test('Invalid routes return notfound (404)', () => {
  assert.equal(resolvePath('/non-existent-city-tx/').type, 'notfound');
  assert.equal(resolvePath('/dallas-tx/not-a-service/').type, 'notfound');
  assert.equal(resolvePath('/random-page/').type, 'notfound');
  assert.equal(resolvePath('/a/b/c/d/').type, 'notfound');
  assert.equal(resolvePath('/wp-admin.php').type, 'notfound');
  assert.equal(resolvePath('/dallas-tx/foo/bar/baz/').type, 'notfound');
});

test('allPageRoutes inventory health', () => {
  const routes = allPageRoutes();
  assert.ok(routes.length > 30000, `Expected > 30k total routes, got ${routes.length}`);
  const paths = new Set(routes.map((r) => r.path));
  assert.equal(paths.size, routes.length, 'Route paths must be strictly unique');
});
