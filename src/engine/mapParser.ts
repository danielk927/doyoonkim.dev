import type { MapSource, ParsedMap } from "./types";

/**
 * Turn an ASCII map into layered tile grids.
 *
 * One character is one tile, so the art stays visually aligned with the world
 * it describes. Landmarks and the spawn point are marker characters that also
 * draw a normal tile.
 */
export function parseMap(src: MapSource): ParsedMap {
  const rows = src.art.split("\n");
  while (rows.length && rows[0].trim() === "") rows.shift();
  while (rows.length && rows[rows.length - 1].trim() === "") rows.pop();
  if (rows.length === 0) throw new Error("map is empty");

  const width = rows[0].length;
  const ragged = rows.findIndex((r) => r.length !== width);
  if (ragged !== -1) {
    throw new Error(
      `map row ${ragged} is ${rows[ragged].length} wide, expected ${width}`,
    );
  }

  const ground: number[][] = [];
  const overlay: (number | null)[][] = [];
  const solid: boolean[][] = [];
  const landmarks: ParsedMap["landmarks"] = [];
  let spawn: ParsedMap["spawn"] | null = null;

  rows.forEach((row, y) => {
    const g: number[] = [];
    const o: (number | null)[] = [];
    const s: boolean[] = [];
    [...row].forEach((ch, x) => {
      const def = src.legend[ch];
      if (!def) throw new Error(`no legend entry for '${ch}' at ${x},${y}`);
      g.push(def.ground);
      o.push(def.overlay ?? null);
      s.push(def.solid ?? false);

      const key = src.landmarks[ch];
      if (key) landmarks.push({ key, x, y });
      if (ch === src.spawnChar) {
        if (spawn) throw new Error("map has more than one spawn point");
        spawn = { x, y };
      }
    });
    ground.push(g);
    overlay.push(o);
    solid.push(s);
  });

  if (!spawn) throw new Error(`map has no spawn point ('${src.spawnChar}')`);
  return { width, height: rows.length, ground, overlay, solid, landmarks, spawn };
}

export function isWalkable(map: ParsedMap, x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= map.width || y >= map.height) return false;
  return !map.solid[y][x];
}

/** The landmark on a given tile, if any. */
export function landmarkAt(map: ParsedMap, x: number, y: number) {
  return map.landmarks.find((l) => l.x === x && l.y === y) ?? null;
}

/**
 * Every landmark must be standable-next-to from the spawn point. Solid
 * landmark tiles (a door in a wall) count as reached when any orthogonal
 * neighbour is reachable.
 */
export function unreachableLandmarks(map: ParsedMap): string[] {
  const seen = new Set<string>();
  const queue = [map.spawn];
  seen.add(`${map.spawn.x},${map.spawn.y}`);
  while (queue.length) {
    const { x, y } = queue.shift()!;
    for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
      const nx = x + dx, ny = y + dy;
      const id = `${nx},${ny}`;
      if (seen.has(id) || !isWalkable(map, nx, ny)) continue;
      seen.add(id);
      queue.push({ x: nx, y: ny });
    }
  }
  return map.landmarks
    .filter((l) => {
      if (seen.has(`${l.x},${l.y}`)) return false;
      return ![[0, 1], [0, -1], [1, 0], [-1, 0]].some(
        ([dx, dy]) => seen.has(`${l.x + dx},${l.y + dy}`),
      );
    })
    .map((l) => l.key);
}
