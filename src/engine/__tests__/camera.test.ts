import { describe, it, expect } from "vitest";
import { clampCamera } from "../camera";

describe("clampCamera", () => {
  it("centres on the player in open space", () => {
    expect(clampCamera(500, 500, 200, 100, 1000, 1000)).toEqual({ x: 400, y: 450 });
  });

  it("clamps at the top-left edge", () => {
    expect(clampCamera(10, 10, 200, 100, 1000, 1000)).toEqual({ x: 0, y: 0 });
  });

  it("clamps at the bottom-right edge", () => {
    expect(clampCamera(990, 990, 200, 100, 1000, 1000)).toEqual({ x: 800, y: 900 });
  });

  it("centres a map smaller than the viewport", () => {
    expect(clampCamera(50, 50, 400, 400, 200, 200)).toEqual({ x: -100, y: -100 });
  });
});
