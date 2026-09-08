import { describe, it, expect } from "vitest";
import {
  initMove, tickMove, renderOffset, facedTile,
  TURN_DELAY, WALK_STEP, RUN_STEP,
} from "../grid";

const open = () => true;
const closed = () => false;

describe("tickMove", () => {
  it("turns in place without moving when a new direction is tapped", () => {
    const s = tickMove(initMove(5, 5, "down"), "right", false, 16, open);
    expect(s.facing).toBe("right");
    expect(s.progress).toBeNull();
    expect([s.x, s.y]).toEqual([5, 5]);
  });

  it("does not start a step before the turn delay elapses", () => {
    const s = tickMove(initMove(5, 5, "down"), "down", false, TURN_DELAY - 1, open);
    expect(s.progress).toBeNull();
  });

  it("starts a step once the direction is held past the turn delay", () => {
    const s = tickMove(initMove(5, 5, "down"), "down", false, TURN_DELAY, open);
    expect(s.progress).toBe(0);
    expect([s.toX, s.toY]).toEqual([5, 6]);
  });

  it("refuses to step into a solid tile but keeps facing it", () => {
    const s = tickMove(initMove(5, 5, "down"), "down", false, TURN_DELAY, closed);
    expect(s.progress).toBeNull();
    expect(s.facing).toBe("down");
    expect([s.x, s.y]).toEqual([5, 5]);
  });

  it("completes a step and lands on the target tile", () => {
    let s = tickMove(initMove(5, 5, "down"), "down", false, TURN_DELAY, open);
    s = tickMove(s, null, false, WALK_STEP, open);
    expect([s.x, s.y]).toEqual([5, 6]);
    expect(s.progress).toBeNull();
  });

  it("chains into the next step when the key is still held", () => {
    let s = tickMove(initMove(5, 5, "down"), "down", false, TURN_DELAY, open);
    s = tickMove(s, "down", false, WALK_STEP, open);
    expect([s.x, s.y]).toEqual([5, 6]);
    expect(s.progress).toBe(0);
    expect([s.toX, s.toY]).toEqual([5, 7]);
  });

  it("ignores a direction change mid-step", () => {
    let s = tickMove(initMove(5, 5, "down"), "down", false, TURN_DELAY, open);
    s = tickMove(s, "left", false, WALK_STEP / 2, open);
    expect(s.facing).toBe("down");
    expect([s.toX, s.toY]).toEqual([5, 6]);
  });

  it("runs faster than it walks", () => {
    const start = tickMove(initMove(5, 5, "down"), "down", true, TURN_DELAY, open);
    const ran = tickMove(start, null, true, RUN_STEP, open);
    const walked = tickMove(start, null, false, RUN_STEP, open);
    expect(ran.progress).toBeNull();
    expect(walked.progress).not.toBeNull();
  });
});

describe("renderOffset", () => {
  it("sits on the tile grid when standing", () => {
    expect(renderOffset(initMove(3, 4), 16)).toEqual([48, 64]);
  });

  it("interpolates between tiles mid-step", () => {
    const s = { ...initMove(3, 4), progress: 0.5, toX: 3, toY: 5 };
    expect(renderOffset(s, 16)).toEqual([48, 72]);
  });
});

describe("facedTile", () => {
  it("returns the tile ahead of the player", () => {
    expect(facedTile(initMove(3, 4, "up"))).toEqual({ x: 3, y: 3 });
    expect(facedTile(initMove(3, 4, "left"))).toEqual({ x: 2, y: 4 });
  });
});
