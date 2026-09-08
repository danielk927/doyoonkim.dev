"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { DEFAULT_VIEW, type Restaurant } from "@/content/restaurants";

/**
 * Every restaurant on one map: a desaturated basemap tuned to sit on the
 * off-white ground. Leaflet is loaded on the client only.
 */
export default function RestaurantMap({ places }: { places: Restaurant[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let map: import("leaflet").Map | undefined;

    import("leaflet").then((L) => {
      if (cancelled || !ref.current) return;
      map = L.map(el, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      }).setView([DEFAULT_VIEW.lat, DEFAULT_VIEW.lng], DEFAULT_VIEW.zoom);

      // Plain OpenStreetMap tiles: no API key, unlike CARTO and Stadia, which
      // now watermark unkeyed requests. Colour is stripped in CSS anyway.
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const markers = places.map((place) => {
        const marker = L.circleMarker([place.lat, place.lng], {
          radius: 5,
          color: "#191917",
          weight: 1.5,
          fillColor: "#191917",
          fillOpacity: 0.65,
        }).addTo(map!);
        const score =
          place.score === undefined ? "" : `<br><span>${place.score}</span>`;
        marker.bindPopup(
          `<strong>${place.name}</strong><br>${place.city}${score}`,
        );
        return marker;
      });

      if (markers.length) {
        map.fitBounds(
          L.featureGroup(markers).getBounds().pad(0.2),
          { maxZoom: 13 },
        );
      }
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [places]);

  return (
    <div
      ref={ref}
      role="application"
      aria-label="Map of restaurants visited"
      className="h-[24rem] w-full border border-rule bg-bg sm:h-[30rem]"
    />
  );
}
