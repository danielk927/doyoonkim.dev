/**
 * The five interactive buildings, drawn from public/assets/landmarks.png as
 * whole sprites rather than tiles -- Kenney has no Bank of China Tower.
 *
 * `x`/`bottom` are tile coordinates and MUST match the PLOTS table in the map
 * layout: the ASCII marks a 6x8 solid footprint and puts the landmark marker
 * on the door column. structures.test.ts checks the two agree.
 */
export interface Structure {
  key: string;
  /** Column in landmarks.png. */
  sprite: number;
  /** Left edge, in tiles. */
  x: number;
  /** Bottom row, in tiles -- the row the door sits on. */
  bottom: number;
}

export const STRUCT_W = 6;
export const STRUCT_H = 8;
/** Tile offset of the door within the footprint. Baked into the sprites. */
export const DOOR_COL = 3;

export const STRUCTURES: Structure[] = [
  { key: "projects", sprite: 2, x: 6, bottom: 11 },
  { key: "about", sprite: 3, x: 27, bottom: 11 },
  { key: "notes", sprite: 4, x: 48, bottom: 11 },
  { key: "experience", sprite: 0, x: 14, bottom: 47 },
  { key: "education", sprite: 1, x: 40, bottom: 47 },
];
