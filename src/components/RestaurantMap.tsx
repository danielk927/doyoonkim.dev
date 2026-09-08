"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { DEFAULT_VIEW, type Restaurant } from "@/content/restaurants";

/**
 * Every restaurant as a plate in the book: a muted basemap warmed toward the
 * paper, with the pins in rubric red. Leaflet is loaded on the client only.
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

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      ).addTo(map);

      const markers = places.map((place) => {
        const marker = L.circleMarker([place.lat, place.lng], {
          radius: 5,
          color: "#7a2e26",
          weight: 1.5,
          fillColor: "#7a2e26",
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
      className="h-[26rem] w-full border border-rule bg-paper"
    />
  );
}
