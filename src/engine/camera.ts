/**
 * Centre the view on the player, then clamp so the map edge never leaves a gap.
 * A map smaller than the viewport is centred instead.
 */
export function clampCamera(
  playerPx: number,
  playerPy: number,
  viewW: number,
  viewH: number,
  mapW: number,
  mapH: number,
): { x: number; y: number } {
  const centre = (p: number, view: number, map: number) => {
    if (map <= view) return (map - view) / 2;
    return Math.min(Math.max(p - view / 2, 0), map - view);
  };
  return {
    x: centre(playerPx, viewW, mapW),
    y: centre(playerPy, viewH, mapH),
  };
}
