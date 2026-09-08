export interface Restaurant {
  name: string;
  city: string;
  /** Decimal degrees. Geocoded once and committed -- no lookup at runtime. */
  lat: number;
  lng: number;
  /** Beli score, if it has one. */
  score?: number;
  note?: string;
}

/**
 * Beli has no export, no public API, and its share links are deep links into
 * the app, so this list is transcribed by hand and geocoded at build time.
 */
export const restaurants: Restaurant[] = [];

/** Where the map opens when there is nothing to fit. */
export const DEFAULT_VIEW = { lat: 22.302, lng: 114.177, zoom: 11 };
