"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Engine, loadAssets } from "@/engine/Engine";
import { SECTIONS, SECTION_BY_KEY } from "@/content";
import { HONG_KONG } from "@/world/map";
import Panel from "./Panel";

const SIGNS = Object.fromEntries(SECTIONS.map((s) => [s.key, s.sign]));

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    let engine: Engine | null = null;
    let cancelled = false;

    loadAssets()
      .then((assets) => {
        if (cancelled || !canvasRef.current) return;
        const font =
          getComputedStyle(document.documentElement)
            .getPropertyValue("--font-pixel")
            .trim() || "monospace";
        engine = new Engine(canvasRef.current, assets, HONG_KONG, {
          onPrompt: setPrompt,
          onOpen: setOpenKey,
          signs: SIGNS,
          signFont: font,
        });
        const deep = new URLSearchParams(window.location.search).get("panel");
        if (deep && SECTION_BY_KEY[deep]) {
          engine.placeAt(deep);
          setOpenKey(deep);
        }
        engineRef.current = engine;
        engine.start();
        setReady(true);
      })
      .catch((e: Error) => setError(e.message));

    return () => {
      cancelled = true;
      engine?.stop();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setPaused(openKey !== null);
    const url = new URL(window.location.href);
    if (openKey) url.searchParams.set("panel", openKey);
    else url.searchParams.delete("panel");
    window.history.replaceState(null, "", url);
  }, [openKey]);

  const close = useCallback(() => setOpenKey(null), []);
  const section = openKey ? SECTION_BY_KEY[openKey] : null;

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#1d2b3a]">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ imageRendering: "pixelated" }}
      />

      {error && (
        <p className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-[#f8f4e6]">
          Could not load the map ({error}).{" "}
          <a className="underline" href="/plain">Read the plain version instead.</a>
        </p>
      )}

      {ready && (
        <div
          className="pointer-events-none absolute left-4 top-4 rounded border-2 border-[#2f4562] bg-[#f8f4e6]/95 px-3 py-2 text-[8px] leading-relaxed text-[#3b4a63]"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          <p>WASD / ARROWS — MOVE</p>
          <p>SHIFT — RUN</p>
          <p>E — ENTER A BUILDING</p>
        </div>
      )}

      {prompt && !openKey && (
        <div
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse rounded border-2 border-[#2f4562] bg-[#f8f4e6] px-4 py-2 text-[9px] text-[#1d2b3a]"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          PRESS E — {SECTION_BY_KEY[prompt]?.sign}
        </div>
      )}

      <a
        href="/plain"
        className="absolute bottom-4 right-4 rounded border-2 border-[#2f4562] bg-[#f8f4e6]/95 px-3 py-2 text-[8px] text-[#3b4a63] hover:bg-white"
        style={{ fontFamily: "var(--font-pixel)" }}
      >
        PLAIN TEXT
      </a>

      {section && <Panel section={section} onClose={close} />}
    </div>
  );
}
