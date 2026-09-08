export type Dir = "down" | "right" | "up" | "left";

/** What one character in an ASCII map row draws and whether it blocks. */
export interface TileDef {
  /** Base layer tile index into the sheet. */
  ground: number;
  /** Optional tile drawn on top of the ground (props, signs, awnings). */
  overlay?: number;
  /** Blocks walking. Defaults to false. */
  solid?: boolean;
}

export interface Landmark {
  /** Key into the content modules, e.g. "experience". */
  key: string;
  x: number;
  y: number;
}

export interface ParsedMap {
  width: number;
  height: number;
  ground: number[][];
  overlay: (number | null)[][];
  solid: boolean[][];
  landmarks: Landmark[];
  spawn: { x: number; y: number };
}

export interface MapSource {
  /** The ASCII art. Leading and trailing blank lines are ignored. */
  art: string;
  legend: Record<string, TileDef>;
  /** Marker char -> content key. Markers also need an entry in `legend`. */
  landmarks: Record<string, string>;
  /** Marker char for the player start. Also needs a `legend` entry. */
  spawnChar: string;
}
