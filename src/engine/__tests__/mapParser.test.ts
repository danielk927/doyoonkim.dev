import { describe, it, expect } from "vitest";
import { parseMap, isWalkable, landmarkAt, unreachableLandmarks } from "../mapParser";
import type { MapSource } from "../types";

const base: Omit<MapSource, "art"> = {
  legend: {
    ".": { ground: 1 },
    "#": { ground: 2, solid: true },
    "T": { ground: 1, overlay: 9, solid: true },
    "@": { ground: 1 },
    "E": { ground: 2, overlay: 5, solid: true },
  },
  landmarks: { E: "experience" },
  spawnChar: "@",
};

const src = (art: string): MapSource => ({ ...base, art });

describe("parseMap", () => {
  it("reads dimensions and ignores surrounding blank lines", () => {
    const m = parseMap(src("\n\n#####\n#.@.#\n#####\n\n"));
    expect(m.width).toBe(5);
    expect(m.height).toBe(3);
  });

  it("layers ground, overlay and solidity", () => {
    const m = parseMap(src("#T#\n.@.\n###"));
    expect(m.ground[0][1]).toBe(1);
    expect(m.overlay[0][1]).toBe(9);
    expect(m.overlay[1][1]).toBeNull();
    expect(m.solid[0][1]).toBe(true);
    expect(m.solid[1][0]).toBe(false);
  });

  it("locates the spawn point", () => {
    const m = parseMap(src("###\n.@.\n###"));
    expect(m.spawn).toEqual({ x: 1, y: 1 });
  });

  it("extracts landmarks with coordinates", () => {
    const m = parseMap(src("#E#\n.@.\n###"));
    expect(m.landmarks).toEqual([{ key: "experience", x: 1, y: 0 }]);
  });

  it("rejects ragged rows", () => {
    expect(() => parseMap(src("###\n.@\n###"))).toThrow(/row 1 is 2 wide/);
  });

  it("rejects unknown characters", () => {
    expect(() => parseMap(src("###\n.@?\n###"))).toThrow(/no legend entry for '\?'/);
  });

  it("rejects a map with no spawn", () => {
    expect(() => parseMap(src("###\n...\n###"))).toThrow(/no spawn point/);
  });

  it("rejects a map with two spawns", () => {
    expect(() => parseMap(src("#@#\n.@.\n###"))).toThrow(/more than one spawn/);
  });
});

describe("isWalkable", () => {
  const m = parseMap(src("###\n.@.\n###"));

  it("is false for solid tiles", () => {
    expect(isWalkable(m, 1, 0)).toBe(false);
  });

  it("is true for open tiles", () => {
    expect(isWalkable(m, 0, 1)).toBe(true);
  });

  it("is false outside the map", () => {
    expect(isWalkable(m, -1, 1)).toBe(false);
    expect(isWalkable(m, 3, 1)).toBe(false);
    expect(isWalkable(m, 1, 3)).toBe(false);
  });
});

describe("landmarkAt", () => {
  const m = parseMap(src("#E#\n.@.\n###"));

  it("finds the landmark on a tile", () => {
    expect(landmarkAt(m, 1, 0)?.key).toBe("experience");
  });

  it("returns null on an empty tile", () => {
    expect(landmarkAt(m, 0, 1)).toBeNull();
  });
});

describe("unreachableLandmarks", () => {
  it("passes when a landmark is adjacent to walkable floor", () => {
    expect(unreachableLandmarks(parseMap(src("#E#\n.@.\n###")))).toEqual([]);
  });

  it("reports a landmark walled off from spawn", () => {
    const art = ["#####", "#.@.#", "#####", "#.E.#", "#####"].join("\n");
    expect(unreachableLandmarks(parseMap(src(art)))).toEqual(["experience"]);
  });
});
