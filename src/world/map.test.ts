import { describe, it, expect } from "vitest";
import { parseMap, unreachableLandmarks } from "@/engine/mapParser";
import { SECTION_BY_KEY } from "@/content";
import { HONG_KONG, MAP_W, MAP_H } from "./map";

describe("the Hong Kong map", () => {
  const map = parseMap(HONG_KONG);

  it("is the declared size", () => {
    expect([map.width, map.height]).toEqual([MAP_W, MAP_H]);
  });

  it("places every landmark exactly once", () => {
    const keys = map.landmarks.map((l) => l.key).sort();
    expect(keys).toEqual(["about", "education", "experience", "notes", "projects"]);
  });

  it("binds every landmark to a content section", () => {
    for (const l of map.landmarks) expect(SECTION_BY_KEY[l.key]).toBeDefined();
  });

  it("leaves every landmark reachable on foot from the spawn point", () => {
    expect(unreachableLandmarks(map)).toEqual([]);
  });

  it("starts the player on a walkable tile", () => {
    expect(map.solid[map.spawn.y][map.spawn.x]).toBe(false);
  });
});
