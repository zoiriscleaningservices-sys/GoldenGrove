// Geographic helpers shared by the runtime and the data scripts.
const EARTH_RADIUS_MI = 3958.8;
const toRad = (d) => (d * Math.PI) / 180;

/** Great-circle distance in miles between two {lat, lng} points. */
export function haversineMiles(a, b) {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_MI * Math.asin(Math.sqrt(h));
}

/** Rough Texas bounding box used for data validation. */
export const TEXAS_BOUNDS = { minLat: 25.8, maxLat: 36.6, minLng: -106.7, maxLng: -93.5 };

export function inTexas({ lat, lng }) {
  return lat >= TEXAS_BOUNDS.minLat && lat <= TEXAS_BOUNDS.maxLat && lng >= TEXAS_BOUNDS.minLng && lng <= TEXAS_BOUNDS.maxLng;
}
