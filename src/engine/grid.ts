import type { Dir } from "./types";

export const DELTA: Record<Dir, [number, number]> = {
  down: [0, 1],
  up: [0, -1],
  left: [-1, 0],
  right: [1, 0],
};

/** Milliseconds a direction must be held, after turning, before walking. */
export const TURN_DELAY = 80;
export const WALK_STEP = 190;
export const RUN_STEP = 105;

export interface MoveState {
  x: number;
  y: number;
  facing: Dir;
  /** Progress 0..1 through the current step, or null when standing. */
  progress: number | null;
  /** Tile being moved into. Equals x,y when standing. */
  toX: number;
  toY: number;
  /** How long the current facing has been held with no step started. */
  heldMs: number;
}

export function initMove(x: number, y: number, facing: Dir = "down"): MoveState {
  return { x, y, facing, progress: null, toX: x, toY: y, heldMs: 0 };
}

/**
 * Advance movement by `dt` ms.
 *
 * Pressing a direction the player is not facing turns in place without moving,
 * as in the Gen 4 games. Keeping it held past TURN_DELAY starts the step. A
 * step in progress always completes; if the key is still held on arrival the
 * next step starts immediately, so held keys chain without a stutter.
 */
export function tickMove(
  state: MoveState,
  pressed: Dir | null,
  running: boolean,
  dt: number,
  walkable: (x: number, y: number) => boolean,
): MoveState {
  const duration = running ? RUN_STEP : WALK_STEP;
  let s = { ...state };

  if (s.progress !== null) {
    s.progress += dt / duration;
    if (s.progress < 1) return s;
    s = { ...s, x: s.toX, y: s.toY, progress: null, heldMs: TURN_DELAY };
  }

  if (!pressed) return { ...s, heldMs: 0 };

  if (pressed !== s.facing) {
    return { ...s, facing: pressed, heldMs: 0 };
  }

  s.heldMs += dt;
  if (s.heldMs < TURN_DELAY) return s;

  const [dx, dy] = DELTA[pressed];
  const nx = s.x + dx;
  const ny = s.y + dy;
  if (!walkable(nx, ny)) return { ...s, heldMs: TURN_DELAY };

  return { ...s, progress: 0, toX: nx, toY: ny, heldMs: 0 };
}

/** Sub-tile pixel offset for rendering mid-step. */
export function renderOffset(s: MoveState, tileSize: number): [number, number] {
  if (s.progress === null) return [s.x * tileSize, s.y * tileSize];
  const t = Math.min(s.progress, 1);
  return [
    (s.x + (s.toX - s.x) * t) * tileSize,
    (s.y + (s.toY - s.y) * t) * tileSize,
  ];
}

/** The tile the player would interact with. */
export function facedTile(s: MoveState): { x: number; y: number } {
  const [dx, dy] = DELTA[s.facing];
  return { x: s.x + dx, y: s.y + dy };
}
