"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ParsedMap } from "@/engine/types";
import { MINIMAP, minimapColor } from "@/world/tileset";

/** Pixels per tile. The whole 60x56 map fits in a corner at this size. */
const PX = 3;

/**
 * Whole-map overview. The terrain never changes, so it is painted once to an
 * offscreen canvas and blitted each time the player moves a tile.
 */
export default function Minimap({
  map,
  pos,
}: {
  map: ParsedMap;
  pos: { x: number; y: number };
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  const base = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = map.width * PX;
    c.height = map.height * PX;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        ctx.fillStyle = minimapColor(map.ground[y][x], map.solid[y][x]);
        ctx.fillRect(x * PX, y * PX, PX, PX);
      }
    }
    return c;
  }, [map]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !base) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = base.width * dpr;
    canvas.height = base.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(base, 0, 0);

    for (const l of map.landmarks) {
      ctx.fillStyle = MINIMAP.landmark;
      ctx.fillRect(l.x * PX - 1, l.y * PX - 1, PX + 2, PX + 2);
    }

    ctx.fillStyle = "#1d2b3a";
    ctx.fillRect(pos.x * PX - 2, pos.y * PX - 2, PX + 4, PX + 4);
    ctx.fillStyle = MINIMAP.player;
    ctx.fillRect(pos.x * PX - 1, pos.y * PX - 1, PX + 2, PX + 2);
  }, [base, map, pos]);

  if (!base) return null;

  return (
    <div className="pointer-events-none absolute bottom-4 left-4 rounded border-2 border-[#2f4562] bg-[#f8f4e6]/95 p-1 shadow-[0_3px_0_0_rgba(13,22,34,0.35)]">
      <canvas
        ref={ref}
        aria-hidden
        style={{
          width: map.width * PX,
          height: map.height * PX,
          imageRendering: "pixelated",
          display: "block",
        }}
      />
    </div>
  );
}
