import { describe, it, expect } from "vitest";
import { parseMap, landmarkAt, isWalkable } from "@/engine/mapParser";
import { SECTION_BY_KEY } from "@/content";
import { HONG_KONG } from "./map";
import { STRUCTURES, STRUCT_W, STRUCT_H, DOOR_COL } from "./structures";

const map = parseMap(HONG_KONG);

describe("landmark structures", () => {
  it("covers every content section exactly once", () => {
    const keys = STRUCTURES.map((s) => s.key).sort();
    expect(keys).toEqual(Object.keys(SECTION_BY_KEY).sort());
  });

  it("uses each sprite column once", () => {
    const sprites = STRUCTURES.map((s) => s.sprite).sort();
    expect(sprites).toEqual([0, 1, 2, 3, 4]);
  });

  it("puts each door on the marker the map declares", () => {
    for (const s of STRUCTURES) {
      const found = landmarkAt(map, s.x + DOOR_COL, s.bottom);
      expect(found?.key, `door for ${s.key}`).toBe(s.key);
    }
  });

  it("marks the whole footprint solid so you cannot walk through a tower", () => {
    for (const s of STRUCTURES) {
      for (let dy = 0; dy < STRUCT_H; dy++) {
        for (let dx = 0; dx < STRUCT_W; dx++) {
          expect(
            isWalkable(map, s.x + dx, s.bottom - dy),
            `${s.key} footprint at +${dx},-${dy}`,
          ).toBe(false);
        }
      }
    }
  });

  it("leaves the tile in front of each door walkable", () => {
    for (const s of STRUCTURES) {
      expect(isWalkable(map, s.x + DOOR_COL, s.bottom + 1), s.key).toBe(true);
    }
  });

  it("keeps every footprint inside the map", () => {
    for (const s of STRUCTURES) {
      expect(s.x).toBeGreaterThanOrEqual(0);
      expect(s.x + STRUCT_W).toBeLessThanOrEqual(map.width);
      expect(s.bottom - STRUCT_H).toBeGreaterThanOrEqual(-1);
      expect(s.bottom).toBeLessThan(map.height);
    }
  });
});
